// @ts-expect-error TS(7016): Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import React from 'react';
// @ts-expect-error TS(6142): Module '../contexts/selection-context' was resolve... Remove this comment to see the full error message
import SelectionContext from '../contexts/selection-context';

export default (Component: any) => () => (
  // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
  <SelectionContext.Consumer>
    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    { (selectRow: any) => <Component { ...selectRow } /> }
  </SelectionContext.Consumer>
);
