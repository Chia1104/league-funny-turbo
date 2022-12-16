import { Tag, type TagRef } from "@/components";
import { type ChangeEvent, useRef, useState } from "react";
import { FroalaEditor, type EditorRef } from "@/components";
import SelectBord, { type SelectBordRef } from "./SelectBord";
import UploadCover, { type UploadCoverRef } from "./UploadCover";
import { Button, Input, InputRef } from "@wanin/ui";
import { titleSchema, newPostSchema } from "@wanin/shared/utils/zod-schema";
import { useToasts } from "@geist-ui/core";
import { addNewFeed } from "@/helpers/api/routes/feed";
import { useRouter } from "next/router";

const NewPost = () => {
  const [disable, setDisable] = useState(true);
  const editorRef = useRef<EditorRef>(null);
  const titleRef = useRef<InputRef>(null);
  const selectBordRef = useRef<SelectBordRef>(null);
  const [gameType, setGameType] = useState<string | null>(null);
  const [category, setCategory] = useState<number | null>(null);
  const [content, setContent] = useState<string | null>(null);
  const uploadCoverRef = useRef<UploadCoverRef>(null);
  const tagRef = useRef<TagRef>(null);
  const { setToast } = useToasts();
  const router = useRouter();
  const handleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    await addPost();
  };

  const addPost = async () => {
    const newPost = {
      title: titleRef.current?.getNativeInput().value,
      content: editorRef.current?.getModel(),
      cover: uploadCoverRef.current?.fileUrl || "",
      gameType: selectBordRef.current?.getSelectedBord(),
      catalogue: selectBordRef.current?.getSelectedCategory(),
      tags: tagRef.current?.getTags(),
    };
    if (!newPostSchema.safeParse(newPost).success) {
      setToast({
        text: "請確認資料是否正確",
        type: "warning",
      });
      return;
    }
    const res = await addNewFeed({ newPost });
    if (res.statusCode !== 200) {
      setToast({
        text: res?.message || "新增文章失敗",
        type: "warning",
      });
      return;
    }
    setToast({
      text: "新增文章成功",
      type: "success",
    });
    await router.push(`/b/${res?.data?.gameType}/f/${res?.data?.fid}`);
  };

  const handleChange = () => {
    const newPost = {
      title: titleRef.current?.getNativeInput().value,
      tags: tagRef.current?.getTags(),
    };
    if (
      !newPostSchema
        .pick({
          title: true,
          tags: true,
        })
        .safeParse(newPost).success
    ) {
      setDisable(true);
      return;
    }
    setDisable(false);
  };

  return (
    <form
      className="w-full max-w-[640px]"
      onSubmit={handleSubmit}
      onChange={handleChange}>
      <Input
        ref={titleRef}
        className="p-2 text-2xl"
        placeholder="文章標題"
        schema={titleSchema}
        errorClassName="my-1"
        error="標題太長或太短了"
      />
      <div className="w-full flex justify-center my-6">
        <UploadCover ref={uploadCoverRef} />
      </div>
      <SelectBord
        ref={selectBordRef}
        onBordChange={(value) => setGameType(value)}
        onCategoryChange={(value) => setCategory(value)}
      />
      <FroalaEditor
        ref={editorRef}
        onContentChange={(value) => setContent(value)}
      />
      <div className="relative z-20">
        <Tag ref={tagRef} />
      </div>
      <div className="z-10 relative w-full flex justify-center">
        <Button
          text="新增文章"
          type="submit"
          disabled={disable || !gameType || !category || !content}
        />
      </div>
    </form>
  );
};
export default NewPost;
