import {
  Nav,
  Table,
  Field,
  Button,
  Container,
  Selector,
  Repeater
} from "../components";

export enum Components {
  Nav = "Nav",
  Table = "Table",
  Field = "Field",
  Button = "Button",
  Container = "Contianer",
  Selector = "Selector",
  Repater = "Repeater"
}

const ComponentsService = {
  [Components.Nav]: Nav,
  [Components.Table]: Table,
  [Components.Field]: Field,
  [Components.Button]: Button,
  [Components.Container]: Container,
  [Components.Selector]: Selector,
  [Components.Repater]: Repeater
};

export default ComponentsService;
