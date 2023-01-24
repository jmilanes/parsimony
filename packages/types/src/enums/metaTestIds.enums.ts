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
  emailField = "email",
  passwordField = "password"
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

export enum ProgramsPageMetaTestIds {
  addBtn = "add-program",
  titleField = "add-program-title-field",
  descriptionField = "add-program-description-field",
  typeSelector = "add-program-type-selector",
  clientSelector = "add-program-client-selector",
  ruleStyleSelector = "add-program-rule-style-selector",
  writeAccessMultiSelector = "add-program-write-access-selector",
  readAccessMultiSelector = "add-program-read-access-selector",
  tableActionView = "view-program",
  tableActionCopy = "copy-program",
  table = "programs-table"
}

export enum ProgramPageMetaTestIds {
  editBtn = "edit-program-btn",
  cancelEditBtn = "cancel-edit-program",
  submitEditBtn = "submit-edit-program",
  titleField = "update-program-title-field",
  descriptionField = "update-program-description-field",
  typeSelector = "update-program-type-selector",
  clientSelector = "update-program-client-selector",
  ruleStyleSelector = "update-program-rule-style-selector",
  writeAccessMultiSelector = "update-program-write-access-selector",
  readAccessMultiSelector = "update-program-read-access-selector",
  clientProgramActionViewClient = "view-client-btn",
  clientProgramActionStartObservation = "start-observation-btn",
  clientProgramActionViewProgramData = "view-program-data"
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
  selectGroupedRuleBtn = "select-grouped-rule-btn"
}

// TODO: will need to have a way to get prompts by each and prompts
export enum RulesFormMetaTestIds {
  deleteRuleBtn = "delete-rule-btn",
  questionField = "add-rule-question-field",
  descriptionField = "add-rule-description-field",
  stepsSelector = "add-rule-steps-selector",
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

export enum TestEntryTypes {
  DIRECTORY = "directory",
  PROGRAM = "program",
  CHAT = "chat"
}

export type MetaTestIds =
  | ChatMetaTestIds
  | ProgramsPageMetaTestIds
  | SchoolPageMetaTestIds
  | UserPageMetaTestIds
  | DirectoryPageMetaTestIds
  | NavMetaTestIds
  | AddModalControls
  | AuthPageMetaTestIds
  | RulesFormMetaTestIds
  | ProgramPageMetaTestIds
  | ObservationMetaTestIds
  | RepeatableMetaTestIds
  | ChatMetaTestIds
  | DrawerMetaTestIds;
