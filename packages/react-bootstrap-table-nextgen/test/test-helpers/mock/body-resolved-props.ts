import { ROW_SELECT_DISABLED } from "../../..";

export const rowSelectionResolvedProps = {
  mode: ROW_SELECT_DISABLED,
  selected: [],
  hideSelectColumn: true,
};

export const expandRowResolvedProps = {
  renderer: undefined,
  expanded: [],
};

export const cellEditResolvedProps = {
  mode: null,
  nonEditableRows: [],
};

export default {
  cellEdit: cellEditResolvedProps,
  expandRow: expandRowResolvedProps,
  selectRow: rowSelectionResolvedProps,
};
