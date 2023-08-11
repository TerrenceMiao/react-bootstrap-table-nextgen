import React from 'react';
// @ts-expect-error TS(7016): Could not find a declaration file for module 'enzy... Remove this comment to see the full error message
import { shallow } from 'enzyme';

import shouldUpdater from '../../src/row/should-updater';

// @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
describe('Row shouldUpdater', () => {
  let wrapper: any;
  let props: any;
  let nextProps;

  class DummyComponent extends shouldUpdater(React.Component) {
    render() { return null; }
  }

  // @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
  describe('shouldUpdateByCellEditing', () => {
    // @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
    describe('when nextProps.clickToEdit and nexrProps.dbclickToEdit both are negative', () => {
      // @ts-expect-error TS(2304): Cannot find name 'beforeEach'.
      beforeEach(() => {
        props = {
          editingRowIdx: null,
          rowIndex: 0
        };
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        wrapper = shallow(<DummyComponent { ...props } />);
      });

      // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
      it('should always return false', () => {
        nextProps = { ...props, editingRowIdx: 0 };
        // @ts-expect-error TS(2304): Cannot find name 'expect'.
        expect(wrapper.instance().shouldUpdateByCellEditing(nextProps)).toBeFalsy();
      });
    });
    // @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
    describe('when nextProps.editingRowIdx eq props.rowIndex and it\' not null', () => {
      // @ts-expect-error TS(2304): Cannot find name 'beforeEach'.
      beforeEach(() => {
        props = {
          clickToEdit: true,
          editingRowIdx: null,
          rowIndex: 0
        };
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        wrapper = shallow(<DummyComponent { ...props } />);
      });

      // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
      it('should return true', () => {
        nextProps = { ...props, editingRowIdx: 0 };
        // @ts-expect-error TS(2304): Cannot find name 'expect'.
        expect(wrapper.instance().shouldUpdateByCellEditing(nextProps)).toBeTruthy();
      });
    });

    // @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
    describe('when props.editingRowIdx eq props.rowIndex but nextProps.editingRowIdx is null', () => {
      // @ts-expect-error TS(2304): Cannot find name 'beforeEach'.
      beforeEach(() => {
        props = {
          clickToEdit: true,
          editingRowIdx: 0,
          rowIndex: 0
        };
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        wrapper = shallow(<DummyComponent { ...props } />);
      });

      // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
      it('should return true', () => {
        nextProps = { ...props, editingRowIdx: null };
        // @ts-expect-error TS(2304): Cannot find name 'expect'.
        expect(wrapper.instance().shouldUpdateByCellEditing(nextProps)).toBeTruthy();
      });
    });
  });

  // @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
  describe('shouldUpdatedBySelfProps', () => {
    // @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
    describe('when nextProps.className is not eq props.className', () => {
      // @ts-expect-error TS(2304): Cannot find name 'beforeEach'.
      beforeEach(() => {
        props = {
          className: ''
        };
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        wrapper = shallow(<DummyComponent { ...props } />);
      });

      // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
      it('should return true', () => {
        nextProps = { ...props, className: 'test' };
        // @ts-expect-error TS(2304): Cannot find name 'expect'.
        expect(wrapper.instance().shouldUpdatedBySelfProps(nextProps)).toBeTruthy();
      });
    });

    // @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
    describe('when nextProps.style is not eq props.style', () => {
      // @ts-expect-error TS(2304): Cannot find name 'beforeEach'.
      beforeEach(() => {
        props = {
          style: null
        };
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        wrapper = shallow(<DummyComponent { ...props } />);
      });

      // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
      it('should return true', () => {
        nextProps = { ...props, style: { color: 'red' } };
        // @ts-expect-error TS(2304): Cannot find name 'expect'.
        expect(wrapper.instance().shouldUpdatedBySelfProps(nextProps)).toBeTruthy();
      });
    });

    // @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
    describe('when nextProps.attrs is not eq props.attrs', () => {
      // @ts-expect-error TS(2304): Cannot find name 'beforeEach'.
      beforeEach(() => {
        props = {
          attrs: null
        };
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        wrapper = shallow(<DummyComponent { ...props } />);
      });

      // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
      it('should return true', () => {
        // @ts-expect-error TS(2304): Cannot find name 'jest'.
        nextProps = { ...props, attrs: { onClick: jest.fn() } };
        // @ts-expect-error TS(2304): Cannot find name 'expect'.
        expect(wrapper.instance().shouldUpdatedBySelfProps(nextProps)).toBeTruthy();
      });
    });
  });

  // @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
  describe('shouldUpdateByColumnsForSimpleCheck', () => {
    // @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
    describe('when nextProps.columns.length is not eq props.columns.length', () => {
      // @ts-expect-error TS(2304): Cannot find name 'beforeEach'.
      beforeEach(() => {
        props = {
          columns: [{ dataField: 'price', text: 'Price' }]
        };
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        wrapper = shallow(<DummyComponent { ...props } />);
      });

      // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
      it('should return true', () => {
        nextProps = { ...props, columns: [...props.columns, { dataField: 'name', text: 'Name' }] };
        // @ts-expect-error TS(2304): Cannot find name 'expect'.
        expect(wrapper.instance().shouldUpdateByColumnsForSimpleCheck(nextProps)).toBeTruthy();
      });
    });

    // @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
    describe('when any nextProps.columns.hidden is change', () => {
      // @ts-expect-error TS(2304): Cannot find name 'beforeEach'.
      beforeEach(() => {
        props = {
          columns: [{ dataField: 'price', text: 'Price' }]
        };
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        wrapper = shallow(<DummyComponent { ...props } />);
      });

      // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
      it('should return true', () => {
        nextProps = { ...props, columns: [{ dataField: 'price', text: 'Price', hidden: true }] };
        // @ts-expect-error TS(2304): Cannot find name 'expect'.
        expect(wrapper.instance().shouldUpdateByColumnsForSimpleCheck(nextProps)).toBeTruthy();
      });
    });

    // @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
    describe('if any nextProps.columns.hidden is not change and column length is same', () => {
      // @ts-expect-error TS(2304): Cannot find name 'beforeEach'.
      beforeEach(() => {
        props = {
          columns: [{ dataField: 'price', text: 'Price' }]
        };
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        wrapper = shallow(<DummyComponent { ...props } />);
      });

      // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
      it('should return false', () => {
        nextProps = { ...props, columns: [...props.columns] };
        // @ts-expect-error TS(2304): Cannot find name 'expect'.
        expect(wrapper.instance().shouldUpdateByColumnsForSimpleCheck(nextProps)).toBeFalsy();
      });
    });
  });

  // @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
  describe('shouldUpdatedByNormalProps', () => {
    // @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
    describe('when nextProps.rowIndex is not eq props.rowIndex', () => {
      // @ts-expect-error TS(2304): Cannot find name 'beforeEach'.
      beforeEach(() => {
        props = {
          rowIndex: 0
        };
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        wrapper = shallow(<DummyComponent { ...props } />);
      });

      // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
      it('should return true', () => {
        nextProps = { ...props, rowIndex: 1 };
        // @ts-expect-error TS(2304): Cannot find name 'expect'.
        expect(wrapper.instance().shouldUpdatedByNormalProps(nextProps)).toBeTruthy();
      });
    });

    // @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
    describe('when nextProps.editable is not eq props.editable', () => {
      // @ts-expect-error TS(2304): Cannot find name 'beforeEach'.
      beforeEach(() => {
        props = {
          editable: false
        };
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        wrapper = shallow(<DummyComponent { ...props } />);
      });

      // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
      it('should return true', () => {
        nextProps = { ...props, editable: true };
        // @ts-expect-error TS(2304): Cannot find name 'expect'.
        expect(wrapper.instance().shouldUpdatedByNormalProps(nextProps)).toBeTruthy();
      });
    });

    // @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
    describe('when nextProps.columns.length is not eq props.columns.length', () => {
      // @ts-expect-error TS(2304): Cannot find name 'beforeEach'.
      beforeEach(() => {
        props = {
          columns: [{ dataField: 'price', text: 'Price' }]
        };
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        wrapper = shallow(<DummyComponent { ...props } />);
      });

      // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
      it('should return true', () => {
        nextProps = { ...props, columns: [...props.columns, { dataField: 'name', text: 'Name' }] };
        // @ts-expect-error TS(2304): Cannot find name 'expect'.
        expect(wrapper.instance().shouldUpdatedByNormalProps(nextProps)).toBeTruthy();
      });
    });

    // @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
    describe('when nextProps.row is not eq props.row', () => {
      // @ts-expect-error TS(2304): Cannot find name 'beforeEach'.
      beforeEach(() => {
        props = {
          row: { id: 1, name: 'test' }
        };
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        wrapper = shallow(<DummyComponent { ...props } />);
      });

      // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
      it('should return true', () => {
        nextProps = { ...props, row: { id: 1, name: 'test', price: 123 } };
        // @ts-expect-error TS(2304): Cannot find name 'expect'.
        expect(wrapper.instance().shouldUpdatedByNormalProps(nextProps)).toBeTruthy();
      });
    });
  });
});
