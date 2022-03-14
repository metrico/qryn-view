// Import React dependencies.
import styled from "@emotion/styled";
import React, { useState } from "react";
// Import the Slate editor factory.
import { createEditor } from "slate";

// Import the Slate components and React plugin.
import { Slate, Editable, withReact } from "slate-react";

import Prism from 'prismjs';


const CustomEditor = styled(Editable)`
  flex: 1;
  background: #121212;
  color: orange;
  padding: 4px 8px;
  font-size: 1em;
  font-family: monospace;
  margin: 3px;
  border-radius: 3px;
  line-height: 1.25;
`;

export default function QueryEditor({ onQueryChange, value, onKeyDown }) {
  // Create a Slate editor object that won't change across renders.
  const [editor] = useState(() => withReact(createEditor()));
  // Keep track of state for the value of the editor.


  return (
    <Slate
      editor={editor}
      value={value}
      onChange={onQueryChange}
      onKeyDown={onKeyDown}
    >
      <CustomEditor
      placeholder="Enter a cLoki Query"
      spellCheck="false"
      />
    </Slate>
  );
}
