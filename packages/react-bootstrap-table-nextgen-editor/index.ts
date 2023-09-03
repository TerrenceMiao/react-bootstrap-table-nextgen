import PropTypes from "prop-types";
import React from "react";

import createContext from "./src/context";
import createEditingCell from "./src/editing-cell-consumer";
import withRowLevelCellEdit from "./src/row-consumer";

export const TIME_TO_CLOSE_MESSAGE = 3000;
export const DELAY_FOR_DBCLICK = 200;
export const CLICK_TO_CELL_EDIT = "click";
export const DBCLICK_TO_CELL_EDIT = "dbclick";

export const EDITTYPE = {
  TEXT: "text",
  SELECT: "select",
  TEXTAREA: "textarea",
  CHECKBOX: "checkbox",
  DATE: "date",
};

export interface CellEditProviderProps {
  data: any[];
  selectRow?: any;
  cellEdit: {
    options: {
      mode: string;
      onErrorMessageDisappear?: Function;
      blurToSave: boolean;
      beforeSaveCell: Function;
      afterSaveCell: Function;
      onStartEdit: Function;
      nonEditableRows: Function;
      timeToCloseMessage: number;
      errorMessage: any;
    };
  };
  keyField: string;
  children: any;
}

export interface CellEditProviderState {
  ridx: number | null;
  cidx: number | null;
  message: any;
}

export default (options = {}) => ({
  createContext,
  createEditingCell,
  withRowLevelCellEdit,
  DBCLICK_TO_CELL_EDIT,
  DELAY_FOR_DBCLICK,
  options,
});

export const Type = EDITTYPE;
