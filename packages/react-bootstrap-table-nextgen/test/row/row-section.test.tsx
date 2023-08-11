import React from 'react';
// @ts-expect-error TS(7016): Could not find a declaration file for module 'enzy... Remove this comment to see the full error message
import { shallow } from 'enzyme';

// @ts-expect-error TS(6142): Module '../../src/row/row-section' was resolved to... Remove this comment to see the full error message
import RowSection from '../../src/row/row-section';

// @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
describe('Row', () => {
  const colSpan = 3;
  let wrapper: any;
  let content: any;

  // @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
  describe('simplest row-section', () => {
    // @ts-expect-error TS(2304): Cannot find name 'beforeEach'.
    beforeEach(() => {
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      wrapper = shallow(<RowSection content={ content } colSpan={ colSpan } />);
    });

    // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('should render successfully', () => {
      // @ts-expect-error TS(2304): Cannot find name 'expect'.
      expect(wrapper.length).toBe(1);
      // @ts-expect-error TS(2304): Cannot find name 'expect'.
      expect(wrapper.find('tr').length).toBe(1);
      // @ts-expect-error TS(2304): Cannot find name 'expect'.
      expect(wrapper.find('td').length).toBe(1);
      // @ts-expect-error TS(2304): Cannot find name 'expect'.
      expect(wrapper.find('td').prop('colSpan')).toEqual(colSpan);
      // @ts-expect-error TS(2304): Cannot find name 'expect'.
      expect(wrapper.find('.react-bs-table-no-data').length).toBe(1);
    });
  });
});
