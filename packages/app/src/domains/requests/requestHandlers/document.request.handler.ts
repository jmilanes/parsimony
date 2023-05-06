import {
  Domains,
  CreateDocumentPayload,
  DeleteDocumentPayload,
  Document,
  GetAllDocumentsByRelationshipPayload,
  GetDocumentPayload,
  UpdateDocumentPayload
} from "@parsimony/types";
import { IRequestHandler } from "../IRequestHandler";
import { documentRequests } from "@parsimony/bal";
import { Service } from "typedi";

@Service()
export class DocumentRequestHandler extends IRequestHandler<
  Document,
  CreateDocumentPayload,
  DeleteDocumentPayload,
  UpdateDocumentPayload,
  GetDocumentPayload,
  GetAllDocumentsByRelationshipPayload
> {
  domainName = Domains.Document;
  requests = documentRequests;
}
