import React from "react";
import StarterKit from "@tiptap/starter-kit";
import { Container, ReadOnly } from "./index";
import parse from "html-react-parser";

import { Maybe } from "@parsimony/types";

import { CONTAINER_INPUT_MARGIN } from "../../constants";
import {
  MenuButtonBold,
  MenuButtonItalic,
  MenuControlsContainer,
  MenuDivider,
  MenuSelectHeading,
  RichTextEditor
} from "mui-tiptap";

export type IRichTextProps = {
  key?: string;
  readOnly?: boolean;
  placeHolderText: string;
  onChange: (value: string) => void;
  metaTestId: string;
  content?: Maybe<string>;
};

export const RichText = ({
  readOnly,
  onChange,
  placeHolderText,
  key,
  metaTestId,
  content = ""
}: IRichTextProps) => {
  return readOnly ? (
    <div className="richTextContainer" key={key}>
      <ReadOnly
        metaTestId={metaTestId}
        value={parse(content || "") as string}
        title={placeHolderText}
      />
    </div>
  ) : (
    <div data-testid={metaTestId}>
      <Container
        flexDirection="column"
        key={key}
        margin={CONTAINER_INPUT_MARGIN}
      >
        <p>{placeHolderText}:</p>
        <RichTextEditor
          extensions={[StarterKit]}
          content={content || ""} // Initial content for the editor
          // Optionally include `renderControls` for a menu-bar atop the editor:
          onUpdate={(v) => {
            onChange(v.editor.getHTML());
          }}
          renderControls={() => (
            <MenuControlsContainer>
              <MenuSelectHeading />
              <MenuDivider />
              <MenuButtonBold />
              <MenuButtonItalic />
              {/* Add more controls of your choosing here */}
            </MenuControlsContainer>
          )}
        />
      </Container>
    </div>
  );
};
