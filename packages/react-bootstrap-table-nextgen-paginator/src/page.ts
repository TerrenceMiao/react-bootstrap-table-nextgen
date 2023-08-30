import Const from "./const";

const getNormalizedPage = (page: any, pageStartIndex: any) => {
  const offset = Math.abs(1 - pageStartIndex);
  return page + offset;
};

const endIndex = (page: any, sizePerPage: any, pageStartIndex: any) =>
  getNormalizedPage(page, pageStartIndex) * sizePerPage - 1;

const startIndex = (end: any, sizePerPage: any) => end - (sizePerPage - 1);

export const alignPage = (
  dataSize: any,
  prevDataSize: any,
  page: any,
  sizePerPage: any,
  pageStartIndex: any
) => {
  if (prevDataSize < dataSize) return page;
  if (page < pageStartIndex) return pageStartIndex;
  if (dataSize <= 0) return pageStartIndex;
  if (
    page >= Math.floor(dataSize / sizePerPage) + pageStartIndex &&
    pageStartIndex === 1
  ) {
    return Math.ceil(dataSize / sizePerPage);
  }
  if (page >= Math.floor(dataSize / sizePerPage) && pageStartIndex === 0) {
    const newPage = Math.ceil(dataSize / sizePerPage);
    return newPage - Math.abs(Const.PAGE_START_INDEX - pageStartIndex);
  }
  return page;
};

export const getByCurrPage = (
  data: any,
  page: any,
  sizePerPage: any,
  pageStartIndex: any
) => {
  const dataSize = data.length;
  if (!dataSize) return [];

  const end = endIndex(page, sizePerPage, pageStartIndex);
  const start = startIndex(end, sizePerPage);

  const result = [];
  for (let i = start; i <= end; i += 1) {
    result.push(data[i]);
    if (i + 1 === dataSize) break;
  }
  return result;
};
