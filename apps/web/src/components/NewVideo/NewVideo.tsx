import { Tag, type TagRef } from "@/components";
import { type ChangeEvent, useRef, useState } from "react";
import SelectBord, { type SelectBordRef } from "../NewPost/SelectBord";
import { Button, Input, InputRef } from "@wanin/ui";
import {
  titleSchema,
  newVideoSchema,
  video_urlSchema,
  commentSchema,
} from "@wanin/shared/utils/zod-schema";
import { useToasts } from "@geist-ui/core";
import { useRouter } from "next/router";
import { addPlaylist } from "@/helpers/api/routes/playlist";

const NewVideo = () => {
  const [disable, setDisable] = useState(true);
  const titleRef = useRef<InputRef>(null);
  const selectBordRef = useRef<SelectBordRef>(null);
  const [gameType, setGameType] = useState<string | null>(null);
  const [category, setCategory] = useState<number | null>(null);
  const tagRef = useRef<TagRef>(null);
  const { setToast } = useToasts();
  const router = useRouter();

  const handleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    await addVideo();
  };

  const [inputList, setInputList] = useState<
    {
      video_url: string;
      comment: string;
    }[]
  >([
    {
      video_url: "",
      comment: "",
    },
  ]);

  const addVideo = async () => {
    const newVideo = {
      title: titleRef.current?.getNativeInput().value,
      videoUrls: inputList,
      gameType: selectBordRef.current?.getSelectedBord(),
      catalogue: selectBordRef.current?.getSelectedCategory(),
      tags: tagRef.current?.getTags(),
    };
    if (!newVideoSchema.safeParse(newVideo).success) {
      setToast({
        text: "請確認資料是否正確",
        type: "warning",
      });
      return;
    }
    const res = await addPlaylist({ newVideo });
    if (res.statusCode !== 200) {
      setToast({
        text: res.message || "新增影片失敗",
        type: "warning",
      });
      return;
    }
    setToast({
      text: "新增影片成功",
      type: "success",
    });
    if (res.data)
      await router.push(`/b/${res?.data?.gameType}/f/${res?.data?.fid}`);
  };

  const handleChange = () => {
    const newVideo = {
      title: titleRef.current?.getNativeInput().value,
      videoUrls: inputList,
      gameType: selectBordRef.current?.getSelectedBord(),
      catalogue: selectBordRef.current?.getSelectedCategory(),
      tags: tagRef.current?.getTags(),
    };
    if (!newVideoSchema.safeParse(newVideo).success) {
      console.log(newVideoSchema.safeParse(newVideo));
      setDisable(true);
      return;
    }
    setDisable(false);
  };

  const handleInputListAdd = () => {
    setInputList([
      ...inputList,
      {
        video_url: "",
        comment: "",
      },
    ]);
  };

  const handleChangeLink = (e: ChangeEvent<HTMLInputElement>, i: number) => {
    const { value } = e.target;
    const linkList = [...inputList];
    linkList[i]["video_url"] = value;
  };

  const handleChangeComment = (e: ChangeEvent<HTMLInputElement>, i: number) => {
    const { value } = e.target;
    const commentList = [...inputList];
    commentList[i]["comment"] = value;
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
      <div className="my-4 p-4 flex flex-col bg-gray-400 rounded-lg shadow-lg dark:bg-dark">
        {inputList.map((item, i) => (
          <div
            key={i}
            className="flex items-center justify-between mb-3 w-full">
            <div className="mr-3 text-base text-white">{`${i + 1}.`}</div>
            <div className="w-[530px]">
              <Input
                className="px-2 py-1 text-base"
                placeholder="影片網址"
                schema={video_urlSchema}
                errorClassName="my-1"
                error="網址不符"
                onChange={(e) => handleChangeLink(e, i)}
              />
              <Input
                className="px-2 py-1 text-base"
                placeholder="個人短評 (輸入你對影片的簡短感想)"
                schema={commentSchema}
                errorClassName="my-1"
                error="評論太長或太短了"
                onChange={(e) => handleChangeComment(e, i)}
              />
            </div>
          </div>
        ))}
        <button
          className="btn-styleB flex justify-center mt-4 border-0 dark:hover:bg-black dark:border rounded-lg transition-all ease-in-out w-border-primary"
          onClick={handleInputListAdd}>
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
      <SelectBord
        ref={selectBordRef}
        onBordChange={(value) => setGameType(value)}
        onCategoryChange={(value) => setCategory(value)}
      />
      <div className="relative z-20">
        <Tag ref={tagRef} />
      </div>
      <div className="z-10 relative w-full flex justify-center">
        <Button
          text="新增影片"
          type="submit"
          disabled={disable || !gameType || !category || !inputList}
        />
      </div>
    </form>
  );
};
export default NewVideo;
