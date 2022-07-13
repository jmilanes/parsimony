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

export type CreateThreadPayload = {
  name?: InputMaybe<Scalars['String']>;
  subscribers?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type CreateUserPayload = {
  contacts?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  dateOfBirth?: InputMaybe<Scalars['Date']>;
  documents?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  email?: InputMaybe<Scalars['String']>;
  firstName?: InputMaybe<Scalars['String']>;
  lastName?: InputMaybe<Scalars['String']>;
  password?: InputMaybe<Scalars['String']>;
  phone?: InputMaybe<Scalars['String']>;
  roles?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  schoolId?: InputMaybe<Scalars['String']>;
  timeZone?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type DeleteMessagePayload = {
  messageId?: InputMaybe<Scalars['ID']>;
  threadId?: InputMaybe<Scalars['ID']>;
};

export type DeletePayload = {
  id?: InputMaybe<Scalars['ID']>;
};

export type DeleteUserPayload = {
  id?: InputMaybe<Scalars['ID']>;
};

export type EditMessagePayload = {
  messageId?: InputMaybe<Scalars['ID']>;
  threadId?: InputMaybe<Scalars['ID']>;
  value?: InputMaybe<Scalars['String']>;
};

export type GetUserPayload = {
  id?: InputMaybe<Scalars['ID']>;
};

export type Message = {
  __typename?: 'Message';
  dataType?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  timeStamp?: Maybe<Scalars['Date']>;
  userId?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['String']>;
};

export type MessagePayload = {
  dataType?: InputMaybe<Scalars['String']>;
  message?: InputMaybe<MessagePayload>;
  threadId?: InputMaybe<Scalars['ID']>;
  userId?: InputMaybe<Scalars['String']>;
  value?: InputMaybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  addMessage?: Maybe<Thread>;
  createThread?: Maybe<Thread>;
  createUser?: Maybe<User>;
  deleteMessage?: Maybe<Scalars['ID']>;
  deleteThread?: Maybe<Scalars['ID']>;
  deleteUser?: Maybe<Scalars['ID']>;
  editMessage?: Maybe<Scalars['ID']>;
  updateThread?: Maybe<Thread>;
  updateUser?: Maybe<User>;
};


export type MutationAddMessageArgs = {
  payload?: InputMaybe<MessagePayload>;
};


export type MutationCreateThreadArgs = {
  payload?: InputMaybe<CreateThreadPayload>;
};


export type MutationCreateUserArgs = {
  payload?: InputMaybe<CreateUserPayload>;
};


export type MutationDeleteMessageArgs = {
  payload?: InputMaybe<DeleteMessagePayload>;
};


export type MutationDeleteThreadArgs = {
  payload?: InputMaybe<DeletePayload>;
};


export type MutationDeleteUserArgs = {
  payload?: InputMaybe<DeleteUserPayload>;
};


export type MutationEditMessageArgs = {
  payload?: InputMaybe<EditMessagePayload>;
};


export type MutationUpdateThreadArgs = {
  payload?: InputMaybe<UpdateThreadPayload>;
};


export type MutationUpdateUserArgs = {
  payload?: InputMaybe<UpdateUserPayload>;
};

export type Query = {
  __typename?: 'Query';
  getAllUsers?: Maybe<Array<Maybe<User>>>;
  getUser?: Maybe<User>;
  threads?: Maybe<Array<Maybe<Thread>>>;
};


export type QueryGetUserArgs = {
  payload?: InputMaybe<GetUserPayload>;
};

export type Thread = {
  __typename?: 'Thread';
  id: Scalars['ID'];
  isTyping?: Maybe<Array<Maybe<Scalars['String']>>>;
  messages?: Maybe<Array<Maybe<Message>>>;
  name?: Maybe<Scalars['String']>;
  subscribers?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type UpdateThreadPayload = {
  id?: InputMaybe<Scalars['ID']>;
  name?: InputMaybe<Scalars['String']>;
  subscribers?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type UpdateUserPayload = {
  contacts?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  dateOfBirth?: InputMaybe<Scalars['Date']>;
  documents?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  email?: InputMaybe<Scalars['String']>;
  firstName?: InputMaybe<Scalars['String']>;
  id: Scalars['ID'];
  lastName?: InputMaybe<Scalars['String']>;
  password?: InputMaybe<Scalars['String']>;
  phone?: InputMaybe<Scalars['String']>;
  roles?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  schoolId?: InputMaybe<Scalars['String']>;
  timeZone?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type User = {
  __typename?: 'User';
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
  roles?: Maybe<Array<Maybe<Scalars['String']>>>;
  schoolId?: Maybe<Scalars['String']>;
  timeZone?: Maybe<Scalars['String']>;
  type?: Maybe<Array<Maybe<Scalars['String']>>>;
  updated_at?: Maybe<Scalars['Date']>;
};



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
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  CreateThreadPayload: CreateThreadPayload;
  CreateUserPayload: CreateUserPayload;
  Date: ResolverTypeWrapper<Scalars['Date']>;
  DeleteMessagePayload: DeleteMessagePayload;
  DeletePayload: DeletePayload;
  DeleteUserPayload: DeleteUserPayload;
  EditMessagePayload: EditMessagePayload;
  GetUserPayload: GetUserPayload;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  Message: ResolverTypeWrapper<Message>;
  MessagePayload: MessagePayload;
  Mutation: ResolverTypeWrapper<{}>;
  Query: ResolverTypeWrapper<{}>;
  String: ResolverTypeWrapper<Scalars['String']>;
  Thread: ResolverTypeWrapper<Thread>;
  UpdateThreadPayload: UpdateThreadPayload;
  UpdateUserPayload: UpdateUserPayload;
  User: ResolverTypeWrapper<User>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Boolean: Scalars['Boolean'];
  CreateThreadPayload: CreateThreadPayload;
  CreateUserPayload: CreateUserPayload;
  Date: Scalars['Date'];
  DeleteMessagePayload: DeleteMessagePayload;
  DeletePayload: DeletePayload;
  DeleteUserPayload: DeleteUserPayload;
  EditMessagePayload: EditMessagePayload;
  GetUserPayload: GetUserPayload;
  ID: Scalars['ID'];
  Message: Message;
  MessagePayload: MessagePayload;
  Mutation: {};
  Query: {};
  String: Scalars['String'];
  Thread: Thread;
  UpdateThreadPayload: UpdateThreadPayload;
  UpdateUserPayload: UpdateUserPayload;
  User: User;
};

export interface DateScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Date'], any> {
  name: 'Date';
}

export type MessageResolvers<ContextType = any, ParentType extends ResolversParentTypes['Message'] = ResolversParentTypes['Message']> = {
  dataType?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  timeStamp?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  userId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  value?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  addMessage?: Resolver<Maybe<ResolversTypes['Thread']>, ParentType, ContextType, Partial<MutationAddMessageArgs>>;
  createThread?: Resolver<Maybe<ResolversTypes['Thread']>, ParentType, ContextType, Partial<MutationCreateThreadArgs>>;
  createUser?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, Partial<MutationCreateUserArgs>>;
  deleteMessage?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType, Partial<MutationDeleteMessageArgs>>;
  deleteThread?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType, Partial<MutationDeleteThreadArgs>>;
  deleteUser?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType, Partial<MutationDeleteUserArgs>>;
  editMessage?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType, Partial<MutationEditMessageArgs>>;
  updateThread?: Resolver<Maybe<ResolversTypes['Thread']>, ParentType, ContextType, Partial<MutationUpdateThreadArgs>>;
  updateUser?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, Partial<MutationUpdateUserArgs>>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  getAllUsers?: Resolver<Maybe<Array<Maybe<ResolversTypes['User']>>>, ParentType, ContextType>;
  getUser?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, Partial<QueryGetUserArgs>>;
  threads?: Resolver<Maybe<Array<Maybe<ResolversTypes['Thread']>>>, ParentType, ContextType>;
};

export type ThreadResolvers<ContextType = any, ParentType extends ResolversParentTypes['Thread'] = ResolversParentTypes['Thread']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  isTyping?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
  messages?: Resolver<Maybe<Array<Maybe<ResolversTypes['Message']>>>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  subscribers?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
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
  roles?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
  schoolId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  timeZone?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  type?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
  updated_at?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  Date?: GraphQLScalarType;
  Message?: MessageResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Thread?: ThreadResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
};

