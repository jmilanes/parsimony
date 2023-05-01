import { threadTypeDefs } from "./threads";
import { userTypeDefs } from "./users";
import { programTypeDefs } from "./programs";
import { resultTypeDefs } from "./results";
import { schoolTypeDefs } from "./schools";
import { documentTypeDefs } from "./documents";
import { eventTypeDefs } from "./events";
import { fileTypeDefs } from "./files";
import { authTypeDefs } from "./auth";
import { collectionTypedefs } from "./collections";
import sharedTypeDefs from "./shredTypeDefs";

import { Container, Service } from "typedi";
import { ThreadResolver } from "./threads/threads.resolvers";
import { BaseCrudResolvers } from "./baseCrudResolver";
import { UserResolvers } from "./users/user.resolvers";
import { ProgramResolvers } from "./programs/program.resolvers";
import { ResultResolvers } from "./results/results.resolvers";
import { SchoolsResolvers } from "./schools/schools.resolvers";
import { DocumentResolvers } from "./documents/document.resolvers";
import { FileResolvers } from "./files/file.resolvers";
import { EventResolvers } from "./events/event.resolvers";
import { AuthResolvers } from "./auth/auth.resolvers";
import { CollectionResolvers } from "./collections/collection.resolvers";

@Service()
export class QueryService {
  #resolvers: (BaseCrudResolvers | AuthResolvers)[] = [
    Container.get(AuthResolvers),
    Container.get(ThreadResolver),
    Container.get(UserResolvers),
    Container.get(ProgramResolvers),
    Container.get(ResultResolvers),
    Container.get(SchoolsResolvers),
    Container.get(DocumentResolvers),
    Container.get(FileResolvers),
    Container.get(EventResolvers),
    Container.get(CollectionResolvers)
  ];

  public getResolvers = () => {
    return this.#resolvers.map((r) => r.getResolver());
  };

  public getTypeDefs = () => {
    return [
      authTypeDefs,
      threadTypeDefs,
      userTypeDefs,
      programTypeDefs,
      resultTypeDefs,
      schoolTypeDefs,
      documentTypeDefs,
      eventTypeDefs,
      fileTypeDefs,
      collectionTypedefs,
      ...sharedTypeDefs
    ];
  };
}
