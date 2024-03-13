import { User } from "../../specification";

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

export type CreateThreadPayload = {
  name: Scalars["String"];
  subscribers: Array<InputMaybe<SubscriberInput>>;
};

export type DeleteMessagePayload = {
  messageId: Scalars["ID"];
  threadId: Scalars["ID"];
};

export type DeleteThreadPayload = {
  id: Scalars["ID"];
};

export type EditMessagePayload = {
  messageId: Scalars["ID"];
  threadId: Scalars["ID"];
  value: Scalars["String"];
};

export type GetAllThreadsByRelationshipPayload = {
  id: Scalars["ID"];
  relationshipProperty: Scalars["String"];
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
  getAllThreads?: Maybe<Array<Maybe<Thread>>>;
  getAllThreadsByRelationship?: Maybe<Array<Maybe<Thread>>>;
  getThread?: Maybe<Thread>;
  login?: Maybe<LoginResponse>;
  logout?: Maybe<LogOutResponse>;
  me?: Maybe<MeResponse>;
  requestPasswordReset?: Maybe<RequestPasswordResetResponse>;
};

export type QueryGetAllThreadsByRelationshipArgs = {
  payload?: InputMaybe<GetAllThreadsByRelationshipPayload>;
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

export type Subscriber = {
  __typename?: "Subscriber";
  displayName?: Maybe<Scalars["String"]>;
  id: Scalars["ID"];
};

export type SubscriberInput = {
  displayName?: InputMaybe<Scalars["String"]>;
  id: Scalars["ID"];
};

export type Thread = {
  __typename?: "Thread";
  id: Scalars["ID"];
  isTyping: Array<Maybe<Scalars["String"]>>;
  messages: Array<Maybe<Message>>;
  name: Scalars["String"];
  subscribers: Array<Maybe<Subscriber>>;
};

export type UpdateThreadPayload = {
  id: Scalars["ID"];
  name: Scalars["String"];
  subscribers: Array<InputMaybe<SubscriberInput>>;
};
