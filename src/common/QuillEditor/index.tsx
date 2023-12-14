import { useState } from "react";
import ReactQuill from "react-quill";
// import ImageResize  from 'quill-image-resize-module';
import "react-quill/dist/quill.snow.css";
import CustomToolbar from "./CustomToolbar";
import { Text } from "@mantine/core";

// Quill.register('modules/ImageResize',ImageResize);
const QuillEditor = ({
  onChangeValue,
  setValue,
  toolbarId,
}: QuillEditorType) => {
  const [text, setText] = useState("");

  const handleChange = (html: any) => {
    setText(html);
    onChangeValue(html);
    setValue(html);
  };
  const modules = {
    toolbar: {
      container: "#" + toolbarId,
    },
  };
  const formats = [
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "color",
    "background",
    "script",
    "header",
    "blockquote",
    "code-block",
    "indent",
    "list",
    "direction",
    "align",
    "link",
    "image",
    "video",
    "formula",
  ];

  return (
    <>
      <Text fw={500}>Mô tả :</Text>
      <CustomToolbar id={toolbarId} />
      <ReactQuill
        value={text}
        onChange={handleChange}
        modules={modules}
        formats={formats}
      />
    </>
  );
};

type QuillEditorType = {
  onChangeValue: (html: string) => void;
  setValue: (value: any) => void;
  toolbarId: string;
};

export default QuillEditor;
