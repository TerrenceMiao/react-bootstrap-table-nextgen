import React, { FC } from "react";

type RowSectionProps = {
  content?: React.ReactNode;
  colSpan?: number;
};

const RowSection: FC<RowSectionProps> = ({ content = null, colSpan = 1 }) => (
  <tr>
    <td
      data-toggle="collapse"
      colSpan={ colSpan }
      className="react-bs-table-no-data"
    >
      {content}
    </td>
  </tr>
);

export default RowSection;
