export enum SCHOOL_MODELS {
  school = "school"
}

export const SchoolModel = {
  name: String,
  domain: String,
  userCount: Number,
  accessTokens: [String]
};
