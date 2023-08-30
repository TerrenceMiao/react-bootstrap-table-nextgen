import React from "react";
import PaginationTotal from "./pagination-total";
import paginationTotalAdapter from "./pagination-total-adapter";
import standaloneAdapter from "./standalone-adapter";

const PaginationTotalStandalone = (props: any) => (
  <PaginationTotal {...props} />
);

export default standaloneAdapter(
  paginationTotalAdapter(PaginationTotalStandalone)
);
