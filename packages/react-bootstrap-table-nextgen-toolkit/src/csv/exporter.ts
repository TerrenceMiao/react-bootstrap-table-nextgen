/* eslint no-unneeded-ternary: 0 */
import FileSaver from "file-saver";

export const getMetaInfo = (columns: any) =>
  columns
    .map((column: any) => ({
      field: column.dataField,
      type: column.csvType || String,
      formatter: column.csvFormatter,
      formatExtraData: column.formatExtraData,
      header: column.csvText || column.text,
      export: column.csvExport === false ? false : true,
      row: Number(column.row) || 0,
      rowSpan: Number(column.rowSpan) || 1,
      colSpan: Number(column.colSpan) || 1,
      footer: column.footer,
      footerFormatter: column.footerFormatter,
    }))
    .filter((_: any) => _.export);

export const transform = (
  data: any,
  meta: any,
  columns: any,
  _: any,
  { separator, ignoreHeader, ignoreFooter }: any
) => {
  const visibleColumns = meta.filter((m: any) => m.export);
  let content = "";
  // extract csv header
  if (!ignoreHeader) {
    content += visibleColumns.map((m: any) => `"${m.header}"`).join(separator);
    content += "\n";
  }
  // extract csv body
  if (data.length === 0) return content;
  content += data
    .map((row: any, rowIndex: any) =>
      visibleColumns
        .map((m: any) => {
          let cellContent = _.get(row, m.field);
          if (m.formatter) {
            cellContent = m.formatter(
              cellContent,
              row,
              rowIndex,
              m.formatExtraData
            );
          }
          if (m.type === String) {
            return `"${`${cellContent}`.replace(/"/g, '""')}"`;
          }
          return cellContent;
        })
        .join(separator)
    )
    .join("\n");

  if (!ignoreFooter) {
    content += "\n";
    content += visibleColumns
      .map((m: any, i: any) => {
        if (typeof m.footer === "function") {
          const columnData = _.pluck(data, columns[i].dataField);
          return `"${m.footer(columnData, columns[i], i)}"`;
        } else if (m.footerFormatter) {
          return `"${m.footerFormatter(columns[i], i)}"`;
        }
        return `"${m.footer}"`;
      })
      .join(separator);
  }
  return content;
};

export const save = (content: any, { noAutoBOM, fileName, blobType }: any) => {
  FileSaver.saveAs(
    new Blob([content], { type: blobType }),
    fileName,
    noAutoBOM
  );
};
