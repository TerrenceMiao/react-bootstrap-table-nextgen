import _ from "../utils";
import { getRowByRowId } from "./rows";

export const getSelectionSummary = (
  data: any[] = [],
  keyField: any,
  selected: any[] = []
) => {
  let allRowsSelected = data.length > 0;
  let allRowsNotSelected = true;

  const rowKeys = data.map((d) => _.get(d, keyField));
  for (let i = 0; i < rowKeys.length; i += 1) {
    const curr = rowKeys[i];
    if (typeof selected.find((x) => x === curr) === "undefined") {
      allRowsSelected = false;
    } else {
      allRowsNotSelected = false;
    }
  }
  return {
    allRowsSelected,
    allRowsNotSelected,
  };
};

export const selectableKeys = (
  data: any[] = [],
  keyField: any,
  skips: any[] = []
) => {
  if (skips.length === 0) {
    return data.map((row) => _.get(row, keyField));
  }
  return data
    .filter((row) => !_.contains(skips, _.get(row, keyField)))
    .map((row) => _.get(row, keyField));
};

export const unSelectableKeys = (selected?: any, skips: any[] = []) => {
  if (skips?.length === 0) {
    return [];
  }
  return selected.filter((x: any) => _.contains(skips, x));
};

export const getSelectedRows = (
  data: any[] = [],
  keyField: any,
  selected: any
) =>
  selected
    .map((k: any) => getRowByRowId(data, keyField, k))
    .filter((x: any) => !!x);
