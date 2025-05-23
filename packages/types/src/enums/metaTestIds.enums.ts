export enum UIMetaTargetTypes {
  Button = "BUTTON",
  Field = "FIELD",
  Selector = "SELECTOR",
  Checkbox = "CHECK_BOX",
  ListItem = "LIST_ITEM"
}

// Globals
export enum NavMetaTestIds {
  logoutBtn = "logout-nav-button",
  programBtn = "program-nav-button",
  booksBtn = "book-nav-button",
  openBehaviorSideBar = "open-behavior-side-bar",
  openAddProgramToClientSideBar = "open-add-client-side-bar",
  directoryBtn = "directory-nav-button",
  schoolBtn = "school-nav-button",
  chatBtn = "chat-nav-button",
  homeBtn = "home-nav-button"
}

export enum AddModalControls {
  cancelBtn = "add-from-cancel",
  createBtn = "add-form-create"
}

export enum RepeatableMetaTestIds {
  tableAction = "table-action",
  tableHeader = "table-header",
  row = "row",
  listItem = "list-item"
}

// Pages
export enum AuthPageMetaTestIds {
  loginBtn = "login",
  resetBtn = "reset",
  cancelBtn = "cancel",
  resetPasswordBtn = "reset-password",
  requestPasswordReset = "request-reset-password",
  emailField = "email",
  passwordField = "password",
  schoolField = "school"
}

export enum DirectoryPageMetaTestIds {
  firstNameField = "add-user-first-name-field",
  lastNameField = "add-user-last-name-field",
  phoneNumberField = "add-user-phone-number-field",
  emailField = "add-user-email-field",
  passwordField = "add-user-password-field",
  typeSelector = "add-user-type-selector",
  roleMultiSelector = "add-user-role-multi-selector",
  addUserBtn = "add-user",
  tableActionView = "view-user",
  table = "directory-table"
}

export enum UserPageMetaTestIds {
  firstNameField = "update-user-first-name-field",
  lastNameField = "update-user-last-name-field",
  phoneNumberField = "update-user-phone-number-field",
  emailField = "update-user-email-field",
  passwordField = "update-user-password-field",
  typeSelector = "update-user-type-selector",
  serviceProviderSelector = "update-service-provider-selector",
  roleMultiSelector = "update-user-role-field",
  edit = "edit-user",
  cancelEdit = "cancel-edit-user",
  submitEdit = "submit-edit-user",
  programTableActionStartObserving = "start-observing-program",
  programTableActionViewData = "view-program-data",
  addProgram = "user-add-program",
  programsTable = "user-programs-table"
}

export enum DrawerMetaTestIds {
  extendBtn = "extend-btn"
}

export enum SchoolPageMetaTestIds {
  nameField = "school-name",
  addBtn = "add-school",
  table = "schools-table"
}

export enum BookPageMetaTestIds {
  nameField = "books-name",
  addBtn = "add-book",
  table = "books-table"
}

export enum ResultPageMetaTestIds {
  edit = "edit-result",
  cancel = "cancel-result",
  save = "save-result",
  notes = "result-notes",
  frequencyTextField = "frequency-text-field",
  durationTextField = "duration-text-field",
  intervalTextField = "interval-text-field",
  trialSelector = "trial-selector"
}

export enum BulKProgramMetaTestIds {
  addToClientBtn = "add-to-client-btn"
}

export enum CollectionPageMetaTestIds {
  addProgramBtn = "add-program",
  addBehaviorBtn = "add-behavior",
  addCollectionBtn = "add-collection",
  addProgramToClientBtn = "add-program-to-client",
  addProgramFormTitleField = "add-program-title-field",
  addProgramFormDescriptionField = "add-program-description-field",
  addProgramFormFormMaterialsField = "update-program-materials-field",
  addProgramFormTypeSelector = "add-program-type-selector",
  addProgramFormChainingSelector = "chaining-selector",
  addProgramFormCategorySelector = "add-program-type-category",
  addProgramFormClientSelector = "add-program-client-selector",
  addProgramFormStepsSelector = "add-steps-selector",
  addProgramFormTargetStyleSelector = "add-program-target-style-selector",
  addProgramFormMasteryTarget = "mastery-target-field",
  addProgramFormMasteryConsecutive = "mastery-consecutive-field",
  tableActionView = "view-program",
  tableActionCopy = "copy-program",
  table = "programs-table",
  collectionTable = "collection-table",
  behaviorTable = "behavior-table"
}

export enum BehaviorAddFormMetaTestIds {
  titleField = "behavior-add-form-title-field",
  descriptionField = "behavior-add-form-description-field",
  typeSelector = "behavior-add-form-type-selector",
  behaviorTypeSelector = "behavior-add-form--behavior-type-selector",
  alertDurationField = "behavior-add-form--behavior-alert-duration-field",
  masteryTargetField = "add-behavior-mastery-target-field",
  masteryConsecutiveField = "add-behavior-mastery-consecutive-field",
  operationalDefinitionField = "add-behavior-operational-definition-field",
  precursorBehaviorField = "add-behavior-precursor-behavior-field",
  proactiveStrategiesField = "add-behavior-proactive-strategies-field",
  reactiveStrategiesField = "add-behavior-reactive-strategies-field"
}

export enum BehaviorMetaTestIds {
  restAll = "reset-all-behaviors",
  addClient = "add-client-to-behavior-tracker",
  hideClient = "hide-cleint",
  showClient = "show-cleint",
  removeClient = "remove-cleint"
}

export enum ProgramPageMetaTestIds {
  editBtn = "edit-program-btn",
  deleteProgramBtn = "delete-program-btn",
  cancelEditBtn = "cancel-edit-program",
  submitEditBtn = "submit-edit-program",
  titleField = "update-program-title-field",
  descriptionField = "update-program-description-field",
  materialsField = "update-program-materials-field",
  typeSelector = "update-program-type-selector",
  masterTargetField = "update-mastery-target-field",
  masteryConsecutiveTargetField = "update-mastery-consecutive-target-field",
  categorySelector = "update-program-category-selector",
  clientSelector = "update-program-client-selector",
  targetStyleSelector = "update-program-target-style-selector",
  chainingDirections = "update-program-rule-direction-selector",
  writeAccessMultiSelector = "update-program-write-access-selector",
  readAccessMultiSelector = "update-program-read-access-selector",
  clientProgramActionViewClient = "view-client-btn",
  clientProgramActionStartObservation = "start-observation-btn",
  clientProgramActionViewProgramData = "view-program-data",
  stepsSelector = "update-steps-selector",
  behaviorActiveCheckBok = "behavior-active-checkbox",
  masteredCheckbox = "mastered",
  behaviorTypeSelector = "behavior-type-selector",
  alertDurration = "behavior-alert-duration",
  operationalDefinitionField = "program-page-operational-definition-field",
  precursorBehaviorField = "program-page-precursor-behavior-field",
  proactiveStrategiesField = "program-page-proactive-strategies-field",
  reactiveStrategiesField = "program-page-reactive-strategies-field"
}

export enum ObservationMetaTestIds {
  viewResultsBtn = "view-results-btn",
  submitObservation = "submit-observation-btn",
  selectRuleBtn = "select-rule-btn",
  closeRuleBtn = "close-rule-btn",
  revertStepBtn = "revert-step-rule-btn",
  ruleOptionSelectBtn = "rule-option-select-btn",
  closeGroupedRuleBtn = "close-group-rule-btn",
  nextRuleBtn = "next-rule-btn",
  revertRuleBtn = "revert-rule-btn",
  selectGroupedRuleBtn = "select-grouped-rule-btn",
  notes = "notes-rich-text"
}

// TODO: will need to have a way to get prompts by each and prompts
export enum TargetFormMetaTestIds {
  deleteRuleBtn = "delete-rule-btn",
  questionField = "add-rule-question-field",
  descriptionField = "add-rule-description-field",
  requiredCheckbox = "add-rule-required-checkbox",
  inputTypeSelector = "add-rule-input-type-selector",
  valueTypeSelector = "add-rule-value-type-selector",
  preSelectedVerbalPromptsBtn = "add-rule-verbal-prompts-btn",
  preSelectedPhysicalPromptsBtn = "add-rule-physical-prompts-btn",
  preSelectedTimePromptsBtn = "add-rule-time-prompts-btn",
  promptNameField = "add-prompt-name-field",
  deletePromptBtn = "delete-prompt-btn",
  setToTargetBtn = "set-to-target-prompt-btn",
  addRuleBtn = "add-rule-btn",
  addPromptBtn = "addPromptBtn"
}

// Features
export enum ChatMetaTestIds {
  createChatBtn = "create-chat-btn",
  cancelCreateChatBtn = "create-chat-cancel-btn",
  createChatNameField = "create-chat-name-field",
  createChatUserSelector = "create-chat-user-selector",
  createChatSubmitBtn = "create-chat-submit-btn",
  chatMessageBarField = "chat-message-bat-field",
  chatMessageBarSubmit = "chat-message-bar-submit",
  chatMessageBarCancel = "chat-message-bar-cancel",
  messageOptionsBtn = "message-options-btn",
  deleteMessageBtn = "delete-message-btn",
  editMessageBtn = "edit-message-btn",
  chatOptionsBtn = "chat-options-btn",
  chatDeleteBtn = "chat-delete-btn"
}

export enum CollectionMetaTestIds {
  selector = "move-collection-selector"
}

export enum TestEntryTypes {
  DIRECTORY = "directory",
  PROGRAM = "program",
  CHAT = "chat"
}

export enum BehaviorTracker {
  tallyBtn = "tally-btn",
  showNoteEditor = "hide-note-editor-btn",
  hideNoteEditor = "show-note-editor-btn",
  noteEditor = "note-editor",
  startTimer = "start-timer",
  stopTime = "stop-timer",
  submitZero = "submit-zero",
  startInterval = "start-interval",
  stopInterval = "stop-interval",
  passInterval = "pass-interval",
  failInterval = "fail-interval",
  dialogCancel = "dialog-cancel-interval",
  dialogContinue = "dialog-continue-interval",
  dialogSubmit = "dialog-submit-interval",
  dialogAction = "dialog-action"
}

export enum DialogMetaIds {
  action = "dialog-action"
}

export enum ResultsMetaTestIds {
  deleteBtn = "results-delete-btn",
  table = "results-table"
}

export type MetaTestIds =
  | ChatMetaTestIds
  | CollectionPageMetaTestIds
  | SchoolPageMetaTestIds
  | UserPageMetaTestIds
  | DirectoryPageMetaTestIds
  | NavMetaTestIds
  | AddModalControls
  | AuthPageMetaTestIds
  | TargetFormMetaTestIds
  | ProgramPageMetaTestIds
  | ObservationMetaTestIds
  | RepeatableMetaTestIds
  | BookPageMetaTestIds
  | DrawerMetaTestIds
  | BulKProgramMetaTestIds
  | BehaviorTracker
  | DialogMetaIds
  | ResultsMetaTestIds
  | CollectionMetaTestIds
  | BehaviorMetaTestIds
  | ResultPageMetaTestIds;
