import {
  StoreCollections,
  CreateDocumentPayload,
  DeleteDocumentPayload,
  Document,
  GetAllDocumentsByRelationshipPayload,
  GetDocumentPayload,
  UpdateDocumentPayload
} from "@parsimony/types";
import { AsyncDataHandlerInterface } from "../asyncDataHandler.interface";
import { documentRequests } from "@parsimony/bal";
import { Service } from "typedi";

@Service()
export class DocumentAsyncDataHandler extends AsyncDataHandlerInterface<
  Document,
  CreateDocumentPayload,
  DeleteDocumentPayload,
  UpdateDocumentPayload,
  GetDocumentPayload,
  GetAllDocumentsByRelationshipPayload
> {
  collectionName = StoreCollections.Document;
  requests = documentRequests;
}
