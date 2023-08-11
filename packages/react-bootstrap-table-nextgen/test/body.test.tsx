import 'jsdom-global/register';
import React from 'react';
// @ts-expect-error TS(7016): Could not find a declaration file for module 'sino... Remove this comment to see the full error message
import sinon from 'sinon';
// @ts-expect-error TS(7016): Could not find a declaration file for module 'enzy... Remove this comment to see the full error message
import { shallow, mount } from 'enzyme';

// @ts-expect-error TS(6142): Module '../src/body' was resolved to '/Users/terre... Remove this comment to see the full error message
import Body from '../src/body';
// @ts-expect-error TS(6142): Module '../src/row/simple-row' was resolved to '/U... Remove this comment to see the full error message
import Row from '../src/row/simple-row';
// @ts-expect-error TS(6142): Module '../src/row/aggregate-row' was resolved to ... Remove this comment to see the full error message
import RowAggregator from '../src/row/aggregate-row';
import Const from '../src/const';
// @ts-expect-error TS(6142): Module '../src/row/row-section' was resolved to '/... Remove this comment to see the full error message
import RowSection from '../src/row/row-section';
// @ts-expect-error TS(6142): Module '../src/contexts/selection-context' was res... Remove this comment to see the full error message
import SelectionContext from '../src/contexts/selection-context';
// @ts-expect-error TS(6142): Module '../src/contexts/row-expand-context' was re... Remove this comment to see the full error message
import ExpansionContext from '../src/contexts/row-expand-context';
import mockBodyResolvedProps from './test-helpers/mock/body-resolved-props';

// @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
describe('Body', () => {
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

  const keyField = 'id';

  // @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
  describe('simplest body', () => {
    // @ts-expect-error TS(2304): Cannot find name 'beforeEach'.
    beforeEach(() => {
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      wrapper = shallow(<Body { ...mockBodyResolvedProps } keyField="id" columns={ columns } data={ data } />);
    });

    // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('should render successfully', () => {
      // @ts-expect-error TS(2304): Cannot find name 'expect'.
      expect(wrapper.length).toBe(1);
      // @ts-expect-error TS(2304): Cannot find name 'expect'.
      expect(wrapper.find('tbody').length).toBe(1);
      // @ts-expect-error TS(2304): Cannot find name 'expect'.
      expect(wrapper.find(Row).length).toBe(data.length);
    });
  });

  // @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
  describe('when data is empty', () => {
    // @ts-expect-error TS(2304): Cannot find name 'beforeEach'.
    beforeEach(() => {
      wrapper = shallow(
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <Body
          { ...mockBodyResolvedProps }
          keyField="id"
          columns={ columns }
          data={ data }
          visibleColumnSize={ columns.length }
          isEmpty
        />);
    });

    // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('should not render', () => {
      // @ts-expect-error TS(2304): Cannot find name 'expect'.
      expect(wrapper.length).toBe(1);
      // @ts-expect-error TS(2304): Cannot find name 'expect'.
      expect(wrapper.find('tbody').length).toBe(0);
      // @ts-expect-error TS(2304): Cannot find name 'expect'.
      expect(wrapper.find(RowSection).length).toBe(0);
    });

    // @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
    describe('when noDataIndication props is defined', () => {
      let emptyIndication: any;

      // @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
      describe('and it is not a function', () => {
        // @ts-expect-error TS(2304): Cannot find name 'beforeEach'.
        beforeEach(() => {
          emptyIndication = 'Table is empty';
          wrapper = shallow(
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <Body
              { ...mockBodyResolvedProps }
              keyField="id"
              columns={ columns }
              data={ data }
              visibleColumnSize={ columns.length }
              noDataIndication={ emptyIndication }
              isEmpty
            />);
        });

        // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
        it('should render successfully', () => {
          // @ts-expect-error TS(2304): Cannot find name 'expect'.
          expect(wrapper.length).toBe(1);
          // @ts-expect-error TS(2304): Cannot find name 'expect'.
          expect(wrapper.find('tbody').length).toBe(1);
          // @ts-expect-error TS(2304): Cannot find name 'expect'.
          expect(wrapper.find(RowSection).length).toBe(1);
          // @ts-expect-error TS(2304): Cannot find name 'expect'.
          expect(wrapper.find(RowSection).prop('content')).toEqual(emptyIndication);
        });
      });

      // @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
      describe('and it is a function', () => {
        const content = 'Table is empty';
        let emptyIndicationCallBack: any;

        // @ts-expect-error TS(2304): Cannot find name 'beforeEach'.
        beforeEach(() => {
          emptyIndicationCallBack = sinon.stub().returns(content);
          wrapper = shallow(
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <Body
              { ...mockBodyResolvedProps }
              keyField="id"
              columns={ columns }
              data={ data }
              visibleColumnSize={ columns.length }
              noDataIndication={ emptyIndicationCallBack }
              isEmpty
            />);
        });

        // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
        it('should render successfully', () => {
          // @ts-expect-error TS(2304): Cannot find name 'expect'.
          expect(wrapper.length).toBe(1);
          // @ts-expect-error TS(2304): Cannot find name 'expect'.
          expect(wrapper.find('tbody').length).toBe(1);
          // @ts-expect-error TS(2304): Cannot find name 'expect'.
          expect(wrapper.find(RowSection).length).toBe(1);
          // @ts-expect-error TS(2304): Cannot find name 'expect'.
          expect(wrapper.find(RowSection).prop('content')).toEqual(emptyIndication);
        });

        // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
        it('should call custom noDataIndication function correctly', () => {
          // @ts-expect-error TS(2304): Cannot find name 'expect'.
          expect(emptyIndicationCallBack.callCount).toBe(1);
        });
      });
    });
  });

  // @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
  describe('when rowStyle prop is defined', () => {
    const rowStyle = { backgroundColor: 'red', color: 'white' };

    // @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
    describe('and it is a style object', () => {
      // @ts-expect-error TS(2304): Cannot find name 'beforeEach'.
      beforeEach(() => {
        wrapper = shallow(
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <Body
            { ...mockBodyResolvedProps }
            keyField="id"
            columns={ columns }
            data={ data }
            rowStyle={ rowStyle }
          />);
      });

      // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
      it('should rendering Row component with correct style', () => {
        const rows = wrapper.find(Row);
        rows.forEach((row: any) => {
          // @ts-expect-error TS(2304): Cannot find name 'expect'.
          expect(row.props().style).toEqual(rowStyle);
        });
      });
    });

    // @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
    describe('and it is a callback functoin', () => {
      const rowStyleCallBack = sinon.stub().returns(rowStyle);
      // @ts-expect-error TS(2304): Cannot find name 'beforeEach'.
      beforeEach(() => {
        wrapper = shallow(
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <Body
            { ...mockBodyResolvedProps }
            keyField="id"
            columns={ columns }
            data={ data }
            rowStyle={ rowStyleCallBack }
          />);
      });

      // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
      it('should calling rowStyle callBack correctly', () => {
        // @ts-expect-error TS(2304): Cannot find name 'expect'.
        expect(rowStyleCallBack.callCount).toBe(data.length);
      });

      // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
      it('should calling rowStyle callBack with correct argument', () => {
        // @ts-expect-error TS(2304): Cannot find name 'expect'.
        expect(rowStyleCallBack.firstCall.calledWith(data[0], 0)).toBeTruthy();
        // @ts-expect-error TS(2304): Cannot find name 'expect'.
        expect(rowStyleCallBack.secondCall.calledWith(data[1], 1)).toBeTruthy();
      });

      // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
      it('should rendering Row component with correct style', () => {
        const rows = wrapper.find(Row);
        rows.forEach((row: any) => {
          // @ts-expect-error TS(2304): Cannot find name 'expect'.
          expect(row.props().style).toEqual(rowStyle);
        });
      });
    });
  });

  // @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
  describe('when rowClasses prop is defined', () => {
    const rowClasses = 'test-classe';

    // @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
    describe('and it is a string', () => {
      // @ts-expect-error TS(2304): Cannot find name 'beforeEach'.
      beforeEach(() => {
        wrapper = shallow(
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <Body
            { ...mockBodyResolvedProps }
            keyField="id"
            columns={ columns }
            data={ data }
            rowClasses={ rowClasses }
          />);
      });

      // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
      it('should rendering Row component with correct className', () => {
        const rows = wrapper.find(Row);
        rows.forEach((row: any) => {
          // @ts-expect-error TS(2304): Cannot find name 'expect'.
          expect(row.props().className).toEqual(rowClasses);
        });
      });
    });

    // @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
    describe('and it is a callback function', () => {
      const rowClassesCallBack = sinon.stub().returns(rowClasses);

      // @ts-expect-error TS(2304): Cannot find name 'beforeEach'.
      beforeEach(() => {
        wrapper = shallow(
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <Body
            { ...mockBodyResolvedProps }
            keyField="id"
            columns={ columns }
            data={ data }
            rowClasses={ rowClassesCallBack }
          />);
      });

      // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
      it('should calling rowClasses callback correctly', () => {
        // @ts-expect-error TS(2304): Cannot find name 'expect'.
        expect(rowClassesCallBack.callCount).toBe(data.length);
      });

      // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
      it('should calling rowClasses callback with correct argument', () => {
        // @ts-expect-error TS(2304): Cannot find name 'expect'.
        expect(rowClassesCallBack.firstCall.calledWith(data[0], 0)).toBeTruthy();
        // @ts-expect-error TS(2304): Cannot find name 'expect'.
        expect(rowClassesCallBack.secondCall.calledWith(data[1], 1)).toBeTruthy();
      });

      // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
      it('should rendering Row component with correct className', () => {
        const rows = wrapper.find(Row);
        rows.forEach((row: any) => {
          // @ts-expect-error TS(2304): Cannot find name 'expect'.
          expect(row.props().className).toEqual(rowClasses);
        });
      });
    });
  });

  // @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
  describe('when rowEvents prop is defined', () => {
    const rowEvents = { onClick: sinon.stub() };

    // @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
    describe('and it is a string', () => {
      // @ts-expect-error TS(2304): Cannot find name 'beforeEach'.
      beforeEach(() => {
        wrapper = shallow(
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <Body
            { ...mockBodyResolvedProps }
            keyField="id"
            columns={ columns }
            data={ data }
            rowEvents={ rowEvents }
          />);
      });

      // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
      it('should rendering Row component with correct attrs prop', () => {
        const rows = wrapper.find(Row);
        rows.forEach((row: any) => {
          // @ts-expect-error TS(2304): Cannot find name 'expect'.
          expect(row.props().attrs).toEqual(rowEvents);
        });
      });
    });
  });

  // @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
  describe('when cellEdit.createContext props is defined', () => {
    const EditingCellComponent = () => null;
    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    const RowComponent = (props: any) => <Row { ...props } />;
    const cellEdit = {
      // @ts-expect-error TS(2304): Cannot find name 'jest'.
      options: { onStartEdit: jest.fn() },
      // @ts-expect-error TS(2304): Cannot find name 'jest'.
      createContext: jest.fn(),
      // @ts-expect-error TS(2304): Cannot find name 'jest'.
      createEditingCell: jest.fn().mockReturnValue(EditingCellComponent),
      // @ts-expect-error TS(2304): Cannot find name 'jest'.
      withRowLevelCellEdit: jest.fn().mockReturnValue(RowComponent)
    };
    // @ts-expect-error TS(2304): Cannot find name 'beforeEach'.
    beforeEach(() => {
      wrapper = shallow(
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <Body
          { ...mockBodyResolvedProps }
          data={ data }
          columns={ columns }
          keyField={ keyField }
          cellEdit={ cellEdit }
        />
      );
    });

    // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('should render Row Component correctly', () => {
      // @ts-expect-error TS(2304): Cannot find name 'expect'.
      expect(wrapper.length).toBe(1);
      // @ts-expect-error TS(2304): Cannot find name 'expect'.
      expect(cellEdit.createEditingCell).toHaveBeenCalledTimes(1);
      // @ts-expect-error TS(2304): Cannot find name 'expect'.
      expect(cellEdit.withRowLevelCellEdit).toHaveBeenCalledTimes(1);
      // @ts-expect-error TS(2304): Cannot find name 'expect'.
      expect(wrapper.find(RowComponent)).toHaveLength(2);
      const aRowElement = wrapper.find(RowComponent).get(0);
      // @ts-expect-error TS(2304): Cannot find name 'expect'.
      expect(aRowElement.props.EditingCellComponent).toBeDefined();
    });
  });

  // @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
  describe('when selectRow.mode is ROW_SELECT_DISABLED or expandRow.renderer is undefined', () => {
    // @ts-expect-error TS(2304): Cannot find name 'beforeEach'.
    beforeEach(() => {
      wrapper = shallow(
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <Body
          { ...mockBodyResolvedProps }
          data={ data }
          columns={ columns }
          keyField={ keyField }
        />
      );
    });

    // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('shouldn\'t render RowAggregator component', () => {
      // @ts-expect-error TS(2304): Cannot find name 'expect'.
      expect(wrapper.find(RowAggregator)).toHaveLength(0);
    });
  });

  // @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
  describe('when selectRow.mode is defined correctly', () => {
    const selectRow = { mode: 'checkbox' };

    // @ts-expect-error TS(2304): Cannot find name 'beforeEach'.
    beforeEach(() => {
      wrapper = mount(
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <SelectionContext.Provider data={ data } keyField={ keyField } selectRow={ selectRow }>
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <Body
            { ...mockBodyResolvedProps }
            data={ data }
            columns={ columns }
            keyField={ keyField }
            selectRow={ selectRow }
          />
        </SelectionContext.Provider>
      );
    });

    // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('should render RowAggregator component correctly', () => {
      const rowAggregator = wrapper.find(RowAggregator);

      // @ts-expect-error TS(2304): Cannot find name 'expect'.
      expect(rowAggregator.get(0).props.selectRow.mode)
        .not.toEqual(Const.ROW_SELECT_DISABLED);
      // @ts-expect-error TS(2304): Cannot find name 'expect'.
      expect(rowAggregator.get(0).props.selected).toBeDefined();
      // @ts-expect-error TS(2304): Cannot find name 'expect'.
      expect(rowAggregator.get(0).props.selectable).toBeDefined();
    });
  });

  // @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
  describe('when expandRow.renderer is defined correctly', () => {
    // @ts-expect-error TS(2304): Cannot find name 'jest'.
    const expandRow = { renderer: jest.fn() };

    // @ts-expect-error TS(2304): Cannot find name 'beforeEach'.
    beforeEach(() => {
      wrapper = mount(
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <ExpansionContext.Provider data={ data } keyField={ keyField } expandRow={ expandRow }>
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <Body
            { ...mockBodyResolvedProps }
            data={ data }
            columns={ columns }
            keyField={ keyField }
            expandRow={ expandRow }
          />
        </ExpansionContext.Provider>
      );
    });

    // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('should render RowAggregator component correctly', () => {
      const rowAggregator = wrapper.find(RowAggregator);
      // @ts-expect-error TS(2304): Cannot find name 'expect'.
      expect(rowAggregator.get(0).props.expandRow.renderer).toEqual(expandRow.renderer);
      // @ts-expect-error TS(2304): Cannot find name 'expect'.
      expect(rowAggregator.get(0).props.expanded).toBeDefined();
      // @ts-expect-error TS(2304): Cannot find name 'expect'.
      expect(rowAggregator.get(0).props.expandable).toBeDefined();
    });
  });
});
