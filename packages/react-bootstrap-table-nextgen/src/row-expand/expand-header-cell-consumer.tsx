import React from 'react';
import ExpansionContext, { RowExpandContextValue } from '../contexts/row-expand-context';
import { ExpansionHeaderCellProps } from './expand-header-cell';

interface Props extends ExpansionHeaderCellProps {
  expandRow?: RowExpandContextValue;
}

const withExpandContext = (Component: React.ComponentType<Props>) => () => (
  <ExpansionContext.Consumer>
    {expandRow => <Component expandRow={expandRow} />}
  </ExpansionContext.Consumer>
);

export default withExpandContext;
