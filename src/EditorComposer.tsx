import { LexicalComposer } from '@lexical/react/LexicalComposer';
import React, { useState } from 'react';
import PlaygroundNodes from './playground-src/nodes/PlaygroundNodes';
import PlaygroundEditorTheme from './playground-src/themes/PlaygroundEditorTheme';
import './playground-src/index.css';
import { SharedAutocompleteContext } from './playground-src/context/SharedAutocompleteContext';
import { SharedHistoryContext } from './playground-src/context/SharedHistoryContext';
import Editor from './playground-src/Documentor';
import { TableContext } from './playground-src/plugins/TablePlugin';

interface IEditorComposer {
  initialEditorState?: string;
}

const EditorComposer = ({ initialEditorState }: IEditorComposer) => {
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
              <Editor
                onChange={(payload: any) => {
                  console.log('onChange..', JSON.stringify(payload));
                }}
              />
            </div>
          </SharedAutocompleteContext>
        </TableContext>
      </SharedHistoryContext>
    </LexicalComposer>
  );
};

export default EditorComposer;
