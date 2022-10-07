import { LexicalComposer } from '@lexical/react/LexicalComposer';
import React, { useState } from 'react';
import PlaygroundNodes from './playground-src/nodes/PlaygroundNodes';
import PlaygroundEditorTheme from './playground-src/themes/PlaygroundEditorTheme';
import './EditorComposer.css';

interface IEditorComposer {
  children: React.ReactElement;
  initialEditorState?: string;
}

const EditorComposer = ({ children, initialEditorState }: IEditorComposer) => {
  const initialConfig = {
    namespace: 'ReuseJSDocumentorEditor',
    nodes: [...PlaygroundNodes],
    onError: (error) => {
      throw error;
    },
    theme: PlaygroundEditorTheme,
    editorState: initialEditorState,
  };
  return (
    <LexicalComposer initialConfig={initialConfig}>
      <div className="editor-shell">{children}</div>
    </LexicalComposer>
  );
};

export default EditorComposer;
