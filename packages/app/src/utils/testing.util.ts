export const parseDataTestId = (id: string) =>
  id.toLowerCase().replace(new RegExp(" ", "g"), "-");

export const generateDataTestId = (type: string, id: string) =>
  `${type.toUpperCase()}:${parseDataTestId(id)}`;
