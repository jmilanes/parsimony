import React, { useEffect } from "react";

import {
  BehaviorMetaTestIds,
  BehaviorTracker,
  Program
} from "@parsimony/types";
import { Button, Icon, RichText } from "../../../components";
import { Container } from "typedi";
import UIApi from "../../../../domains/accessApis/uiApi/uiApi.Service";

export const TallyBehaviorInput = ({ program }: { program: Program }) => {
  const API = Container.get(UIApi);
  useEffect(() => {
    API.actions.tally.init(program);
  }, []);

  const count = API.actions.tally.getCounter(program)?.count;
  const showEditor = API.actions.tally.getCounter(program)?.showNoteEditor;
  const notes = API.actions.tally.getCounter(program)?.notes;
  const safeCount = count === undefined ? -1 : count;

  return (
    <div>
      <div className="behavior-input-container" key={program.id}>
        <div className="flex-row">
          <div>
            <Button
              metaTestId={BehaviorTracker.showNoteEditor}
              name="Note"
              hidden={showEditor}
              onClick={() => API.actions.tally.showNoteEditor(program)}
              icon={<Icon.Note />}
            />
            <Button
              metaTestId={BehaviorTracker.hideNoteEditor}
              name="hideNote"
              hidden={!showEditor}
              onClick={() => API.actions.tally.hideNoteEditor(program)}
              icon={<Icon.Close />}
            />
            <Button
              metaTestId={BehaviorTracker.tallyBtn}
              name="Tally"
              onClick={() => API.actions.tally.decrement(program)}
              icon={<Icon.BehaviorTallyRemove />}
            />
            <Button
              metaTestId={BehaviorTracker.tallyBtn}
              name="Frequency"
              onClick={() => API.actions.tally.increment(program)}
              icon={<Icon.BehaviorTallyAdd />}
            />
          </div>
          <p>{program.title}</p>
        </div>
        {safeCount >= 0 && (
          <div className="count-container">
            <p className="tally-count">{count}</p>
            <Button
              metaTestId={BehaviorTracker.tallyBtn}
              name="Submit"
              onClick={() => API.actions.tally.submit(program, count)}
            />
          </div>
        )}
      </div>
      {showEditor && (
        <div>
          <RichText
            placeHolderText="Notes"
            content={notes}
            onChange={(v) => API.actions.tally.addNotes(program, v)}
            metaTestId={BehaviorTracker.noteEditor}
          />
        </div>
      )}
    </div>
  );
};
