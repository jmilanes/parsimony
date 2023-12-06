import React, { useEffect } from "react";

import { BehaviorTracker, Domains, Program } from "@parsimony/types";
import { Button, Icon, RichText } from "../../../components";
import { Container } from "typedi";
import UIApi from "../../../../domains/accessApis/uiApi/uiApi.Service";
import { TimerSubmitDialogMessage } from "../dialogMessages/timer.dialog.message";

export const TimeBehaviorInput = ({ program }: { program: Program }) => {
  const API = Container.get(UIApi);
  useEffect(() => {
    API.actions.timer.init(program);
  }, []);

  if (!API.actions.timer.programIsInitialized(program)) {
    return null;
  }

  const { showNoteEditor, notes } = API.actions.timer.getTimerState(program.id);

  return (
    <div>
      <div className="behavior-input-container" key={program.id}>
        <div className="flex-row">
          <Button
            metaTestId={BehaviorTracker.showNoteEditor}
            name="Note"
            hidden={showNoteEditor}
            onClick={() => API.actions.timer.showNoteEditor(program)}
            icon={<Icon.Note />}
          />
          <Button
            metaTestId={BehaviorTracker.hideNoteEditor}
            name="hideNote"
            hidden={!showNoteEditor}
            onClick={() => API.actions.timer.hideNoteEditor(program)}
            icon={<Icon.Close />}
          />
          <Button
            metaTestId={BehaviorTracker.startTimer}
            name="Start Timer"
            onClick={() => API.actions.timer.start(program)}
            icon={<Icon.BehaviorTime />}
          />
          <Button
            metaTestId={BehaviorTracker.stopTime}
            name="Stop Duration"
            onClick={() =>
              API.actions.timer.complete(
                program,
                <TimerSubmitDialogMessage program={program} />
              )
            }
            icon={<Icon.BehaviorIntervalStop />}
          />
          <p>{program.title}</p>
        </div>
        <p>{API.actions.timer.getFormattedTimerTime(program)}</p>
      </div>
      {showNoteEditor && (
        <div>
          <RichText
            placeHolderText="Notes"
            content={notes}
            onChange={(v) => API.actions.timer.addNotes(program, v)}
            metaTestId={BehaviorTracker.noteEditor}
          />
        </div>
      )}
    </div>
  );
};
