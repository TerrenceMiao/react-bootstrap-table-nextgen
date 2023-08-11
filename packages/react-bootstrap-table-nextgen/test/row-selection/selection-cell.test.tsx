import 'jsdom-global/register';
import React from 'react';
// @ts-expect-error TS(7016): Could not find a declaration file for module 'enzy... Remove this comment to see the full error message
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
// @ts-expect-error TS(7016): Could not find a declaration file for module 'sino... Remove this comment to see the full error message
import sinon from 'sinon';

import { shallowWithContext } from '../test-helpers/new-context';
// @ts-expect-error TS(6142): Module '../../src/row-selection/selection-cell' wa... Remove this comment to see the full error message
import SelectionCell from '../../src/row-selection/selection-cell';

// @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
describe('<SelectionCell />', () => {
  const mode = 'checkbox';
  const rowIndex = 1;

  let wrapper: any;

  // @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
  describe('shouldComponentUpdate', () => {
    let props: any;
    let nextProps;

    // @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
    describe('when selected prop has been changed', () => {
      // @ts-expect-error TS(2304): Cannot find name 'beforeEach'.
      beforeEach(() => {
        props = {
          selected: false,
          mode,
          rowIndex,
          disabled: false,
          rowKey: 1
        };
        wrapper = shallow(
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <SelectionCell { ...props } />
        );
      });

      // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
      it('should return true', () => {
        nextProps = { ...props, selected: true };
        // @ts-expect-error TS(2304): Cannot find name 'expect'.
        expect(wrapper.instance().shouldComponentUpdate(nextProps)).toBe(true);
      });
    });

    // @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
    describe('when rowIndex prop has been changed', () => {
      // @ts-expect-error TS(2304): Cannot find name 'beforeEach'.
      beforeEach(() => {
        props = {
          selected: false,
          mode,
          rowIndex,
          disabled: false,
          rowKey: 1
        };
        wrapper = shallow(
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <SelectionCell { ...props } />
        );
      });

      // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
      it('should return true', () => {
        nextProps = { ...props, rowIndex: 2 };
        // @ts-expect-error TS(2304): Cannot find name 'expect'.
        expect(wrapper.instance().shouldComponentUpdate(nextProps)).toBe(true);
      });
    });

    // @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
    describe('when tabIndex prop has been changed', () => {
      // @ts-expect-error TS(2304): Cannot find name 'beforeEach'.
      beforeEach(() => {
        props = {
          selected: false,
          mode,
          rowIndex,
          disabled: false,
          tabIndex: 0,
          rowKey: 1
        };
        wrapper = shallow(
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <SelectionCell { ...props } />
        );
      });

      // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
      it('should return true', () => {
        nextProps = { ...props, tabIndex: 2 };
        // @ts-expect-error TS(2304): Cannot find name 'expect'.
        expect(wrapper.instance().shouldComponentUpdate(nextProps)).toBe(true);
      });
    });

    // @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
    describe('when disabled prop has been changed', () => {
      // @ts-expect-error TS(2304): Cannot find name 'beforeEach'.
      beforeEach(() => {
        props = {
          selected: false,
          mode,
          rowIndex,
          disabled: false,
          rowKey: 1
        };
        wrapper = shallow(
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <SelectionCell { ...props } />
        );
      });

      // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
      it('should return true', () => {
        nextProps = { ...props, disabled: true };
        // @ts-expect-error TS(2304): Cannot find name 'expect'.
        expect(wrapper.instance().shouldComponentUpdate(nextProps)).toBe(true);
      });
    });

    // @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
    describe('when rowKey prop has been changed', () => {
      // @ts-expect-error TS(2304): Cannot find name 'beforeEach'.
      beforeEach(() => {
        props = {
          selected: false,
          mode,
          rowIndex,
          disabled: false,
          rowKey: 1
        };
        wrapper = shallow(
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <SelectionCell { ...props } />
        );
      });

      // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
      it('should return true', () => {
        nextProps = { ...props, rowKey: '1' };
        // @ts-expect-error TS(2304): Cannot find name 'expect'.
        expect(wrapper.instance().shouldComponentUpdate(nextProps)).toBe(true);
      });
    });
  });

  // @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
  describe('handleClick', () => {
    // @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
    describe('when <input /> was been clicked', () => {
      const rowKey = 1;
      const selected = true;
      let mockOnRowSelect: any;
      const spy = sinon.spy(SelectionCell.prototype, 'handleClick');

      // @ts-expect-error TS(2304): Cannot find name 'beforeEach'.
      beforeEach(() => {
        mockOnRowSelect = sinon.stub();
      });

      // @ts-expect-error TS(2304): Cannot find name 'afterEach'.
      afterEach(() => {
        spy.resetHistory();
        mockOnRowSelect.reset();
      });

      // @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
      describe('when disabled prop is false', () => {
        // @ts-expect-error TS(2304): Cannot find name 'beforeEach'.
        beforeEach(() => {
          wrapper = shallowWithContext(
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <SelectionCell
              selected
              rowKey={ rowKey }
              mode={ mode }
              rowIndex={ rowIndex }
              onRowSelect={ mockOnRowSelect }
            />,
            { bootstrap4: false }
          );
          // @ts-expect-error TS(2304): Cannot find name 'jest'.
          wrapper.find('td').simulate('click', { stopPropagation: jest.fn() });
        });

        // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
        it('should calling handleRowClicked', () => {
          // @ts-expect-error TS(2304): Cannot find name 'expect'.
          expect(spy.calledOnce).toBe(true);
        });

        // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
        it('should calling onRowSelect callback correctly', () => {
          // @ts-expect-error TS(2304): Cannot find name 'expect'.
          expect(mockOnRowSelect.calledOnce).toBe(true);
          // @ts-expect-error TS(2304): Cannot find name 'expect'.
          expect(mockOnRowSelect.calledWith(rowKey, !selected, rowIndex)).toBe(true);
        });
      });

      // @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
      describe('when disabled prop is true', () => {
        // @ts-expect-error TS(2304): Cannot find name 'beforeEach'.
        beforeEach(() => {
          wrapper = shallowWithContext(
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <SelectionCell
              selected
              rowKey={ rowKey }
              mode={ mode }
              rowIndex={ rowIndex }
              onRowSelect={ mockOnRowSelect }
              disabled
            />,
            { bootstrap4: false }
          );
          // @ts-expect-error TS(2304): Cannot find name 'jest'.
          wrapper.find('td').simulate('click', { stopPropagation: jest.fn() });
        });

        // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
        it('should calling handleRowClicked', () => {
          // @ts-expect-error TS(2304): Cannot find name 'expect'.
          expect(spy.calledOnce).toBe(true);
        });

        // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
        it('should not calling onRowSelect callback', () => {
          // @ts-expect-error TS(2304): Cannot find name 'expect'.
          expect(mockOnRowSelect.calledOnce).toBe(false);
        });
      });

      // @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
      describe('if selectRow.mode is radio', () => {
        // @ts-expect-error TS(2304): Cannot find name 'beforeEach'.
        beforeEach(() => {
          wrapper = shallowWithContext(
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <SelectionCell
              selected
              rowKey={ rowKey }
              mode="radio"
              rowIndex={ rowIndex }
              onRowSelect={ mockOnRowSelect }
            />,
            { bootstrap4: false }
          );
        });

        // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
        it('should be called with correct paramters', () => {
          // first click
          // @ts-expect-error TS(2304): Cannot find name 'jest'.
          wrapper.find('td').simulate('click', { stopPropagation: jest.fn() });
          // @ts-expect-error TS(2304): Cannot find name 'expect'.
          expect(mockOnRowSelect.callCount).toBe(1);
          // @ts-expect-error TS(2304): Cannot find name 'expect'.
          expect(mockOnRowSelect.calledWith(rowKey, true, rowIndex)).toBe(true);
        });
      });

      // @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
      describe('if selectRow.mode is checkbox', () => {
        // @ts-expect-error TS(2304): Cannot find name 'beforeEach'.
        beforeEach(() => {
          wrapper = shallowWithContext(
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <SelectionCell
              rowKey={ rowKey }
              mode="checkbox"
              rowIndex={ rowIndex }
              selected
              onRowSelect={ mockOnRowSelect }
            />,
            { bootstrap4: false }
          );
        });

        // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
        it('should be called with correct parameters', () => {
          // first click
          // @ts-expect-error TS(2304): Cannot find name 'jest'.
          wrapper.find('td').simulate('click', { stopPropagation: jest.fn() });
          // @ts-expect-error TS(2304): Cannot find name 'expect'.
          expect(mockOnRowSelect.callCount).toBe(1);
          // @ts-expect-error TS(2304): Cannot find name 'expect'.
          expect(mockOnRowSelect.calledWith(rowKey, false, rowIndex)).toBe(true);
        });
      });
    });
  });

  // @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
  describe('render', () => {
    const selected = true;

    // @ts-expect-error TS(2304): Cannot find name 'beforeEach'.
    beforeEach(() => {
      wrapper = shallowWithContext(
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <SelectionCell rowKey={ 1 } mode={ mode } rowIndex={ rowIndex } selected={ selected } />,
        { bootstrap4: false }
      );
    });

    // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('should render component correctly', () => {
      // @ts-expect-error TS(2304): Cannot find name 'expect'.
      expect(wrapper.find('td').length).toBe(1);
      // @ts-expect-error TS(2304): Cannot find name 'expect'.
      expect(wrapper.find('input')).toHaveLength(1);
      // @ts-expect-error TS(2304): Cannot find name 'expect'.
      expect(wrapper.find('input').get(0).props.type).toBe(mode);
      // @ts-expect-error TS(2304): Cannot find name 'expect'.
      expect(wrapper.find('input').get(0).props.checked).toBe(selected);
      // @ts-expect-error TS(2304): Cannot find name 'expect'.
      expect(toJson(wrapper)).toMatchSnapshot();
    });

    // @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
    describe('when disabled prop give as true', () => {
      // @ts-expect-error TS(2304): Cannot find name 'beforeEach'.
      beforeEach(() => {
        wrapper = shallowWithContext(
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <SelectionCell
            rowKey={ 1 }
            mode={ mode }
            rowIndex={ rowIndex }
            selected={ selected }
            disabled
          />,
          { bootstrap4: false }
        );
      });

      // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
      it('should render component with disabled attribute', () => {
        // @ts-expect-error TS(2304): Cannot find name 'expect'.
        expect(wrapper.find('input').get(0).props.disabled).toBeTruthy();
      });
    });

    // @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
    describe('when selectionRenderer prop is defined', () => {
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      const DummySelection = () => <div className="dummy" />;
      // @ts-expect-error TS(2304): Cannot find name 'jest'.
      const selectionRenderer = jest.fn().mockReturnValue(<DummySelection />);

      // @ts-expect-error TS(2304): Cannot find name 'beforeEach'.
      beforeEach(() => {
        selectionRenderer.mockClear();
        wrapper = shallowWithContext(
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <SelectionCell
            rowKey={ 1 }
            mode={ mode }
            rowIndex={ rowIndex }
            selected={ selected }
            selectionRenderer={ selectionRenderer }
          />,
          { bootstrap4: false }
        );
      });

      // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
      it('should render component correctly', () => {
        // @ts-expect-error TS(2304): Cannot find name 'expect'.
        expect(wrapper.find(DummySelection)).toHaveLength(1);
      });

      // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
      it('should call props.selectionRenderer correctly', () => {
        // @ts-expect-error TS(2304): Cannot find name 'expect'.
        expect(selectionRenderer).toHaveBeenCalledTimes(1);
        // @ts-expect-error TS(2304): Cannot find name 'expect'.
        expect(selectionRenderer).toHaveBeenCalledWith({
          mode,
          checked: selected,
          disabled: wrapper.prop('disabled'),
          rowIndex,
          rowKey: 1
        });
      });
    });

    // @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
    describe('when bootstrap4 context is true', () => {
      // @ts-expect-error TS(2304): Cannot find name 'beforeEach'.
      beforeEach(() => {
        wrapper = shallowWithContext(
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <SelectionCell rowKey={ 1 } mode={ mode } rowIndex={ rowIndex } selected={ selected } />,
          { bootstrap4: true }
        );
      });

      // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
      it('should render component correctly', () => {
        // @ts-expect-error TS(2304): Cannot find name 'expect'.
        expect(wrapper.find('td').length).toBe(1);
        // @ts-expect-error TS(2304): Cannot find name 'expect'.
        expect(wrapper.find('.selection-input-4')).toHaveLength(1);
      });
    });
  });
});
