import React, { useEffect } from "react";

import {
  BehaviorTracker,
  Domains,
  IntervalBehaviorType
} from "@parsimony/types";
import { Button, Icon, RichText } from "../../../components";
import { Container } from "typedi";
import UIApi from "../../../../domains/accessApis/uiApi/uiApi.Service";

export const IntervalBehaviorInput = ({
  program
}: {
  program: IntervalBehaviorType;
}) => {
  const API = Container.get(UIApi);

  useEffect(() => {
    API.actions.interval.init(program);
  }, []);

  if (!API.actions.interval.programIsInitialized(program)) {
    return null;
  }

  const getBehaviorTrackerState = () => {
    return API.actions.interval.getIntervalState(program.id);
  };
  const user = API.system.getItem(Domains.User, program.clientId || "");

  const openIntervalDialog = () => {
    API.system.Dialog.push({
      title: program.title as string,
      message: (
        <div>
          <p>Did {user.firstName}:</p> <p>{program.description}</p>
        </div>
      ),
      actions: [
        {
          name: "Occurred",
          action: () => API.actions.interval.onSuccess(program)
        },
        {
          name: "Did Not Occur",
          action: () => API.actions.interval.onFail(program)
        }
      ]
    });
  };

  const submitMessage = () => {
    const { occurred, total } = getBehaviorTrackerState();
    const percent = (occurred / total) * 100;
    return (
      <div>
        <p>{`Results ${Math.round(percent) || 0}`}%</p>
        <p>{`Occurred ${occurred} of ${total} times`}</p>
      </div>
    );
  };

  const { notes, showNoteEditor } = API.actions.interval.getIntervalState(
    program.id
  );
  const openEndIntervalDialog = () => {
    API.system.Dialog.push({
      title: program.title as string,
      message: submitMessage(),
      actions: [
        {
          name: "Continue",
          action: () => {
            API.system.Dialog.close();
            API.actions.interval.startInterval(program, openIntervalDialog);
          }
        },
        {
          name: "Cancel",
          action: () => API.actions.interval.resetIntervalTracking(program)
        },
        { name: "Submit", action: () => API.actions.interval.submit(program) }
      ]
    });
  };

  return (
    <div>
      <div
        className="behavior-input-container"
        key={`behavior-input-container-${program.id}`}
      >
        <div className="flex-row">
          <Button
            metaTestId={BehaviorTracker.showNoteEditor}
            name="Note"
            hidden={showNoteEditor}
            onClick={() => API.actions.interval.showNoteEditor(program)}
            icon={<Icon.Note />}
          />
          <Button
            metaTestId={BehaviorTracker.hideNoteEditor}
            name="hideNote"
            hidden={!showNoteEditor}
            onClick={() => API.actions.interval.hideNoteEditor(program)}
            icon={<Icon.Close />}
          />
          <Button
            metaTestId={BehaviorTracker.startInterval}
            name="Interval"
            onClick={() =>
              API.actions.interval.startInterval(program, openIntervalDialog)
            }
            icon={<Icon.BehaviorInterval />}
          />
          <Button
            metaTestId={BehaviorTracker.stopInterval}
            name="Interval"
            onClick={() =>
              API.actions.interval.endInterval(program, openEndIntervalDialog)
            }
            icon={<Icon.BehaviorIntervalStop />}
          />
          <p>{program.title}</p>
        </div>
      </div>
      {showNoteEditor && (
        <div>
          <RichText
            placeHolderText="Notes"
            content={notes}
            onChange={(v) => API.actions.interval.addNotes(program, v)}
            metaTestId={BehaviorTracker.noteEditor}
          />
        </div>
      )}
    </div>
  );
};
