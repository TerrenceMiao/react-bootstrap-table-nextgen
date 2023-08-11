import React from 'react';
// @ts-expect-error TS(7016): Could not find a declaration file for module 'sino... Remove this comment to see the full error message
import sinon from 'sinon';
// @ts-expect-error TS(7016): Could not find a declaration file for module 'enzy... Remove this comment to see the full error message
import { shallow } from 'enzyme';

// @ts-expect-error TS(6142): Module '../../src/row/row-pure-content' was resolv... Remove this comment to see the full error message
import RowPureContent from '../../src/row/row-pure-content';
// @ts-expect-error TS(6142): Module '../../src/row/simple-row' was resolved to ... Remove this comment to see the full error message
import SimpleRow from '../../src/row/simple-row';

let defaultColumns = [{
  dataField: 'id',
  text: 'ID'
}, {
  dataField: 'name',
  text: 'Name'
}, {
  dataField: 'price',
  text: 'Price'
}];

const keyField = 'id';
const rowIndex = 1;

// @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
describe('SimpleRow', () => {
  let wrapper: any;

  const row = {
    id: 1,
    name: 'A',
    price: 1000
  };

  // @ts-expect-error TS(2304): Cannot find name 'beforeEach'.
  beforeEach(() => {
    defaultColumns = [{
      dataField: 'id',
      text: 'ID'
    }, {
      dataField: 'name',
      text: 'Name'
    }, {
      dataField: 'price',
      text: 'Price'
    }];
  });

  // @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
  describe('simplest row', () => {
    // @ts-expect-error TS(2304): Cannot find name 'beforeEach'.
    beforeEach(() => {
      wrapper = shallow(
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <SimpleRow
          keyField={ keyField }
          rowIndex={ rowIndex }
          columns={ defaultColumns }
          row={ row }
        />
      );
    });

    // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('should render successfully', () => {
      // @ts-expect-error TS(2304): Cannot find name 'expect'.
      expect(wrapper.length).toBe(1);
      // @ts-expect-error TS(2304): Cannot find name 'expect'.
      expect(wrapper.find(RowPureContent)).toHaveLength(1);
    });

    // @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
    describe('when tabIndexCell prop is enable', () => {
      const visibleColumnSize = 3;
      // @ts-expect-error TS(2304): Cannot find name 'beforeEach'.
      beforeEach(() => {
        wrapper = shallow(
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <SimpleRow
            keyField={ keyField }
            rowIndex={ rowIndex }
            columns={ defaultColumns }
            row={ row }
            tabIndexCell
            visibleColumnSize={ visibleColumnSize }
          />
        );
      });

      // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
      it('should render correct tabIndexStart', () => {
        // @ts-expect-error TS(2304): Cannot find name 'expect'.
        expect(wrapper.length).toBe(1);
        // @ts-expect-error TS(2304): Cannot find name 'expect'.
        expect(wrapper.find(RowPureContent)).toHaveLength(1);
        // @ts-expect-error TS(2304): Cannot find name 'expect'.
        expect(wrapper.find(RowPureContent).prop('tabIndexStart')).toBe((rowIndex * visibleColumnSize) + 1);
      });
    });

    // @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
    describe('when tabIndexCell prop is disable', () => {
      const visibleColumnSize = 3;
      // @ts-expect-error TS(2304): Cannot find name 'beforeEach'.
      beforeEach(() => {
        wrapper = shallow(
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <SimpleRow
            keyField={ keyField }
            rowIndex={ rowIndex }
            columns={ defaultColumns }
            row={ row }
            visibleColumnSize={ visibleColumnSize }
          />
        );
      });

      // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
      it('should always render tabIndexStart as -1', () => {
        // @ts-expect-error TS(2304): Cannot find name 'expect'.
        expect(wrapper.length).toBe(1);
        // @ts-expect-error TS(2304): Cannot find name 'expect'.
        expect(wrapper.find(RowPureContent)).toHaveLength(1);
        // @ts-expect-error TS(2304): Cannot find name 'expect'.
        expect(wrapper.find(RowPureContent).prop('tabIndexStart')).toBe(-1);
      });
    });
  });

  // @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
  describe('shouldComponentUpdate', () => {
    let props: any;
    let nextProps;
    // @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
    describe('if shouldUpdatedByNormalProps return true', () => {
      // @ts-expect-error TS(2304): Cannot find name 'beforeEach'.
      beforeEach(() => {
        props = {
          keyField,
          columns: defaultColumns,
          rowIndex: 1,
          row,
          editable: true
        };
        wrapper = shallow(
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <SimpleRow { ...props } />
        );
      });

      // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
      it('should return true', () => {
        nextProps = { ...props, rowIndex: 2 };
        // @ts-expect-error TS(2304): Cannot find name 'expect'.
        expect(wrapper.instance().shouldComponentUpdate(nextProps)).toBe(true);
      });

      // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
      it('should set this.shouldUpdateRowContent as true', () => {
        nextProps = { ...props, rowIndex: 2 };
        wrapper.instance().shouldComponentUpdate(nextProps);
        // @ts-expect-error TS(2304): Cannot find name 'expect'.
        expect(wrapper.instance().shouldUpdateRowContent).toBe(true);
      });
    });

    // @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
    describe('if shouldUpdatedByNormalProps return false', () => {
      // @ts-expect-error TS(2304): Cannot find name 'beforeEach'.
      beforeEach(() => {
        props = {
          keyField,
          columns: defaultColumns,
          rowIndex: 1,
          row,
          editable: true
        };
        wrapper = shallow(
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <SimpleRow { ...props } />
        );
      });

      // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
      it('should return value which depends on the result of shouldUpdatedBySelfProps', () => {
        nextProps = { ...props, className: 'test' };
        // @ts-expect-error TS(2304): Cannot find name 'expect'.
        expect(wrapper.instance().shouldComponentUpdate(nextProps)).toBe(true);
      });

      // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
      it('should always set this.shouldUpdateRowContent as false', () => {
        nextProps = { ...props, className: 'test' };
        wrapper.instance().shouldComponentUpdate(nextProps);
        // @ts-expect-error TS(2304): Cannot find name 'expect'.
        expect(wrapper.instance().shouldUpdateRowContent).toBe(false);
      });
    });
  });

  // @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
  describe('when style prop is defined', () => {
    const customStyle = { backgroundColor: 'red' };
    // @ts-expect-error TS(2304): Cannot find name 'beforeEach'.
    beforeEach(() => {
      wrapper = shallow(
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <SimpleRow
          rowIndex={ rowIndex }
          columns={ defaultColumns }
          row={ row }
          style={ customStyle }
        />);
    });

    // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('should render component with style successfully', () => {
      // @ts-expect-error TS(2304): Cannot find name 'expect'.
      expect(wrapper.length).toBe(1);
      // @ts-expect-error TS(2304): Cannot find name 'expect'.
      expect(wrapper.prop('style')).toEqual(customStyle);
    });
  });

  // @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
  describe('when className prop is defined', () => {
    const className = 'test-class';
    // @ts-expect-error TS(2304): Cannot find name 'beforeEach'.
    beforeEach(() => {
      wrapper = shallow(
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <SimpleRow
          rowIndex={ rowIndex }
          columns={ defaultColumns }
          row={ row }
          className={ className }
        />);
    });

    // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('should render component with className successfully', () => {
      // @ts-expect-error TS(2304): Cannot find name 'expect'.
      expect(wrapper.length).toBe(1);
      // @ts-expect-error TS(2304): Cannot find name 'expect'.
      expect(wrapper.hasClass(className)).toBe(true);
    });
  });

  // @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
  describe('when attrs prop is defined', () => {
    const customClickCallBack = sinon.stub();
    const attrs = { 'data-index': 1, onClick: customClickCallBack };
    // @ts-expect-error TS(2304): Cannot find name 'beforeEach'.
    beforeEach(() => {
      wrapper = shallow(
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <SimpleRow
          rowIndex={ rowIndex }
          columns={ defaultColumns }
          row={ row }
          attrs={ attrs }
        />);
    });

    // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('should render component with correct attributes', () => {
      // @ts-expect-error TS(2304): Cannot find name 'expect'.
      expect(wrapper.length).toBe(1);
      // @ts-expect-error TS(2304): Cannot find name 'expect'.
      expect(wrapper.prop('data-index')).toBe(attrs['data-index']);
      // @ts-expect-error TS(2304): Cannot find name 'expect'.
      expect(wrapper.prop('onClick')).toBeDefined();
    });
  });
});
