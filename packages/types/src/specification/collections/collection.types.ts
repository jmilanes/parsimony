import { Default, Description, Optional, Required } from "@tsed/schema";
import { CollectionCategories, CollectionTypes } from "./collection.enums";

export class Collection {
  @Description("Ancestor collection ids.")
  @Optional()
  @Default([])
  ancestors?: string[] = [];

  @Description("Display type for collection")
  @Required()
  @Default(CollectionCategories.Book)
  category: CollectionCategories;

  @Description("Associated Client Id")
  @Optional()
  clientId?: string;

  @Description("Creators client id")
  @Optional()
  created_by?: string;

  @Description("UUID from database")
  @Required()
  id: string;

  //TODO: Maybe remove this...
  @Description("Last ancestor id")
  @Optional()
  parentCollectionId?: string;

  @Description("Title of the collection")
  @Required()
  title: string;

  @Description(
    "Save type for collection (weather it is associated with a client or not)"
  )
  @Required()
  @Default(CollectionTypes.Main)
  type: CollectionTypes;
}
