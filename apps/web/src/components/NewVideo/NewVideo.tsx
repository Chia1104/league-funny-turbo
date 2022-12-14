import {
  TagProvider,
  TagListCtx,
  SearchTagCtx,
  TagContext,
} from "@/components";
import { type ChangeEvent, useContext, useRef, useState } from "react";
import SelectBord, { type SelectBordRef } from "../NewPost/SelectBord";
import { Button, Input, InputRef } from "@wanin/ui";
import {
  titleSchema,
  newVideoSchema,
  video_urlSchema,
} from "@wanin/shared/utils/zod-schema";
import { useToasts } from "@geist-ui/core";
import { addNewFeed } from "@/helpers/api/client";
import { useRouter } from "next/router";

const NewVideo = () => {
  return (
    <TagProvider>
      <NewVideoCtx />
    </TagProvider>
  );
};

const NewVideoCtx = () => {
  const { state } = useContext(TagContext);
  const [disable, setDisable] = useState(true);
  const titleRef = useRef<InputRef>(null);
  const linkRef = useRef<InputRef>(null);
  const commentRef = useRef<InputRef>(null);
  const selectBordRef = useRef<SelectBordRef>(null);
  const { setToast } = useToasts();
  const router = useRouter();
  const handleSubmit = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
  const [inputList, setInputList] = useState([{ list: "" }]);

  const handleInputListAdd = () => {
    setInputList([...inputList, { list: "" }]);
  };

  const addVideo = async () => {
    console.log(state.tags);
    const newVideo = {
      title: titleRef.current?.getNativeInput().value,
      video_url: linkRef.current?.getNativeInput().value,
      comment: commentRef.current?.getNativeInput().value,
      gameType: selectBordRef.current?.getSelectedBord(),
      catalogue: selectBordRef.current?.getSelectedCategory(),
      tags: state.tags,
    };
    if (!newVideoSchema.safeParse(newVideo).success) {
      setToast({
        text: "請確認資料是否正確",
        type: "warning",
      });
      return;
    }
    const res = await addNewFeed(newVideo);
    if (res.status !== 200) {
      setToast({
        text: res.data?.message || "新增影片失敗",
        type: "warning",
      });
      return;
    }
    setToast({
      text: "新增影片成功",
      type: "success",
    });
    if (res.data)
      await router.push(`/b/${res.data.gameType}/f/${res.data.fid}`);
  };

  const handleChange = () => {
    console.log(state.tags);
    const newVideo = {
      title: titleRef.current?.getNativeInput().value,
      video_url: linkRef.current?.getNativeInput().value,
      comment: commentRef.current?.getNativeInput().value,
      gameType: selectBordRef.current?.getSelectedBord(),
      catalogue: selectBordRef.current?.getSelectedCategory(),
      tags: state.tags,
    };
    if (!newVideoSchema.safeParse(newVideo).success) {
      setDisable(true);
      return;
    }
    setDisable(false);
  };

  return (
    <form
      className="w-full max-w-[640px] p-5"
      onSubmit={handleSubmit}
      onChange={handleChange}>
      <Input
        ref={titleRef}
        className="p-2 text-2xl"
        placeholder="影片標題"
        schema={titleSchema}
        errorClassName="my-1"
        error="標題太長或太短了"
      />
      <div className="bg-light">
        {inputList.map((item, i) => (
          <div className="flex items-center">
            <div key={i + 1} className="mr-3">
              {i + 1}
            </div>
            <Input
              ref={linkRef}
              className="p-1 text-xl"
              placeholder="影片網址"
              schema={video_urlSchema}
              errorClassName="my-1"
              error="網址不符"
            />
          </div>
        ))}
        <button className="btn-styleB flex" onClick={handleInputListAdd}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 6v12m6-6H6"
            />
          </svg>
          <span>增加選項</span>
        </button>
      </div>
      <SelectBord ref={selectBordRef} />
      <div className="w-full w-bg-secondary flex flex-wrap items-center p-2 rounded-lg border my-5 gap-3 w-border-primary relative z-20">
        <TagListCtx />
        <SearchTagCtx />
      </div>
      <div className="z-10 relative w-full flex justify-center">
        <Button
          text="新增影片"
          type="submit"
          disabled={disable}
          onClick={addVideo}
        />
      </div>
    </form>
  );
};
export default NewVideo;
