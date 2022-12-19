import { type FC, forwardRef, useImperativeHandle } from "react";
import { Input, type InputRef } from "@wanin/ui";
import { useS3ImageUpload } from "@/hooks";

const NewComment = forwardRef<InputRef>((props, ref) => {
  return (
    <Input ref={ref} role="textbox" className="max-w-[640px] min-h-[150px]" />
  );
});

NewComment.displayName = "NewComment";
export default NewComment;
