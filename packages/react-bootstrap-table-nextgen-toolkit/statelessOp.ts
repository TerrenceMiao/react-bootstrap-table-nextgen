import React from "react";

import Operation from "./src/op";

export default (Base: any) =>
  class StatelessOperation extends Operation.csvOperation(Base) {
    registerExposedAPI = (tableExposedAPIEmitter: any) => {
      this.tableExposedAPIEmitter = tableExposedAPIEmitter;
    };
  };
