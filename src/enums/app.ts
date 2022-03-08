export enum Collections {
  School = "school",
  User = "user",
  Program = "program",
  Result = "result"
}

export enum UserRoles {
  Admin = "ADMIN",
  Director = "DIRECTOR",
  Client = "CLIENT",
  Guardian = "GUARID",
  Employee = "EMPLOYEE"
}

export enum ProgramTypes {
  Main = "MAIN",
  Client = "CLIENT"
}

export enum InputTypes {
  radio = "RADIO",
  text = "TEXT"
}

export enum ProgramValueTypes {
  string = "STRING",
  number = "NUMBER",
  date = "DATE",
  boolean = "BOOLEAN"
}

export enum PromptTypes {
  Verbal = "VERBAL",
  Physical = "PHYSICAL",
  Time = "TIME"
}

export enum Prompts {
  FullPhysical = "Full Physical",
  PartialPhysical = "Partial physical",
  LightPhysical = "Light physical ",
  Gesture = "Gesture",
  Independent = "Independent",
  FullVerbalModel = "Full verbal model",
  PartialVerbalModel = "Partial verbal model ",
  InitialSoundCue = "Initial sound cue",
  Phonetic = "phonetic",
  Immediate = "Immediate",
  TwoSecondDelay = "2 Second delay",
  FourSecondDelay = "4 Second delay",
  SixSecondDelay = "6 Second delay",
  EightSecondDelay = "8 Second delay",
  TenSecondDelay = "10 Second delay"
}

export enum Modes {
  ReadOnly = "readOnly",
  Edit = "edit"
}
