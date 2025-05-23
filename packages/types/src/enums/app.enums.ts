export enum Domains {
  User = "user",
  Program = "program",
  Result = "result",
  Collection = "collection",
  // Move with to clientDomains
  AppState = "appControls"
}

export enum PromptTypes {
  Verbal = "VERBAL",
  Physical = "PHYSICAL",
  Duration = "DURATION"
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

export enum ServiceProviders {
  SLP = "SLP",
  OT = "OT",
  BCBA = "BCBA",
  SPED = "SpEd",
  PSYCH = "Psych",
  SOCIAL_WORKER = "Social worker",
  COUNSELOR = "Counselor",
  ABA_SPECIALIST = "ABA Specialist",
  Other = "Other"
}
