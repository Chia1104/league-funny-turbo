import { useState, useImperativeHandle, forwardRef } from "react";
import "froala-editor/css/froala_style.min.css";
import "froala-editor/css/froala_editor.pkgd.min.css";
import dynamic from "next/dynamic";
import { FROALA_KEY } from "@/shared/constants";
import { useDarkMode } from "@/hooks";
import { MAX_FILE_SIZE } from "@wanin/shared/utils";
import { Loading } from "@geist-ui/core";

const FroalaEditorComponent = dynamic(
  async () => {
    const values = await Promise.all([
      import("react-froala-wysiwyg"),
      // @ts-ignore
      import("froala-editor/js/plugins.pkgd.min.js"),
      // @ts-ignore
      import("froala-editor/js/languages/zh_tw.js"),
    ]);
    return values[0];
  },
  {
    loading: () => <Loading type="success" spaceRatio={2.5} />,
    ssr: false,
  }
);

interface EditorProps {
  onContentChange?: (content: string) => void;
}

interface EditorRef {
  getModel: () => string;
}

const FroalaEditor = forwardRef<EditorRef, EditorProps>((props, ref) => {
  const { onContentChange } = props;
  const { theme } = useDarkMode();
  const [model, setModel] = useState("");

  useImperativeHandle(ref, () => ({
    getModel: () => {
      return model;
    },
  }));

  return (
    <FroalaEditorComponent
      key={FROALA_KEY}
      config={{
        theme,
        quickInsertEnabled: false,
        language: "zh_tw",
        toolbarButtons: [
          ["bold", "italic", "underline", "fontSize", "textColor"],
          ["insertLink", "insertImage", "undo", "redo", "embedly", "html"],
        ],
        imageUploadURL: "/api/services/froala/upload",
        imageUploadMethod: "POST",
        imageMaxSize: MAX_FILE_SIZE,
        imageDefaultWidth: 0,
        imageDefaultAlign: "left",
        imageDefaultDisplay: "inline",
        imageEditButtons: [],
        imageInsertButtons: ["imageBack", "|", "imageUpload", "imageByURL"],
        attribution: false,
        linkAlwaysBlank: true,
        linkAlwaysNoFollow: true,
        htmlAllowedStyleProps: [
          "font-size",
          "color",
          "width",
          "height",
          "background-color",
        ],
        height: 500,
      }}
      onModelChange={(value: string) => {
        setModel(value);
        onContentChange && onContentChange(value);
      }}
    />
  );
});

FroalaEditor.displayName = "FroalaEditor";

export type { EditorRef };
export default FroalaEditor;
