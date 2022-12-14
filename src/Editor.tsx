/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin';
import { AutoScrollPlugin } from '@lexical/react/LexicalAutoScrollPlugin';
import { CheckListPlugin } from '@lexical/react/LexicalCheckListPlugin';
import { ClearEditorPlugin } from '@lexical/react/LexicalClearEditorPlugin';
import { HashtagPlugin } from '@lexical/react/LexicalHashtagPlugin';
import { LinkPlugin } from '@lexical/react/LexicalLinkPlugin';
import { ListPlugin } from '@lexical/react/LexicalListPlugin';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';
import React, { ReactNode, useEffect, useState } from 'react';
import { useRef } from 'react';

import { useSettings } from './playground-src/context/SettingsContext';
import { useSharedHistoryContext } from './playground-src/context/SharedHistoryContext';
import ActionsPlugin from './playground-src/plugins/ActionsPlugin';
import AutoLinkPlugin from './playground-src/plugins/AutoLinkPlugin';
import CharacterStylesPopupPlugin from './playground-src/plugins/CommentPlugin/CharacterStylesPopupPlugin';
import ClickableLinkPlugin from './playground-src/plugins/ClickableLinkPlugin';
import CodeHighlightPlugin from './playground-src/plugins/CodeHighlightPlugin';
import EmojisPlugin from './playground-src/plugins/EmojisPlugin';
import KeywordsPlugin from './playground-src/plugins/KeywordsPlugin';
import ListMaxIndentLevelPlugin from './playground-src/plugins/ListMaxIndentLevelPlugin';
import MarkdownShortcutPlugin from './playground-src/plugins/MarkdownShortcutPlugin';
import SpeechToTextPlugin from './playground-src/plugins/SpeechToTextPlugin';
import TabFocusPlugin from './playground-src/plugins/TabFocusPlugin';
import ContentEditable from './playground-src/ui/ContentEditable';
import Placeholder from './playground-src/ui/Placeholder';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import EditorContext from './context/EditorContext';
import { LexicalEditor } from 'lexical';
import { $generateHtmlFromNodes } from '@lexical/html';

interface IEditorProps {
  children?: ReactNode;
  hashtagsEnabled?: boolean;
  autoLinkEnabled?: boolean;
  emojisEnabled?: boolean;
  actionsEnabled?: boolean;
  placeholder?: string;
  listMaxIndent?: number;
  isEditable?: boolean;
  onChange?: (
    payload: any,
    editorState: string,
    editorInstance?: LexicalEditor
  ) => void;
}

const Editor = ({
  children,
  hashtagsEnabled = false,
  autoLinkEnabled = false,
  emojisEnabled = false,
  actionsEnabled = false,
  listMaxIndent = 7,
  placeholder = '',
  isEditable = true,
  onChange,
}: IEditorProps) => {
  const [editor] = useLexicalComposerContext();
  const [activeEditor, setActiveEditor] = useState(editor);

  const editorStateRef = useRef(null);
  const { historyState } = useSharedHistoryContext();
  const {
    settings: { isRichText },
  } = useSettings();
  const placeholderComponent = <Placeholder>{placeholder}</Placeholder>;
  const scrollRef = useRef(null);

  useEffect(() => {
    editor.setEditable(isEditable);
  }, []);

  return (
    <EditorContext.Provider
      value={{ initialEditor: editor, activeEditor, setActiveEditor }}
    >
      {children}
      <div className={`editor-container`} ref={scrollRef}>
        <AutoFocusPlugin />
        <ClearEditorPlugin />
        {hashtagsEnabled && <HashtagPlugin />}
        {emojisEnabled && <EmojisPlugin />}
        <KeywordsPlugin />
        <SpeechToTextPlugin />
        {autoLinkEnabled && <AutoLinkPlugin />}
        <AutoScrollPlugin scrollRef={scrollRef} />

        <>
          <RichTextPlugin
            contentEditable={<ContentEditable />}
            placeholder={placeholderComponent}
          />
          <OnChangePlugin
            onChange={(editorState, editor: any) => {
              editor.update(() => {
                let payload: any = {};

                const htmlString = $generateHtmlFromNodes(editor, null);
                payload['html'] = htmlString;
                payload['json'] = JSON.stringify(editor.getEditorState());
                onChange?.(payload, JSON.stringify(editorState), activeEditor);
              });

              return (editorStateRef.current = editorState);
            }}
          />
          <MarkdownShortcutPlugin />
          <CodeHighlightPlugin />
          <ListPlugin />
          <CheckListPlugin />
          <ListMaxIndentLevelPlugin maxDepth={listMaxIndent} />
          <LinkPlugin />
          <ClickableLinkPlugin />
          <CharacterStylesPopupPlugin />
          <TabFocusPlugin />
        </>

        <HistoryPlugin externalHistoryState={historyState} />
        {actionsEnabled && <ActionsPlugin isRichText={isRichText} />}
      </div>
    </EditorContext.Provider>
  );
};

export default Editor;
