import mongoose from "mongoose";

export enum SCHOOL_MODELS {
  school = "school"
}

export const SchoolModel = {
  name: {
    type: String,
    required: true
  },
  refreshToken: {
    type: String,
    required: true
  },
  accessToken: {
    type: String,
    required: true
  },
  connectionString: {
    type: String,
    required: true
  },
  clientSeats: {
    type: Number,
    required: true
  }
};
