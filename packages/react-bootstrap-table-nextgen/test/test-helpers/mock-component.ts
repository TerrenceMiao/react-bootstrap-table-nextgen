import React from "react";

const extendTo =
  <T extends React.ComponentType<any>>(Base: T) =>
    (props: React.ComponentProps<T>) =>
      null;

export default extendTo;
