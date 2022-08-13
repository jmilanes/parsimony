import { Collections } from "@parsimony/types";
import { mockSchoolData, mockUserData, mockProgramData } from "../fixtures";
import { ICollection } from "@parsimony/types";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type IDataCreationFns = Record<Collections, (payload: any) => void>;
type IMockDataObj = {
  type: Collections;
  data: ICollection[];
};

const generateData = (dataCreationFns: IDataCreationFns) => {
  const mockData: IMockDataObj[] = [
    { type: Collections.School, data: mockSchoolData },
    { type: Collections.Program, data: mockProgramData },
    { type: Collections.User, data: mockUserData }
  ];
  const createData = (mockDataObj: IMockDataObj) =>
    mockDataObj.data.forEach(dataCreationFns[mockDataObj.type]);

  mockData.forEach(createData);
};

export default generateData;
