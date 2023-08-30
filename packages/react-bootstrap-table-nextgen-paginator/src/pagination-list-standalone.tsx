import React from "react";
import PaginationHandler from "./pagination-handler";
import PaginationList from "./pagination-list";
import paginationListAdapter from "./pagination-list-adapter";
import standaloneAdapter from "./standalone-adapter";

const PaginationListStandalone = (props: any) => <PaginationList {...props} />;

export default standaloneAdapter(
  PaginationHandler(paginationListAdapter(PaginationListStandalone))
);
