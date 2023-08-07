// @ts-expect-error TS(7016): Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import React from 'react';
// @ts-expect-error TS(6142): Module '../contexts/row-expand-context' was resolv... Remove this comment to see the full error message
import ExpansionContext from '../contexts/row-expand-context';

export default (Component: any) => () => (
  // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
  <ExpansionContext.Consumer>
    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    { (expandRow: any) => <Component { ...expandRow } /> }
  </ExpansionContext.Consumer>
);
