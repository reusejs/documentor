# Documentor

Documentor - Flexible Text Editor for React

**Documentor** is a fully flexible rich text editor based on [`lexical-playground`](https://github.com/facebook/lexical/tree/main/packages/lexical-playground) and [`lexical`](https://github.com/facebook/lexical) framework.

**⚠️ As the Lexical framework is currently in early development, this component library is also likely to change quite often**

## Installation

```
npm install @reusejs/documentor --save
```

## Demo

Live demo is coming soon...

## Usage

```js
import { FC } from 'react';
import {
  EditorComposer,
  Editor,
  ToolbarPlugin,
  AlignDropdown,
  BackgroundColorPicker,
  BoldButton,
  CodeFormatButton,
  FloatingLinkEditor,
  FontFamilyDropdown,
  FontSizeDropdown,
  InsertDropdown,
  InsertLinkButton,
  ItalicButton,
  TextColorPicker,
  TextFormatDropdown,
  UnderlineButton,
  Divider,
} from '@reusejs/documentor';

const NoteViewer: FC = () => {
  return (
    <EditorComposer>
      <Editor hashtagsEnabled={true}>
        <ToolbarPlugin defaultFontSize="20px">
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
          <InsertDropdown enablePoll={true} />
          <Divider />
          <AlignDropdown />
        </ToolbarPlugin>
      </Editor>
    </EditorComposer>
  );
};

export default NoteViewer;
```

<!-- ## Examples

Coming soon... -->

<!--
## Styling components

Coming soon... -->

## API

`<Editor />`

| Property           | Type                                                            |          | description                                                                        |
| ------------------ | --------------------------------------------------------------- | -------- | ---------------------------------------------------------------------------------- |
| children           | `ReactNode`                                                     | optional | Nested child components, like the `ToolbarPlugin`                                  |
| hashtagsEnabled    | `boolean`                                                       | optional | Enables the automatic hashtag highlighting, default is `false`                     |
| autoLinkEnabled    | `boolean`                                                       | optional | Enables the automatic link highlighting, default is `false`                        |
| emojisEnabled      | `boolean`                                                       | optional | Replaces the emoji combiniations with its corresponding symbol, default is `false` |
| actionsEnabled     | `boolean`                                                       | optional | Enables the actions toolbar, default is `false`                                    |
| placeholder        | `string`                                                        | optional | The default content of the editor when it is first loaded                          |
| listMaxIndent      | `number`                                                        | optional | The maximum indent capacity of any listed element, the default is `7`              |
| isReadOnly         | `boolean`                                                       | optional | Enables read-only mode for the editor, default is `false`                          |
| initialEditorState | `string`                                                        | optional | JSON string to initialize the initial content of the editor.                       |
| onChange           | `(editorState: string, editorInstance?: LexicalEditor) => void` | optional | Accessing the current editor state and the active editor instance                  |

<br />

`<ToolbarPlugin />`

| Property          | Type                   |          | description                                                                                      |
| ----------------- | ---------------------- | -------- | ------------------------------------------------------------------------------------------------ |
| children          | `React.ReactElement[]` | optional | Nested child components, like the `InsertDropdown`                                               |
| defaultFontSize   | `string`               | optional | The default font size selected when the editor first loaded, default value is `15px`             |
| defaultFontColor  | `string`               | optional | The default font color selected when the editor first loaded, default value is `#000`            |
| defaultBgColor    | `string`               | optional | The default text background color selected when the editor first loaded, default value is `#fff` |
| defaultFontFamily | `string`               | optional | The default font family selected when the editor first loaded, default value is `Arial`          |

<br />

  <!-- enableTable?: boolean;
  enableYoutube?: boolean;
  enableTwitter?: boolean;
  enablePoll?: boolean;
  enableImage?: boolean;
  enableEquations?: boolean;
  enableExcalidraw?: boolean;
  enableHorizontalRule?: boolean;
  enableStickyNote?: boolean; -->

`<InsertDropdown />`

| Property             | Type      |          | description                                      |
| -------------------- | --------- | -------- | ------------------------------------------------ |
| enableTable          | `boolean` | optional | Enables table inserting feature                  |
| enableYoutube        | `boolean` | optional | Enables youtube video inserting feature          |
| enableTwitter        | `boolean` | optional | Enables tweet inserting feature                  |
| enablePoll           | `boolean` | optional | Enables poll inserting feature                   |
| enableImage          | `boolean` | optional | Enables image inserting feature                  |
| enableEquations      | `boolean` | optional | Enables equation inserting feature               |
| enableExcalidraw     | `boolean` | optional | Enables diagram inserting feature                |
| enableHorizontalRule | `boolean` | optional | Enables the horizontal rule inserting for layout |
| enableStickyNote     | `boolean` | optional | Enables stick note inserting for layout          |

## Development

For development use:

```
$ npm install (in case of an error, run `npm install --legacy-peer-deps`)
$ npm start
$ npm run storybook
```

## Future plans

- Test coverage
- Programmatic access to the editor input as JSON
- Localization
- Ready templates with different options (MUI, Bootstrap, etc...)
- Dark/Light modes
- Custom styling flexibility
- Disassembling all of the toolbar to enable using them as nested components, increasing the flexibility
- Enabling adjusting editor settings such read-only mode and etc. programmatically

## License

Licensed under MIT License.
