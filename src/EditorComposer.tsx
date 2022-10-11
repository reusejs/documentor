import { LexicalComposer } from '@lexical/react/LexicalComposer';
import React, { useState } from 'react';
import PlaygroundNodes from './playground-src/nodes/PlaygroundNodes';
import PlaygroundEditorTheme from './playground-src/themes/PlaygroundEditorTheme';
import './playground-src/index_custom.css';
import { SharedAutocompleteContext } from './playground-src/context/SharedAutocompleteContext';
import { SharedHistoryContext } from './playground-src/context/SharedHistoryContext';
import Editor from './custom/CustomEditor';
import { TableContext } from './playground-src/plugins/TablePlugin';
import { LexicalEditor } from 'lexical';

interface IEditorComposer {
  initialEditorState?: string;
  onChange?: (
    payload: any,
    editorState: string,
    editorInstance?: LexicalEditor
  ) => void;
}

const EditorComposer = ({ initialEditorState, onChange }: IEditorComposer) => {
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
      <SharedHistoryContext>
        <TableContext>
          <SharedAutocompleteContext>
            <div className="editor-shell">
              <Editor onChange={onChange} />
            </div>
          </SharedAutocompleteContext>
        </TableContext>
      </SharedHistoryContext>
    </LexicalComposer>
  );
};

export default EditorComposer;
