import {
  forwardRef,
  useImperativeHandle,
  type ChangeEvent,
  type FocusEvent,
  useRef,
  type DetailedHTMLProps,
  type TextareaHTMLAttributes,
  type FormHTMLAttributes,
  useState,
  useId,
} from "react";
import { useS3ImageUpload } from "@/hooks";
import { type ZodType } from "zod";
import cx from "classnames";
import ActionBar from "./ActionBar";
import { CameraIcon, SendIcon, SmileIcon } from "@wanin/icons";
import { resizeConfig } from "@/shared/config/image.config";
import { useToasts } from "@geist-ui/core";
import { useHover } from "usehooks-ts";
import { Avatar } from "@/components";

interface Props {
  isPrivate?: boolean;
  errorClassName?: string;
  schema?: ZodType<any>;
  error?: string;
  textareaProps?: DetailedHTMLProps<
    TextareaHTMLAttributes<HTMLTextAreaElement>,
    HTMLTextAreaElement
  >;
  formProps?: DetailedHTMLProps<
    FormHTMLAttributes<HTMLFormElement>,
    HTMLFormElement
  >;
  userId?: string;
  avatar?: string;
}

interface NewCommentRef {
  getValidity: () => boolean;
  getNativeTextArea: () => HTMLTextAreaElement;
  getNativeForm: () => HTMLFormElement;
}

const NewComment = forwardRef<NewCommentRef, Props>((props, ref) => {
  const {
    isPrivate,
    schema,
    textareaProps,
    errorClassName,
    formProps,
    userId,
    avatar,
    ...rest
  } = props;
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const isHovering = useHover(formRef);
  const [isError, setIsError] = useState(false);
  const [isFocus, setIsFocus] = useState(false);
  const id = useId();
  const { setToast } = useToasts();
  const { FileInput, isUploading } = useS3ImageUpload({
    fileNamePrefix: "_n",
    resize: {
      width: resizeConfig["comment"]["width"],
    },
    convert: false,
    bucketFolder: "imgur",
    onS3UploadError: (error) => {
      setToast({
        text: error,
        type: "warning",
      });
    },
    onS3UploadComplete: (imgUrl) => {
      // @ts-ignore
      textareaRef.current.value += imgUrl;
      setToast({
        text: "上傳成功",
        type: "success",
      });
    },
    errorMessage: "上傳失敗",
  });
  const handleTextAreaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    if (schema) {
      const { value } = e.target;
      const isValid = schema.safeParse(value).success;
      setIsError(!isValid);
    }
    textareaProps?.onChange && textareaProps.onChange(e);
  };
  const handleBlur = (e: FocusEvent<HTMLTextAreaElement>) => {
    setIsFocus(false);
    textareaProps?.onBlur && textareaProps.onBlur(e);
  };
  const handleFocus = (e: FocusEvent<HTMLTextAreaElement>) => {
    setIsFocus(true);
    textareaProps?.onFocus && textareaProps.onFocus(e);
  };
  useImperativeHandle(ref, () => ({
    getValidity: () => {
      if (schema) return isError;
      return true;
    },
    getNativeTextArea: () => {
      return textareaRef.current as HTMLTextAreaElement;
    },
    getNativeForm: () => {
      return formRef.current as HTMLFormElement;
    },
  }));
  return (
    <form
      ref={formRef}
      {...formProps}
      className={cx(
        "w-full relative",
        formProps?.className && formProps.className
      )}>
      <textarea
        style={{ resize: "none" }}
        id={`${id}-new-comment`}
        ref={textareaRef}
        {...textareaProps}
        onChange={handleTextAreaChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        className={cx(
          "w-full min-h-[170px] border-[#CBD2D7] w-full rounded-lg w-border-primary transition ease-in-out focus:outline-none w-bg-primary p-2 overflow-scroll scrollbar-thin scrollbar-thumb-gray-400 dark:scrollbar-thumb-primary scrollbar-thumb-rounded-full",
          isError &&
            "border-danger hover:cursor-not-allowed dark:border-danger dark:hover:cursor-not-allowed",
          isFocus && !isError && "border-primary dark:border-primary",
          textareaProps?.className && textareaProps.className
        )}
      />
      <ActionBar
        isLoading={isUploading}
        className={cx(
          "absolute bottom-0 right-0 mr-5 mb-5 transition-all ease-in-out duration-300",
          isHovering ? "opacity-1" : "opacity-[0.4]"
        )}>
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="hover:w-bg-primary rounded-full p-1">
          <CameraIcon />
          <FileInput className="hidden" ref={inputRef} />
        </button>
        <button
          type="button"
          className="relative hover:w-bg-primary rounded-full p-1">
          <SmileIcon />
        </button>
        <button
          disabled={isError}
          type="submit"
          className="relative hover:w-bg-primary rounded-full p-1">
          <SendIcon />
        </button>
      </ActionBar>
      {(avatar || userId) && (
        <div className="absolute bottom-0 left-0 ml-5 mb-5">
          <Avatar
            ratio={30}
            username={userId ?? "avatar"}
            userId={userId}
            url={avatar}
          />
        </div>
      )}
    </form>
  );
});

NewComment.displayName = "NewComment";
export default NewComment;
