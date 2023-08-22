import React, { FC, ReactNode } from "react";

interface CaptionProps {
  children?: ReactNode;
  bootstrap4?: boolean;
}

const Caption: FC<CaptionProps> = (props) => {
  if (!props.children) return null;

  const caption = props.bootstrap4 ? (
    <caption style={ { captionSide: "top" } }>{props.children}</caption>
  ) : (
    <caption>{props.children}</caption>
  );

  return caption;
};

// Caption.propTypes = {
//   children: PropTypes.oneOfType([
//     PropTypes.node,
//     PropTypes.string
//   ]),
//   bootstrap4: PropTypes.bool
// };

export default Caption;
