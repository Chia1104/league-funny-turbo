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
  type ReactNode,
  type FC,
} from "react";
import { useS3ImageUpload } from "@/hooks";
import { type ZodType } from "zod";
import cx from "classnames";
import ActionBar from "./ActionBar";
import { CameraIcon, SendIcon, SmileIcon, TimeLineIcon } from "@wanin/icons";
import { resizeConfig } from "@/shared/config/image.config";
import { useToasts } from "@geist-ui/core";
import { useHover, useMediaQuery } from "usehooks-ts";
import { Avatar } from "@/components";
import { Drawer } from "@geist-ui/core";

interface Props {
  isPrivate?: boolean;
  errorClassName?: string;
  schema?: ZodType<any>;
  error?: string;
  textareaProps?: DetailedHTMLProps<
    TextareaHTMLAttributes<HTMLTextAreaElement>,
    HTMLTextAreaElement
  >;
  onImageUpload?: (url?: string) => void;
  formProps?: DetailedHTMLProps<
    FormHTMLAttributes<HTMLFormElement>,
    HTMLFormElement
  >;
  userId?: string;
  avatar?: string;
  useDrawer?: {
    isOpen: boolean;
    handleDrawer: () => void;
    title?: string;
    subtitle?: string;
    content?: ReactNode;
  };
  useMinified?: boolean;
}

interface NewCommentRef {
  getValidity: () => boolean;
  getNativeTextArea: () => HTMLTextAreaElement;
  getNativeForm: () => HTMLFormElement;
}

const DrawerContent: FC<{
  useDrawer: Props["useDrawer"];
}> = ({ useDrawer }) => {
  const matches = useMediaQuery("(min-width: 768px)");
  return (
    <Drawer
      width="min(100%, 500px)"
      placement={matches ? "right" : "bottom"}
      visible={useDrawer?.isOpen}
      onClose={useDrawer?.handleDrawer}>
      <Drawer.Title>{useDrawer?.title}</Drawer.Title>
      <Drawer.Subtitle>{useDrawer?.subtitle}</Drawer.Subtitle>
      <Drawer.Content>{useDrawer?.content}</Drawer.Content>
    </Drawer>
  );
};

const NewComment = forwardRef<NewCommentRef, Props>((props, ref) => {
  const {
    isPrivate,
    schema,
    textareaProps,
    errorClassName,
    formProps,
    userId,
    avatar,
    useDrawer,
    onImageUpload,
    useMinified,
  } = props;
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const isHovering = useHover(formRef);
  const [isError, setIsError] = useState(false);
  const [isFocus, setIsFocus] = useState(false);
  const id = useId();
  const inputId = useId();
  const formId = useId();
  const { setToast } = useToasts();
  const { FileInput, isUploading } = useS3ImageUpload({
    fileNamePrefix: "_n",
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
      textareaRef.current.value += `\n${imgUrl}\n`;
      onImageUpload && onImageUpload(imgUrl);
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
    setTimeout(() => {
      setIsFocus(false);
      textareaProps?.onBlur && textareaProps.onBlur(e);
    }, 100);
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
      id={formId}
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
          "w-full border-[#CBD2D7] w-full rounded-lg w-border-primary transition-all ease-in-out focus:outline-none w-bg-primary p-3 overflow-scroll scrollbar-thin scrollbar-thumb-gray-400 dark:scrollbar-thumb-primary scrollbar-thumb-rounded-full",
          isError &&
            "border-danger hover:cursor-not-allowed dark:border-danger dark:hover:cursor-not-allowed",
          isFocus && !isError && "border-primary dark:border-primary",
          textareaProps?.className && textareaProps.className,
          useMinified ? "h-[63px]" : "min-h-[170px] pb-[55px]",
          isFocus && useMinified && "h-[170px]"
        )}
      />
      {useDrawer && (
        <>
          {!useMinified && (
            <button
              type="button"
              onClick={useDrawer.handleDrawer}
              className="absolute top-2 right-2 rounded-full p-1 w-bg-secondary rotate-45 shadow-lg hover:shadow-xl dark:hover:text-primary">
              <TimeLineIcon />
            </button>
          )}
          <DrawerContent
            useDrawer={{
              isOpen: useDrawer.isOpen,
              handleDrawer: useDrawer.handleDrawer,
              title: useDrawer.title,
              subtitle: useDrawer.subtitle,
              content: useDrawer.content,
            }}
          />
        </>
      )}
      <ActionBar
        isLoading={isUploading}
        className={cx(
          "absolute bottom-0 right-0 mr-5 mb-5 transition-all ease-in-out duration-300 group",
          isHovering ? "opacity-1" : "opacity-[0.4]"
        )}>
        {useDrawer && (
          <button
            type="button"
            onClick={useDrawer.handleDrawer}
            className="rounded-full p-1 rotate-45 hover:text-primary">
            <TimeLineIcon />
          </button>
        )}
        <button
          type="button"
          className={cx(
            "hover:w-bg-primary rounded-full p-1 relative"
            // useMinified && "hidden group-hover:block"
          )}>
          <label
            htmlFor={inputId}
            className="w-full h-full absolute top-o right-0 hover:cursor-pointer"
          />
          <CameraIcon />
          <FileInput id={inputId} className="hidden" ref={inputRef} />
        </button>
        <button
          type="button"
          className={cx(
            "relative hover:w-bg-primary rounded-full p-1"
            // useMinified && "hidden group-hover:block"
          )}>
          <SmileIcon />
        </button>
        <button
          disabled={isError}
          type="submit"
          className={cx(
            "relative hover:w-bg-primary rounded-full p-1",
            isError && "cursor-not-allowed"
          )}>
          <SendIcon />
        </button>
      </ActionBar>
      {(avatar || userId) && !useMinified && (
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
export { type NewCommentRef };
