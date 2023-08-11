import React from 'react';
// @ts-expect-error TS(7016): Could not find a declaration file for module 'sino... Remove this comment to see the full error message
import sinon from 'sinon';
// @ts-expect-error TS(7016): Could not find a declaration file for module 'enzy... Remove this comment to see the full error message
import { shallow } from 'enzyme';

// @ts-expect-error TS(6142): Module '../src/cell' was resolved to '/Users/terre... Remove this comment to see the full error message
import Cell from '../src/cell';

// @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
describe('Cell', () => {
  let wrapper: any;
  const row = {
    id: 1,
    name: 'A'
  };

  // @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
  describe('simplest cell', () => {
    const column = {
      dataField: 'id',
      text: 'ID'
    };

    // @ts-expect-error TS(2304): Cannot find name 'beforeEach'.
    beforeEach(() => {
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      wrapper = shallow(<Cell row={ row } columnIndex={ 1 } rowIndex={ 1 } column={ column } />);
    });

    // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('should render successfully', () => {
      // @ts-expect-error TS(2304): Cannot find name 'expect'.
      expect(wrapper.length).toBe(1);
      // @ts-expect-error TS(2304): Cannot find name 'expect'.
      expect(wrapper.text()).toEqual(row[column.dataField].toString());
    });
  });

  // @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
  describe('when content is bool value', () => {
    const column = {
      dataField: 'col1',
      text: 'column 1'
    };
    const aRowWithBoolValue = { col1: true };

    // @ts-expect-error TS(2304): Cannot find name 'beforeEach'.
    beforeEach(() => {
      wrapper = shallow(
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <Cell row={ aRowWithBoolValue } columnIndex={ 1 } rowIndex={ 1 } column={ column } />
      );
    });

    // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('should render successfully', () => {
      // @ts-expect-error TS(2304): Cannot find name 'expect'.
      expect(wrapper.length).toBe(1);
      // @ts-expect-error TS(2304): Cannot find name 'expect'.
      expect(wrapper.text()).toEqual(aRowWithBoolValue[column.dataField].toString());
    });
  });

  // @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
  describe('when column.formatter prop is defined', () => {
    const rowIndex = 1;
    const column = {
      dataField: 'id',
      text: 'ID',
      formatExtraData: []
    };
    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    const formatterResult = (<h3>{ row[column.dataField] }</h3>);
    const formatter = sinon.stub()
      // @ts-expect-error TS(7053): Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
      .withArgs(row[column.dataField], row, rowIndex, column.formatExtraData)
      .returns(formatterResult);
    // @ts-expect-error TS(2339): Property 'formatter' does not exist on type '{ dat... Remove this comment to see the full error message
    column.formatter = formatter; // defined column formatter

    // @ts-expect-error TS(2304): Cannot find name 'beforeEach'.
    beforeEach(() => {
      wrapper = shallow(
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <Cell row={ row } columnIndex={ 1 } rowIndex={ rowIndex } column={ column } />);
    });

    // @ts-expect-error TS(2304): Cannot find name 'afterEach'.
    afterEach(() => { formatter.reset(); });

    // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('should render successfully', () => {
      // @ts-expect-error TS(2304): Cannot find name 'expect'.
      expect(wrapper.length).toBe(1);
      // @ts-expect-error TS(2304): Cannot find name 'expect'.
      expect(wrapper.find('h3').length).toBe(1);
      // @ts-expect-error TS(2304): Cannot find name 'expect'.
      expect(wrapper.text()).toEqual(row[column.dataField].toString());
    });

    // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('should call custom formatter correctly', () => {
      // @ts-expect-error TS(2304): Cannot find name 'expect'.
      expect(formatter.callCount).toBe(1);
      // @ts-expect-error TS(2304): Cannot find name 'expect'.
      expect(formatter.calledWith(row[column.dataField],
        row, rowIndex, column.formatExtraData)).toBe(true);
    });
  });

  // @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
  describe('when editable prop is true', () => {
    let onStartCallBack: any;
    const rowIndex = 1;
    const columnIndex = 1;
    const column = {
      dataField: 'id',
      text: 'ID'
    };

    // @ts-expect-error TS(2304): Cannot find name 'beforeEach'.
    beforeEach(() => {
      onStartCallBack = sinon.stub().withArgs(rowIndex, columnIndex);
    });

    // @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
    describe('and clickToEdit is true', () => {
      // @ts-expect-error TS(2304): Cannot find name 'beforeEach'.
      beforeEach(() => {
        wrapper = shallow(
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <Cell
            row={ row }
            rowIndex={ rowIndex }
            column={ column }
            columnIndex={ columnIndex }
            editable
            clickToEdit
            onStart={ onStartCallBack }
          />
        );
      });

      // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
      it('should render onClick attribute', () => {
        // @ts-expect-error TS(2304): Cannot find name 'expect'.
        expect(wrapper.length).toBe(1);
        // @ts-expect-error TS(2304): Cannot find name 'expect'.
        expect(wrapper.find('td').prop('onClick')).toBeDefined();
      });

      // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
      it('should call onStart correctly when clicking cell', () => {
        wrapper.find('td').simulate('click');
        // @ts-expect-error TS(2304): Cannot find name 'expect'.
        expect(onStartCallBack.callCount).toBe(1);
        // @ts-expect-error TS(2304): Cannot find name 'expect'.
        expect(onStartCallBack.calledWith(rowIndex, columnIndex)).toBe(true);
      });

      // @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
      describe('if when column.events.onClick prop is defined', () => {
        // @ts-expect-error TS(2304): Cannot find name 'beforeEach'.
        beforeEach(() => {
          // @ts-expect-error TS(2339): Property 'events' does not exist on type '{ dataFi... Remove this comment to see the full error message
          column.events = {
            onClick: sinon.stub()
          };
        });

        // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
        it('should call onStart correctly', () => {
          wrapper.find('td').simulate('click');
          // @ts-expect-error TS(2304): Cannot find name 'expect'.
          expect(onStartCallBack.callCount).toBe(1);
        });
      });
    });

    // @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
    describe('and dbclickToEdit is true', () => {
      // @ts-expect-error TS(2304): Cannot find name 'beforeEach'.
      beforeEach(() => {
        wrapper = shallow(
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <Cell
            row={ row }
            rowIndex={ 1 }
            column={ column }
            columnIndex={ 1 }
            editable
            dbclickToEdit
            onStart={ onStartCallBack }
          />
        );
      });

      // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
      it('should render onDoubleClick attribute', () => {
        // @ts-expect-error TS(2304): Cannot find name 'expect'.
        expect(wrapper.length).toBe(1);
        // @ts-expect-error TS(2304): Cannot find name 'expect'.
        expect(wrapper.find('td').prop('onDoubleClick')).toBeDefined();
      });

      // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
      it('should call onStart correctly when double clicking cell', () => {
        wrapper.find('td').simulate('doubleclick');
        // @ts-expect-error TS(2304): Cannot find name 'expect'.
        expect(onStartCallBack.callCount).toBe(1);
        // @ts-expect-error TS(2304): Cannot find name 'expect'.
        expect(onStartCallBack.calledWith(rowIndex, columnIndex)).toBe(true);
      });

      // @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
      describe('if when column.events.onDoubleClick prop is defined', () => {
        // @ts-expect-error TS(2304): Cannot find name 'beforeEach'.
        beforeEach(() => {
          // @ts-expect-error TS(2339): Property 'events' does not exist on type '{ dataFi... Remove this comment to see the full error message
          column.events = {
            onDoubleClick: sinon.stub()
          };
        });

        // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
        it('should call onStart correctly', () => {
          wrapper.find('td').simulate('doubleclick');
          // @ts-expect-error TS(2304): Cannot find name 'expect'.
          expect(onStartCallBack.callCount).toBe(1);
        });
      });
    });
  });

  // @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
  describe('shouldComponentUpdate', () => {
    let props: any;
    let nextProps;

    // @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
    describe('if column.isDummyField is false', () => {
      // @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
      describe('when content is change', () => {
        const column = { dataField: 'name', text: 'Product Name' };
        // @ts-expect-error TS(2304): Cannot find name 'beforeEach'.
        beforeEach(() => {
          props = {
            row,
            columnIndex: 1,
            rowIndex: 1,
            column
          };
          wrapper = shallow(
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <Cell { ...props } />);
        });

        // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
        it('should return true', () => {
          nextProps = { ...props, row: { id: 1, name: 'CDE' } };
          // @ts-expect-error TS(2304): Cannot find name 'expect'.
          expect(wrapper.instance().shouldComponentUpdate(nextProps)).toBe(true);
        });
      });
    });

    // @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
    describe('when props.tabIndex is change', () => {
      const column = { dataField: 'name', text: 'Product Name' };
      // @ts-expect-error TS(2304): Cannot find name 'beforeEach'.
      beforeEach(() => {
        props = {
          row,
          columnIndex: 1,
          rowIndex: 1,
          tabIndex: 5,
          column
        };
        wrapper = shallow(
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <Cell { ...props } />);
      });

      // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
      it('should return true', () => {
        nextProps = { ...props, tabIndex: 2 };
        // @ts-expect-error TS(2304): Cannot find name 'expect'.
        expect(wrapper.instance().shouldComponentUpdate(nextProps)).toBe(true);
      });
    });

    // @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
    describe('when props.row is change', () => {
      // @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
      describe('and column.formatter is enable', () => {
        const column = { dataField: 'name', text: 'Product Name', formatter: () => 123 };
        // @ts-expect-error TS(2304): Cannot find name 'beforeEach'.
        beforeEach(() => {
          props = {
            row,
            columnIndex: 1,
            rowIndex: 1,
            tabIndex: 5,
            column
          };
          wrapper = shallow(
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <Cell { ...props } />);
        });

        // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
        it('should return true', () => {
          nextProps = { ...props, row: { ...row, alert: 'test' } };
          // @ts-expect-error TS(2304): Cannot find name 'expect'.
          expect(wrapper.instance().shouldComponentUpdate(nextProps)).toBe(true);
        });
      });
      // @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
      describe('but column.formatter is disable', () => {
        const column = { dataField: 'name', text: 'Product Name' };
        // @ts-expect-error TS(2304): Cannot find name 'beforeEach'.
        beforeEach(() => {
          props = {
            row,
            columnIndex: 1,
            rowIndex: 1,
            tabIndex: 5,
            column
          };
          wrapper = shallow(
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <Cell { ...props } />);
        });

        // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
        it('should return true', () => {
          nextProps = { ...props, row: { ...row, alert: 'test' } };
          // @ts-expect-error TS(2304): Cannot find name 'expect'.
          expect(wrapper.instance().shouldComponentUpdate(nextProps)).toBe(false);
        });
      });
    });

    // @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
    describe('if column.isDummyField is true', () => {
      // @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
      describe('when content is change', () => {
        const column = { dataField: '', text: 'Product Name', isDummyField: true };
        // @ts-expect-error TS(2304): Cannot find name 'beforeEach'.
        beforeEach(() => {
          props = {
            row,
            columnIndex: 1,
            rowIndex: 1,
            column
          };
          wrapper = shallow(
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <Cell { ...props } />);
        });

        // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
        it('should return true', () => {
          nextProps = { ...props, row: { id: 1, name: 'CDE', test: 'This is new Field' } };
          // @ts-expect-error TS(2304): Cannot find name 'expect'.
          expect(wrapper.instance().shouldComponentUpdate(nextProps)).toBe(true);
        });
      });
    });

    // @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
    describe('when column.hidden is change', () => {
      const column = { dataField: 'name', text: 'Product Name' };
      // @ts-expect-error TS(2304): Cannot find name 'beforeEach'.
      beforeEach(() => {
        props = {
          row,
          columnIndex: 1,
          rowIndex: 1,
          column
        };
        wrapper = shallow(
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <Cell { ...props } />);
      });

      // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
      it('should return true', () => {
        nextProps = { ...props, column: { ...column, hidden: true } };
        // @ts-expect-error TS(2304): Cannot find name 'expect'.
        expect(wrapper.instance().shouldComponentUpdate(nextProps)).toBe(true);
      });
    });

    // @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
    describe('when props.rowIndex is change', () => {
      const column = { dataField: 'name', text: 'Product Name' };
      // @ts-expect-error TS(2304): Cannot find name 'beforeEach'.
      beforeEach(() => {
        props = {
          row,
          columnIndex: 1,
          rowIndex: 1,
          column
        };
        wrapper = shallow(
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <Cell { ...props } />);
      });

      // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
      it('should return true', () => {
        nextProps = { ...props, rowIndex: 2 };
        // @ts-expect-error TS(2304): Cannot find name 'expect'.
        expect(wrapper.instance().shouldComponentUpdate(nextProps)).toBe(true);
      });
    });

    // @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
    describe('when props.columnIndex is change', () => {
      const column = { dataField: 'name', text: 'Product Name' };
      // @ts-expect-error TS(2304): Cannot find name 'beforeEach'.
      beforeEach(() => {
        props = {
          row,
          columnIndex: 1,
          rowIndex: 1,
          column
        };
        wrapper = shallow(
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <Cell { ...props } />);
      });

      // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
      it('should return true', () => {
        nextProps = { ...props, columnIndex: 2 };
        // @ts-expect-error TS(2304): Cannot find name 'expect'.
        expect(wrapper.instance().shouldComponentUpdate(nextProps)).toBe(true);
      });
    });

    // @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
    describe('when props.className is change', () => {
      const column = { dataField: 'name', text: 'Product Name' };
      // @ts-expect-error TS(2304): Cannot find name 'beforeEach'.
      beforeEach(() => {
        props = {
          row,
          columnIndex: 1,
          rowIndex: 1,
          column,
          className: 'test'
        };
        wrapper = shallow(
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <Cell { ...props } />);
      });

      // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
      it('should return true', () => {
        nextProps = { ...props, className: null };
        // @ts-expect-error TS(2304): Cannot find name 'expect'.
        expect(wrapper.instance().shouldComponentUpdate(nextProps)).toBe(true);
      });
    });

    // @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
    describe('when props.title is change', () => {
      const column = { dataField: 'name', text: 'Product Name' };
      // @ts-expect-error TS(2304): Cannot find name 'beforeEach'.
      beforeEach(() => {
        props = {
          row,
          columnIndex: 1,
          rowIndex: 1,
          column,
          title: 'test'
        };
        wrapper = shallow(
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <Cell { ...props } />);
      });

      // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
      it('should return true', () => {
        nextProps = { ...props, title: '123' };
        // @ts-expect-error TS(2304): Cannot find name 'expect'.
        expect(wrapper.instance().shouldComponentUpdate(nextProps)).toBe(true);
      });
    });

    // @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
    describe('when props.title is change', () => {
      const column = { dataField: 'name', text: 'Product Name' };
      // @ts-expect-error TS(2304): Cannot find name 'beforeEach'.
      beforeEach(() => {
        props = {
          row,
          columnIndex: 1,
          rowIndex: 1,
          column
        };
        wrapper = shallow(
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <Cell { ...props } />);
      });

      // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
      it('should return true', () => {
        nextProps = { ...props, editable: true };
        // @ts-expect-error TS(2304): Cannot find name 'expect'.
        expect(wrapper.instance().shouldComponentUpdate(nextProps)).toBe(true);
      });
    });

    // @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
    describe('when props.clickToEdit is change', () => {
      const column = { dataField: 'name', text: 'Product Name' };
      // @ts-expect-error TS(2304): Cannot find name 'beforeEach'.
      beforeEach(() => {
        props = {
          row,
          columnIndex: 1,
          rowIndex: 1,
          column
        };
        wrapper = shallow(
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <Cell { ...props } />);
      });

      // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
      it('should return true', () => {
        nextProps = { ...props, clickToEdit: true };
        // @ts-expect-error TS(2304): Cannot find name 'expect'.
        expect(wrapper.instance().shouldComponentUpdate(nextProps)).toBe(true);
      });
    });

    // @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
    describe('when props.dbclickToEdit is change', () => {
      const column = { dataField: 'name', text: 'Product Name' };
      // @ts-expect-error TS(2304): Cannot find name 'beforeEach'.
      beforeEach(() => {
        props = {
          row,
          columnIndex: 1,
          rowIndex: 1,
          column
        };
        wrapper = shallow(
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <Cell { ...props } />);
      });

      // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
      it('should return true', () => {
        nextProps = { ...props, dbclickToEdit: true };
        // @ts-expect-error TS(2304): Cannot find name 'expect'.
        expect(wrapper.instance().shouldComponentUpdate(nextProps)).toBe(true);
      });
    });

    // @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
    describe('when props.style is change', () => {
      const column = { dataField: 'name', text: 'Product Name' };
      // @ts-expect-error TS(2304): Cannot find name 'beforeEach'.
      beforeEach(() => {
        props = {
          row,
          columnIndex: 1,
          rowIndex: 1,
          column,
          style: {}
        };
        wrapper = shallow(
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <Cell { ...props } />);
      });

      // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
      it('should return true', () => {
        nextProps = { ...props, style: { color: 'red' } };
        // @ts-expect-error TS(2304): Cannot find name 'expect'.
        expect(wrapper.instance().shouldComponentUpdate(nextProps)).toBe(true);
      });
    });

    // @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
    describe('when column.formatExtraData is change', () => {
      const column = { dataField: 'name', text: 'Product Name', formatExtraData: { a: 1 } };
      // @ts-expect-error TS(2304): Cannot find name 'beforeEach'.
      beforeEach(() => {
        props = {
          row,
          columnIndex: 1,
          rowIndex: 1,
          column
        };
        wrapper = shallow(
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <Cell { ...props } />);
      });

      // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
      it('should return true', () => {
        nextProps = { ...props, column: { ...column, formatExtraData: { b: 2 } } };
        // @ts-expect-error TS(2304): Cannot find name 'expect'.
        expect(wrapper.instance().shouldComponentUpdate(nextProps)).toBe(true);
      });
    });

    // @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
    describe('when column.events is change', () => {
      // @ts-expect-error TS(2304): Cannot find name 'jest'.
      const column = { dataField: 'name', text: 'Product Name', events: { a: jest.fn() } };
      // @ts-expect-error TS(2304): Cannot find name 'beforeEach'.
      beforeEach(() => {
        props = {
          row,
          columnIndex: 1,
          rowIndex: 1,
          column
        };
        wrapper = shallow(
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <Cell { ...props } />);
      });

      // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
      it('should return true', () => {
        // @ts-expect-error TS(2304): Cannot find name 'jest'.
        nextProps = { ...props, column: { ...column, events: { b: jest.fn() } } };
        // @ts-expect-error TS(2304): Cannot find name 'expect'.
        expect(wrapper.instance().shouldComponentUpdate(nextProps)).toBe(true);
      });
    });

    // @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
    describe('when column.attrs is change', () => {
      const column = { dataField: 'name', text: 'Product Name', attrs: { 'data-att': 1 } };
      // @ts-expect-error TS(2304): Cannot find name 'beforeEach'.
      beforeEach(() => {
        props = {
          row,
          columnIndex: 1,
          rowIndex: 1,
          column
        };
        wrapper = shallow(
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <Cell { ...props } />);
      });

      // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
      it('should return true', () => {
        nextProps = { ...props, column: { ...column, attrs: null } };
        // @ts-expect-error TS(2304): Cannot find name 'expect'.
        expect(wrapper.instance().shouldComponentUpdate(nextProps)).toBe(true);
      });
    });
  });
});
