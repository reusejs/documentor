import React, { useState } from 'react';
import { EditorComposer, Editor, Divider } from '../src';
import ToolbarPlugin from '../src/plugins/ToolbarPlugin/ToolbarPlugin';

import {
  AlignDropdown,
  BackgroundColorPicker,
  BlockFormatDropdown,
  BoldButton,
  CodeFormatButton,
  CodeLanguageDropdown,
  FloatingLinkEditor,
  FontFamilyDropdown,
  FontSizeDropdown,
  InsertDropdown,
  InsertLinkButton,
  ItalicButton,
  RedoButton,
  TextColorPicker,
  TextFormatDropdown,
  UnderlineButton,
  UndoButton,
} from '../src/plugins/ToolbarPlugin/components';

export default {
  title: 'Minimal',
};

export const FullEditor = () => {
  const [content, setContent] = useState<any>({});

  function createMarkup() {
    if (content.html) {
      return { __html: content.html };
    } else {
      return { __html: '' };
    }
  }

  return (
    <div>
      <EditorComposer
        initialEditorState={
          '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Rajiv Seelam","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"heading","version":1,"tag":"h1"}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}'
        }
      >
        <Editor
          onChange={(payload: any) => {
            setContent(payload);
            console.log('onChange', JSON.stringify(payload));
          }}
        >
          <ToolbarPlugin defaultFontFamily="Verdana">
            <BoldButton />
            <ItalicButton />
            <UnderlineButton />
            <InsertLinkButton />
            <TextColorPicker />
            <BackgroundColorPicker />
            <Divider />
            <InsertDropdown />
          </ToolbarPlugin>
        </Editor>
      </EditorComposer>
      <div
        style={{
          background: 'yellow',
          padding: '10px',
        }}
      >
        <div dangerouslySetInnerHTML={createMarkup()} />
      </div>
    </div>
  );
};
