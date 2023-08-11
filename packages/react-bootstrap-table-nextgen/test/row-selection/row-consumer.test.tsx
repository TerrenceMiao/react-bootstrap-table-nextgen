import 'jsdom-global/register';
import React from 'react';
// @ts-expect-error TS(7016): Could not find a declaration file for module 'enzy... Remove this comment to see the full error message
import { mount } from 'enzyme';

// @ts-expect-error TS(6142): Module '../../src/contexts/selection-context' was ... Remove this comment to see the full error message
import SelectionContext from '../../src/contexts/selection-context';
// @ts-expect-error TS(6142): Module '../../src/row-selection/row-consumer' was ... Remove this comment to see the full error message
import withSelectionConsumer from '../../src/row-selection/row-consumer';

// @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
describe('withSelectionConsumer', () => {
  let wrapper: any;
  let selectRow: any;
  const BaseComponent = () => null;
  // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
  const WithSelectionComponent = withSelectionConsumer((props: any) => <BaseComponent { ...props } />);

  const data = [{
    id: 1,
    name: 'A'
  }, {
    id: 2,
    name: 'B'
  }, {
    id: 3,
    name: 'C'
  }];
  const rowIndex = 1;
  const row = data[rowIndex];
  const keyField = 'id';
  const value = row[keyField];

  // @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
  describe('if current row is selected', () => {
    // @ts-expect-error TS(2304): Cannot find name 'beforeEach'.
    beforeEach(() => {
      selectRow = { mode: 'checkbox', selected: [data[rowIndex][keyField]] };
      wrapper = mount(
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <SelectionContext.Provider data={ data } keyField={ keyField } selectRow={ selectRow }>
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <WithSelectionComponent
            row={ row }
            value={ value }
            keyField={ keyField }
            rowIndex={ rowIndex }
          />
        </SelectionContext.Provider>
      );
    });

    // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('should inject selected prop as true to target component', () => {
      // @ts-expect-error TS(2304): Cannot find name 'expect'.
      expect(wrapper.find(BaseComponent)).toHaveLength(1);
      // @ts-expect-error TS(2304): Cannot find name 'expect'.
      expect(wrapper.find(BaseComponent).prop('selected')).toBeTruthy();
    });
  });

  // @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
  describe('if current row is not selected', () => {
    // @ts-expect-error TS(2304): Cannot find name 'beforeEach'.
    beforeEach(() => {
      selectRow = { mode: 'checkbox', selected: [] };
      wrapper = mount(
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <SelectionContext.Provider data={ data } keyField={ keyField } selectRow={ selectRow }>
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <WithSelectionComponent
            row={ row }
            value={ value }
            keyField={ keyField }
            rowIndex={ rowIndex }
          />
        </SelectionContext.Provider>
      );
    });

    // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('should inject selected prop as false to target component', () => {
      // @ts-expect-error TS(2304): Cannot find name 'expect'.
      expect(wrapper.find(BaseComponent)).toHaveLength(1);
      // @ts-expect-error TS(2304): Cannot find name 'expect'.
      expect(wrapper.find(BaseComponent).prop('selected')).toBeFalsy();
    });
  });

  // @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
  describe('if current row is selectable', () => {
    // @ts-expect-error TS(2304): Cannot find name 'beforeEach'.
    beforeEach(() => {
      selectRow = { mode: 'checkbox', nonSelectable: [] };
      wrapper = mount(
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <SelectionContext.Provider data={ data } keyField={ keyField } selectRow={ selectRow }>
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <WithSelectionComponent
            row={ row }
            value={ value }
            keyField={ keyField }
            rowIndex={ rowIndex }
          />
        </SelectionContext.Provider>
      );
    });

    // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('should inject selectable prop as true to target component', () => {
      // @ts-expect-error TS(2304): Cannot find name 'expect'.
      expect(wrapper.find(BaseComponent)).toHaveLength(1);
      // @ts-expect-error TS(2304): Cannot find name 'expect'.
      expect(wrapper.find(BaseComponent).prop('selectable')).toBeTruthy();
    });
  });

  // @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
  describe('if current row is non selectable', () => {
    // @ts-expect-error TS(2304): Cannot find name 'beforeEach'.
    beforeEach(() => {
      selectRow = { mode: 'checkbox', nonSelectable: [data[rowIndex][keyField]] };
      wrapper = mount(
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <SelectionContext.Provider data={ data } keyField={ keyField } selectRow={ selectRow }>
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <WithSelectionComponent
            row={ row }
            value={ value }
            keyField={ keyField }
            rowIndex={ rowIndex }
          />
        </SelectionContext.Provider>
      );
    });

    // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('should inject selectable prop as false to target component', () => {
      // @ts-expect-error TS(2304): Cannot find name 'expect'.
      expect(wrapper.find(BaseComponent)).toHaveLength(1);
      // @ts-expect-error TS(2304): Cannot find name 'expect'.
      expect(wrapper.find(BaseComponent).prop('selectable')).toBeFalsy();
    });
  });

  // @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
  describe('if current row is selected', () => {
    const selectedStyle = { backgroundColor: 'green', fontWeight: 'bold' };
    // @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
    describe('when selectRow.style is defined as an object', () => {
      // @ts-expect-error TS(2304): Cannot find name 'beforeEach'.
      beforeEach(() => {
        selectRow = { mode: 'checkbox', selected: [data[rowIndex][keyField]], style: selectedStyle };
        wrapper = mount(
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <SelectionContext.Provider data={ data } keyField={ keyField } selectRow={ selectRow }>
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <WithSelectionComponent
              row={ row }
              value={ value }
              keyField={ keyField }
              rowIndex={ rowIndex }
            />
          </SelectionContext.Provider>
        );
      });

      // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
      it('should inject style prop correctly', () => {
        // @ts-expect-error TS(2304): Cannot find name 'expect'.
        expect(wrapper.find(BaseComponent)).toHaveLength(1);
        // @ts-expect-error TS(2304): Cannot find name 'expect'.
        expect(wrapper.find(BaseComponent).prop('style')).toEqual(selectedStyle);
      });

      // @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
      describe('and props.style is also defined', () => {
        const componentStype = { fontSize: '16px' };
        // @ts-expect-error TS(2304): Cannot find name 'beforeEach'.
        beforeEach(() => {
          wrapper = mount(
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <SelectionContext.Provider data={ data } keyField={ keyField } selectRow={ selectRow }>
              // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
              <WithSelectionComponent
                row={ row }
                value={ value }
                keyField={ keyField }
                rowIndex={ rowIndex }
                style={ componentStype }
              />
            </SelectionContext.Provider>
          );
        });

        // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
        it('should inject style prop correctly', () => {
          // @ts-expect-error TS(2304): Cannot find name 'expect'.
          expect(wrapper.find(BaseComponent)).toHaveLength(1);
          // @ts-expect-error TS(2304): Cannot find name 'expect'.
          expect(wrapper.find(BaseComponent).prop('style')).toEqual({
            ...selectedStyle,
            ...componentStype
          });
        });
      });

      // @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
      describe('and selectRow.bgColor is also defined as an object', () => {
        // @ts-expect-error TS(2304): Cannot find name 'beforeEach'.
        beforeEach(() => {
          selectRow.bgColor = 'gray';
          wrapper = mount(
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <SelectionContext.Provider data={ data } keyField={ keyField } selectRow={ selectRow }>
              // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
              <WithSelectionComponent
                row={ row }
                value={ value }
                keyField={ keyField }
                rowIndex={ rowIndex }
              />
            </SelectionContext.Provider>
          );
        });

        // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
        it('should inject style prop with correct backgroundColor', () => {
          // @ts-expect-error TS(2304): Cannot find name 'expect'.
          expect(wrapper.find(BaseComponent)).toHaveLength(1);
          // @ts-expect-error TS(2304): Cannot find name 'expect'.
          expect(wrapper.find(BaseComponent).prop('style')).toEqual({
            ...selectedStyle,
            backgroundColor: selectRow.bgColor
          });
        });
      });

      // @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
      describe('and selectRow.bgColor is also defined as a function', () => {
        const color = 'gray';
        // @ts-expect-error TS(2304): Cannot find name 'beforeEach'.
        beforeEach(() => {
          // @ts-expect-error TS(2304): Cannot find name 'jest'.
          selectRow.bgColor = jest.fn().mockReturnValue(color);
          wrapper = mount(
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <SelectionContext.Provider data={ data } keyField={ keyField } selectRow={ selectRow }>
              // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
              <WithSelectionComponent
                row={ row }
                value={ value }
                keyField={ keyField }
                rowIndex={ rowIndex }
              />
            </SelectionContext.Provider>
          );
        });

        // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
        it('should inject style prop with correct backgroundColor', () => {
          // @ts-expect-error TS(2304): Cannot find name 'expect'.
          expect(wrapper.find(BaseComponent)).toHaveLength(1);
          // @ts-expect-error TS(2304): Cannot find name 'expect'.
          expect(wrapper.find(BaseComponent).prop('style')).toEqual({
            ...selectedStyle,
            backgroundColor: color
          });
        });

        // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
        it('should call selectRow.bgColor function correctly', () => {
          // @ts-expect-error TS(2304): Cannot find name 'expect'.
          expect(selectRow.bgColor).toHaveBeenCalledTimes(1);
          // @ts-expect-error TS(2304): Cannot find name 'expect'.
          expect(selectRow.bgColor).toHaveBeenCalledWith(row, rowIndex);
        });
      });
    });

    // @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
    describe('when selectRow.style is defined as a function', () => {
      // @ts-expect-error TS(2304): Cannot find name 'beforeEach'.
      beforeEach(() => {
        // @ts-expect-error TS(2304): Cannot find name 'jest'.
        selectRow = { mode: 'checkbox', selected: [data[rowIndex][keyField]], style: jest.fn().mockReturnValue(selectedStyle) };
        wrapper = mount(
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <SelectionContext.Provider data={ data } keyField={ keyField } selectRow={ selectRow }>
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <WithSelectionComponent
              row={ row }
              value={ value }
              keyField={ keyField }
              rowIndex={ rowIndex }
            />
          </SelectionContext.Provider>
        );
      });

      // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
      it('should inject style prop correctly', () => {
        // @ts-expect-error TS(2304): Cannot find name 'expect'.
        expect(wrapper.find(BaseComponent)).toHaveLength(1);
        // @ts-expect-error TS(2304): Cannot find name 'expect'.
        expect(wrapper.find(BaseComponent).prop('style')).toEqual(selectedStyle);
      });

      // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
      it('should call selectRow.style function correctly', () => {
        // @ts-expect-error TS(2304): Cannot find name 'expect'.
        expect(selectRow.style).toHaveBeenCalledTimes(1);
        // @ts-expect-error TS(2304): Cannot find name 'expect'.
        expect(selectRow.style).toHaveBeenCalledWith(row, rowIndex);
      });

      // @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
      describe('and props.style is also defined', () => {
        const componentStype = { fontSize: '16px' };
        // @ts-expect-error TS(2304): Cannot find name 'beforeEach'.
        beforeEach(() => {
          wrapper = mount(
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <SelectionContext.Provider data={ data } keyField={ keyField } selectRow={ selectRow }>
              // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
              <WithSelectionComponent
                row={ row }
                value={ value }
                keyField={ keyField }
                rowIndex={ rowIndex }
                style={ componentStype }
              />
            </SelectionContext.Provider>
          );
        });

        // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
        it('should inject style prop correctly', () => {
          // @ts-expect-error TS(2304): Cannot find name 'expect'.
          expect(wrapper.find(BaseComponent)).toHaveLength(1);
          // @ts-expect-error TS(2304): Cannot find name 'expect'.
          expect(wrapper.find(BaseComponent).prop('style')).toEqual({
            ...selectedStyle,
            ...componentStype
          });
        });
      });

      // @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
      describe('and selectRow.bgColor is also defined as an object', () => {
        // @ts-expect-error TS(2304): Cannot find name 'beforeEach'.
        beforeEach(() => {
          selectRow.bgColor = 'gray';
          wrapper = mount(
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <SelectionContext.Provider data={ data } keyField={ keyField } selectRow={ selectRow }>
              // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
              <WithSelectionComponent
                row={ row }
                value={ value }
                keyField={ keyField }
                rowIndex={ rowIndex }
              />
            </SelectionContext.Provider>
          );
        });

        // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
        it('should inject style prop with correct backgroundColor', () => {
          // @ts-expect-error TS(2304): Cannot find name 'expect'.
          expect(wrapper.find(BaseComponent)).toHaveLength(1);
          // @ts-expect-error TS(2304): Cannot find name 'expect'.
          expect(wrapper.find(BaseComponent).prop('style')).toEqual({
            ...selectedStyle,
            backgroundColor: selectRow.bgColor
          });
        });
      });

      // @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
      describe('and selectRow.bgColor is also defined as a function', () => {
        const color = 'gray';
        // @ts-expect-error TS(2304): Cannot find name 'beforeEach'.
        beforeEach(() => {
          // @ts-expect-error TS(2304): Cannot find name 'jest'.
          selectRow.bgColor = jest.fn().mockReturnValue(color);
          wrapper = mount(
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <SelectionContext.Provider data={ data } keyField={ keyField } selectRow={ selectRow }>
              // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
              <WithSelectionComponent
                row={ row }
                value={ value }
                keyField={ keyField }
                rowIndex={ rowIndex }
              />
            </SelectionContext.Provider>
          );
        });

        // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
        it('should inject style prop with correct backgroundColor', () => {
          // @ts-expect-error TS(2304): Cannot find name 'expect'.
          expect(wrapper.find(BaseComponent)).toHaveLength(1);
          // @ts-expect-error TS(2304): Cannot find name 'expect'.
          expect(wrapper.find(BaseComponent).prop('style')).toEqual({
            ...selectedStyle,
            backgroundColor: color
          });
        });

        // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
        it('should call selectRow.bgColor function correctly', () => {
          // @ts-expect-error TS(2304): Cannot find name 'expect'.
          expect(selectRow.bgColor).toHaveBeenCalledTimes(1);
          // @ts-expect-error TS(2304): Cannot find name 'expect'.
          expect(selectRow.bgColor).toHaveBeenCalledWith(row, rowIndex);
        });
      });
    });
  });

  // @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
  describe('if current row is selected', () => {
    const selectedClassName = 'select-classname';
    // @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
    describe('when selectRow.style is defined as an object', () => {
      // @ts-expect-error TS(2304): Cannot find name 'beforeEach'.
      beforeEach(() => {
        selectRow = { mode: 'checkbox', selected: [data[rowIndex][keyField]], classes: selectedClassName };
        wrapper = mount(
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <SelectionContext.Provider data={ data } keyField={ keyField } selectRow={ selectRow }>
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <WithSelectionComponent
              row={ row }
              value={ value }
              keyField={ keyField }
              rowIndex={ rowIndex }
            />
          </SelectionContext.Provider>
        );
      });

      // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
      it('should inject className prop correctly', () => {
        // @ts-expect-error TS(2304): Cannot find name 'expect'.
        expect(wrapper.find(BaseComponent)).toHaveLength(1);
        // @ts-expect-error TS(2304): Cannot find name 'expect'.
        expect(wrapper.find(BaseComponent).prop('className')).toEqual(selectedClassName);
      });

      // @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
      describe('and props.className is also defined', () => {
        const componentClassName = 'component-classname';
        // @ts-expect-error TS(2304): Cannot find name 'beforeEach'.
        beforeEach(() => {
          wrapper = mount(
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <SelectionContext.Provider data={ data } keyField={ keyField } selectRow={ selectRow }>
              // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
              <WithSelectionComponent
                row={ row }
                value={ value }
                keyField={ keyField }
                rowIndex={ rowIndex }
                className={ componentClassName }
              />
            </SelectionContext.Provider>
          );
        });

        // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
        it('should inject style prop correctly', () => {
          // @ts-expect-error TS(2304): Cannot find name 'expect'.
          expect(wrapper.find(BaseComponent)).toHaveLength(1);
          // @ts-expect-error TS(2304): Cannot find name 'expect'.
          expect(wrapper.find(BaseComponent).prop('className')).toEqual(`${componentClassName} ${selectedClassName}`);
        });
      });
    });

    // @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
    describe('when selectRow.style is defined as a function', () => {
      // @ts-expect-error TS(2304): Cannot find name 'beforeEach'.
      beforeEach(() => {
        // @ts-expect-error TS(2304): Cannot find name 'jest'.
        selectRow = { mode: 'checkbox', selected: [data[rowIndex][keyField]], classes: jest.fn().mockReturnValue(selectedClassName) };
        wrapper = mount(
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <SelectionContext.Provider data={ data } keyField={ keyField } selectRow={ selectRow }>
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <WithSelectionComponent
              row={ row }
              value={ value }
              keyField={ keyField }
              rowIndex={ rowIndex }
            />
          </SelectionContext.Provider>
        );
      });

      // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
      it('should inject className prop correctly', () => {
        // @ts-expect-error TS(2304): Cannot find name 'expect'.
        expect(wrapper.find(BaseComponent)).toHaveLength(1);
        // @ts-expect-error TS(2304): Cannot find name 'expect'.
        expect(wrapper.find(BaseComponent).prop('className')).toEqual(selectedClassName);
      });

      // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
      it('should call selectRow.classes function correctly', () => {
        // @ts-expect-error TS(2304): Cannot find name 'expect'.
        expect(selectRow.classes).toHaveBeenCalledTimes(1);
        // @ts-expect-error TS(2304): Cannot find name 'expect'.
        expect(selectRow.classes).toHaveBeenCalledWith(row, rowIndex);
      });

      // @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
      describe('and props.className is also defined', () => {
        const componentClassName = 'component-classname';
        // @ts-expect-error TS(2304): Cannot find name 'beforeEach'.
        beforeEach(() => {
          wrapper = mount(
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <SelectionContext.Provider data={ data } keyField={ keyField } selectRow={ selectRow }>
              // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
              <WithSelectionComponent
                row={ row }
                value={ value }
                keyField={ keyField }
                rowIndex={ rowIndex }
                className={ componentClassName }
              />
            </SelectionContext.Provider>
          );
        });

        // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
        it('should inject style prop correctly', () => {
          // @ts-expect-error TS(2304): Cannot find name 'expect'.
          expect(wrapper.find(BaseComponent)).toHaveLength(1);
          // @ts-expect-error TS(2304): Cannot find name 'expect'.
          expect(wrapper.find(BaseComponent).prop('className')).toEqual(`${componentClassName} ${selectedClassName}`);
        });
      });
    });
  });
});
