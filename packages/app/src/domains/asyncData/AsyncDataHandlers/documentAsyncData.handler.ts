import {
  CreateDocumentPayload,
  DeleteDocumentPayload,
  Document,
  GetAllDocumentsByRelationshipPayload,
  GetDocumentPayload,
  UpdateDocumentPayload
} from "@parsimony/types";
import { AsyncDataHandlerInterface } from "../asyncDataHandler.interface";

export class DocumentAsyncDataHandler extends AsyncDataHandlerInterface<
  Document,
  CreateDocumentPayload,
  DeleteDocumentPayload,
  UpdateDocumentPayload,
  GetDocumentPayload,
  GetAllDocumentsByRelationshipPayload
> {}
