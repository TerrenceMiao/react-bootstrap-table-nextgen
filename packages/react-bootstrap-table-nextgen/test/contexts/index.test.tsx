/* eslint no-param-reassign: 0 */
import React from 'react';
// @ts-expect-error TS(7016): Could not find a declaration file for module 'enzy... Remove this comment to see the full error message
import { shallow } from 'enzyme';

// @ts-expect-error TS(6142): Module '../../src/bootstrap-table' was resolved to... Remove this comment to see the full error message
import Base from '../../src/bootstrap-table';
// @ts-expect-error TS(6142): Module '../../src/contexts' was resolved to '/User... Remove this comment to see the full error message
import withContext from '../../src/contexts';

// @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
describe('Context', () => {
  let wrapper: any;

  const keyField = 'id';

  let columns: any;

  const data = [{
    id: 1,
    name: 'A'
  }, {
    id: 2,
    name: 'B'
  }];

  const BootstrapTable = withContext(Base);

  // @ts-expect-error TS(2304): Cannot find name 'beforeEach'.
  beforeEach(() => {
    columns = [{
      dataField: keyField,
      text: 'ID'
    }, {
      dataField: 'name',
      text: 'Name'
    }];
  });

  // @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
  describe('basic render', () => {
    // @ts-expect-error TS(2304): Cannot find name 'beforeEach'.
    beforeEach(() => {
      wrapper = shallow(
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <BootstrapTable keyField={ keyField } data={ data } columns={ columns } />
      );
      wrapper.render();
    });

    // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('should create contexts correctly', () => {
      // @ts-expect-error TS(2304): Cannot find name 'expect'.
      expect(wrapper.instance().DataContext).toBeDefined();
      // @ts-expect-error TS(2304): Cannot find name 'expect'.
      expect(wrapper.instance().SortContext).not.toBeDefined();
      // @ts-expect-error TS(2304): Cannot find name 'expect'.
      expect(wrapper.instance().SelectionContext).not.toBeDefined();
      // @ts-expect-error TS(2304): Cannot find name 'expect'.
      expect(wrapper.instance().CellEditContext).not.toBeDefined();
      // @ts-expect-error TS(2304): Cannot find name 'expect'.
      expect(wrapper.instance().FilterContext).not.toBeDefined();
      // @ts-expect-error TS(2304): Cannot find name 'expect'.
      expect(wrapper.instance().PaginationContext).not.toBeDefined();
      // @ts-expect-error TS(2304): Cannot find name 'expect'.
      expect(wrapper.instance().ColumnManagementContext).not.toBeDefined();
    });

    // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('should render correctly', () => {
      const dataProvider = wrapper.find(wrapper.instance().DataContext.Provider);
      // @ts-expect-error TS(2304): Cannot find name 'expect'.
      expect(dataProvider).toHaveLength(1);
      // @ts-expect-error TS(2304): Cannot find name 'expect'.
      expect(dataProvider.props().data).toEqual(data);
      // @ts-expect-error TS(2304): Cannot find name 'expect'.
      expect(dataProvider.props().keyField).toEqual(keyField);
      // @ts-expect-error TS(2304): Cannot find name 'expect'.
      expect(dataProvider.props().columns).toEqual(columns);
    });
  });

  // @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
  describe('if there\'s sort is enable', () => {
    // @ts-expect-error TS(2304): Cannot find name 'beforeEach'.
    beforeEach(() => {
      const columnsWithSort = columns.map((c: any) => {
        c.sort = true;
        return c;
      });
      wrapper = shallow(
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <BootstrapTable keyField={ keyField } data={ data } columns={ columnsWithSort } />
      );
      wrapper.render();
    });

    // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('should create contexts correctly', () => {
      // @ts-expect-error TS(2304): Cannot find name 'expect'.
      expect(wrapper.instance().DataContext).toBeDefined();
      // @ts-expect-error TS(2304): Cannot find name 'expect'.
      expect(wrapper.instance().SortContext).toBeDefined();
      // @ts-expect-error TS(2304): Cannot find name 'expect'.
      expect(wrapper.instance().SelectionContext).not.toBeDefined();
      // @ts-expect-error TS(2304): Cannot find name 'expect'.
      expect(wrapper.instance().CellEditContext).not.toBeDefined();
      // @ts-expect-error TS(2304): Cannot find name 'expect'.
      expect(wrapper.instance().FilterContext).not.toBeDefined();
      // @ts-expect-error TS(2304): Cannot find name 'expect'.
      expect(wrapper.instance().PaginationContext).not.toBeDefined();
      // @ts-expect-error TS(2304): Cannot find name 'expect'.
      expect(wrapper.instance().ColumnManagementContext).not.toBeDefined();
    });
  });

  // @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
  describe('if thers\'s any column hidden', () => {
    // @ts-expect-error TS(2304): Cannot find name 'beforeEach'.
    beforeEach(() => {
      const columnsWithHidden = [{
        dataField: keyField,
        text: 'ID'
      }, {
        dataField: 'name',
        text: 'Name',
        hidden: true
      }];
      wrapper = shallow(
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <BootstrapTable keyField={ keyField } data={ data } columns={ columnsWithHidden } />
      );
      wrapper.render();
    });

    // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('should create contexts correctly', () => {
      // @ts-expect-error TS(2304): Cannot find name 'expect'.
      expect(wrapper.instance().DataContext).toBeDefined();
      // @ts-expect-error TS(2304): Cannot find name 'expect'.
      expect(wrapper.instance().ColumnManagementContext).toBeDefined();
      // @ts-expect-error TS(2304): Cannot find name 'expect'.
      expect(wrapper.instance().SelectionContext).not.toBeDefined();
      // @ts-expect-error TS(2304): Cannot find name 'expect'.
      expect(wrapper.instance().CellEditContext).not.toBeDefined();
      // @ts-expect-error TS(2304): Cannot find name 'expect'.
      expect(wrapper.instance().FilterContext).not.toBeDefined();
      // @ts-expect-error TS(2304): Cannot find name 'expect'.
      expect(wrapper.instance().PaginationContext).not.toBeDefined();
    });
  });

  // @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
  describe('if columnToggle is enable', () => {
    // @ts-expect-error TS(2304): Cannot find name 'beforeEach'.
    beforeEach(() => {
      const columnToggle = { toggles: { id: true, name: true } };
      wrapper = shallow(
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <BootstrapTable
          keyField={ keyField }
          data={ data }
          columns={ columns }
          columnToggle={ columnToggle }
        />
      );
      wrapper.render();
    });

    // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('should create contexts correctly', () => {
      // @ts-expect-error TS(2304): Cannot find name 'expect'.
      expect(wrapper.instance().DataContext).toBeDefined();
      // @ts-expect-error TS(2304): Cannot find name 'expect'.
      expect(wrapper.instance().ColumnManagementContext).toBeDefined();
      // @ts-expect-error TS(2304): Cannot find name 'expect'.
      expect(wrapper.instance().SelectionContext).not.toBeDefined();
      // @ts-expect-error TS(2304): Cannot find name 'expect'.
      expect(wrapper.instance().CellEditContext).not.toBeDefined();
      // @ts-expect-error TS(2304): Cannot find name 'expect'.
      expect(wrapper.instance().FilterContext).not.toBeDefined();
      // @ts-expect-error TS(2304): Cannot find name 'expect'.
      expect(wrapper.instance().PaginationContext).not.toBeDefined();
    });
  });

  // @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
  describe('if row selection is enable', () => {
    // @ts-expect-error TS(2304): Cannot find name 'beforeEach'.
    beforeEach(() => {
      const selectRow = { mode: 'radio' };
      wrapper = shallow(
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <BootstrapTable
          keyField={ keyField }
          data={ data }
          columns={ columns }
          selectRow={ selectRow }
        />
      );
      wrapper.render();
    });

    // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('should create contexts correctly', () => {
      // @ts-expect-error TS(2304): Cannot find name 'expect'.
      expect(wrapper.instance().DataContext).toBeDefined();
      // @ts-expect-error TS(2304): Cannot find name 'expect'.
      expect(wrapper.instance().SortContext).not.toBeDefined();
      // @ts-expect-error TS(2304): Cannot find name 'expect'.
      expect(wrapper.instance().SelectionContext).toBeDefined();
      // @ts-expect-error TS(2304): Cannot find name 'expect'.
      expect(wrapper.instance().CellEditContext).not.toBeDefined();
      // @ts-expect-error TS(2304): Cannot find name 'expect'.
      expect(wrapper.instance().FilterContext).not.toBeDefined();
      // @ts-expect-error TS(2304): Cannot find name 'expect'.
      expect(wrapper.instance().PaginationContext).not.toBeDefined();
      // @ts-expect-error TS(2304): Cannot find name 'expect'.
      expect(wrapper.instance().ColumnManagementContext).not.toBeDefined();
    });
  });

  // @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
  describe('if cell editing is enable', () => {
    // @ts-expect-error TS(2304): Cannot find name 'beforeEach'.
    beforeEach(() => {
      // @ts-expect-error TS(2554): Expected 1 arguments, but got 0.
      const CellEditContext = React.createContext();
      const cellEdit = {
        // @ts-expect-error TS(2304): Cannot find name 'jest'.
        createContext: jest.fn().mockReturnValue({
          Provider: CellEditContext.Provider,
          Consumer: CellEditContext.Consumer
        }),
        options: {},
        // @ts-expect-error TS(2304): Cannot find name 'jest'.
        createEditingCell: jest.fn().mockReturnValue(() => null),
        // @ts-expect-error TS(2304): Cannot find name 'jest'.
        withRowLevelCellEdit: jest.fn().mockReturnValue(() => null)
      };
      wrapper = shallow(
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <BootstrapTable
          keyField={ keyField }
          data={ data }
          columns={ columns }
          cellEdit={ cellEdit }
        />
      );
      wrapper.render();
    });

    // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('should create contexts correctly', () => {
      // @ts-expect-error TS(2304): Cannot find name 'expect'.
      expect(wrapper.instance().DataContext).toBeDefined();
      // @ts-expect-error TS(2304): Cannot find name 'expect'.
      expect(wrapper.instance().SortContext).not.toBeDefined();
      // @ts-expect-error TS(2304): Cannot find name 'expect'.
      expect(wrapper.instance().SelectionContext).not.toBeDefined();
      // @ts-expect-error TS(2304): Cannot find name 'expect'.
      expect(wrapper.instance().CellEditContext).toBeDefined();
      // @ts-expect-error TS(2304): Cannot find name 'expect'.
      expect(wrapper.instance().FilterContext).not.toBeDefined();
      // @ts-expect-error TS(2304): Cannot find name 'expect'.
      expect(wrapper.instance().PaginationContext).not.toBeDefined();
      // @ts-expect-error TS(2304): Cannot find name 'expect'.
      expect(wrapper.instance().ColumnManagementContext).not.toBeDefined();
    });
  });

  // @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
  describe('if search is enable', () => {
    // @ts-expect-error TS(2304): Cannot find name 'beforeEach'.
    beforeEach(() => {
      // @ts-expect-error TS(2554): Expected 1 arguments, but got 0.
      const SearchContext = React.createContext();
      const search = {
        // @ts-expect-error TS(2304): Cannot find name 'jest'.
        searchContext: jest.fn().mockReturnValue(SearchContext),
        searchText: ''
      };
      wrapper = shallow(
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <BootstrapTable
          keyField={ keyField }
          data={ data }
          columns={ columns }
          search={ search }
        />
      );
      wrapper.render();
    });

    // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('should create contexts correctly', () => {
      // @ts-expect-error TS(2304): Cannot find name 'expect'.
      expect(wrapper.instance().DataContext).toBeDefined();
      // @ts-expect-error TS(2304): Cannot find name 'expect'.
      expect(wrapper.instance().SearchContext).toBeDefined();
      // @ts-expect-error TS(2304): Cannot find name 'expect'.
      expect(wrapper.instance().SortContext).not.toBeDefined();
      // @ts-expect-error TS(2304): Cannot find name 'expect'.
      expect(wrapper.instance().SelectionContext).not.toBeDefined();
      // @ts-expect-error TS(2304): Cannot find name 'expect'.
      expect(wrapper.instance().CellEditContext).not.toBeDefined();
      // @ts-expect-error TS(2304): Cannot find name 'expect'.
      expect(wrapper.instance().FilterContext).not.toBeDefined();
      // @ts-expect-error TS(2304): Cannot find name 'expect'.
      expect(wrapper.instance().PaginationContext).not.toBeDefined();
      // @ts-expect-error TS(2304): Cannot find name 'expect'.
      expect(wrapper.instance().ColumnManagementContext).not.toBeDefined();
    });
  });

  // @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
  describe('if column filter is enable', () => {
    // @ts-expect-error TS(2304): Cannot find name 'beforeEach'.
    beforeEach(() => {
      // @ts-expect-error TS(2554): Expected 1 arguments, but got 0.
      const FilterContext = React.createContext();
      const filter = {
        // @ts-expect-error TS(2304): Cannot find name 'jest'.
        createContext: jest.fn().mockReturnValue({
          Provider: FilterContext.Provider,
          Consumer: FilterContext.Consumer
        })
      };
      wrapper = shallow(
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <BootstrapTable
          keyField={ keyField }
          data={ data }
          columns={ columns }
          filter={ filter }
        />
      );
      wrapper.render();
    });

    // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('should create contexts correctly', () => {
      // @ts-expect-error TS(2304): Cannot find name 'expect'.
      expect(wrapper.instance().DataContext).toBeDefined();
      // @ts-expect-error TS(2304): Cannot find name 'expect'.
      expect(wrapper.instance().SortContext).not.toBeDefined();
      // @ts-expect-error TS(2304): Cannot find name 'expect'.
      expect(wrapper.instance().SelectionContext).not.toBeDefined();
      // @ts-expect-error TS(2304): Cannot find name 'expect'.
      expect(wrapper.instance().CellEditContext).not.toBeDefined();
      // @ts-expect-error TS(2304): Cannot find name 'expect'.
      expect(wrapper.instance().FilterContext).toBeDefined();
      // @ts-expect-error TS(2304): Cannot find name 'expect'.
      expect(wrapper.instance().PaginationContext).not.toBeDefined();
      // @ts-expect-error TS(2304): Cannot find name 'expect'.
      expect(wrapper.instance().ColumnManagementContext).not.toBeDefined();
    });
  });

  // @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
  describe('if pagination is enable', () => {
    // @ts-expect-error TS(2304): Cannot find name 'beforeEach'.
    beforeEach(() => {
      // @ts-expect-error TS(2554): Expected 1 arguments, but got 0.
      const PaginationContext = React.createContext();
      const paginator = {
        // @ts-expect-error TS(2304): Cannot find name 'jest'.
        createContext: jest.fn().mockReturnValue({
          Provider: PaginationContext.Provider,
          Consumer: PaginationContext.Consumer
        })
      };
      wrapper = shallow(
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <BootstrapTable
          keyField={ keyField }
          data={ data }
          columns={ columns }
          pagination={ paginator }
        />
      );
      wrapper.render();
    });

    // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('should create contexts correctly', () => {
      // @ts-expect-error TS(2304): Cannot find name 'expect'.
      expect(wrapper.instance().DataContext).toBeDefined();
      // @ts-expect-error TS(2304): Cannot find name 'expect'.
      expect(wrapper.instance().SortContext).not.toBeDefined();
      // @ts-expect-error TS(2304): Cannot find name 'expect'.
      expect(wrapper.instance().SelectionContext).not.toBeDefined();
      // @ts-expect-error TS(2304): Cannot find name 'expect'.
      expect(wrapper.instance().CellEditContext).not.toBeDefined();
      // @ts-expect-error TS(2304): Cannot find name 'expect'.
      expect(wrapper.instance().FilterContext).not.toBeDefined();
      // @ts-expect-error TS(2304): Cannot find name 'expect'.
      expect(wrapper.instance().PaginationContext).toBeDefined();
      // @ts-expect-error TS(2304): Cannot find name 'expect'.
      expect(wrapper.instance().ColumnManagementContext).not.toBeDefined();
    });
  });

  // @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
  describe('if registerExposedAPI props is defined', () => {
    // @ts-expect-error TS(2304): Cannot find name 'jest'.
    const registerExposedAPI = jest.fn();
    // @ts-expect-error TS(2304): Cannot find name 'beforeEach'.
    beforeEach(() => {
      // @ts-expect-error TS(2554): Expected 1 arguments, but got 0.
      const PaginationContext = React.createContext();
      const paginator = {
        // @ts-expect-error TS(2304): Cannot find name 'jest'.
        createContext: jest.fn().mockReturnValue({
          Provider: PaginationContext.Provider,
          Consumer: PaginationContext.Consumer
        })
      };
      wrapper = shallow(
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <BootstrapTable
          keyField={ keyField }
          data={ data }
          columns={ columns }
          pagination={ paginator }
          registerExposedAPI={ registerExposedAPI }
        />
      );
      wrapper.render();
    });

    // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('should call props.registerExposedAPI correctly', () => {
      // @ts-expect-error TS(2304): Cannot find name 'expect'.
      expect(registerExposedAPI).toHaveBeenCalledTimes(1);
    });
  });
});
