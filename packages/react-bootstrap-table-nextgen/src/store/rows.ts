import _ from "../utils";

export const matchRow = (keyField: any, id: any) => (row: any) => _.get(row, keyField) === id;

export const getRowByRowId = (data: any, keyField: any, id: any) => data.find(matchRow(keyField, id));
