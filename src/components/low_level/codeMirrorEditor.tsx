import React, { useEffect, useRef } from "react";
import { basicSetup } from "@codemirror/basic-setup";
import { EditorView } from "@codemirror/view";

interface CodeMirrorEditorProps {
  value?: string;
  onChange?: (val: string) => void;
}

const CodeMirrorEditor: React.FC<CodeMirrorEditorProps> = ({ value, onChange }) => {
  const editor = useRef<HTMLDivElement | null>(null);
  const view = useRef<EditorView | null>(null);
  const onChangeRef = useRef(onChange);

  useEffect(() => {
    onChangeRef.current = onChange;
  }, [onChange]);

  useEffect(() => {
    if (!editor.current || view.current) return;
    view.current = new EditorView({
      parent: editor.current,
      extensions: [basicSetup], // this will now work!
    });
    return () => view.current?.destroy();
  }, []);

  useEffect(() => {
    if (view.current && value !== undefined) {
      const currentValue = view.current.state.doc.toString();
      if (value !== currentValue) {
        view.current.dispatch({
          changes: { from: 0, to: currentValue.length, insert: value }
        });
      }
    }
  }, [value]);

  // Add editor height inline style (or use a CSS class)
  return <div ref={editor} style={{ height: "300px", border: "1px solid #ddd" }} />;
};

export default CodeMirrorEditor;