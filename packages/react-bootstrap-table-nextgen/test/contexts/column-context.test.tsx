import 'jsdom-global/register';
import React from 'react';
// @ts-expect-error TS(7016): Could not find a declaration file for module 'enzy... Remove this comment to see the full error message
import { shallow } from 'enzyme';

// @ts-expect-error TS(6142): Module '../../src/bootstrap-table' was resolved to... Remove this comment to see the full error message
import BootstrapTable from '../../src/bootstrap-table';
// @ts-expect-error TS(6142): Module '../../src/contexts/column-context' was res... Remove this comment to see the full error message
import createColumnManagementContext from '../../src/contexts/column-context';

// @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
describe('ColumnManagementContext', () => {
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

  const ColumnManagementContext = createColumnManagementContext();

  function shallowContext(options = {}) {
    return (
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <ColumnManagementContext.Provider
        data={ data }
        columns={ columns }
        { ...options }
      >
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <ColumnManagementContext.Consumer>
          {
            (columnToggleProps: any) => mockBase(columnToggleProps)
          }
        </ColumnManagementContext.Consumer>
      </ColumnManagementContext.Provider>
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
    it('should have correct Provider property after calling createColumnManagementContext', () => {
      // @ts-expect-error TS(2304): Cannot find name 'expect'.
      expect(ColumnManagementContext.Provider).toBeDefined();
    });

    // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('should have correct Consumer property after calling createColumnManagementContext', () => {
      // @ts-expect-error TS(2304): Cannot find name 'expect'.
      expect(ColumnManagementContext.Consumer).toBeDefined();
    });
  });

  // @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
  describe('when toggles props exist', () => {
    // @ts-expect-error TS(2304): Cannot find name 'beforeEach'.
    beforeEach(() => {
      wrapper = shallow(shallowContext({
        toggles: {
          id: true,
          name: false
        }
      }));
    });

    // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('should render component with correct columns props', () => {
      // @ts-expect-error TS(2304): Cannot find name 'expect'.
      expect(wrapper.prop('value').columns).toHaveLength(columns.length - 1);
      // @ts-expect-error TS(2304): Cannot find name 'expect'.
      expect(wrapper.prop('value').columns[0].dataField).toEqual('id');
    });
  });

  // @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
  describe('if there is any column.hidden is true', () => {
    // @ts-expect-error TS(2304): Cannot find name 'beforeEach'.
    beforeEach(() => {
      wrapper = shallow(shallowContext({
        columns: [{
          dataField: 'id',
          text: 'ID'
        }, {
          dataField: 'name',
          text: 'Name',
          hidden: true
        }]
      }));
    });

    // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('should render component with correct columns props', () => {
      // @ts-expect-error TS(2304): Cannot find name 'expect'.
      expect(wrapper.prop('value').columns).toHaveLength(columns.length - 1);
      // @ts-expect-error TS(2304): Cannot find name 'expect'.
      expect(wrapper.prop('value').columns[0].dataField).toEqual('id');
    });
  });
});
