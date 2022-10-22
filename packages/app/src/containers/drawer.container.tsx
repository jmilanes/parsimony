import React, { useState } from "react";
import { Drawer } from "antd";

import { useServices } from "../context";
import { Collections } from "@parsimony/types/src";

const PDrawer = ({ content }: { content?: React.FC }) => {
  const [extended, updateExtended] = useState(false);
  const { appControls, store } = useServices();

  const controls = store.getCollectionValue(Collections.AppControls).drawer;

  if (!controls) return null;

  const onClose = () => {
    appControls.updateControls({
      drawer: {
        ...controls,
        active: false
      }
    });
  };

  const onExtend = () => {
    appControls.updateControls({
      drawer: {
        ...controls,
        width: extended ? 500 : 1000
      }
    });
    updateExtended(!extended);
  };

  return (
    <Drawer
      placement={controls.placement || "left"}
      width={controls.width || "500"}
      onClose={onClose}
      open={controls.active}
    >
      <button onClick={onExtend}>{extended ? "collapse" : "extend"}</button>
      <h1>H1</h1>
    </Drawer>
  );
};

export default PDrawer;
