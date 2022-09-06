import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Date: any;
};

export type AddMessagePayload = {
  message: MessagePayload;
  threadId: Scalars['ID'];
};

export type CreateDocumentPayload = {
  clientId: Scalars['ID'];
  completed?: InputMaybe<Scalars['Boolean']>;
  details?: InputMaybe<Scalars['String']>;
  signature?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
};

export type CreateEventPayload = {
  agenda?: InputMaybe<Scalars['String']>;
  documents?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  endTime: Scalars['Date'];
  program?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  repeat?: InputMaybe<Scalars['Boolean']>;
  repeatFrequency?: InputMaybe<Scalars['String']>;
  startTime: Scalars['Date'];
  timeZone: Scalars['String'];
  title: Scalars['String'];
  users: Array<InputMaybe<Scalars['ID']>>;
};

export type CreateProgramPayload = {
  clientId?: InputMaybe<Scalars['ID']>;
  createdBy?: InputMaybe<Scalars['ID']>;
  description?: InputMaybe<Scalars['String']>;
  editedBy?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  lastEditedBy?: InputMaybe<Scalars['ID']>;
  mainProgramId?: InputMaybe<Scalars['ID']>;
  mastered?: InputMaybe<Scalars['Boolean']>;
  readAccess?: InputMaybe<Array<InputMaybe<UserRoles>>>;
  ruleStyle?: InputMaybe<RuleStyle>;
  rules?: InputMaybe<Array<InputMaybe<RuleInput>>>;
  title?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<ProgramTypes>;
  writeAccess?: InputMaybe<Array<InputMaybe<UserRoles>>>;
};

export type CreateResultPayload = {
  clientId: Scalars['ID'];
  data?: InputMaybe<Array<InputMaybe<ResultDataInput>>>;
  programCompleteness: Scalars['Float'];
  programId: Scalars['ID'];
};

export type CreateSchoolPayload = {
  accessTokens?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  domain?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  userCount?: InputMaybe<Scalars['Int']>;
};

export type CreateThreadPayload = {
  name: Scalars['String'];
  subscribers: Array<InputMaybe<Scalars['String']>>;
};

export type CreateUserPayload = {
  actionItems?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  clients?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  contacts?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  dateOfBirth?: InputMaybe<Scalars['Date']>;
  documents?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  email?: InputMaybe<Scalars['String']>;
  firstName?: InputMaybe<Scalars['String']>;
  lastName?: InputMaybe<Scalars['String']>;
  password?: InputMaybe<Scalars['String']>;
  phone?: InputMaybe<Scalars['String']>;
  programs?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  roles?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  schoolId?: InputMaybe<Scalars['String']>;
  timeZone?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<Scalars['String']>;
};

export type DeleteDocumentPayload = {
  id: Scalars['ID'];
};

export type DeleteEventPayload = {
  id: Scalars['ID'];
};

export type DeleteMessagePayload = {
  messageId: Scalars['ID'];
  threadId: Scalars['ID'];
};

export type DeleteProgramPayload = {
  id: Scalars['ID'];
};

export type DeleteResultPayload = {
  id: Scalars['ID'];
};

export type DeleteSchoolPayload = {
  id: Scalars['ID'];
};

export type DeleteThreadPayload = {
  id: Scalars['ID'];
};

export type DeleteUserPayload = {
  id: Scalars['ID'];
};

export type Document = {
  __typename?: 'Document';
  clientId?: Maybe<Scalars['ID']>;
  completed?: Maybe<Scalars['Boolean']>;
  details?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  signature?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
};

export type EditMessagePayload = {
  messageId: Scalars['ID'];
  threadId: Scalars['ID'];
  value: Scalars['String'];
};

export type Event = {
  __typename?: 'Event';
  agenda?: Maybe<Scalars['String']>;
  documents?: Maybe<Array<Maybe<Scalars['ID']>>>;
  endTime?: Maybe<Scalars['Date']>;
  id: Scalars['ID'];
  program?: Maybe<Array<Maybe<Scalars['ID']>>>;
  repeat?: Maybe<Scalars['Boolean']>;
  repeatFrequency?: Maybe<Scalars['String']>;
  startTime?: Maybe<Scalars['Date']>;
  timeZone?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  users?: Maybe<Array<Maybe<Scalars['ID']>>>;
};

export type GetDocumentPayload = {
  id: Scalars['ID'];
};

export type GetEventPayload = {
  id: Scalars['ID'];
};

export type GetProgramPayload = {
  id: Scalars['ID'];
};

export type GetResultPayload = {
  id: Scalars['ID'];
};

export type GetSchoolPayload = {
  id: Scalars['ID'];
};

export type GetThreadByUserIdPayload = {
  id: Scalars['ID'];
};

export type GetUserPayload = {
  id: Scalars['ID'];
};

export enum InputTypes {
  Radio = 'RADIO',
  Text = 'TEXT'
}

export type Message = {
  __typename?: 'Message';
  dataType: Scalars['String'];
  id: Scalars['ID'];
  timeStamp: Scalars['Date'];
  userId: Scalars['String'];
  value: Scalars['String'];
};

export type MessagePayload = {
  dataType?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  timeStamp?: InputMaybe<Scalars['Date']>;
  userId?: InputMaybe<Scalars['String']>;
  value?: InputMaybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  addMessage?: Maybe<Thread>;
  createDocument?: Maybe<Document>;
  createEvent?: Maybe<Event>;
  createProgram?: Maybe<Program>;
  createResult?: Maybe<Result>;
  createSchool?: Maybe<School>;
  createThread?: Maybe<Thread>;
  createUser?: Maybe<User>;
  deleteDocument?: Maybe<Scalars['ID']>;
  deleteEvent?: Maybe<Scalars['ID']>;
  deleteMessage?: Maybe<Scalars['ID']>;
  deleteProgram?: Maybe<Scalars['ID']>;
  deleteResult?: Maybe<Scalars['ID']>;
  deleteSchool?: Maybe<Scalars['ID']>;
  deleteThread?: Maybe<Scalars['ID']>;
  deleteUser?: Maybe<Scalars['ID']>;
  editMessage?: Maybe<Scalars['ID']>;
  updateDocument?: Maybe<Document>;
  updateEvent?: Maybe<Event>;
  updateProgram?: Maybe<Program>;
  updateResult?: Maybe<Result>;
  updateSchool?: Maybe<School>;
  updateThread?: Maybe<Thread>;
  updateUser?: Maybe<User>;
};


export type MutationAddMessageArgs = {
  payload?: InputMaybe<AddMessagePayload>;
};


export type MutationCreateDocumentArgs = {
  payload?: InputMaybe<CreateDocumentPayload>;
};


export type MutationCreateEventArgs = {
  payload?: InputMaybe<CreateEventPayload>;
};


export type MutationCreateProgramArgs = {
  payload?: InputMaybe<CreateProgramPayload>;
};


export type MutationCreateResultArgs = {
  payload?: InputMaybe<CreateResultPayload>;
};


export type MutationCreateSchoolArgs = {
  payload?: InputMaybe<CreateSchoolPayload>;
};


export type MutationCreateThreadArgs = {
  payload?: InputMaybe<CreateThreadPayload>;
};


export type MutationCreateUserArgs = {
  payload?: InputMaybe<CreateUserPayload>;
};


export type MutationDeleteDocumentArgs = {
  payload?: InputMaybe<DeleteDocumentPayload>;
};


export type MutationDeleteEventArgs = {
  payload?: InputMaybe<DeleteEventPayload>;
};


export type MutationDeleteMessageArgs = {
  payload?: InputMaybe<DeleteMessagePayload>;
};


export type MutationDeleteProgramArgs = {
  payload?: InputMaybe<DeleteProgramPayload>;
};


export type MutationDeleteResultArgs = {
  payload?: InputMaybe<DeleteResultPayload>;
};


export type MutationDeleteSchoolArgs = {
  payload?: InputMaybe<DeleteSchoolPayload>;
};


export type MutationDeleteThreadArgs = {
  payload?: InputMaybe<DeleteThreadPayload>;
};


export type MutationDeleteUserArgs = {
  payload?: InputMaybe<DeleteUserPayload>;
};


export type MutationEditMessageArgs = {
  payload?: InputMaybe<EditMessagePayload>;
};


export type MutationUpdateDocumentArgs = {
  payload?: InputMaybe<UpdateDocumentPayload>;
};


export type MutationUpdateEventArgs = {
  payload?: InputMaybe<UpdateEventPayload>;
};


export type MutationUpdateProgramArgs = {
  payload?: InputMaybe<UpdateProgramPayload>;
};


export type MutationUpdateResultArgs = {
  payload?: InputMaybe<UpdateResultPayload>;
};


export type MutationUpdateSchoolArgs = {
  payload?: InputMaybe<UpdateSchoolPayload>;
};


export type MutationUpdateThreadArgs = {
  payload?: InputMaybe<UpdateThreadPayload>;
};


export type MutationUpdateUserArgs = {
  payload?: InputMaybe<UpdateUserPayload>;
};

export type Program = {
  __typename?: 'Program';
  clientId?: Maybe<Scalars['ID']>;
  createdBy?: Maybe<Scalars['ID']>;
  created_at?: Maybe<Scalars['Date']>;
  description?: Maybe<Scalars['String']>;
  editedBy?: Maybe<Array<Maybe<Scalars['ID']>>>;
  id: Scalars['ID'];
  lastEditedBy?: Maybe<Scalars['ID']>;
  mainProgramId?: Maybe<Scalars['ID']>;
  mastered?: Maybe<Scalars['Boolean']>;
  readAccess?: Maybe<Array<Maybe<UserRoles>>>;
  ruleStyle?: Maybe<RuleStyle>;
  rules?: Maybe<Array<Maybe<Rule>>>;
  title?: Maybe<Scalars['String']>;
  type?: Maybe<ProgramTypes>;
  updated_at?: Maybe<Scalars['Date']>;
  writeAccess?: Maybe<Array<Maybe<UserRoles>>>;
};

export enum ProgramTypes {
  Client = 'CLIENT',
  Main = 'MAIN'
}

export enum ProgramValueTypes {
  Boolean = 'BOOLEAN',
  Date = 'DATE',
  Number = 'NUMBER',
  String = 'STRING'
}

export type Query = {
  __typename?: 'Query';
  getAllDocuments?: Maybe<Array<Maybe<Document>>>;
  getAllEvents?: Maybe<Array<Maybe<Event>>>;
  getAllPrograms?: Maybe<Array<Maybe<Program>>>;
  getAllResults?: Maybe<Array<Maybe<Result>>>;
  getAllSchools?: Maybe<Array<Maybe<School>>>;
  getAllUsers?: Maybe<Array<Maybe<User>>>;
  getDocument?: Maybe<Document>;
  getEvent?: Maybe<Event>;
  getProgram?: Maybe<Program>;
  getResult?: Maybe<Result>;
  getSchool?: Maybe<School>;
  getThreadsByUserId?: Maybe<Array<Maybe<Thread>>>;
  getUser?: Maybe<User>;
  threads?: Maybe<Array<Maybe<Thread>>>;
};


export type QueryGetDocumentArgs = {
  payload?: InputMaybe<GetDocumentPayload>;
};


export type QueryGetEventArgs = {
  payload?: InputMaybe<GetEventPayload>;
};


export type QueryGetProgramArgs = {
  payload?: InputMaybe<GetProgramPayload>;
};


export type QueryGetResultArgs = {
  payload?: InputMaybe<GetResultPayload>;
};


export type QueryGetSchoolArgs = {
  payload?: InputMaybe<GetSchoolPayload>;
};


export type QueryGetThreadsByUserIdArgs = {
  payload?: InputMaybe<GetThreadByUserIdPayload>;
};


export type QueryGetUserArgs = {
  payload?: InputMaybe<GetUserPayload>;
};

export type Result = {
  __typename?: 'Result';
  clientId?: Maybe<Scalars['ID']>;
  created_at?: Maybe<Scalars['Date']>;
  data?: Maybe<Array<Maybe<ResultData>>>;
  id: Scalars['ID'];
  programCompleteness?: Maybe<Scalars['Float']>;
  programId?: Maybe<Scalars['ID']>;
  updated_at?: Maybe<Scalars['Date']>;
};

export type ResultData = {
  __typename?: 'ResultData';
  ruleCompleteness?: Maybe<Scalars['Float']>;
  ruleId?: Maybe<Scalars['ID']>;
  ruleResults?: Maybe<Array<Maybe<RuleResult>>>;
};

export type ResultDataInput = {
  ruleCompleteness?: InputMaybe<Scalars['Float']>;
  ruleId?: InputMaybe<Scalars['ID']>;
  ruleResults?: InputMaybe<Array<InputMaybe<RuleResultInput>>>;
};

export type Rule = {
  __typename?: 'Rule';
  description?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['ID']>;
  inputType?: Maybe<InputTypes>;
  options?: Maybe<Array<Maybe<RuleOption>>>;
  question?: Maybe<Scalars['String']>;
  required?: Maybe<Scalars['Boolean']>;
  steps?: Maybe<Scalars['Int']>;
  valueType?: Maybe<ProgramValueTypes>;
};

export type RuleInput = {
  description?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  inputType?: InputMaybe<InputTypes>;
  options?: InputMaybe<Array<InputMaybe<RuleOptionInput>>>;
  question?: InputMaybe<Scalars['String']>;
  required?: InputMaybe<Scalars['Boolean']>;
  steps?: InputMaybe<Scalars['Int']>;
  valueType?: InputMaybe<ProgramValueTypes>;
};

export type RuleOption = {
  __typename?: 'RuleOption';
  id?: Maybe<Scalars['ID']>;
  name?: Maybe<Scalars['String']>;
  target?: Maybe<Scalars['Boolean']>;
};

export type RuleOptionInput = {
  id?: InputMaybe<Scalars['ID']>;
  name?: InputMaybe<Scalars['String']>;
  target?: InputMaybe<Scalars['Boolean']>;
};

export type RuleResult = {
  __typename?: 'RuleResult';
  completed?: Maybe<Scalars['Boolean']>;
  option?: Maybe<RuleResultOption>;
  step?: Maybe<Scalars['Int']>;
  targetId?: Maybe<Scalars['ID']>;
};

export type RuleResultInput = {
  completed?: InputMaybe<Scalars['Boolean']>;
  option?: InputMaybe<RuleResultOptionInput>;
  step?: InputMaybe<Scalars['Int']>;
  targetId?: InputMaybe<Scalars['ID']>;
};

export type RuleResultOption = {
  __typename?: 'RuleResultOption';
  id?: Maybe<Scalars['ID']>;
  name?: Maybe<Scalars['String']>;
  target?: Maybe<Scalars['Boolean']>;
};

export type RuleResultOptionInput = {
  id?: InputMaybe<Scalars['ID']>;
  name?: InputMaybe<Scalars['String']>;
  target?: InputMaybe<Scalars['Boolean']>;
};

export enum RuleStyle {
  Group = 'GROUP',
  Separate = 'SEPARATE'
}

export type School = {
  __typename?: 'School';
  accessTokens?: Maybe<Array<Maybe<Scalars['String']>>>;
  created_at?: Maybe<Scalars['Date']>;
  domain?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['Date']>;
  userCount?: Maybe<Scalars['Int']>;
};

export type Thread = {
  __typename?: 'Thread';
  id: Scalars['ID'];
  isTyping: Array<Maybe<Scalars['String']>>;
  messages: Array<Maybe<Message>>;
  name: Scalars['String'];
  subscribers: Array<Maybe<Scalars['String']>>;
};

export type UpdateDocumentPayload = {
  clientId?: InputMaybe<Scalars['ID']>;
  completed?: InputMaybe<Scalars['Boolean']>;
  details?: InputMaybe<Scalars['String']>;
  id: Scalars['ID'];
  signature?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
};

export type UpdateEventPayload = {
  agenda?: InputMaybe<Scalars['String']>;
  documents?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  endTime: Scalars['Date'];
  id: Scalars['ID'];
  program?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  repeat?: InputMaybe<Scalars['Boolean']>;
  repeatFrequency?: InputMaybe<Scalars['String']>;
  startTime: Scalars['Date'];
  timeZone: Scalars['String'];
  title?: InputMaybe<Scalars['String']>;
  users: Array<InputMaybe<Scalars['ID']>>;
};

export type UpdateProgramPayload = {
  clientId?: InputMaybe<Scalars['ID']>;
  createdBy?: InputMaybe<Scalars['ID']>;
  description?: InputMaybe<Scalars['String']>;
  editedBy?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  id: Scalars['ID'];
  lastEditedBy?: InputMaybe<Scalars['ID']>;
  mainProgramId?: InputMaybe<Scalars['ID']>;
  mastered?: InputMaybe<Scalars['Boolean']>;
  readAccess?: InputMaybe<Array<InputMaybe<UserRoles>>>;
  ruleStyle?: InputMaybe<RuleStyle>;
  rules?: InputMaybe<Array<InputMaybe<RuleInput>>>;
  title?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<ProgramTypes>;
  writeAccess?: InputMaybe<Array<InputMaybe<UserRoles>>>;
};

export type UpdateResultPayload = {
  clientId: Scalars['ID'];
  data?: InputMaybe<Array<InputMaybe<ResultDataInput>>>;
  id: Scalars['ID'];
  programCompleteness: Scalars['Float'];
  programId: Scalars['ID'];
};

export type UpdateSchoolPayload = {
  accessTokens?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  domain?: InputMaybe<Scalars['String']>;
  id: Scalars['ID'];
  name?: InputMaybe<Scalars['String']>;
  userCount?: InputMaybe<Scalars['Int']>;
};

export type UpdateThreadPayload = {
  id: Scalars['ID'];
  name: Scalars['String'];
  subscribers: Array<InputMaybe<Scalars['String']>>;
};

export type UpdateUserPayload = {
  actionItems?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  clients?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  contacts?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  dateOfBirth?: InputMaybe<Scalars['Date']>;
  documents?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  email?: InputMaybe<Scalars['String']>;
  firstName?: InputMaybe<Scalars['String']>;
  id: Scalars['ID'];
  lastName?: InputMaybe<Scalars['String']>;
  password?: InputMaybe<Scalars['String']>;
  phone?: InputMaybe<Scalars['String']>;
  programs?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  roles?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  schoolId?: InputMaybe<Scalars['String']>;
  timeZone?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<Scalars['String']>;
};

export type User = {
  __typename?: 'User';
  actionItems?: Maybe<Array<Maybe<Scalars['ID']>>>;
  clients?: Maybe<Array<Maybe<Scalars['ID']>>>;
  contacts?: Maybe<Array<Maybe<Scalars['ID']>>>;
  created_at?: Maybe<Scalars['Date']>;
  dateOfBirth?: Maybe<Scalars['Date']>;
  documents?: Maybe<Array<Maybe<Scalars['String']>>>;
  email?: Maybe<Scalars['String']>;
  firstName?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  lastName?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
  programs?: Maybe<Array<Maybe<Scalars['ID']>>>;
  roles?: Maybe<Array<Maybe<Scalars['String']>>>;
  schoolId?: Maybe<Scalars['String']>;
  timeZone?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['Date']>;
};

export enum UserRoles {
  Admin = 'ADMIN',
  Client = 'CLIENT',
  Director = 'DIRECTOR',
  Employee = 'EMPLOYEE',
  Guardian = 'GUARDIAN'
}



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  AddMessagePayload: AddMessagePayload;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  CreateDocumentPayload: CreateDocumentPayload;
  CreateEventPayload: CreateEventPayload;
  CreateProgramPayload: CreateProgramPayload;
  CreateResultPayload: CreateResultPayload;
  CreateSchoolPayload: CreateSchoolPayload;
  CreateThreadPayload: CreateThreadPayload;
  CreateUserPayload: CreateUserPayload;
  Date: ResolverTypeWrapper<Scalars['Date']>;
  DeleteDocumentPayload: DeleteDocumentPayload;
  DeleteEventPayload: DeleteEventPayload;
  DeleteMessagePayload: DeleteMessagePayload;
  DeleteProgramPayload: DeleteProgramPayload;
  DeleteResultPayload: DeleteResultPayload;
  DeleteSchoolPayload: DeleteSchoolPayload;
  DeleteThreadPayload: DeleteThreadPayload;
  DeleteUserPayload: DeleteUserPayload;
  Document: ResolverTypeWrapper<Document>;
  EditMessagePayload: EditMessagePayload;
  Event: ResolverTypeWrapper<Event>;
  Float: ResolverTypeWrapper<Scalars['Float']>;
  GetDocumentPayload: GetDocumentPayload;
  GetEventPayload: GetEventPayload;
  GetProgramPayload: GetProgramPayload;
  GetResultPayload: GetResultPayload;
  GetSchoolPayload: GetSchoolPayload;
  GetThreadByUserIdPayload: GetThreadByUserIdPayload;
  GetUserPayload: GetUserPayload;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  InputTypes: InputTypes;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  Message: ResolverTypeWrapper<Message>;
  MessagePayload: MessagePayload;
  Mutation: ResolverTypeWrapper<{}>;
  Program: ResolverTypeWrapper<Program>;
  ProgramTypes: ProgramTypes;
  ProgramValueTypes: ProgramValueTypes;
  Query: ResolverTypeWrapper<{}>;
  Result: ResolverTypeWrapper<Result>;
  ResultData: ResolverTypeWrapper<ResultData>;
  ResultDataInput: ResultDataInput;
  Rule: ResolverTypeWrapper<Rule>;
  RuleInput: RuleInput;
  RuleOption: ResolverTypeWrapper<RuleOption>;
  RuleOptionInput: RuleOptionInput;
  RuleResult: ResolverTypeWrapper<RuleResult>;
  RuleResultInput: RuleResultInput;
  RuleResultOption: ResolverTypeWrapper<RuleResultOption>;
  RuleResultOptionInput: RuleResultOptionInput;
  RuleStyle: RuleStyle;
  School: ResolverTypeWrapper<School>;
  String: ResolverTypeWrapper<Scalars['String']>;
  Thread: ResolverTypeWrapper<Thread>;
  UpdateDocumentPayload: UpdateDocumentPayload;
  UpdateEventPayload: UpdateEventPayload;
  UpdateProgramPayload: UpdateProgramPayload;
  UpdateResultPayload: UpdateResultPayload;
  UpdateSchoolPayload: UpdateSchoolPayload;
  UpdateThreadPayload: UpdateThreadPayload;
  UpdateUserPayload: UpdateUserPayload;
  User: ResolverTypeWrapper<User>;
  UserRoles: UserRoles;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  AddMessagePayload: AddMessagePayload;
  Boolean: Scalars['Boolean'];
  CreateDocumentPayload: CreateDocumentPayload;
  CreateEventPayload: CreateEventPayload;
  CreateProgramPayload: CreateProgramPayload;
  CreateResultPayload: CreateResultPayload;
  CreateSchoolPayload: CreateSchoolPayload;
  CreateThreadPayload: CreateThreadPayload;
  CreateUserPayload: CreateUserPayload;
  Date: Scalars['Date'];
  DeleteDocumentPayload: DeleteDocumentPayload;
  DeleteEventPayload: DeleteEventPayload;
  DeleteMessagePayload: DeleteMessagePayload;
  DeleteProgramPayload: DeleteProgramPayload;
  DeleteResultPayload: DeleteResultPayload;
  DeleteSchoolPayload: DeleteSchoolPayload;
  DeleteThreadPayload: DeleteThreadPayload;
  DeleteUserPayload: DeleteUserPayload;
  Document: Document;
  EditMessagePayload: EditMessagePayload;
  Event: Event;
  Float: Scalars['Float'];
  GetDocumentPayload: GetDocumentPayload;
  GetEventPayload: GetEventPayload;
  GetProgramPayload: GetProgramPayload;
  GetResultPayload: GetResultPayload;
  GetSchoolPayload: GetSchoolPayload;
  GetThreadByUserIdPayload: GetThreadByUserIdPayload;
  GetUserPayload: GetUserPayload;
  ID: Scalars['ID'];
  Int: Scalars['Int'];
  Message: Message;
  MessagePayload: MessagePayload;
  Mutation: {};
  Program: Program;
  Query: {};
  Result: Result;
  ResultData: ResultData;
  ResultDataInput: ResultDataInput;
  Rule: Rule;
  RuleInput: RuleInput;
  RuleOption: RuleOption;
  RuleOptionInput: RuleOptionInput;
  RuleResult: RuleResult;
  RuleResultInput: RuleResultInput;
  RuleResultOption: RuleResultOption;
  RuleResultOptionInput: RuleResultOptionInput;
  School: School;
  String: Scalars['String'];
  Thread: Thread;
  UpdateDocumentPayload: UpdateDocumentPayload;
  UpdateEventPayload: UpdateEventPayload;
  UpdateProgramPayload: UpdateProgramPayload;
  UpdateResultPayload: UpdateResultPayload;
  UpdateSchoolPayload: UpdateSchoolPayload;
  UpdateThreadPayload: UpdateThreadPayload;
  UpdateUserPayload: UpdateUserPayload;
  User: User;
};

export interface DateScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Date'], any> {
  name: 'Date';
}

export type DocumentResolvers<ContextType = any, ParentType extends ResolversParentTypes['Document'] = ResolversParentTypes['Document']> = {
  clientId?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  completed?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  details?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  signature?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  title?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type EventResolvers<ContextType = any, ParentType extends ResolversParentTypes['Event'] = ResolversParentTypes['Event']> = {
  agenda?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  documents?: Resolver<Maybe<Array<Maybe<ResolversTypes['ID']>>>, ParentType, ContextType>;
  endTime?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  program?: Resolver<Maybe<Array<Maybe<ResolversTypes['ID']>>>, ParentType, ContextType>;
  repeat?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  repeatFrequency?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  startTime?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  timeZone?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  title?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  users?: Resolver<Maybe<Array<Maybe<ResolversTypes['ID']>>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MessageResolvers<ContextType = any, ParentType extends ResolversParentTypes['Message'] = ResolversParentTypes['Message']> = {
  dataType?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  timeStamp?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  userId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  value?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  addMessage?: Resolver<Maybe<ResolversTypes['Thread']>, ParentType, ContextType, Partial<MutationAddMessageArgs>>;
  createDocument?: Resolver<Maybe<ResolversTypes['Document']>, ParentType, ContextType, Partial<MutationCreateDocumentArgs>>;
  createEvent?: Resolver<Maybe<ResolversTypes['Event']>, ParentType, ContextType, Partial<MutationCreateEventArgs>>;
  createProgram?: Resolver<Maybe<ResolversTypes['Program']>, ParentType, ContextType, Partial<MutationCreateProgramArgs>>;
  createResult?: Resolver<Maybe<ResolversTypes['Result']>, ParentType, ContextType, Partial<MutationCreateResultArgs>>;
  createSchool?: Resolver<Maybe<ResolversTypes['School']>, ParentType, ContextType, Partial<MutationCreateSchoolArgs>>;
  createThread?: Resolver<Maybe<ResolversTypes['Thread']>, ParentType, ContextType, Partial<MutationCreateThreadArgs>>;
  createUser?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, Partial<MutationCreateUserArgs>>;
  deleteDocument?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType, Partial<MutationDeleteDocumentArgs>>;
  deleteEvent?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType, Partial<MutationDeleteEventArgs>>;
  deleteMessage?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType, Partial<MutationDeleteMessageArgs>>;
  deleteProgram?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType, Partial<MutationDeleteProgramArgs>>;
  deleteResult?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType, Partial<MutationDeleteResultArgs>>;
  deleteSchool?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType, Partial<MutationDeleteSchoolArgs>>;
  deleteThread?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType, Partial<MutationDeleteThreadArgs>>;
  deleteUser?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType, Partial<MutationDeleteUserArgs>>;
  editMessage?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType, Partial<MutationEditMessageArgs>>;
  updateDocument?: Resolver<Maybe<ResolversTypes['Document']>, ParentType, ContextType, Partial<MutationUpdateDocumentArgs>>;
  updateEvent?: Resolver<Maybe<ResolversTypes['Event']>, ParentType, ContextType, Partial<MutationUpdateEventArgs>>;
  updateProgram?: Resolver<Maybe<ResolversTypes['Program']>, ParentType, ContextType, Partial<MutationUpdateProgramArgs>>;
  updateResult?: Resolver<Maybe<ResolversTypes['Result']>, ParentType, ContextType, Partial<MutationUpdateResultArgs>>;
  updateSchool?: Resolver<Maybe<ResolversTypes['School']>, ParentType, ContextType, Partial<MutationUpdateSchoolArgs>>;
  updateThread?: Resolver<Maybe<ResolversTypes['Thread']>, ParentType, ContextType, Partial<MutationUpdateThreadArgs>>;
  updateUser?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, Partial<MutationUpdateUserArgs>>;
};

export type ProgramResolvers<ContextType = any, ParentType extends ResolversParentTypes['Program'] = ResolversParentTypes['Program']> = {
  clientId?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  createdBy?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  created_at?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  editedBy?: Resolver<Maybe<Array<Maybe<ResolversTypes['ID']>>>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  lastEditedBy?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  mainProgramId?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  mastered?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  readAccess?: Resolver<Maybe<Array<Maybe<ResolversTypes['UserRoles']>>>, ParentType, ContextType>;
  ruleStyle?: Resolver<Maybe<ResolversTypes['RuleStyle']>, ParentType, ContextType>;
  rules?: Resolver<Maybe<Array<Maybe<ResolversTypes['Rule']>>>, ParentType, ContextType>;
  title?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  type?: Resolver<Maybe<ResolversTypes['ProgramTypes']>, ParentType, ContextType>;
  updated_at?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  writeAccess?: Resolver<Maybe<Array<Maybe<ResolversTypes['UserRoles']>>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  getAllDocuments?: Resolver<Maybe<Array<Maybe<ResolversTypes['Document']>>>, ParentType, ContextType>;
  getAllEvents?: Resolver<Maybe<Array<Maybe<ResolversTypes['Event']>>>, ParentType, ContextType>;
  getAllPrograms?: Resolver<Maybe<Array<Maybe<ResolversTypes['Program']>>>, ParentType, ContextType>;
  getAllResults?: Resolver<Maybe<Array<Maybe<ResolversTypes['Result']>>>, ParentType, ContextType>;
  getAllSchools?: Resolver<Maybe<Array<Maybe<ResolversTypes['School']>>>, ParentType, ContextType>;
  getAllUsers?: Resolver<Maybe<Array<Maybe<ResolversTypes['User']>>>, ParentType, ContextType>;
  getDocument?: Resolver<Maybe<ResolversTypes['Document']>, ParentType, ContextType, Partial<QueryGetDocumentArgs>>;
  getEvent?: Resolver<Maybe<ResolversTypes['Event']>, ParentType, ContextType, Partial<QueryGetEventArgs>>;
  getProgram?: Resolver<Maybe<ResolversTypes['Program']>, ParentType, ContextType, Partial<QueryGetProgramArgs>>;
  getResult?: Resolver<Maybe<ResolversTypes['Result']>, ParentType, ContextType, Partial<QueryGetResultArgs>>;
  getSchool?: Resolver<Maybe<ResolversTypes['School']>, ParentType, ContextType, Partial<QueryGetSchoolArgs>>;
  getThreadsByUserId?: Resolver<Maybe<Array<Maybe<ResolversTypes['Thread']>>>, ParentType, ContextType, Partial<QueryGetThreadsByUserIdArgs>>;
  getUser?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, Partial<QueryGetUserArgs>>;
  threads?: Resolver<Maybe<Array<Maybe<ResolversTypes['Thread']>>>, ParentType, ContextType>;
};

export type ResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['Result'] = ResolversParentTypes['Result']> = {
  clientId?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  created_at?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  data?: Resolver<Maybe<Array<Maybe<ResolversTypes['ResultData']>>>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  programCompleteness?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  programId?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  updated_at?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ResultDataResolvers<ContextType = any, ParentType extends ResolversParentTypes['ResultData'] = ResolversParentTypes['ResultData']> = {
  ruleCompleteness?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  ruleId?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  ruleResults?: Resolver<Maybe<Array<Maybe<ResolversTypes['RuleResult']>>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type RuleResolvers<ContextType = any, ParentType extends ResolversParentTypes['Rule'] = ResolversParentTypes['Rule']> = {
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  inputType?: Resolver<Maybe<ResolversTypes['InputTypes']>, ParentType, ContextType>;
  options?: Resolver<Maybe<Array<Maybe<ResolversTypes['RuleOption']>>>, ParentType, ContextType>;
  question?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  required?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  steps?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  valueType?: Resolver<Maybe<ResolversTypes['ProgramValueTypes']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type RuleOptionResolvers<ContextType = any, ParentType extends ResolversParentTypes['RuleOption'] = ResolversParentTypes['RuleOption']> = {
  id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  target?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type RuleResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['RuleResult'] = ResolversParentTypes['RuleResult']> = {
  completed?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  option?: Resolver<Maybe<ResolversTypes['RuleResultOption']>, ParentType, ContextType>;
  step?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  targetId?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type RuleResultOptionResolvers<ContextType = any, ParentType extends ResolversParentTypes['RuleResultOption'] = ResolversParentTypes['RuleResultOption']> = {
  id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  target?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SchoolResolvers<ContextType = any, ParentType extends ResolversParentTypes['School'] = ResolversParentTypes['School']> = {
  accessTokens?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
  created_at?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  domain?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  updated_at?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  userCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ThreadResolvers<ContextType = any, ParentType extends ResolversParentTypes['Thread'] = ResolversParentTypes['Thread']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  isTyping?: Resolver<Array<Maybe<ResolversTypes['String']>>, ParentType, ContextType>;
  messages?: Resolver<Array<Maybe<ResolversTypes['Message']>>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  subscribers?: Resolver<Array<Maybe<ResolversTypes['String']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  actionItems?: Resolver<Maybe<Array<Maybe<ResolversTypes['ID']>>>, ParentType, ContextType>;
  clients?: Resolver<Maybe<Array<Maybe<ResolversTypes['ID']>>>, ParentType, ContextType>;
  contacts?: Resolver<Maybe<Array<Maybe<ResolversTypes['ID']>>>, ParentType, ContextType>;
  created_at?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  dateOfBirth?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  documents?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
  email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  firstName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  lastName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  password?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  phone?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  programs?: Resolver<Maybe<Array<Maybe<ResolversTypes['ID']>>>, ParentType, ContextType>;
  roles?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
  schoolId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  timeZone?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  type?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  updated_at?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  Date?: GraphQLScalarType;
  Document?: DocumentResolvers<ContextType>;
  Event?: EventResolvers<ContextType>;
  Message?: MessageResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Program?: ProgramResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Result?: ResultResolvers<ContextType>;
  ResultData?: ResultDataResolvers<ContextType>;
  Rule?: RuleResolvers<ContextType>;
  RuleOption?: RuleOptionResolvers<ContextType>;
  RuleResult?: RuleResultResolvers<ContextType>;
  RuleResultOption?: RuleResultOptionResolvers<ContextType>;
  School?: SchoolResolvers<ContextType>;
  Thread?: ThreadResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
};

