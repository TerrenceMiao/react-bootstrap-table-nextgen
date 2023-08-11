import 'jsdom-global/register';
import React from 'react';
// @ts-expect-error TS(7016): Could not find a declaration file for module 'enzy... Remove this comment to see the full error message
import { shallow } from 'enzyme';

// @ts-expect-error TS(6142): Module '../../src/bootstrap-table' was resolved to... Remove this comment to see the full error message
import BootstrapTable from '../../src/bootstrap-table';
// @ts-expect-error TS(6142): Module '../../src/contexts/data-context' was resol... Remove this comment to see the full error message
import createDataContext from '../../src/contexts/data-context';

// @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
describe('DataContext', () => {
  let wrapper: any;

  const data = [{
    id: 1,
    name: 'A'
  }, {
    id: 2,
    name: 'B'
  }];

  const columns = [{
    dataField: 'id',
    text: 'ID'
  }, {
    dataField: 'name',
    text: 'Name'
  }];

  // @ts-expect-error TS(2304): Cannot find name 'jest'.
  const mockBase = jest.fn(((props: any) => <BootstrapTable
    data={ data }
    columns={ columns }
    keyField="id"
    { ...props }
  />));

  const DataContext = createDataContext();

  function shallowContext() {
    return (
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <DataContext.Provider
        data={ data }
      >
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <DataContext.Consumer>
          {
            (dataProps: any) => mockBase(dataProps)
          }
        </DataContext.Consumer>
      </DataContext.Provider>
    );
  }

  // @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
  describe('default render', () => {
    // @ts-expect-error TS(2304): Cannot find name 'beforeEach'.
    beforeEach(() => {
      wrapper = shallow(shallowContext());
      wrapper.render();
    });

    // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('should have correct Provider property after calling createDataContext', () => {
      // @ts-expect-error TS(2304): Cannot find name 'expect'.
      expect(DataContext.Provider).toBeDefined();
    });

    // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('should have correct Consumer property after calling createDataContext', () => {
      // @ts-expect-error TS(2304): Cannot find name 'expect'.
      expect(DataContext.Consumer).toBeDefined();
    });

    // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('should have correct state.data', () => {
      // @ts-expect-error TS(2304): Cannot find name 'expect'.
      expect(wrapper.state().data).toEqual(data);
    });

    // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('should pass correct sort props to children element', () => {
      // @ts-expect-error TS(2304): Cannot find name 'expect'.
      expect(wrapper.length).toBe(1);
      // @ts-expect-error TS(2304): Cannot find name 'expect'.
      expect(mockBase).toHaveBeenCalledWith({
        data,
        getData: wrapper.instance().getData
      });
    });
  });

  // @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
  describe('componentWillReceiveProps', () => {
    const newData = [...data, { id: 3, name: 'test' }];

    // @ts-expect-error TS(2304): Cannot find name 'beforeEach'.
    beforeEach(() => {
      wrapper = shallow(shallowContext());
      wrapper.instance().UNSAFE_componentWillReceiveProps({
        data: newData
      });
    });

    // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('should have correct state.data', () => {
      // @ts-expect-error TS(2304): Cannot find name 'expect'.
      expect(wrapper.state().data).toEqual(newData);
    });
  });

  // @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
  describe('getData', () => {
    let result;
    const fakeData = [...data, { id: 3, name: 'test' }];

    // @ts-expect-error TS(2304): Cannot find name 'beforeEach'.
    beforeEach(() => {
      wrapper = shallow(shallowContext());
    });

    // @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
    describe('if third argument is give', () => {
      // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
      it('should return the data property from third argument', () => {
        result = wrapper.instance().getData(null, null, { data: fakeData });
        // @ts-expect-error TS(2304): Cannot find name 'expect'.
        expect(result).toEqual(fakeData);
      });
    });

    // @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
    describe('if second argument is give', () => {
      // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
      it('should return the data property from second argument', () => {
        result = wrapper.instance().getData(null, { data: fakeData });
        // @ts-expect-error TS(2304): Cannot find name 'expect'.
        expect(result).toEqual(fakeData);
      });
    });

    // @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
    describe('if first argument is give', () => {
      // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
      it('should return the data property from first argument', () => {
        result = wrapper.instance().getData({ data: fakeData });
        // @ts-expect-error TS(2304): Cannot find name 'expect'.
        expect(result).toEqual(fakeData);
      });
    });

    // @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
    describe('if no argument is give', () => {
      // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
      it('should return default props.data', () => {
        result = wrapper.instance().getData();
        // @ts-expect-error TS(2304): Cannot find name 'expect'.
        expect(result).toEqual(data);
      });
    });
  });
});
