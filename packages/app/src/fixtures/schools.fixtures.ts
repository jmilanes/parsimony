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

const mockSchools = ["mockSchool"];

let schools = productionSchools;
// TODO: Lets add a simple endpoint that gets us this list
if (process.env.NODE_ENV === "development") {
  schools = localSchools;
} else if (process.env.NODE_ENV === "test") {
  schools = mockSchools;
}

export const schoolOptions = schools.map((x) => ({
  label: x,
  value: x
}));
