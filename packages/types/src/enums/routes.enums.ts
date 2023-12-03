export enum Routes {
  Home = "/",
  Program = "/programs/:programId",
  Books = "/books",
  Collection = "/books/:collectionId",
  Observe = "/programs/:programId/observe",
  Users = "/directory",
  User = "/directory/:userId",
  Results = "/results/:programId",
  Result = "/result/:resultId",
  Login = "/login",
  School = "/schools"
}

export enum Pages {
  Home = "Home",
  Programs = "Programs",
  Program = "Program",
  Observe = "Observe",
  Users = "Directory",
  User = "User",
  Result = "Result",
  Results = "Results",
  Login = "Login",
  School = "School",
  Books = "Books",
  Collection = "Collection"
}

export enum NavTitles {
  Home = "Home",
  Programs = "Programs",
  Books = "Books",
  Users = "Directory",
  Chat = "Chat",
  School = "School"
}
