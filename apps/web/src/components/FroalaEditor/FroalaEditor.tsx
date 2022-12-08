import { type FC, useState } from "react";
import "froala-editor/css/froala_style.min.css";
import "froala-editor/css/froala_editor.pkgd.min.css";
import dynamic from "next/dynamic";
import { FROALA_KEY } from "@/shared/constants";
import { useDarkMode } from "@/hooks";
import { MAX_FILE_SIZE } from "@wanin/shared/utils";

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
    loading: () => <h1>Loading...</h1>,
    ssr: false,
  }
);

const FroalaEditor: FC = () => {
  const { theme } = useDarkMode();
  const [model, setModel] = useState("");

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
      onModelChange={setModel}
    />
  );
};

export default FroalaEditor;
