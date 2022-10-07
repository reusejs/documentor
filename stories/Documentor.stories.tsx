import React from 'react';
import { EditorComposer, Editor, Divider } from '../src';
import ToolbarPlugin from '../src/playground-src/plugins/ToolbarPlugin/ToolbarPlugin';

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
} from '../src/playground-src/plugins/ToolbarPlugin/components';

export default {
  title: 'Documentor',
};

export const FullEditor = () => (
  <EditorComposer>
    <Editor>
      <ToolbarPlugin>
        <FontFamilyDropdown />
        <FontSizeDropdown />
        <Divider />
        <BoldButton />
        <ItalicButton />
        <UnderlineButton />
        <CodeFormatButton />
        <InsertLinkButton />
        <TextColorPicker />
        <BackgroundColorPicker />
        <TextFormatDropdown />
        <Divider />
        <InsertDropdown />
        <Divider />
        <AlignDropdown />
      </ToolbarPlugin>
    </Editor>
  </EditorComposer>
);
