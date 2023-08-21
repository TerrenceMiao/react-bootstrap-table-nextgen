import { TYPE_BOOLEAN, TYPE_DATE, TYPE_NUMBER, TYPE_STRING } from "../..";

export const typeConvert = (type: any, value: any) => {
  if (type === TYPE_STRING) {
    return String(value);
  } else if (type === TYPE_NUMBER) {
    return Number(value);
  } else if (type === TYPE_BOOLEAN) {
    if (typeof value === "boolean") {
      return value;
    }
    return value === "true";
  } else if (type === TYPE_DATE) {
    return new Date(value);
  }
  return value;
};
