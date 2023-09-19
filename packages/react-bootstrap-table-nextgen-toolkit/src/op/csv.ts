import React from "react";

import { getMetaInfo, save, transform } from "../csv/exporter";

const csvDefaultOptions = {
  fileName: "spreadsheet.csv",
  separator: ",",
  ignoreHeader: false,
  ignoreFooter: true,
  noAutoBOM: true,
  blobType: "text/plain;charset=utf-8",
  exportAll: true,
  onlyExportSelection: false,
};

export default (Base: any) =>
  class CSVOperation extends React.Component<typeof Base> {
    _: any;
    tableExposedAPIEmitter: any;

    handleExportCSV = (source: any) => {
      const { columns, exportCSV, keyField } = this.props;
      const meta = getMetaInfo(columns);
      const options =
        exportCSV === true
          ? csvDefaultOptions
          : {
              ...csvDefaultOptions,
              ...exportCSV,
            };

      // get data for csv export
      let data: any;
      if (typeof source !== "undefined") {
        data = source;
      } else if (options.exportAll) {
        data = this.props.data;
      } else if (options.onlyExportFiltered) {
        const payload: { result: any } = { result: undefined };
        this.tableExposedAPIEmitter.emit("get.filtered.rows", payload);
        data = payload.result;
      } else {
        const payload = { result: undefined };
        this.tableExposedAPIEmitter.emit("get.table.data", payload);
        data = payload.result;
      }

      // filter data by row selection
      if (options.onlyExportSelection) {
        const payload = { result: undefined };
        this.tableExposedAPIEmitter.emit("get.selected.rows", payload);
        const selections = payload.result ?? [];
        // @ts-ignore
        data = data.filter((row: any) => selections.includes(row[keyField]));
      }

      const content = transform(data, meta, columns, this._, options);
      save(content, options);
    };
  };
