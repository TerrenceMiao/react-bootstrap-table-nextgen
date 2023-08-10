import _ from "../utils";
import { getRowByRowId } from "./rows";

export const editCell = (data: any, keyField: any, rowId: any, dataField: any, newValue: any) => {
  const row = getRowByRowId(data, keyField, rowId);
  if (row) _.set(row, dataField, newValue);
};
