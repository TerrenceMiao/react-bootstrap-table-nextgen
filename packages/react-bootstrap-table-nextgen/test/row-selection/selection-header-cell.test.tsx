import React from 'react';
// @ts-expect-error TS(7016): Could not find a declaration file for module 'enzy... Remove this comment to see the full error message
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
// @ts-expect-error TS(7016): Could not find a declaration file for module 'sino... Remove this comment to see the full error message
import sinon from 'sinon';

import { shallowWithContext } from '../test-helpers/new-context';
import Const from '../../src/const';
// @ts-expect-error TS(6142): Module '../../src/row-selection/selection-header-c... Remove this comment to see the full error message
import SelectionHeaderCell, { CheckBox } from '../../src/row-selection/selection-header-cell';

let wrapper: any;

// @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
describe('<SelectionHeaderCell />', () => {
  // @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
  describe('shouldComponentUpdate', () => {
    // @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
    describe('when props.mode is radio', () => {
      // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
      it('should not update component', () => {
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        wrapper = shallow(<SelectionHeaderCell mode="radio" />, { bootstrap4: false });

        // @ts-expect-error TS(2304): Cannot find name 'expect'.
        expect(wrapper.instance().shouldComponentUpdate({})).toBe(false);
      });
    });

    // @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
    describe('when props.mode is checkbox', () => {
      // @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
      describe('if checkedStatus prop has not been changed', () => {
        // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
        it('should not update component', () => {
          const checkedStatus = Const.CHECKBOX_STATUS_CHECKED;
          const nextProps = { checkedStatus };

          wrapper = shallow(
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <SelectionHeaderCell mode="checkbox" checkedStatus={ checkedStatus } />,
            { bootstrap4: false }
          );

          // @ts-expect-error TS(2304): Cannot find name 'expect'.
          expect(wrapper.instance().shouldComponentUpdate(nextProps)).toBe(false);
        });
      });

      // @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
      describe('if checkedStatus prop has been changed', () => {
        // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
        it('should update component', () => {
          const { CHECKBOX_STATUS_INDETERMINATE, CHECKBOX_STATUS_CHECKED } = Const;
          const checkedStatus = CHECKBOX_STATUS_CHECKED;
          const nextProps = { checkedStatus };

          wrapper = shallow(
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <SelectionHeaderCell mode="checkbox" checkedStatus={ CHECKBOX_STATUS_INDETERMINATE } />,
            { bootstrap4: false }
          );

          // @ts-expect-error TS(2304): Cannot find name 'expect'.
          expect(wrapper.instance().shouldComponentUpdate(nextProps)).toBe(true);
        });
      });
    });
  });

  // @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
  describe('handleCheckBoxClick', () => {
    // @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
    describe('when <th /> was clicked', () => {
      const spy = sinon.spy(SelectionHeaderCell.prototype, 'handleCheckBoxClick');
      const mockOnAllRowsSelect = sinon.stub();

      // @ts-expect-error TS(2304): Cannot find name 'beforeEach'.
      beforeEach(() => {
        spy.resetHistory();
        mockOnAllRowsSelect.reset();
      });

      // @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
      describe('if props.mode is radio', () => {
        // @ts-expect-error TS(2304): Cannot find name 'beforeEach'.
        beforeEach(() => {
          wrapper = shallowWithContext(
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <SelectionHeaderCell
              mode="radio"
              checkedStatus={ Const.CHECKBOX_STATUS_CHECKED }
              onAllRowsSelect={ mockOnAllRowsSelect }
            />,
            { bootstrap4: false }
          );
        });

        // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
        it('should do nothing', () => {
          wrapper.find('th').simulate('click');

          // @ts-expect-error TS(2304): Cannot find name 'expect'.
          expect(spy.callCount).toBe(0);
          // @ts-expect-error TS(2304): Cannot find name 'expect'.
          expect(mockOnAllRowsSelect.callCount).toBe(0);
        });
      });

      // @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
      describe('if props.mode is checkbox', () => {
        // @ts-expect-error TS(2304): Cannot find name 'beforeEach'.
        beforeEach(() => {
          wrapper = shallowWithContext(
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <SelectionHeaderCell
              mode="checkbox"
              checkedStatus={ Const.CHECKBOX_STATUS_CHECKED }
              onAllRowsSelect={ mockOnAllRowsSelect }
            />,
            { bootstrap4: false }
          );
        });

        // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
        it('should call handleCheckBoxClick', () => {
          wrapper.find('th').simulate('click');

          // @ts-expect-error TS(2304): Cannot find name 'expect'.
          expect(spy.calledOnce).toBe(true);
          // @ts-expect-error TS(2304): Cannot find name 'expect'.
          expect(mockOnAllRowsSelect.calledOnce).toBe(true);
        });
      });
    });
  });

  // @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
  describe('render', () => {
    // @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
    describe('when props.hideSelectAll is true', () => {
      // @ts-expect-error TS(2304): Cannot find name 'beforeEach'.
      beforeEach(() => {
        const checkedStatus = Const.CHECKBOX_STATUS_CHECKED;

        wrapper = shallow(
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <SelectionHeaderCell mode="checkbox" checkedStatus={ checkedStatus } hideSelectAll />
        );
      });

      // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
      it('should render empty th element', () => {
        // @ts-expect-error TS(2304): Cannot find name 'expect'.
        expect(wrapper.find('th').length).toBe(1);
        // @ts-expect-error TS(2304): Cannot find name 'expect'.
        expect(wrapper.find('th[data-row-selection]').length).toBe(1);
        // @ts-expect-error TS(2304): Cannot find name 'expect'.
        expect(wrapper.find(CheckBox).length).toBe(0);
      });
    });

    // @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
    describe('when props.mode is radio', () => {
      // @ts-expect-error TS(2304): Cannot find name 'beforeEach'.
      beforeEach(() => {
        const checkedStatus = Const.CHECKBOX_STATUS_CHECKED;

        wrapper = shallowWithContext(
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <SelectionHeaderCell mode="radio" checkedStatus={ checkedStatus } />,
          { bootstrap4: false }
        );
      });

      // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
      it('should not render checkbox', () => {
        // @ts-expect-error TS(2304): Cannot find name 'expect'.
        expect(wrapper.find('th').length).toBe(1);
        // @ts-expect-error TS(2304): Cannot find name 'expect'.
        expect(wrapper.find('th[data-row-selection]').length).toBe(1);
        // @ts-expect-error TS(2304): Cannot find name 'expect'.
        expect(wrapper.find(CheckBox).length).toBe(0);
      });
    });

    // @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
    describe('when props.mode is checkbox', () => {
      const checkedStatus = Const.CHECKBOX_STATUS_CHECKED;

      // @ts-expect-error TS(2304): Cannot find name 'beforeEach'.
      beforeEach(() => {
        wrapper = shallowWithContext(
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <SelectionHeaderCell mode="checkbox" checkedStatus={ checkedStatus } />,
          { bootstrap4: false }
        );
      });

      // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
      it('should render checkbox', () => {
        const checked = checkedStatus === Const.CHECKBOX_STATUS_CHECKED;
        const indeterminate = checkedStatus === Const.CHECKBOX_STATUS_INDETERMINATE;

        // @ts-expect-error TS(2304): Cannot find name 'expect'.
        expect(wrapper.find('th').length).toBe(1);
        // @ts-expect-error TS(2304): Cannot find name 'expect'.
        expect(wrapper.find('th[data-row-selection]').length).toBe(1);
        // @ts-expect-error TS(2304): Cannot find name 'expect'.
        expect(wrapper.find(CheckBox).length).toBe(1);
        // @ts-expect-error TS(2304): Cannot find name 'expect'.
        expect(wrapper.find(CheckBox).get(0).props.checked).toBe(checked);
        // @ts-expect-error TS(2304): Cannot find name 'expect'.
        expect(wrapper.find(CheckBox).get(0).props.indeterminate).toBe(indeterminate);
      });
    });

    // @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
    describe('when props.selectionHeaderRenderer is defined', () => {
      const checkedStatus = Const.CHECKBOX_STATUS_CHECKED;
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      const DummySelection = () => <div className="dummy" />;
      // @ts-expect-error TS(2304): Cannot find name 'jest'.
      const selectionHeaderRenderer = jest.fn().mockReturnValue(<DummySelection />);

      // @ts-expect-error TS(2304): Cannot find name 'beforeEach'.
      beforeEach(() => {
        selectionHeaderRenderer.mockClear();
        wrapper = shallowWithContext(
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <SelectionHeaderCell
            mode="checkbox"
            checkedStatus={ checkedStatus }
            selectionHeaderRenderer={ selectionHeaderRenderer }
          />,
          { bootstrap4: false }
        );
      });

      // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
      it('should render correctly', () => {
        // @ts-expect-error TS(2304): Cannot find name 'expect'.
        expect(wrapper.find(DummySelection)).toHaveLength(1);
      });

      // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
      it('should call props.selectionHeaderRenderer correctly', () => {
        // @ts-expect-error TS(2304): Cannot find name 'expect'.
        expect(selectionHeaderRenderer).toHaveBeenCalledTimes(1);
        // @ts-expect-error TS(2304): Cannot find name 'expect'.
        expect(selectionHeaderRenderer).toHaveBeenCalledWith({
          mode: 'checkbox',
          checked: checkedStatus === Const.CHECKBOX_STATUS_CHECKED,
          indeterminate: checkedStatus === Const.CHECKBOX_STATUS_INDETERMINATE
        });
      });
    });

    // @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
    describe('when bootstrap4 context is true', () => {
      // @ts-expect-error TS(2304): Cannot find name 'beforeEach'.
      beforeEach(() => {
        const checkedStatus = Const.CHECKBOX_STATUS_CHECKED;

        wrapper = shallowWithContext(
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <SelectionHeaderCell mode="checkbox" checkedStatus={ checkedStatus } />,
          { bootstrap4: true }
        );
      });

      // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
      it('should not render checkbox', () => {
        // @ts-expect-error TS(2304): Cannot find name 'expect'.
        expect(wrapper.find('th').length).toBe(1);
        // @ts-expect-error TS(2304): Cannot find name 'expect'.
        expect(wrapper.find('.selection-input-4').length).toBe(1);
      });
    });
  });
});

// @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
describe('<CheckBox />', () => {
  // @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
  describe('render', () => {
    // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('should render component correctly', () => {
      const checked = true;
      const indeterminate = false;
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      wrapper = shallow(<CheckBox checked={ checked } indeterminate={ indeterminate } />);

      // @ts-expect-error TS(2304): Cannot find name 'expect'.
      expect(wrapper.find('input').length).toBe(1);
      // @ts-expect-error TS(2304): Cannot find name 'expect'.
      expect(wrapper.find('input').prop('checked')).toBe(checked);
      // @ts-expect-error TS(2304): Cannot find name 'expect'.
      expect(wrapper.find('input').prop('type')).toBe('checkbox');
      // @ts-expect-error TS(2304): Cannot find name 'expect'.
      expect(toJson(wrapper)).toMatchSnapshot();
    });
  });
});
