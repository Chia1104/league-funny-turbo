import {
  forwardRef,
  useImperativeHandle,
  type ChangeEvent,
  type FocusEvent,
  useRef,
  type DetailedHTMLProps,
  type TextareaHTMLAttributes,
  useState,
  useId,
} from "react";
import { useS3ImageUpload } from "@/hooks";
import { type ZodType } from "zod";
import cx from "classnames";
import ActionBar from "./ActionBar";
import { CameraIcon } from "@wanin/icons";

interface Props
  extends DetailedHTMLProps<
    TextareaHTMLAttributes<HTMLTextAreaElement>,
    HTMLTextAreaElement
  > {
  isPrivate?: boolean;
  errorClassName?: string;
  schema?: ZodType<any>;
  error?: string;
}

interface NewCommentRef {
  getValidity: () => boolean;
  getNativeTextArea: () => HTMLTextAreaElement;
}

const NewComment = forwardRef<NewCommentRef, Props>((props, ref) => {
  const { isPrivate, schema, onChange, onBlur, onFocus, className, ...rest } =
    props;
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [isError, setIsError] = useState(false);
  const [isFocus, setIsFocus] = useState(false);
  const id = useId();
  const handleTextAreaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    if (schema) {
      const { value } = e.target;
      const isValid = schema.safeParse(value).success;
      setIsError(!isValid);
    }
    onChange && onChange(e);
  };
  const handleBlur = (e: FocusEvent<HTMLTextAreaElement>) => {
    setIsFocus(false);
    onBlur && onBlur(e);
  };
  const handleFocus = (e: FocusEvent<HTMLTextAreaElement>) => {
    setIsFocus(true);
    onFocus && onFocus(e);
  };
  useImperativeHandle(ref, () => ({
    getValidity: () => {
      if (schema) return isError;
      return true;
    },
    getNativeTextArea: () => {
      return textareaRef.current as HTMLTextAreaElement;
    },
  }));
  return (
    <>
      <textarea
        id={`${id}-new-comment`}
        ref={textareaRef}
        onChange={handleTextAreaChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        className={cx(
          "border-[#CBD2D7] w-full rounded-lg w-border-primary transition ease-in-out focus:outline-none w-bg-primary p-2 overflow-scroll scrollbar-thin scrollbar-thumb-gray-400 dark:scrollbar-thumb-primary scrollbar-thumb-rounded-full",
          isError &&
            "border-danger hover:cursor-not-allowed dark:border-danger dark:hover:cursor-not-allowed",
          isFocus && !isError && "border-primary dark:border-primary",
          className
        )}
        {...rest}
      />
      <ActionBar>
        <CameraIcon
          className="hover:w-bg-primary rounded-full p-1"
          size="medium"
        />
        <CameraIcon
          className="hover:w-bg-primary rounded-full p-1"
          size="medium"
        />
      </ActionBar>
    </>
  );
});

NewComment.displayName = "NewComment";
export default NewComment;
