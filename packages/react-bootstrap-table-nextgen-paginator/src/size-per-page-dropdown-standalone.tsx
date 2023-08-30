import React from "react";
import paginationHandler from "./pagination-handler";
import SizePerPageDropdown from "./size-per-page-dropdown";
import sizePerPageDropdownAdapter from "./size-per-page-dropdown-adapter";
import standaloneAdapter from "./standalone-adapter";

const SizePerPageDropdownStandalone = (props: any) => (
  <SizePerPageDropdown {...props} />
);

export default standaloneAdapter(
  paginationHandler(sizePerPageDropdownAdapter(SizePerPageDropdownStandalone))
);
