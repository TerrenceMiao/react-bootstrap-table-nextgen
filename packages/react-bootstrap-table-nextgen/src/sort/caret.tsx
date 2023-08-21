import cs from "classnames";
import React from "react";
import { SORT_ASC } from "../..";
import { BootstrapContext } from "../contexts/bootstrap";

interface SortCaretProps {
  order: string;
}

const SortCaret: React.FC<SortCaretProps> = ({ order }) => {
  const orderClass = cs("react-bootstrap-table-sort-order", {
    dropup: order === SORT_ASC,
  });

  return (
    <BootstrapContext.Consumer>
      {({ bootstrap4 }) =>
        bootstrap4 ? (
          <span className={`caret-4-${order}`} />
        ) : (
          <span className={orderClass}>
            <span className="caret" />
          </span>
        )
      }
    </BootstrapContext.Consumer>
  );
};

export default SortCaret;
