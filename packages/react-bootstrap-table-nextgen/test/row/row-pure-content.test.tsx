import React from 'react';
// @ts-expect-error TS(7016): Could not find a declaration file for module 'enzy... Remove this comment to see the full error message
import { shallow } from 'enzyme';

// @ts-expect-error TS(6142): Module '../../src/cell' was resolved to '/Users/te... Remove this comment to see the full error message
import Cell from '../../src/cell';
// @ts-expect-error TS(6142): Module '../../src/row/row-pure-content' was resolv... Remove this comment to see the full error message
import RowPureContent from '../../src/row/row-pure-content';
import mockBodyResolvedProps from '../test-helpers/mock/body-resolved-props';

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
describe('RowPureContent', () => {
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
  describe('shouldComponentUpdate', () => {
    let props: any;
    let nextProps;

    // @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
    describe('if nextProps.shouldUpdate is different with this.props.shouldUpdate', () => {
      // @ts-expect-error TS(2304): Cannot find name 'beforeEach'.
      beforeEach(() => {
        props = {
          keyField,
          columns: defaultColumns,
          rowIndex: 1,
          row,
          shouldUpdate: false
        };
        wrapper = shallow(
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <RowPureContent { ...props } />
        );
      });

      // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
      it('should return true', () => {
        nextProps = { ...props, shouldUpdate: true };
        // @ts-expect-error TS(2304): Cannot find name 'expect'.
        expect(wrapper.instance().shouldComponentUpdate(nextProps)).toBe(true);
      });
    });

    // @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
    describe('if nextProps.shouldUpdate is same with this.props.shouldUpdate', () => {
      // @ts-expect-error TS(2304): Cannot find name 'beforeEach'.
      beforeEach(() => {
        props = {
          keyField,
          columns: defaultColumns,
          rowIndex: 1,
          row,
          shouldUpdate: false
        };
        wrapper = shallow(
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <RowPureContent { ...props } />
        );
      });

      // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
      it('should return false', () => {
        nextProps = { ...props };
        // @ts-expect-error TS(2304): Cannot find name 'expect'.
        expect(wrapper.instance().shouldComponentUpdate(nextProps)).toBe(false);
      });
    });
  });

  // @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
  describe('simplest row', () => {
    // @ts-expect-error TS(2304): Cannot find name 'beforeEach'.
    beforeEach(() => {
      wrapper = shallow(
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <RowPureContent
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
      expect(wrapper.length).toBe(defaultColumns.length);
      // @ts-expect-error TS(2304): Cannot find name 'expect'.
      expect(wrapper.find(Cell).length).toBe(Object.keys(row).length);
    });
  });

  // @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
  describe('when tabIndexStart prop is -1', () => {
    // @ts-expect-error TS(2304): Cannot find name 'beforeEach'.
    beforeEach(() => {
      wrapper = shallow(
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <RowPureContent
          tabIndexStart={ -1 }
          keyField={ keyField }
          rowIndex={ rowIndex }
          columns={ defaultColumns }
          row={ row }
        />
      );
    });

    // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('should not render tabIndex prop on Cell', () => {
      wrapper.find(Cell).forEach((cell: any) => {
        // @ts-expect-error TS(2304): Cannot find name 'expect'.
        expect(cell.prop('tabIndex')).toBeUndefined();
      });
    });
  });

  // @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
  describe('when tabIndexStart prop is not -1', () => {
    const tabIndexStart = 4;
    // @ts-expect-error TS(2304): Cannot find name 'beforeEach'.
    beforeEach(() => {
      wrapper = shallow(
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <RowPureContent
          tabIndexStart={ tabIndexStart }
          keyField={ keyField }
          rowIndex={ rowIndex }
          columns={ defaultColumns }
          row={ row }
        />
      );
    });

    // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('should render correct tabIndex prop on Cell', () => {
      wrapper.find(Cell).forEach((cell: any, i: any) => {
        // @ts-expect-error TS(2304): Cannot find name 'expect'.
        expect(cell.prop('tabIndex')).toEqual(tabIndexStart + i);
      });
    });
  });

  // @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
  describe('when editingRowIdx and editingColIdx prop is defined', () => {
    const editingRowIdx = rowIndex;
    const editingColIdx = 1;
    const EditingCellComponent = () => null;
    // @ts-expect-error TS(2304): Cannot find name 'beforeEach'.
    beforeEach(() => {
      wrapper = shallow(
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <RowPureContent
          keyField={ keyField }
          rowIndex={ rowIndex }
          columns={ defaultColumns }
          row={ row }
          EditingCellComponent={ EditingCellComponent }
          editingRowIdx={ editingRowIdx }
          editingColIdx={ editingColIdx }
        />);
    });

    // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('should render EditingCell component correctly', () => {
      const EditingCell = wrapper.find(EditingCellComponent);
      // @ts-expect-error TS(2304): Cannot find name 'expect'.
      expect(wrapper.length).toBe(defaultColumns.length);
      // @ts-expect-error TS(2304): Cannot find name 'expect'.
      expect(EditingCell).toHaveLength(1);
      // @ts-expect-error TS(2304): Cannot find name 'expect'.
      expect(EditingCell.prop('row')).toEqual(row);
      // @ts-expect-error TS(2304): Cannot find name 'expect'.
      expect(EditingCell.prop('rowIndex')).toEqual(editingRowIdx);
      // @ts-expect-error TS(2304): Cannot find name 'expect'.
      expect(EditingCell.prop('column')).toEqual(defaultColumns[editingColIdx]);
      // @ts-expect-error TS(2304): Cannot find name 'expect'.
      expect(EditingCell.prop('columnIndex')).toEqual(editingColIdx);
    });
  });

  // @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
  describe('when column.style prop is defined', () => {
    let columns: any;
    const columnIndex = 1;

    // @ts-expect-error TS(2304): Cannot find name 'beforeEach'.
    beforeEach(() => {
      columns = [...defaultColumns];
    });

    // @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
    describe('when style is an object', () => {
      // @ts-expect-error TS(2304): Cannot find name 'beforeEach'.
      beforeEach(() => {
        columns[columnIndex].style = { backgroundColor: 'red' };
        wrapper = shallow(
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <RowPureContent
            keyField={ keyField }
            rowIndex={ rowIndex }
            columns={ columns }
            row={ row }
          />
        );
      });

      // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
      it('should render Cell correctly', () => {
        // @ts-expect-error TS(2304): Cannot find name 'expect'.
        expect(wrapper.length).toBe(defaultColumns.length);
        // @ts-expect-error TS(2304): Cannot find name 'expect'.
        expect(wrapper.find(Cell).get(columnIndex).props.style).toEqual(columns[columnIndex].style);
      });
    });

    // @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
    describe('when style is a function', () => {
      const returnStyle = { backgroundColor: 'red' };
      let styleCallBack: any;

      // @ts-expect-error TS(2304): Cannot find name 'beforeEach'.
      beforeEach(() => {
        // @ts-expect-error TS(2304): Cannot find name 'jest'.
        styleCallBack = jest.fn().mockReturnValue(returnStyle);
        columns[columnIndex].style = styleCallBack;
        wrapper = shallow(
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <RowPureContent
            keyField={ keyField }
            rowIndex={ rowIndex }
            columns={ columns }
            row={ row }
          />
        );
      });

      // @ts-expect-error TS(2304): Cannot find name 'afterEach'.
      afterEach(() => { styleCallBack.mockClear(); });

      // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
      it('should render Cell correctly', () => {
        // @ts-expect-error TS(2304): Cannot find name 'expect'.
        expect(wrapper.length).toBe(defaultColumns.length);
        // @ts-expect-error TS(2304): Cannot find name 'expect'.
        expect(wrapper.find(Cell).get(columnIndex).props.style).toEqual(returnStyle);
      });

      // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
      it('should call custom style function correctly', () => {
        // @ts-expect-error TS(2304): Cannot find name 'expect'.
        expect(styleCallBack).toHaveBeenCalledTimes(1);
        // @ts-expect-error TS(2304): Cannot find name 'expect'.
        expect(styleCallBack).toHaveBeenCalledWith(
          // @ts-expect-error TS(7053): Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
          row[columns[columnIndex].dataField], row, rowIndex, columnIndex);
      });
    });
  });

  // @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
  describe('when column.classes prop is defined', () => {
    let columns: any;
    const columnIndex = 1;

    // @ts-expect-error TS(2304): Cannot find name 'beforeEach'.
    beforeEach(() => {
      columns = [...defaultColumns];
    });

    // @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
    describe('when classes is an object', () => {
      // @ts-expect-error TS(2304): Cannot find name 'beforeEach'.
      beforeEach(() => {
        columns[columnIndex].classes = 'td-test-class';
        wrapper = shallow(
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <RowPureContent
            keyField={ keyField }
            rowIndex={ rowIndex }
            columns={ columns }
            row={ row }
          />
        );
      });

      // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
      it('should render Cell correctly', () => {
        // @ts-expect-error TS(2304): Cannot find name 'expect'.
        expect(wrapper.length).toBe(defaultColumns.length);
        // @ts-expect-error TS(2304): Cannot find name 'expect'.
        expect(wrapper.find(Cell).get(columnIndex).props.className)
          .toEqual(columns[columnIndex].classes);
      });
    });

    // @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
    describe('when classes is a function', () => {
      const returnClasses = 'td-test-class';
      let classesCallBack: any;

      // @ts-expect-error TS(2304): Cannot find name 'beforeEach'.
      beforeEach(() => {
        // @ts-expect-error TS(2304): Cannot find name 'jest'.
        classesCallBack = jest.fn().mockReturnValue(returnClasses);
        columns[columnIndex].classes = classesCallBack;
        wrapper = shallow(
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <RowPureContent
            keyField={ keyField }
            rowIndex={ rowIndex }
            columns={ columns }
            row={ row }
          />
        );
      });

      // @ts-expect-error TS(2304): Cannot find name 'afterEach'.
      afterEach(() => { classesCallBack.mockClear(); });

      // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
      it('should render Cell correctly', () => {
        // @ts-expect-error TS(2304): Cannot find name 'expect'.
        expect(wrapper.length).toBe(defaultColumns.length);
        // @ts-expect-error TS(2304): Cannot find name 'expect'.
        expect(wrapper.find(Cell).get(columnIndex).props.className).toEqual(returnClasses);
      });

      // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
      it('should call custom classes function correctly', () => {
        // @ts-expect-error TS(2304): Cannot find name 'expect'.
        expect(classesCallBack).toHaveBeenCalledTimes(1);
        // @ts-expect-error TS(2304): Cannot find name 'expect'.
        expect(classesCallBack).toHaveBeenCalledWith(
          // @ts-expect-error TS(7053): Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
          row[columns[columnIndex].dataField], row, rowIndex, columnIndex);
      });
    });
  });

  // @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
  describe('when column.title prop is defined', () => {
    let columns: any;
    const columnIndex = 1;

    // @ts-expect-error TS(2304): Cannot find name 'beforeEach'.
    beforeEach(() => {
      columns = [...defaultColumns];
    });

    // @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
    describe('when title is an string', () => {
      // @ts-expect-error TS(2304): Cannot find name 'beforeEach'.
      beforeEach(() => {
        columns[columnIndex].title = true;
        wrapper = shallow(
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <RowPureContent
            keyField={ keyField }
            rowIndex={ rowIndex }
            columns={ columns }
            row={ row }
          />
        );
      });

      // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
      it('should render Cell correctly', () => {
        // @ts-expect-error TS(2304): Cannot find name 'expect'.
        expect(wrapper.length).toBe(defaultColumns.length);
        // @ts-expect-error TS(2304): Cannot find name 'expect'.
        expect(wrapper.find(Cell).get(columnIndex).props.title)
          // @ts-expect-error TS(7053): Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
          .toEqual(row[columns[columnIndex].dataField]);
      });
    });

    // @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
    describe('when title is a function', () => {
      const returnTitle = 'test title';
      let titleCallBack: any;

      // @ts-expect-error TS(2304): Cannot find name 'beforeEach'.
      beforeEach(() => {
        // @ts-expect-error TS(2304): Cannot find name 'jest'.
        titleCallBack = jest.fn().mockReturnValue(returnTitle);
        columns[columnIndex].title = titleCallBack;
        wrapper = shallow(
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <RowPureContent
            keyField={ keyField }
            rowIndex={ rowIndex }
            columns={ columns }
            row={ row }
          />
        );
      });

      // @ts-expect-error TS(2304): Cannot find name 'afterEach'.
      afterEach(() => { titleCallBack.mockClear(); });

      // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
      it('should render Cell correctly', () => {
        // @ts-expect-error TS(2304): Cannot find name 'expect'.
        expect(wrapper.length).toBe(defaultColumns.length);
        // @ts-expect-error TS(2304): Cannot find name 'expect'.
        expect(wrapper.find(Cell).get(columnIndex).props.title).toEqual(returnTitle);
      });

      // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
      it('should call custom title function correctly', () => {
        // @ts-expect-error TS(2304): Cannot find name 'expect'.
        expect(titleCallBack).toHaveBeenCalledTimes(1);
        // @ts-expect-error TS(2304): Cannot find name 'expect'.
        expect(titleCallBack).toHaveBeenCalledWith(
          // @ts-expect-error TS(7053): Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
          row[columns[columnIndex].dataField], row, rowIndex, columnIndex);
      });
    });
  });

  // @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
  describe('when column.events prop is defined', () => {
    let columns;
    const columnIndex = 1;

    // @ts-expect-error TS(2304): Cannot find name 'beforeEach'.
    beforeEach(() => {
      columns = [...defaultColumns];
      // @ts-expect-error TS(2339): Property 'events' does not exist on type '{ dataFi... Remove this comment to see the full error message
      columns[columnIndex].events = {
        // @ts-expect-error TS(2304): Cannot find name 'jest'.
        onClick: jest.fn()
      };

      wrapper = shallow(
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <RowPureContent
          keyField={ keyField }
          rowIndex={ rowIndex }
          columns={ columns }
          row={ row }
        />
      );
    });

    // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('should attachs DOM event successfully', () => {
      // @ts-expect-error TS(2304): Cannot find name 'expect'.
      expect(wrapper.length).toBe(defaultColumns.length);
      // @ts-expect-error TS(2304): Cannot find name 'expect'.
      expect(wrapper.find(Cell).get(columnIndex).props.onClick).toBeDefined();
    });
  });

  // @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
  describe('when column.align prop is defined', () => {
    let columns: any;
    const columnIndex = 1;

    // @ts-expect-error TS(2304): Cannot find name 'beforeEach'.
    beforeEach(() => {
      columns = [...defaultColumns];
    });

    // @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
    describe('when align is a string', () => {
      // @ts-expect-error TS(2304): Cannot find name 'beforeEach'.
      beforeEach(() => {
        columns[columnIndex].align = 'right';
        wrapper = shallow(
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <RowPureContent
            keyField={ keyField }
            rowIndex={ rowIndex }
            columns={ columns }
            row={ row }
          />
        );
      });

      // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
      it('should render Cell correctly', () => {
        // @ts-expect-error TS(2304): Cannot find name 'expect'.
        expect(wrapper.length).toBe(defaultColumns.length);
        // @ts-expect-error TS(2304): Cannot find name 'expect'.
        expect(wrapper.find(Cell).get(columnIndex).props.style.textAlign)
          .toEqual(columns[columnIndex].align);
      });
    });

    // @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
    describe('when align is a function', () => {
      const returnAlign = 'right';
      let alignCallBack: any;

      // @ts-expect-error TS(2304): Cannot find name 'beforeEach'.
      beforeEach(() => {
        // @ts-expect-error TS(2304): Cannot find name 'jest'.
        alignCallBack = jest.fn().mockReturnValue(returnAlign);
        columns[columnIndex].align = alignCallBack;
        wrapper = shallow(
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <RowPureContent
            { ...mockBodyResolvedProps }
            keyField={ keyField }
            rowIndex={ rowIndex }
            columns={ columns }
            row={ row }
          />
        );
      });

      // @ts-expect-error TS(2304): Cannot find name 'afterEach'.
      afterEach(() => { alignCallBack.mockClear(); });

      // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
      it('should render Cell correctly', () => {
        // @ts-expect-error TS(2304): Cannot find name 'expect'.
        expect(wrapper.length).toBe(defaultColumns.length);
        // @ts-expect-error TS(2304): Cannot find name 'expect'.
        expect(wrapper.find(Cell).get(columnIndex).props.style.textAlign).toEqual(returnAlign);
      });

      // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
      it('should call custom align function correctly', () => {
        // @ts-expect-error TS(2304): Cannot find name 'expect'.
        expect(alignCallBack).toHaveBeenCalledTimes(1);
        // @ts-expect-error TS(2304): Cannot find name 'expect'.
        expect(alignCallBack).toHaveBeenCalledWith(
          // @ts-expect-error TS(7053): Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
          row[columns[columnIndex].dataField], row, rowIndex, columnIndex);
      });
    });
  });

  // @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
  describe('when column.attrs prop is defined', () => {
    let columns: any;
    const columnIndex = 1;

    // @ts-expect-error TS(2304): Cannot find name 'beforeEach'.
    beforeEach(() => {
      columns = [...defaultColumns];
    });

    // @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
    describe('when attrs is an object', () => {
      // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
      it('should render Cell correctly', () => {
        columns[columnIndex].attrs = {
          'data-test': 'test',
          title: 'title',
          className: 'attrs-class',
          style: {
            backgroundColor: 'attrs-style-test',
            display: 'none',
            textAlign: 'right'
          }
        };

        wrapper = shallow(
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <RowPureContent
            keyField={ keyField }
            rowIndex={ rowIndex }
            columns={ columns }
            row={ row }
          />
        );

        // @ts-expect-error TS(2304): Cannot find name 'expect'.
        expect(wrapper.length).toBe(defaultColumns.length);
        // @ts-expect-error TS(2304): Cannot find name 'expect'.
        expect(wrapper.find(Cell).get(columnIndex).props['data-test'])
          .toEqual(columns[columnIndex].attrs['data-test']);
        // @ts-expect-error TS(2304): Cannot find name 'expect'.
        expect(wrapper.find(Cell).get(columnIndex).props.title)
          .toEqual(columns[columnIndex].attrs.title);
        // @ts-expect-error TS(2304): Cannot find name 'expect'.
        expect(wrapper.find(Cell).get(columnIndex).props.className)
          .toEqual(columns[columnIndex].attrs.className);
        // @ts-expect-error TS(2304): Cannot find name 'expect'.
        expect(wrapper.find(Cell).get(columnIndex).props.style)
          .toEqual(columns[columnIndex].attrs.style);
      });

      // @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
      describe('when column.title prop is defined', () => {
        // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
        it('attrs.title should be overwrited', () => {
          columns[columnIndex].title = true;
          columns[columnIndex].attrs = { title: 'title' };

          wrapper = shallow(
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <RowPureContent
              keyField={ keyField }
              rowIndex={ rowIndex }
              columns={ columns }
              row={ row }
            />
          );

          // @ts-expect-error TS(2304): Cannot find name 'expect'.
          expect(wrapper.find(Cell).get(columnIndex).props.title)
            // @ts-expect-error TS(7053): Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
            .toEqual(row[columns[columnIndex].dataField]);
        });
      });

      // @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
      describe('when column.classes prop is defined', () => {
        // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
        it('attrs.className should be overwrited', () => {
          columns[columnIndex].classes = 'td-test-class';
          columns[columnIndex].attrs = { className: 'attrs-class' };

          wrapper = shallow(
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <RowPureContent
              keyField={ keyField }
              rowIndex={ rowIndex }
              columns={ columns }
              row={ row }
            />
          );

          // @ts-expect-error TS(2304): Cannot find name 'expect'.
          expect(wrapper.find(Cell).get(columnIndex).props.className)
            .toEqual(columns[columnIndex].classes);
        });
      });

      // @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
      describe('when column.style prop is defined', () => {
        // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
        it('attrs.style should be overwrited', () => {
          columns[columnIndex].style = { backgroundColor: 'red' };
          columns[columnIndex].attrs = { style: { backgroundColor: 'attrs-style-test' } };

          wrapper = shallow(
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <RowPureContent
              keyField={ keyField }
              rowIndex={ rowIndex }
              columns={ columns }
              row={ row }
            />
          );

          // @ts-expect-error TS(2304): Cannot find name 'expect'.
          expect(wrapper.find(Cell).get(columnIndex).props.style)
            .toEqual(columns[columnIndex].style);
        });
      });

      // @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
      describe('when column.align prop is defined', () => {
        // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
        it('attrs.style.textAlign should be overwrited', () => {
          columns[columnIndex].align = 'center';
          columns[columnIndex].attrs = { style: { textAlign: 'right' } };

          wrapper = shallow(
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <RowPureContent
              keyField={ keyField }
              rowIndex={ rowIndex }
              columns={ columns }
              row={ row }
            />
          );

          // @ts-expect-error TS(2304): Cannot find name 'expect'.
          expect(wrapper.find(Cell).get(columnIndex).props.style.textAlign)
            .toEqual(columns[columnIndex].align);
        });
      });
    });

    // @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
    describe('when attrs is custom function', () => {
      let attrsCallBack: any;
      const customAttrs = {
        'data-test': 'test',
        title: 'title'
      };

      // @ts-expect-error TS(2304): Cannot find name 'beforeEach'.
      beforeEach(() => {
        // @ts-expect-error TS(2304): Cannot find name 'jest'.
        attrsCallBack = jest.fn().mockReturnValue(customAttrs);
        columns[columnIndex].attrs = attrsCallBack;
        wrapper = shallow(
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <RowPureContent
            keyField={ keyField }
            rowIndex={ rowIndex }
            columns={ columns }
            row={ row }
          />
        );
      });

      // @ts-expect-error TS(2304): Cannot find name 'afterEach'.
      afterEach(() => { attrsCallBack.mockClear(); });

      // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
      it('should render style.attrs correctly', () => {
        // @ts-expect-error TS(2304): Cannot find name 'expect'.
        expect(wrapper.length).toBe(defaultColumns.length);
        // @ts-expect-error TS(2304): Cannot find name 'expect'.
        expect(wrapper.find(Cell).get(columnIndex).props['data-test'])
          .toEqual(customAttrs['data-test']);
        // @ts-expect-error TS(2304): Cannot find name 'expect'.
        expect(wrapper.find(Cell).get(columnIndex).props.title)
          .toEqual(customAttrs.title);
      });

      // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
      it('should call custom attrs function correctly', () => {
        // @ts-expect-error TS(2304): Cannot find name 'expect'.
        expect(attrsCallBack).toHaveBeenCalledTimes(1);
        // @ts-expect-error TS(2304): Cannot find name 'expect'.
        expect(attrsCallBack).toHaveBeenCalledWith(
          // @ts-expect-error TS(7053): Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
          row[columns[columnIndex].dataField], row, rowIndex, columnIndex);
      });
    });
  });
});
