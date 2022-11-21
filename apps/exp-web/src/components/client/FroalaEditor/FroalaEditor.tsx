"use client";

import { type FC } from "react";
import "froala-editor/css/froala_style.min.css";
import "froala-editor/css/froala_editor.pkgd.min.css";
import dynamic from "next/dynamic";

const FroalaEditorComponent = dynamic(
  async () => {
    const values = await Promise.all([import("react-froala-wysiwyg")]);
    return values[0];
  },
  {
    loading: () => null,
    ssr: false,
  }
);

const FroalaEditor: FC = () => {
  return (
    <>
      <FroalaEditorComponent
        tag="textarea"
        config={{
          placeholderText: "Edit Your Content Here!",
          charCounterCount: false,
        }}
      />
    </>
  );
};

export default FroalaEditor;
