import React, { Component } from 'react';
// @ts-expect-error TS(7016): Could not find a declaration file for module 'enzy... Remove this comment to see the full error message
import { shallow } from 'enzyme';

import { extendTo } from '../test-helpers/mock-component';
import baseResolver from '../../src/props-resolver/index';

// @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
describe('TableResolver', () => {
  const keyField = 'id';
  const columns = [{
    dataField: keyField,
    text: 'ID'
  }, {
    dataField: 'name',
    text: 'Name'
  }];
  const data = [{
    id: 1,
    name: 'A'
  }, {
    id: 2,
    name: 'B'
  }];

  const ExtendBase = baseResolver(Component);
  const BootstrapTableMock = extendTo(ExtendBase);
  let wrapper: any;

  // @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
  describe('visibleRows', () => {
    // @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
    describe('if hiddenRows prop is not existing', () => {
      // @ts-expect-error TS(2304): Cannot find name 'beforeEach'.
      beforeEach(() => {
        // @ts-expect-error TS(2769): No overload matches this call.
        const mockElement = React.createElement(BootstrapTableMock, {
          data, columns, keyField
        }, null);
        wrapper = shallow(mockElement);
      });

      // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
      it('should return correct data', () => {
        // @ts-expect-error TS(2304): Cannot find name 'expect'.
        expect(wrapper.instance().visibleRows()).toEqual(data);
      });
    });

    // @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
    describe('if hiddenRows prop is an empty array', () => {
      // @ts-expect-error TS(2304): Cannot find name 'beforeEach'.
      beforeEach(() => {
        // @ts-expect-error TS(2769): No overload matches this call.
        const mockElement = React.createElement(BootstrapTableMock, {
          data, columns, keyField, hiddenRows: []
        }, null);
        wrapper = shallow(mockElement);
      });

      // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
      it('should return correct data', () => {
        // @ts-expect-error TS(2304): Cannot find name 'expect'.
        expect(wrapper.instance().visibleRows()).toEqual(data);
      });
    });

    // @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
    describe('if hiddenRows prop is not an empty array', () => {
      const hiddenRows = [1];

      // @ts-expect-error TS(2304): Cannot find name 'beforeEach'.
      beforeEach(() => {
        // @ts-expect-error TS(2769): No overload matches this call.
        const mockElement = React.createElement(BootstrapTableMock, {
          data, columns, keyField, hiddenRows
        }, null);
        wrapper = shallow(mockElement);
      });

      // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
      it('should return correct data', () => {
        const result = wrapper.instance().visibleRows();
        // @ts-expect-error TS(2304): Cannot find name 'expect'.
        expect(result).toHaveLength(data.length - hiddenRows.length);
        // @ts-expect-error TS(2304): Cannot find name 'expect'.
        expect(result).toEqual(data.filter(d => !hiddenRows.includes(d.id)));
      });
    });
  });

  // @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
  describe('validateProps', () => {
    // @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
    describe('if keyField is defined and columns is all visible', () => {
      // @ts-expect-error TS(2304): Cannot find name 'beforeEach'.
      beforeEach(() => {
        // @ts-expect-error TS(2769): No overload matches this call.
        const mockElement = React.createElement(BootstrapTableMock, {
          data, columns, keyField
        }, null);
        wrapper = shallow(mockElement);
      });

      // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
      it('should not throw any errors', () => {
        // @ts-expect-error TS(2304): Cannot find name 'expect'.
        expect(() => wrapper.instance().validateProps()).not.toThrow();
      });
    });

    // @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
    describe('if keyField is not defined on props', () => {
      // @ts-expect-error TS(2304): Cannot find name 'beforeEach'.
      beforeEach(() => {
        // @ts-expect-error TS(2769): No overload matches this call.
        const mockElement = React.createElement(BootstrapTableMock, {
          data, columns
        }, null);
        wrapper = shallow(mockElement);
      });

      // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
      it('should throw error', () => {
        // @ts-expect-error TS(2304): Cannot find name 'expect'.
        expect(() =>
          wrapper.instance().validateProps()
        ).toThrow(new Error('Please specify a field as key via keyField'));
      });
    });

    // @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
    describe('if no columns are visible', () => {
      // @ts-expect-error TS(2304): Cannot find name 'beforeEach'.
      beforeEach(() => {
        // @ts-expect-error TS(2769): No overload matches this call.
        const mockElement = React.createElement(BootstrapTableMock, {
          data, keyField, columns: []
        }, null);
        wrapper = shallow(mockElement);
      });

      // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
      it('should throw error', () => {
        // @ts-expect-error TS(2304): Cannot find name 'expect'.
        expect(() =>
          wrapper.instance().validateProps()
        ).toThrow(new Error('No visible columns detected'));
      });
    });
  });
});
