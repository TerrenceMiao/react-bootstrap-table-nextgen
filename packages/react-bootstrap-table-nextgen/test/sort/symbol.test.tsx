import React from 'react';

import { shallowWithContext } from '../test-helpers/new-context';
// @ts-expect-error TS(6142): Module '../../src/sort/symbol' was resolved to '/U... Remove this comment to see the full error message
import SortSymbol from '../../src/sort/symbol';

// @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
describe('SortSymbol', () => {
  let wrapper: any;
  // @ts-expect-error TS(2304): Cannot find name 'beforeEach'.
  beforeEach(() => {
    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    wrapper = shallowWithContext(<SortSymbol />, { bootstrap4: false });
  });
  // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
  it('should render sort symbol correctly', () => {
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(wrapper.length).toBe(1);
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(wrapper.find('.order').length).toBe(1);
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(wrapper.find('.caret').length).toBe(2);
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(wrapper.find('.dropdown').length).toBe(1);
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(wrapper.find('.dropup').length).toBe(1);
  });

  // @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
  describe('if bootstrap4 prop is true', () => {
    // @ts-expect-error TS(2304): Cannot find name 'beforeEach'.
    beforeEach(() => {
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      wrapper = shallowWithContext(<SortSymbol />, { bootstrap4: true });
    });
    // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('should render sort symbol correctly', () => {
      // @ts-expect-error TS(2304): Cannot find name 'expect'.
      expect(wrapper.length).toBe(1);
      // @ts-expect-error TS(2304): Cannot find name 'expect'.
      expect(wrapper.find('.order-4').length).toBe(1);
    });
  });
});
