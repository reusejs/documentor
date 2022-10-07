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
  <EditorComposer>
    <Editor
      onChange={(payload: any) => {
        console.log('onChange', payload);
      }}
    >
      <ToolbarPlugin>
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
