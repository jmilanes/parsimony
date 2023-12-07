import { IOption } from "../view/components";
import { TrialChainingDirections } from "@parsimony/types/dist";
import * as process from "process";

const productionSchools = [
  "Up Academy Dorchester",
  "Parsimony Programs",
  "Design Academy"
];

const localSchools = [
  "Joey Test",
  "parsimony-local-new-school",
  "NOT A SCHOOL"
];

const schools =
  process.env.NODE_ENV === "development" ? localSchools : productionSchools;

export const schoolOptions = schools.map((x) => ({
  label: x,
  value: x
}));
