import _ from "../utils";
import { getRowByRowId } from "./rows";

export const isAnyExpands = (
  data: any,
  keyField: any,
  expanded: any[] = []
) => {
  for (let i = 0; i < data.length; i += 1) {
    const rowKey = _.get(data[i], keyField);
    if (typeof expanded.find(x => x === rowKey) !== "undefined") {
      return true;
    }
  }
  return false;
};

export const expandableKeys = (data: any, keyField: any, skips: any[] = []) => {
  if (skips.length === 0) {
    return data.map((row: any) => _.get(row, keyField));
  }
  return data
    .filter((row: any) => !_.contains(skips, _.get(row, keyField)))
    .map((row: any) => _.get(row, keyField));
};

export const getExpandedRows = (data: any, keyField: any, expanded: any) =>
  expanded.map((k: any) => getRowByRowId(data, keyField, k));
