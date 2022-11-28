import { type FC, useRef, type ChangeEvent, useEffect, useState } from "react";
import { Input, type InputRef } from "@/components";
import { z } from "zod";
import { useDebounce } from "usehooks-ts";

const searchSchema = z.string().min(0).max(10);

const SearchTag: FC = () => {
  const inputRef = useRef<InputRef>(null);
  const [value, setValue] = useState<string>("");
  const [isError, setIsError] = useState<boolean>(false);
  const debouncedValue = useDebounce<string>(value, 500);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setIsError(inputRef.current?.getValidity() as boolean);
    setValue(e.target.value);
  };

  useEffect(() => {
    console.log(debouncedValue);
    if (isError) console.log("error");
  }, [debouncedValue, isError]);

  return (
    <Input
      ref={inputRef}
      onChange={handleChange}
      placeholder="新增標籤"
      className="max-w-[200px] p-1"
      schema={searchSchema}
    />
  );
};

export default SearchTag;
