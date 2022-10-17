/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin';
import { AutoScrollPlugin } from '@lexical/react/LexicalAutoScrollPlugin';
import { CharacterLimitPlugin } from '@lexical/react/LexicalCharacterLimitPlugin';
import { CheckListPlugin } from '@lexical/react/LexicalCheckListPlugin';
import { ClearEditorPlugin } from '@lexical/react/LexicalClearEditorPlugin';
import { CollaborationPlugin } from '@lexical/react/LexicalCollaborationPlugin';
import { HashtagPlugin } from '@lexical/react/LexicalHashtagPlugin';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { LinkPlugin } from '@lexical/react/LexicalLinkPlugin';
import { ListPlugin } from '@lexical/react/LexicalListPlugin';
import { PlainTextPlugin } from '@lexical/react/LexicalPlainTextPlugin';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { TablePlugin } from '@lexical/react/LexicalTablePlugin';
import * as React from 'react';
import { useRef, useState } from 'react';
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';

import { createWebsocketProvider } from '../playground-src/collaboration';
import { useSettings } from '../playground-src/context/SettingsContext';
import { useSharedHistoryContext } from '../playground-src/context/SharedHistoryContext';
import TableCellNodes from '../playground-src/nodes/TableCellNodes';
import ActionsPlugin from '../playground-src/plugins/ActionsPlugin';
import AutocompletePlugin from '../playground-src/plugins/AutocompletePlugin';
import AutoEmbedPlugin from '../playground-src/plugins/AutoEmbedPlugin';
import AutoLinkPlugin from '../playground-src/plugins/AutoLinkPlugin';
import ClickableLinkPlugin from '../playground-src/plugins/ClickableLinkPlugin';
import CodeActionMenuPlugin from '../playground-src/plugins/CodeActionMenuPlugin';
import CodeHighlightPlugin from '../playground-src/plugins/CodeHighlightPlugin';
import CollapsiblePlugin from '../playground-src/plugins/CollapsiblePlugin';
import CommentPlugin from '../playground-src/plugins/CommentPlugin';
import ComponentPickerPlugin from '../playground-src/plugins/ComponentPickerPlugin';
import DraggableBlockPlugin from '../playground-src/plugins/DraggableBlockPlugin';
import EmojiPickerPlugin from '../playground-src/plugins/EmojiPickerPlugin';
import EmojisPlugin from '../playground-src/plugins/EmojisPlugin';
import EquationsPlugin from '../playground-src/plugins/EquationsPlugin';
import ExcalidrawPlugin from '../playground-src/plugins/ExcalidrawPlugin';
import FigmaPlugin from '../playground-src/plugins/FigmaPlugin';
import FloatingLinkEditorPlugin from '../playground-src/plugins/FloatingLinkEditorPlugin';
import FloatingTextFormatToolbarPlugin from '../playground-src/plugins/FloatingTextFormatToolbarPlugin';
import HorizontalRulePlugin from '../playground-src/plugins/HorizontalRulePlugin';
import ImagesPlugin from '../playground-src/plugins/ImagesPlugin';
import KeywordsPlugin from '../playground-src/plugins/KeywordsPlugin';
import ListMaxIndentLevelPlugin from '../playground-src/plugins/ListMaxIndentLevelPlugin';
import MarkdownShortcutPlugin from '../playground-src/plugins/MarkdownShortcutPlugin';
import { MaxLengthPlugin } from '../playground-src/plugins/MaxLengthPlugin';
import MentionsPlugin from '../playground-src/plugins/MentionsPlugin';
import PollPlugin from '../playground-src/plugins/PollPlugin';
import SpeechToTextPlugin from '../playground-src/plugins/SpeechToTextPlugin';
import TabFocusPlugin from '../playground-src/plugins/TabFocusPlugin';
import TableCellActionMenuPlugin from '../playground-src/plugins/TableActionMenuPlugin';
import TableCellResizer from '../playground-src/plugins/TableCellResizer';
import TableOfContentsPlugin from '../playground-src/plugins/TableOfContentsPlugin';
import { TablePlugin as NewTablePlugin } from '../playground-src/plugins/TablePlugin';
import ToolbarPlugin from './plugins/CustomToolbarPlugin';
import TreeViewPlugin from '../playground-src/plugins/TreeViewPlugin';
import TwitterPlugin from '../playground-src/plugins/TwitterPlugin';
import YouTubePlugin from '../playground-src/plugins/YouTubePlugin';
import PlaygroundEditorTheme from '../playground-src/themes/PlaygroundEditorTheme';
import ContentEditable from '../playground-src/ui/ContentEditable';
import Placeholder from '../playground-src/ui/Placeholder';
import { LexicalEditor, EditorState } from 'lexical';
import { $generateHtmlFromNodes } from '@lexical/html';
import { useDebouncedCallback } from 'use-debounce';
import { $getRoot } from 'lexical';

function useDebouncedLexicalOnChange<T>(
  getEditorState: (editorState: EditorState, editor: LexicalEditor) => T,
  callback: (value: T) => void,
  delay: number
) {
  const lastPayloadRef = React.useRef<T | null>(null);
  const callbackRef = React.useRef<(arg: T) => void | null>(callback);
  React.useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);
  const callCallbackWithLastPayload = React.useCallback(() => {
    if (lastPayloadRef.current) {
      callbackRef.current?.(lastPayloadRef.current);
    }
  }, []);
  const call = useDebouncedCallback(callCallbackWithLastPayload, delay);
  const onChange = React.useCallback(
    (editorState, editor) => {
      editorState.read(() => {
        lastPayloadRef.current = getEditorState(editorState, editor);
        call();
      });
    },
    [call, getEditorState]
  );
  return onChange;
}

const skipCollaborationInit =
  // @ts-ignore
  window.parent != null && window.parent.frames.right === window;

interface IEditorProps {
  isCollab?: boolean;
  isAutocomplete?: boolean;
  isMaxLength?: boolean;
  isCharLimit?: boolean;
  isCharLimitUtf8?: boolean;
  isRichText?: boolean;
  showTreeView?: boolean;
  showTableOfContents?: boolean;
  showActions?: boolean;
  enableComments?: boolean;
  floatingFormatter?: boolean;
  onChange?: (payload: any) => void;
}

const getEditorState = (editorState: EditorState, editor: LexicalEditor) => ({
  text: $getRoot().getTextContent(),
  html: $generateHtmlFromNodes(editor, null),
  json: JSON.stringify(editorState),
});

export default function Editor({
  isCollab = false,
  isAutocomplete = false,
  isMaxLength = false,
  isCharLimit = false,
  isCharLimitUtf8 = false,
  isRichText = true,
  showTreeView = false,
  showTableOfContents = false,
  showActions = false,
  enableComments = false,
  floatingFormatter = false,
  onChange,
}: IEditorProps): JSX.Element {
  const { historyState } = useSharedHistoryContext();
  const text = isCollab
    ? 'Enter some collaborative rich text...'
    : isRichText
    ? 'Enter some rich text...'
    : 'Enter some plain text...';
  const placeholder = <Placeholder>{text}</Placeholder>;
  const scrollRef = useRef(null);
  const [floatingAnchorElem, setFloatingAnchorElem] =
    useState<HTMLDivElement | null>(null);

  const onRef = (_floatingAnchorElem: HTMLDivElement) => {
    if (_floatingAnchorElem !== null) {
      setFloatingAnchorElem(_floatingAnchorElem);
    }
  };

  const cellEditorConfig = {
    namespace: 'Playground',
    nodes: [...TableCellNodes],
    onError: (error: Error) => {
      throw error;
    },
    theme: PlaygroundEditorTheme,
  };

  const debouncedOnChange = React.useCallback((value) => {
    // console.log(new Date(), value);
    onChange?.(value);
    // TODO: send to server
  }, []);

  const onInternalChange = useDebouncedLexicalOnChange(
    getEditorState,
    debouncedOnChange,
    1000
  );

  return (
    <>
      {isRichText && <ToolbarPlugin />}
      <div
        className={`editor-container ${showTreeView ? 'tree-view' : ''} ${
          !isRichText ? 'plain-text' : ''
        }`}
        ref={scrollRef}
      >
        {isMaxLength && <MaxLengthPlugin maxLength={30} />}
        <AutoFocusPlugin />
        <ClearEditorPlugin />
        <ComponentPickerPlugin />
        <EmojiPickerPlugin />
        <AutoEmbedPlugin />
        <MentionsPlugin />
        <EmojisPlugin />
        <HashtagPlugin />
        <KeywordsPlugin />
        <SpeechToTextPlugin />
        <AutoLinkPlugin />
        <AutoScrollPlugin scrollRef={scrollRef} />
        {enableComments && (
          <CommentPlugin
            providerFactory={isCollab ? createWebsocketProvider : undefined}
          />
        )}
        {isRichText ? (
          <>
            {isCollab ? (
              <CollaborationPlugin
                id="main"
                providerFactory={createWebsocketProvider}
                shouldBootstrap={!skipCollaborationInit}
              />
            ) : (
              <HistoryPlugin externalHistoryState={historyState} />
            )}
            <RichTextPlugin
              contentEditable={
                <div className="editor-scroller">
                  <div className="editor" ref={onRef}>
                    <ContentEditable />
                  </div>
                </div>
              }
              placeholder={placeholder}
            />
            <OnChangePlugin
              onChange={onInternalChange}
              // onChange={(editorState, editor: any) => {
              //   // editor.update(() => {
              //   //   let payload: any = {};
              //   //   console.log('editor updated');
              //   //   // const htmlString = $generateHtmlFromNodes(editor, null);
              //   //   // payload['html'] = htmlString;
              //   //   // payload['json'] = JSON.stringify(editor.getEditorState());
              //   //   // onChange?.(payload, JSON.stringify(editorState), editor);
              //   // });
              // }}
            />

            <MarkdownShortcutPlugin />
            <CodeHighlightPlugin />
            <ListPlugin />
            <CheckListPlugin />
            <ListMaxIndentLevelPlugin maxDepth={7} />
            <TablePlugin />
            <TableCellResizer />
            <NewTablePlugin cellEditorConfig={cellEditorConfig}>
              <AutoFocusPlugin />
              <RichTextPlugin
                contentEditable={
                  <ContentEditable className="TableNode__contentEditable" />
                }
                placeholder={''}
              />
              <MentionsPlugin />
              <HistoryPlugin />
              <ImagesPlugin />
              <LinkPlugin />
              <ClickableLinkPlugin />
              <FloatingTextFormatToolbarPlugin />
            </NewTablePlugin>
            <ImagesPlugin />
            <LinkPlugin />
            <PollPlugin />
            <TwitterPlugin />
            <YouTubePlugin />
            <FigmaPlugin />
            <ClickableLinkPlugin />
            <HorizontalRulePlugin />
            <EquationsPlugin />
            <ExcalidrawPlugin />
            <TabFocusPlugin />
            <CollapsiblePlugin />
            {floatingAnchorElem && (
              <>
                <TableCellActionMenuPlugin anchorElem={floatingAnchorElem} />
                <FloatingLinkEditorPlugin anchorElem={floatingAnchorElem} />
              </>
            )}

            {floatingFormatter && floatingAnchorElem && (
              <>
                <DraggableBlockPlugin anchorElem={floatingAnchorElem} />
                <CodeActionMenuPlugin anchorElem={floatingAnchorElem} />
                <FloatingTextFormatToolbarPlugin
                  anchorElem={floatingAnchorElem}
                />
              </>
            )}
          </>
        ) : (
          <>
            <PlainTextPlugin
              contentEditable={<ContentEditable />}
              placeholder={placeholder}
            />
            <HistoryPlugin externalHistoryState={historyState} />
          </>
        )}
        {(isCharLimit || isCharLimitUtf8) && (
          <CharacterLimitPlugin charset={isCharLimit ? 'UTF-16' : 'UTF-8'} />
        )}
        {isAutocomplete && <AutocompletePlugin />}
        <div>{showTableOfContents && <TableOfContentsPlugin />}</div>
        <div className="toc">
          {showTableOfContents && <TableOfContentsPlugin />}
        </div>
        {showActions && <ActionsPlugin isRichText={isRichText} />}
      </div>
      {showTreeView && <TreeViewPlugin />}
    </>
  );
}
