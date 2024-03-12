import { BehaviorType, User } from "../../specification";

export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;

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
  threadId: Scalars["ID"];
};

export type AuthPayload = {
  accessToken: Scalars["String"];
  schoolId: Scalars["String"];
};

export type BehaviorData = {
  __typename?: "BehaviorData";
  result?: Maybe<Scalars["Int"]>;
  type?: Maybe<BehaviorType>;
};

export type BehaviorDataInput = {
  result?: InputMaybe<Scalars["Int"]>;
  type?: InputMaybe<BehaviorType>;
};

export type CreateResultPayload = {
  behaviorData?: InputMaybe<BehaviorDataInput>;
  clientId: Scalars["ID"];
  created_at?: InputMaybe<Scalars["Date"]>;
  data?: InputMaybe<Array<InputMaybe<ResultDataInput>>>;
  notes?: InputMaybe<Scalars["String"]>;
  observerId?: InputMaybe<Scalars["ID"]>;
  programCompleteness: Scalars["Float"];
  programId: Scalars["ID"];
  result?: InputMaybe<Scalars["Float"]>;
  type?: InputMaybe<ResultType>;
  updated_at?: InputMaybe<Scalars["Date"]>;
};

export type CreateThreadPayload = {
  name: Scalars["String"];
  subscribers: Array<InputMaybe<SubscriberInput>>;
};

export type DeleteMessagePayload = {
  messageId: Scalars["ID"];
  threadId: Scalars["ID"];
};

export type DeleteResultPayload = {
  id: Scalars["ID"];
};

export type DeleteThreadPayload = {
  id: Scalars["ID"];
};

export type EditMessagePayload = {
  messageId: Scalars["ID"];
  threadId: Scalars["ID"];
  value: Scalars["String"];
};

export type GetAllResultsByRelationshipPayload = {
  id: Scalars["ID"];
  relationshipProperty: Scalars["String"];
};

export type GetAllThreadsByRelationshipPayload = {
  id: Scalars["ID"];
  relationshipProperty: Scalars["String"];
};

export type GetResultPayload = {
  id: Scalars["ID"];
};

export type GetThreadPayload = {
  id: Scalars["ID"];
};

export type LogOutResponse = {
  __typename?: "LogOutResponse";
  isLoggedIn?: Maybe<Scalars["Boolean"]>;
};

export type LoginPayload = {
  email: Scalars["String"];
  password: Scalars["String"];
  schoolId: Scalars["String"];
};

export type LoginResponse = {
  __typename?: "LoginResponse";
  accessToken?: Maybe<Scalars["String"]>;
  isLoggedIn?: Maybe<Scalars["Boolean"]>;
  refreshToken?: Maybe<Scalars["String"]>;
  resetPassword?: Maybe<Scalars["Boolean"]>;
  schoolName?: Maybe<Scalars["String"]>;
  shouldResetPassword?: Maybe<Scalars["Boolean"]>;
  tempPassword?: Maybe<Scalars["String"]>;
};

export type LogoutPayload = {
  refreshToken: Scalars["String"];
  schoolId: Scalars["String"];
};

export type MePayload = {
  refreshToken: Scalars["String"];
  schoolId: Scalars["String"];
};

export type MeResponse = {
  __typename?: "MeResponse";
  accessToken?: Maybe<Scalars["String"]>;
  user?: Maybe<User>;
};

export type Message = {
  __typename?: "Message";
  dataType: Scalars["String"];
  id: Scalars["ID"];
  timeStamp: Scalars["Date"];
  userId: Scalars["String"];
  value: Scalars["String"];
};

export type MessagePayload = {
  dataType?: InputMaybe<Scalars["String"]>;
  id?: InputMaybe<Scalars["ID"]>;
  timeStamp?: InputMaybe<Scalars["Date"]>;
  userId?: InputMaybe<Scalars["String"]>;
  value?: InputMaybe<Scalars["String"]>;
};

export type Query = {
  __typename?: "Query";
  getAllResults?: Maybe<Array<Maybe<Result>>>;
  getAllResultsByRelationship?: Maybe<Array<Maybe<Result>>>;
  getAllThreads?: Maybe<Array<Maybe<Thread>>>;
  getAllThreadsByRelationship?: Maybe<Array<Maybe<Thread>>>;
  getResult?: Maybe<Result>;
  getThread?: Maybe<Thread>;
  login?: Maybe<LoginResponse>;
  logout?: Maybe<LogOutResponse>;
  me?: Maybe<MeResponse>;
  requestPasswordReset?: Maybe<RequestPasswordResetResponse>;
};

export type QueryGetAllResultsByRelationshipArgs = {
  payload?: InputMaybe<GetAllResultsByRelationshipPayload>;
};

export type QueryGetAllThreadsByRelationshipArgs = {
  payload?: InputMaybe<GetAllThreadsByRelationshipPayload>;
};

export type QueryGetResultArgs = {
  payload?: InputMaybe<GetResultPayload>;
};

export type QueryGetThreadArgs = {
  payload?: InputMaybe<GetThreadPayload>;
};

export type QueryLoginArgs = {
  payload?: InputMaybe<LoginPayload>;
};

export type QueryLogoutArgs = {
  payload?: InputMaybe<LogoutPayload>;
};

export type QueryMeArgs = {
  payload?: InputMaybe<MePayload>;
};

export type QueryRequestPasswordResetArgs = {
  payload?: InputMaybe<RequestPasswordResetPayload>;
};

export type RequestPasswordResetPayload = {
  email: Scalars["String"];
};

export type RequestPasswordResetResponse = {
  __typename?: "RequestPasswordResetResponse";
  success?: Maybe<Scalars["Boolean"]>;
};

export type ResetPasswordPayload = {
  email: Scalars["String"];
  newPassword: Scalars["String"];
  schoolId: Scalars["String"];
  tempPassword: Scalars["String"];
};

export type ResetPasswordResponse = {
  __typename?: "ResetPasswordResponse";
  success?: Maybe<Scalars["Boolean"]>;
};

export type Result = {
  __typename?: "Result";
  behaviorData?: Maybe<BehaviorData>;
  clientId?: Maybe<Scalars["ID"]>;
  created_at?: Maybe<Scalars["Date"]>;
  data?: Maybe<Array<Maybe<ResultData>>>;
  id: Scalars["ID"];
  notes?: Maybe<Scalars["String"]>;
  observerId?: Maybe<Scalars["ID"]>;
  programCompleteness?: Maybe<Scalars["Float"]>;
  programId?: Maybe<Scalars["ID"]>;
  result?: Maybe<Scalars["Float"]>;
  type?: Maybe<ResultType>;
  updated_at?: Maybe<Scalars["Date"]>;
};

export type ResultData = {
  __typename?: "ResultData";
  targetCompleteness?: Maybe<Scalars["Float"]>;
  targetId?: Maybe<Scalars["ID"]>;
  targetResults?: Maybe<Array<Maybe<TargetResult>>>;
};

export type ResultDataInput = {
  targetCompleteness?: InputMaybe<Scalars["Float"]>;
  targetId?: InputMaybe<Scalars["ID"]>;
  targetResults?: InputMaybe<Array<InputMaybe<TargetResultInput>>>;
};

export enum ResultType {
  Duration = "DURATION",
  Frequency = "FREQUENCY",
  Interval = "INTERVAL",
  Trial = "TRIAL"
}

export type Subscriber = {
  __typename?: "Subscriber";
  displayName?: Maybe<Scalars["String"]>;
  id: Scalars["ID"];
};

export type SubscriberInput = {
  displayName?: InputMaybe<Scalars["String"]>;
  id: Scalars["ID"];
};

export type TargetResult = {
  __typename?: "TargetResult";
  completed?: Maybe<Scalars["Boolean"]>;
  option?: Maybe<TargetResultOption>;
  targetOptionId?: Maybe<Scalars["ID"]>;
  trial?: Maybe<Scalars["Int"]>;
};

export type TargetResultInput = {
  completed?: InputMaybe<Scalars["Boolean"]>;
  option?: InputMaybe<TargetResultOptionInput>;
  targetOptionId?: InputMaybe<Scalars["ID"]>;
  trial?: InputMaybe<Scalars["Int"]>;
};

export type TargetResultOption = {
  __typename?: "TargetResultOption";
  id?: Maybe<Scalars["ID"]>;
  name?: Maybe<Scalars["String"]>;
  target?: Maybe<Scalars["Boolean"]>;
};

export type TargetResultOptionInput = {
  id?: InputMaybe<Scalars["ID"]>;
  name?: InputMaybe<Scalars["String"]>;
  target?: InputMaybe<Scalars["Boolean"]>;
};

export type Thread = {
  __typename?: "Thread";
  id: Scalars["ID"];
  isTyping: Array<Maybe<Scalars["String"]>>;
  messages: Array<Maybe<Message>>;
  name: Scalars["String"];
  subscribers: Array<Maybe<Subscriber>>;
};

export type UpdateResultPayload = {
  behaviorData?: InputMaybe<BehaviorDataInput>;
  clientId: Scalars["ID"];
  created_at?: InputMaybe<Scalars["Date"]>;
  data?: InputMaybe<Array<InputMaybe<ResultDataInput>>>;
  id: Scalars["ID"];
  notes?: InputMaybe<Scalars["String"]>;
  observerId?: InputMaybe<Scalars["ID"]>;
  programCompleteness: Scalars["Float"];
  programId: Scalars["ID"];
  result?: InputMaybe<Scalars["Float"]>;
  type?: InputMaybe<ResultType>;
  updated_at?: InputMaybe<Scalars["Date"]>;
};

export type UpdateThreadPayload = {
  id: Scalars["ID"];
  name: Scalars["String"];
  subscribers: Array<InputMaybe<SubscriberInput>>;
};
