"use client";

import { type FC, useEffect } from "react";
import { useIsMounted } from "@/hooks";
import "froala-editor/css/froala_style.min.css";
import "froala-editor/css/froala_editor.pkgd.min.css";
// @ts-ignore
import FE from "froala-editor";

const SPECIAL_TAGS = ["img", "button", "input", "a"];
const INNER_HTML_ATTR = "innerHTML";

interface Props {
  tag?: string;
  config?: object;
  model?: string | object | null;
  onModelChange?: object;
  onManualControllerReady?: object;
  skipReset?: boolean | false;
}

const FroalaEditor: FC<Props> = (props) => {
  const {
    tag = "div",
    config,
    model,
    onModelChange,
    onManualControllerReady,
    skipReset,
  } = props;
  const isMounted = useIsMounted();

  useEffect(() => {
    if (isMounted) {
      const tagName = tag.toLowerCase();
      if (SPECIAL_TAGS.indexOf(tagName) !== -1) {
      }
    }
  }, [isMounted]);

  return <></>;
};

export default FroalaEditor;
