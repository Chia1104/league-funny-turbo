import { type FC, useRef, type ChangeEvent, useState, useContext } from "react";
import { Input, type InputRef } from "@wanin/ui";
import { z } from "zod";
import { useDebounce, useUpdateEffect } from "usehooks-ts";
import { useMutation } from "@tanstack/react-query";
import { fetchTagList } from "@/helpers/api/client";
import cx from "classnames";
import { TagContext, ActionType } from "./Tag";
import type { Tag as TagType } from "@wanin/types";
import { encodeString } from "@wanin/utils";

const searchSchema = z.string().min(0).max(10);

const SearchTag: FC = () => {
  const { dispatch } = useContext(TagContext);
  const inputRef = useRef<InputRef>(null);
  const [value, setValue] = useState<string>("");
  const [isFocus, setIsFocus] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const debouncedValue = useDebounce<string>(value, 500);

  const searchTags = useMutation({
    mutationFn: async () => await fetchTagList(debouncedValue),
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setIsError(inputRef.current?.getValidity() as boolean);
    setValue(e.target.value);
  };

  const handleAddTag = (tag: TagType) => {
    dispatch({ type: ActionType.SET_TAGS, payload: tag });
    setValue("");
  };

  const handleOnBlur = () => {
    setTimeout(() => {
      setIsFocus(false);
    }, 200);
  };

  useUpdateEffect(() => {
    if (!isError) searchTags.mutate();
  }, [debouncedValue, isError]);

  return (
    <div className="max-w-[200px] flex flex-col relative">
      <Input
        ref={inputRef}
        value={value}
        onFocus={() => setIsFocus(true)}
        onBlur={handleOnBlur}
        onChange={handleChange}
        placeholder="新增標籤"
        className="w-full p-1 z-30"
        schema={searchSchema}
      />
      <div
        className={cx(
          "w-bg-secondary shadow-lg absolute top-[35px] left-0 z-20 rounded-lg w-full max-w-[200px] max-h-[150px] overflow-y-scroll w-main-scrollbar flex flex-col transition-all ease-in-out",
          !searchTags.isSuccess && !debouncedValue && "h-0",
          searchTags.isSuccess &&
            debouncedValue &&
            isFocus &&
            "h-auto py-2 gap-3"
        )}>
        {isFocus &&
          searchTags.isSuccess &&
          searchTags.data.length !== 0 &&
          searchTags.data.map((tag) => (
            <button
              onClick={() => handleAddTag(tag)}
              key={tag.id}
              className="flex items-center justify-between px-2 py-1 hover:w-bg-primary ml-2">
              <span>{tag.name}</span>
            </button>
          ))}
        {isFocus &&
          searchTags.isSuccess &&
          searchTags.data.length === 0 &&
          debouncedValue && (
            <>
              <div className="flex items-center justify-center h-full">
                <p className="text-small">沒有符合的標籤</p>
              </div>
              <button
                onClick={() =>
                  handleAddTag({
                    id: null,
                    name: value,
                    slug: encodeString(value),
                  })
                }
                className="flex items-center justify-between px-2 py-1 hover:w-bg-primary ml-2">
                <span>{value}</span>
              </button>
            </>
          )}
      </div>
    </div>
  );
};

export default SearchTag;
