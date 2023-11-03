import React from "react";
import StarterKit from "@tiptap/starter-kit";
import { Container, ReadOnly } from "./index";
import parse from "html-react-parser";

import { MetaTestIds, Maybe, UIMetaTargetTypes } from "@parsimony/types/dist";
import { generateMetaTestId } from "../../utils";
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
  pathToState: string;
  placeHolderText: string;
  //TODO: This should prob be better
  updateState: (path: string, value: string) => void;
  metaTestId: MetaTestIds;
  metaTestQualifier?: string;
  content?: Maybe<string>;
};

export const RichText = ({
  readOnly,
  updateState,
  pathToState,
  placeHolderText,
  key,
  metaTestId,
  metaTestQualifier,
  content = ""
}: IRichTextProps) => {
  const metaId = generateMetaTestId(
    UIMetaTargetTypes.Field,
    metaTestId,
    metaTestQualifier
  );
  return readOnly ? (
    <div key={key}>
      <p>{placeHolderText}</p>
      {parse(content || "")}
    </div>
  ) : (
    <Container flexDirection="column" key={key} margin={CONTAINER_INPUT_MARGIN}>
      <p>{placeHolderText}:</p>
      <RichTextEditor
        extensions={[StarterKit]}
        content={content} // Initial content for the editor
        // Optionally include `renderControls` for a menu-bar atop the editor:
        onUpdate={(v) => {
          updateState(pathToState, v.editor.getHTML());
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
  );
};
