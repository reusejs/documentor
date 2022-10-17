import React, { useState } from 'react';
import { EditorComposer } from '../src';

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
          '{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Rajiv Seelam","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}'
        }
        onChange={(payload: any) => {
          setContent(payload);
          // console.log('onChange - ', JSON.stringify(payload));
        }}
      ></EditorComposer>
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
