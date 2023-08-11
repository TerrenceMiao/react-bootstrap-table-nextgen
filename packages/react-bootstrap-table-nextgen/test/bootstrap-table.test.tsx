import React from 'react';
// @ts-expect-error TS(7016): Could not find a declaration file for module 'enzy... Remove this comment to see the full error message
import { shallow } from 'enzyme';

// @ts-expect-error TS(6142): Module '../src/caption' was resolved to '/Users/te... Remove this comment to see the full error message
import Caption from '../src/caption';
// @ts-expect-error TS(6142): Module '../src/header' was resolved to '/Users/ter... Remove this comment to see the full error message
import Header from '../src/header';
// @ts-expect-error TS(6142): Module '../src/body' was resolved to '/Users/terre... Remove this comment to see the full error message
import Body from '../src/body';
// @ts-expect-error TS(6142): Module '../src/bootstrap-table' was resolved to '/... Remove this comment to see the full error message
import BootstrapTable from '../src/bootstrap-table';

// @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
describe('BootstrapTable', () => {
  let wrapper: any;
  const columns = [{
    dataField: 'id',
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

  // @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
  describe('simplest table', () => {
    // @ts-expect-error TS(2304): Cannot find name 'beforeEach'.
    beforeEach(() => {
      wrapper = shallow(
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <BootstrapTable keyField="id" columns={ columns } data={ data } />);
    });

    // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('should render successfully', () => {
      // @ts-expect-error TS(2304): Cannot find name 'expect'.
      expect(wrapper.length).toBe(1);
      // @ts-expect-error TS(2304): Cannot find name 'expect'.
      expect(wrapper.find('table.table').length).toBe(1);
      // @ts-expect-error TS(2304): Cannot find name 'expect'.
      expect(wrapper.find(Header).length).toBe(1);
      // @ts-expect-error TS(2304): Cannot find name 'expect'.
      expect(wrapper.find(Body).length).toBe(1);
    });

    // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it("should only have classes 'table' and 'table-bordered' as default", () => {
      // @ts-expect-error TS(2304): Cannot find name 'expect'.
      expect(wrapper.find('table').prop('className')).toBe('table table-bordered');
    });

    // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('should not have customized id as default', () => {
      // @ts-expect-error TS(2304): Cannot find name 'expect'.
      expect(wrapper.find('table').prop('id')).toBeUndefined();
    });
  });

  // @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
  describe('getData', () => {
    let instance: any;

    // @ts-expect-error TS(2304): Cannot find name 'beforeEach'.
    beforeEach(() => {
      wrapper = shallow(
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <BootstrapTable keyField="id" columns={ columns } data={ data } />);
      instance = wrapper.instance();
    });

    // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('should return props.data', () => {
      // @ts-expect-error TS(2304): Cannot find name 'expect'.
      expect(instance.getData()).toEqual(data);
    });
  });

  // @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
  describe('when props.classes was defined', () => {
    const classes = 'foo';

    // @ts-expect-error TS(2304): Cannot find name 'beforeEach'.
    beforeEach(() => {
      wrapper = shallow(
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <BootstrapTable
          keyField="id"
          columns={ columns }
          data={ data }
          classes={ classes }
        />);
    });

    // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('should display customized classes correctly', () => {
      // @ts-expect-error TS(2304): Cannot find name 'expect'.
      expect(wrapper.find(`table.${classes}`).length).toBe(1);
    });
  });

  // @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
  describe('when props.wrapperClasses was defined', () => {
    const classes = 'foo';

    // @ts-expect-error TS(2304): Cannot find name 'beforeEach'.
    beforeEach(() => {
      wrapper = shallow(
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <BootstrapTable
          keyField="id"
          columns={ columns }
          data={ data }
          wrapperClasses={ classes }
        />);
    });

    // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('should display customized classes correctly', () => {
      // @ts-expect-error TS(2304): Cannot find name 'expect'.
      expect(wrapper.find(`.${classes}`).length).toBe(1);
    });
  });

  // @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
  describe('when props.id was defined', () => {
    const id = 'foo';

    // @ts-expect-error TS(2304): Cannot find name 'beforeEach'.
    beforeEach(() => {
      wrapper = shallow(
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <BootstrapTable
          keyField="id"
          columns={ columns }
          data={ data }
          id={ id }
        />);
    });

    // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('should display customized id correctly', () => {
      // @ts-expect-error TS(2304): Cannot find name 'expect'.
      expect(wrapper.find(`table#${id}`).length).toBe(1);
    });
  });

  // @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
  describe('when hover props is true', () => {
    // @ts-expect-error TS(2304): Cannot find name 'beforeEach'.
    beforeEach(() => {
      wrapper = shallow(
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <BootstrapTable keyField="id" columns={ columns } data={ data } hover />);
    });

    // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('should have table-hover class on table', () => {
      // @ts-expect-error TS(2304): Cannot find name 'expect'.
      expect(wrapper.find('table.table-hover').length).toBe(1);
    });
  });

  // @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
  describe('when striped props is true', () => {
    // @ts-expect-error TS(2304): Cannot find name 'beforeEach'.
    beforeEach(() => {
      wrapper = shallow(
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <BootstrapTable keyField="id" columns={ columns } data={ data } striped />);
    });

    // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('should have table-striped class on table', () => {
      // @ts-expect-error TS(2304): Cannot find name 'expect'.
      expect(wrapper.find('table.table-striped').length).toBe(1);
    });
  });

  // @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
  describe('when condensed props is true', () => {
    // @ts-expect-error TS(2304): Cannot find name 'beforeEach'.
    beforeEach(() => {
      wrapper = shallow(
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <BootstrapTable keyField="id" columns={ columns } data={ data } condensed />);
    });

    // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('should have table-condensed class on table', () => {
      // @ts-expect-error TS(2304): Cannot find name 'expect'.
      expect(wrapper.find('table.table-condensed').length).toBe(1);
    });
  });

  // @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
  describe('when bordered props is false', () => {
    // @ts-expect-error TS(2304): Cannot find name 'beforeEach'.
    beforeEach(() => {
      wrapper = shallow(
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <BootstrapTable keyField="id" columns={ columns } data={ data } bordered={ false } />);
    });

    // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('should not have table-condensed class on table', () => {
      // @ts-expect-error TS(2304): Cannot find name 'expect'.
      expect(wrapper.find('table.table-condensed').length).toBe(0);
    });
  });

  // @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
  describe('when table should have a caption', () => {
    // @ts-expect-error TS(2304): Cannot find name 'beforeEach'.
    beforeEach(() => {
      wrapper = shallow(
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <BootstrapTable
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          caption={ <span className="table-caption">test</span> }
          keyField="id"
          columns={ columns }
          data={ data }
          bordered={ false }
        />
      );
    });

    // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('should render caption correctly', () => {
      // @ts-expect-error TS(2304): Cannot find name 'expect'.
      expect(wrapper.find(Caption).length).toBe(1);
      // @ts-expect-error TS(2304): Cannot find name 'expect'.
      expect(wrapper.find('.table-caption').length).toBe(1);
    });
  });
});
