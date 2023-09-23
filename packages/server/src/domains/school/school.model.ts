export enum SCHOOL_MODELS {
  school = "school"
}

export const SchoolModel = {
  name: String,
  primaryEmail: String,
  refreshToken: String,
  accessToken: String,
  dbConnection: String,
  clientSeats: Number
};
