import React from 'react';
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

export const FullEditor = () => (
  <EditorComposer
    initialEditorState={
      '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Rajiv Seelam","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"heading","version":1,"tag":"h1"}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}'
    }
  >
    <Editor
      onChange={(payload: any) => {
        console.log('onChange', payload);
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
);
