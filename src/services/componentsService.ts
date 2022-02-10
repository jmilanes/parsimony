import {
  Nav,
  Table,
  Field,
  Button,
  Container,
  Selector,
  Repeater,
  Checkbox,
  MultiSelect
} from "../components";

export enum Components {
  Nav = "Nav",
  Table = "Table",
  Field = "Field",
  Button = "Button",
  Container = "Container",
  Selector = "Selector",
  Repeater = "Repeater",
  Checkbox = "Checkbox",
  MultiSelect = "MultiSelect"
}

const ComponentsService = {
  [Components.Nav]: Nav,
  [Components.Table]: Table,
  [Components.Field]: Field,
  [Components.Button]: Button,
  [Components.Container]: Container,
  [Components.Selector]: Selector,
  [Components.Repeater]: Repeater,
  [Components.Checkbox]: Checkbox,
  [Components.MultiSelect]: MultiSelect
};

export default ComponentsService;
