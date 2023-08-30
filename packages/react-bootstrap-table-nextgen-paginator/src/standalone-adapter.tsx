/* eslint react/prop-types: 0 */
import React from "react";

export default (WrappedComponent: any) =>
  ({ page, sizePerPage, ...rest }: any) =>
    (
      <WrappedComponent
        {...rest}
        currPage={page}
        currSizePerPage={sizePerPage}
      />
    );
