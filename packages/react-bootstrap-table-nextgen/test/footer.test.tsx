/* eslint no-unused-vars: 0 */
import 'jsdom-global/register';
import React from 'react';
// @ts-expect-error TS(7016): Could not find a declaration file for module 'enzy... Remove this comment to see the full error message
import { shallow, render } from 'enzyme';

import Const from '../src/const';
// @ts-expect-error TS(6142): Module '../src/footer' was resolved to '/Users/ter... Remove this comment to see the full error message
import Footer from '../src/footer';
import FooterCell from '../src/footer-cell';

// @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
describe('Footer', () => {
  let wrapper: any;
  const columns = [
    {
      dataField: 'id',
      text: 'ID',
      footer: 'Footer 1'
    },
    {
      dataField: 'name',
      text: 'Name',
      footer: (columnData: any, column: any) => 'Footer 2'
    }
  ];

  const data = [
    {
      id: 1,
      name: 'A'
    },
    {
      id: 2,
      name: 'B'
    }
  ];

  const selectRow = {
    mode: Const.ROW_SELECT_DISABLED,
    selected: [],
    hideSelectColumn: true
  };
  const expandRow = {
    renderer: undefined,
    expanded: [],
    nonExpandable: []
  };

  const keyField = 'id';

  // @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
  describe('simplest footer', () => {
    // @ts-expect-error TS(2304): Cannot find name 'beforeEach'.
    beforeEach(() => {
      wrapper = render(
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <Footer
          data={ data }
          columns={ columns }
          selectRow={ selectRow }
          expandRow={ expandRow }
        />
      );
    });

    // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('should render successfully', () => {
      // @ts-expect-error TS(2304): Cannot find name 'expect'.
      expect(wrapper.length).toBe(1);
      // @ts-expect-error TS(2304): Cannot find name 'expect'.
      expect(wrapper.find('tr').length).toBe(1);
      // @ts-expect-error TS(2304): Cannot find name 'expect'.
      expect(wrapper.find('th').length).toBe(columns.length);
    });
  });

  // @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
  describe('className prop is exists', () => {
    const className = 'test-class';

    // @ts-expect-error TS(2304): Cannot find name 'beforeEach'.
    beforeEach(() => {
      wrapper = shallow(
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <Footer
          data={ data }
          columns={ columns }
          className={ className }
          selectRow={ selectRow }
          expandRow={ expandRow }
        />
      );
    });

    // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('should render successfully', () => {
      // @ts-expect-error TS(2304): Cannot find name 'expect'.
      expect(wrapper.length).toBe(1);
      // @ts-expect-error TS(2304): Cannot find name 'expect'.
      expect(wrapper.find(`.${className}`).length).toBe(1);
    });
  });

  // @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
  describe('when selectRow prop is enable', () => {
    // @ts-expect-error TS(2304): Cannot find name 'beforeEach'.
    beforeEach(() => {
      wrapper = render(
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <Footer
          data={ data }
          columns={ columns }
          selectRow={ { ...selectRow, mode: 'radio', hideSelectColumn: false } }
          expandRow={ expandRow }
        />
      );
    });

    // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('should render successfully', () => {
      // @ts-expect-error TS(2304): Cannot find name 'expect'.
      expect(wrapper.length).toBe(1);
      // @ts-expect-error TS(2304): Cannot find name 'expect'.
      expect(wrapper.find('th').length).toBe(columns.length + 1);
    });
  });

  // @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
  describe('when expandRow prop is enable', () => {
    // @ts-expect-error TS(2304): Cannot find name 'beforeEach'.
    beforeEach(() => {
      wrapper = render(
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <Footer
          data={ data }
          columns={ columns }
          selectRow={ selectRow }
          expandRow={ { expandRow, showExpandColumn: true } }
        />
      );
    });

    // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('should render successfully', () => {
      // @ts-expect-error TS(2304): Cannot find name 'expect'.
      expect(wrapper.length).toBe(1);
      // @ts-expect-error TS(2304): Cannot find name 'expect'.
      expect(wrapper.find('th').length).toBe(columns.length + 1);
    });
  });
});
