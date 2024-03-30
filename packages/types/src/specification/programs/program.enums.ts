export enum ProgramCategories {
  Aba = "ABA",
  CounselingTherapeutic = "COUNSELING_THERAPEUTIC",
  Ell = "ELL",
  ExecutiveFunctioning = "EXECUTIVE_FUNCTIONING",
  Math = "MATH",
  Occupational = "OCCUPATIONAL",
  ReadingWriting = "READING_WRITING",
  SelfRegulation = "SELF_REGULATION",
  Skills = "SKILLS",
  SpeechAndLanguageServices = "SPEECH_AND_LANGUAGE_SERVICES",
  Therapy = "THERAPY"
}

export enum InputTypes {
  Radio = "RADIO",
  Text = "TEXT"
}

export enum TrialChainingDirections {
  Backward = "BACKWARD",
  Forward = "FORWARD",
  Total = "TOTAL"
}

export enum ProgramTypes {
  Client = "CLIENT",
  // TODO: Rename this to TEMPLATE
  Template = "MAIN"
}

export enum ProgramValueTypes {
  Boolean = "BOOLEAN",
  Date = "DATE",
  Number = "NUMBER",
  String = "STRING"
}

export enum TargetStyle {
  Behavior = "BEHAVIOR",
  DiscreteTrials = "DISCRETE_TRIALS",
  TaskAnalysis = "TASK_ANALYSIS"
}
