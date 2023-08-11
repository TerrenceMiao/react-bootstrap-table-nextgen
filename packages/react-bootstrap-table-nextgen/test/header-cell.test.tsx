import React from 'react';
// @ts-expect-error TS(7016): Could not find a declaration file for module 'sino... Remove this comment to see the full error message
import sinon from 'sinon';
// @ts-expect-error TS(7016): Could not find a declaration file for module 'enzy... Remove this comment to see the full error message
import { shallow } from 'enzyme';

import Const from '../src/const';
// @ts-expect-error TS(6142): Module '../src/sort/caret' was resolved to '/Users... Remove this comment to see the full error message
import SortCaret from '../src/sort/caret';
// @ts-expect-error TS(6142): Module '../src/sort/symbol' was resolved to '/User... Remove this comment to see the full error message
import SortSymbol from '../src/sort/symbol';
// @ts-expect-error TS(6142): Module '../src/header-cell' was resolved to '/User... Remove this comment to see the full error message
import HeaderCell from '../src/header-cell';

// @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
describe('HeaderCell', () => {
  let wrapper: any;
  const index = 1;

  // @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
  describe('simplest header cell', () => {
    const column = {
      dataField: 'id',
      text: 'ID'
    };

    // @ts-expect-error TS(2304): Cannot find name 'beforeEach'.
    beforeEach(() => {
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      wrapper = shallow(<HeaderCell column={ column } index={ index } />);
    });

    // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('should render successfully', () => {
      // @ts-expect-error TS(2304): Cannot find name 'expect'.
      expect(wrapper.length).toBe(1);
      // @ts-expect-error TS(2304): Cannot find name 'expect'.
      expect(wrapper.find('th').length).toBe(1);
      // @ts-expect-error TS(2304): Cannot find name 'expect'.
      expect(wrapper.text()).toEqual(column.text);
    });

    // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('should not have default style', () => {
      const style = wrapper.find('th').prop('style');
      // @ts-expect-error TS(2304): Cannot find name 'expect'.
      expect(style).toBeUndefined();
    });
  });

  // @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
  describe('when column.headerTitle prop is defined', () => {
    let column: any;
    // @ts-expect-error TS(2304): Cannot find name 'beforeEach'.
    beforeEach(() => {
      column = {
        dataField: 'id',
        text: 'ID'
      };
    });

    // @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
    describe('when headerTitle is boolean', () => {
      // @ts-expect-error TS(2304): Cannot find name 'beforeEach'.
      beforeEach(() => {
        column.headerTitle = true;
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        wrapper = shallow(<HeaderCell column={ column } index={ index } />);
      });

      // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
      it('should render title as column.text as default', () => {
        // @ts-expect-error TS(2304): Cannot find name 'expect'.
        expect(wrapper.length).toBe(1);
        // @ts-expect-error TS(2304): Cannot find name 'expect'.
        expect(wrapper.find('th').prop('title')).toBe(column.text);
      });
    });

    // @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
    describe('when headerTitle is custom function', () => {
      const customTitle = 'test_title';
      let titleCallBack: any;

      // @ts-expect-error TS(2304): Cannot find name 'beforeEach'.
      beforeEach(() => {
        titleCallBack = sinon.stub()
          .withArgs(column)
          .returns(customTitle);
        column.headerTitle = titleCallBack;
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        wrapper = shallow(<HeaderCell column={ column } index={ index } />);
      });

      // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
      it('should render title correctly by custom title function', () => {
        // @ts-expect-error TS(2304): Cannot find name 'expect'.
        expect(wrapper.length).toBe(1);
        // @ts-expect-error TS(2304): Cannot find name 'expect'.
        expect(wrapper.find('th').prop('title')).toBe(customTitle);
      });

      // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
      it('should call custom title function correctly', () => {
        // @ts-expect-error TS(2304): Cannot find name 'expect'.
        expect(titleCallBack.callCount).toBe(1);
        // @ts-expect-error TS(2304): Cannot find name 'expect'.
        expect(titleCallBack.calledWith(column)).toBe(true);
      });
    });
  });

  // @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
  describe('when column.headerAlign prop is defined', () => {
    let column: any;
    // @ts-expect-error TS(2304): Cannot find name 'beforeEach'.
    beforeEach(() => {
      column = {
        dataField: 'id',
        text: 'ID'
      };
    });

    // @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
    describe('when headerAlign is string', () => {
      // @ts-expect-error TS(2304): Cannot find name 'beforeEach'.
      beforeEach(() => {
        column.headerAlign = 'center';
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        wrapper = shallow(<HeaderCell column={ column } index={ index } />);
      });

      // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
      it('should render style.textAlign correctly', () => {
        // @ts-expect-error TS(2304): Cannot find name 'expect'.
        expect(wrapper.length).toBe(1);
        // @ts-expect-error TS(2304): Cannot find name 'expect'.
        expect(wrapper.find('th').prop('style').textAlign).toBe(column.headerAlign);
      });
    });

    // @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
    describe('when headerAlign is custom function', () => {
      const customAlign = 'center';
      let alignCallBack: any;

      // @ts-expect-error TS(2304): Cannot find name 'beforeEach'.
      beforeEach(() => {
        alignCallBack = sinon.stub()
          .withArgs(column, index)
          .returns(customAlign);
        column.headerAlign = alignCallBack;
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        wrapper = shallow(<HeaderCell column={ column } index={ index } />);
      });

      // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
      it('should render style.textAlign correctly by custom headerAlign function', () => {
        // @ts-expect-error TS(2304): Cannot find name 'expect'.
        expect(wrapper.length).toBe(1);
        // @ts-expect-error TS(2304): Cannot find name 'expect'.
        expect(wrapper.find('th').prop('style').textAlign).toBe(customAlign);
      });

      // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
      it('should call custom headerAlign function correctly', () => {
        // @ts-expect-error TS(2304): Cannot find name 'expect'.
        expect(alignCallBack.callCount).toBe(1);
        // @ts-expect-error TS(2304): Cannot find name 'expect'.
        expect(alignCallBack.calledWith(column, index)).toBe(true);
      });
    });
  });

  // @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
  describe('when column.headerFormatter prop is defined', () => {
    const column = {
      dataField: 'id',
      text: 'ID'
    };
    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    const formatterResult = (<h3>{ column.text }</h3>);
    const formatter = sinon.stub()
      .withArgs(column, index)
      .returns(formatterResult);
    // @ts-expect-error TS(2339): Property 'headerFormatter' does not exist on type ... Remove this comment to see the full error message
    column.headerFormatter = formatter;

    // @ts-expect-error TS(2304): Cannot find name 'beforeEach'.
    beforeEach(() => {
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      wrapper = shallow(<HeaderCell column={ column } index={ index } />);
    });

    // @ts-expect-error TS(2304): Cannot find name 'afterEach'.
    afterEach(() => { formatter.reset(); });

    // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('should render successfully', () => {
      // @ts-expect-error TS(2304): Cannot find name 'expect'.
      expect(wrapper.length).toBe(1);
      // @ts-expect-error TS(2304): Cannot find name 'expect'.
      expect(wrapper.contains(formatterResult)).toBe(true);
    });

    // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('should call custom headerFormatter correctly', () => {
      // @ts-expect-error TS(2304): Cannot find name 'expect'.
      expect(formatter.callCount).toBe(1);
      // @ts-expect-error TS(2304): Cannot find name 'expect'.
      expect(formatter.calledWith(
        column, index, { sortElement: undefined, filterElement: undefined })).toBe(true);
    });
  });

  // @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
  describe('when column.headerEvents prop is defined', () => {
    let column: any;

    // @ts-expect-error TS(2304): Cannot find name 'beforeEach'.
    beforeEach(() => {
      column = {
        dataField: 'id',
        text: 'ID',
        headerEvents: {
          onClick: sinon.stub()
        }
      };

      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      wrapper = shallow(<HeaderCell column={ column } index={ index } />);
    });

    // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('should attachs DOM event successfully', () => {
      // @ts-expect-error TS(2304): Cannot find name 'expect'.
      expect(wrapper.length).toBe(1);
      // @ts-expect-error TS(2304): Cannot find name 'expect'.
      expect(wrapper.find('th').prop('onClick')).toBeDefined();
    });

    // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('event hook should be called when triggering', () => {
      wrapper.find('th').simulate('click');
      // @ts-expect-error TS(2304): Cannot find name 'expect'.
      expect(column.headerEvents.onClick.callCount).toBe(1);
    });
  });

  // @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
  describe('when column.headerStyle prop is defined', () => {
    let column: any;

    // @ts-expect-error TS(2304): Cannot find name 'beforeEach'.
    beforeEach(() => {
      column = {
        dataField: 'id',
        text: 'ID'
      };
    });

    // @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
    describe('when headerStyle is an object', () => {
      // @ts-expect-error TS(2304): Cannot find name 'beforeEach'.
      beforeEach(() => {
        column.headerStyle = { backgroundColor: 'red' };
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        wrapper = shallow(<HeaderCell column={ column } index={ index } />);
      });

      // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
      it('should render successfully', () => {
        // @ts-expect-error TS(2304): Cannot find name 'expect'.
        expect(wrapper.length).toBe(1);
        // @ts-expect-error TS(2304): Cannot find name 'expect'.
        expect(wrapper.find('th').prop('style')).toEqual(column.headerStyle);
      });
    });

    // @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
    describe('when headerStyle is a function', () => {
      const returnStyle = { backgroundColor: 'red' };
      let styleCallBack: any;

      // @ts-expect-error TS(2304): Cannot find name 'beforeEach'.
      beforeEach(() => {
        styleCallBack = sinon.stub()
          .withArgs(column, index)
          .returns(returnStyle);
        column.headerStyle = styleCallBack;
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        wrapper = shallow(<HeaderCell column={ column } index={ index } />);
      });

      // @ts-expect-error TS(2304): Cannot find name 'afterEach'.
      afterEach(() => { styleCallBack.reset(); });

      // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
      it('should render successfully', () => {
        // @ts-expect-error TS(2304): Cannot find name 'expect'.
        expect(wrapper.length).toBe(1);
        // @ts-expect-error TS(2304): Cannot find name 'expect'.
        expect(wrapper.find('th').prop('style')).toEqual(returnStyle);
      });

      // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
      it('should call custom style function correctly', () => {
        // @ts-expect-error TS(2304): Cannot find name 'expect'.
        expect(styleCallBack.callCount).toBe(1);
        // @ts-expect-error TS(2304): Cannot find name 'expect'.
        expect(styleCallBack.calledWith(column, index)).toBe(true);
      });
    });
  });

  // @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
  describe('when column.headerClasses prop is defined', () => {
    let column: any;

    // @ts-expect-error TS(2304): Cannot find name 'beforeEach'.
    beforeEach(() => {
      column = {
        dataField: 'id',
        text: 'ID'
      };
    });

    // @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
    describe('when headerClasses is an object', () => {
      // @ts-expect-error TS(2304): Cannot find name 'beforeEach'.
      beforeEach(() => {
        column.headerClasses = 'td-test-class';
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        wrapper = shallow(<HeaderCell column={ column } index={ index } />);
      });

      // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
      it('should render successfully', () => {
        // @ts-expect-error TS(2304): Cannot find name 'expect'.
        expect(wrapper.length).toBe(1);
        // @ts-expect-error TS(2304): Cannot find name 'expect'.
        expect(wrapper.hasClass(column.headerClasses)).toBe(true);
      });
    });

    // @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
    describe('when headerClasses is a function', () => {
      const returnClasses = 'td-test-class';
      let classesCallBack: any;

      // @ts-expect-error TS(2304): Cannot find name 'beforeEach'.
      beforeEach(() => {
        classesCallBack = sinon.stub()
          .withArgs(column, index)
          .returns(returnClasses);
        column.headerClasses = classesCallBack;
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        wrapper = shallow(<HeaderCell column={ column } index={ index } />);
      });

      // @ts-expect-error TS(2304): Cannot find name 'afterEach'.
      afterEach(() => { classesCallBack.reset(); });

      // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
      it('should render successfully', () => {
        // @ts-expect-error TS(2304): Cannot find name 'expect'.
        expect(wrapper.length).toBe(1);
        // @ts-expect-error TS(2304): Cannot find name 'expect'.
        expect(wrapper.hasClass(returnClasses)).toBe(true);
      });

      // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
      it('should call custom classes function correctly', () => {
        // @ts-expect-error TS(2304): Cannot find name 'expect'.
        expect(classesCallBack.callCount).toBe(1);
        // @ts-expect-error TS(2304): Cannot find name 'expect'.
        expect(classesCallBack.calledWith(column, index)).toBe(true);
      });
    });

    // @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
    describe('when column.headerAttrs prop is defined', () => {
      // @ts-expect-error TS(2304): Cannot find name 'beforeEach'.
      beforeEach(() => {
        column = {
          dataField: 'id',
          text: 'ID'
        };
      });

      // @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
      describe('when headerAttrs is an object', () => {
        // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
        it('should render column.headerAttrs correctly', () => {
          column.headerAttrs = {
            'data-test': 'test',
            title: 'title',
            className: 'attrs-class',
            style: { backgroundColor: 'attrs-style-test' }
          };
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          wrapper = shallow(<HeaderCell column={ column } index={ index } />);

          // @ts-expect-error TS(2304): Cannot find name 'expect'.
          expect(wrapper.length).toBe(1);
          // @ts-expect-error TS(2304): Cannot find name 'expect'.
          expect(wrapper.find('th').prop('data-test')).toEqual(column.headerAttrs['data-test']);
          // @ts-expect-error TS(2304): Cannot find name 'expect'.
          expect(wrapper.find('th').prop('title')).toEqual(column.headerAttrs.title);
          // @ts-expect-error TS(2304): Cannot find name 'expect'.
          expect(wrapper.hasClass(column.headerAttrs.className)).toBe(true);
          // @ts-expect-error TS(2304): Cannot find name 'expect'.
          expect(wrapper.find('th').prop('style')).toEqual(column.headerAttrs.style);
        });

        // @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
        describe('when column.headerTitle prop is defined', () => {
          // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
          it('title should be overwrited', () => {
            column.headerAttrs = { title: 'title' };
            column.headerTitle = true;
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            wrapper = shallow(<HeaderCell column={ column } index={ index } />);

            // @ts-expect-error TS(2304): Cannot find name 'expect'.
            expect(wrapper.find('th').prop('title')).toBe(column.text);
          });
        });

        // @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
        describe('when column.headerClasses prop is defined', () => {
          // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
          it('class should be overwrited', () => {
            column.headerClasses = 'td-test-class';
            column.headerAttrs = { className: 'attrs-class' };

            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            wrapper = shallow(<HeaderCell column={ column } index={ index } />);

            // @ts-expect-error TS(2304): Cannot find name 'expect'.
            expect(wrapper.hasClass(column.headerClasses)).toBe(true);
          });
        });

        // @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
        describe('when column.headerStyle prop is defined', () => {
          // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
          it('style should be overwrited', () => {
            column.headerStyle = { backgroundColor: 'red' };
            column.headerAttrs = { style: { backgroundColor: 'attrs-style-test' } };

            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            wrapper = shallow(<HeaderCell column={ column } index={ index } />);

            // @ts-expect-error TS(2304): Cannot find name 'expect'.
            expect(wrapper.find('th').prop('style')).toEqual(column.headerStyle);
          });
        });

        // @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
        describe('when column.headerAlign prop is defined', () => {
          // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
          it('style.textAlign should be overwrited', () => {
            column.headerAlign = 'center';
            column.headerAttrs = { style: { textAlign: 'right' } };

            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            wrapper = shallow(<HeaderCell column={ column } index={ index } />);

            // @ts-expect-error TS(2304): Cannot find name 'expect'.
            expect(wrapper.find('th').prop('style').textAlign).toEqual(column.headerAlign);
          });
        });
      });

      // @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
      describe('when headerAttrs is custom function', () => {
        let headerAttrsCallBack: any;
        const customHeaderAttrs = {
          title: 'title',
          'data-test': 'test'
        };


        // @ts-expect-error TS(2304): Cannot find name 'beforeEach'.
        beforeEach(() => {
          headerAttrsCallBack = sinon.stub()
            .withArgs(column, index)
            .returns(customHeaderAttrs);
          column.headerAttrs = headerAttrsCallBack;
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          wrapper = shallow(<HeaderCell column={ column } index={ index } />);
        });

        // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
        it('should render style.headerAttrs correctly', () => {
          // @ts-expect-error TS(2304): Cannot find name 'expect'.
          expect(wrapper.length).toBe(1);
          // @ts-expect-error TS(2304): Cannot find name 'expect'.
          expect(wrapper.find('th').prop('data-test')).toEqual(customHeaderAttrs['data-test']);
          // @ts-expect-error TS(2304): Cannot find name 'expect'.
          expect(wrapper.find('th').prop('title')).toEqual(customHeaderAttrs.title);
        });

        // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
        it('should call custom headerAttrs function correctly', () => {
          // @ts-expect-error TS(2304): Cannot find name 'expect'.
          expect(headerAttrsCallBack.callCount).toBe(1);
          // @ts-expect-error TS(2304): Cannot find name 'expect'.
          expect(headerAttrsCallBack.calledWith(column, index)).toBe(true);
        });
      });
    });

    // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('should not have aria-label', () => {
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      wrapper = shallow(<HeaderCell column={ column } index={ index } />);
      // @ts-expect-error TS(2304): Cannot find name 'expect'.
      expect(wrapper.find('th').prop('aria-label')).toBeUndefined();
    });
  });

  // @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
  describe('when column.sort is enable', () => {
    let column: any;
    let onSortCallBack: any;

    // @ts-expect-error TS(2304): Cannot find name 'beforeEach'.
    beforeEach(() => {
      column = {
        dataField: 'id',
        text: 'ID',
        sort: true
      };
      onSortCallBack = sinon.stub().withArgs(column);
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      wrapper = shallow(<HeaderCell column={ column } index={ index } onSort={ onSortCallBack } />);
    });

    // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('should have sortable class on header cell', () => {
      // @ts-expect-error TS(2304): Cannot find name 'expect'.
      expect(wrapper.hasClass('sortable')).toBe(true);
    });

    // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('should have onClick event on header cell', () => {
      // @ts-expect-error TS(2304): Cannot find name 'expect'.
      expect(wrapper.find('th').prop('onClick')).toBeDefined();
    });

    // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('should have onKeyUp event on header cell', () => {
      // @ts-expect-error TS(2304): Cannot find name 'expect'.
      expect(wrapper.find('th').prop('onKeyUp')).toBeDefined();
    });

    // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('should trigger onSort callback when click on header cell', () => {
      wrapper.find('th').simulate('click');
      // @ts-expect-error TS(2304): Cannot find name 'expect'.
      expect(onSortCallBack.callCount).toBe(1);
    });

    // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('should trigger onSort callback when keyup Enter on header cell', () => {
      wrapper.find('th').simulate('keyup', { key: 'Enter' });
      // @ts-expect-error TS(2304): Cannot find name 'expect'.
      expect(onSortCallBack.callCount).toBe(1);
    });

    // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('should not trigger onSort callback when keyup key is not Enter on header cell', () => {
      wrapper.find('th').simulate('keyup', { key: 'test-key' });
      // @ts-expect-error TS(2304): Cannot find name 'expect'.
      expect(onSortCallBack.callCount).toBe(0);
    });

    // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('should have aria-label', () => {
      // @ts-expect-error TS(2304): Cannot find name 'expect'.
      expect(wrapper.find('th').prop('aria-label')).toBe('ID sortable');
    });


    // @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
    describe('and sorting prop is false', () => {
      // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
      it('header should render SortSymbol as default', () => {
        // @ts-expect-error TS(2304): Cannot find name 'expect'.
        expect(wrapper.find(SortSymbol).length).toBe(1);
      });

      // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
      it('should describe column header as sortable', () => {
        // @ts-expect-error TS(2304): Cannot find name 'expect'.
        expect(wrapper.find('th').prop('aria-label')).toBe('ID sortable');
      });

      // @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
      describe('when sortCaret is defined ', () => {
        // @ts-expect-error TS(2304): Cannot find name 'beforeEach'.
        beforeEach(() => {
          // @ts-expect-error TS(2304): Cannot find name 'jest'.
          column = { ...column, sortCaret: jest.fn() };
          wrapper = shallow(
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <HeaderCell column={ column } index={ index } onSort={ onSortCallBack } />
          );
        });

        // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
        it('header should not render SortSymbol', () => {
          // @ts-expect-error TS(2304): Cannot find name 'expect'.
          expect(wrapper.find(SortSymbol).length).toBe(0);
        });

        // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
        it('should call column.sortCaret correctly', () => {
          // @ts-expect-error TS(2304): Cannot find name 'expect'.
          expect(column.sortCaret).toHaveBeenCalledTimes(1);
          // @ts-expect-error TS(2304): Cannot find name 'expect'.
          expect(column.sortCaret).toHaveBeenCalledWith(undefined, column);
        });
      });
    });

    // @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
    describe('and sorting prop is true', () => {
      [Const.SORT_ASC, Const.SORT_DESC].forEach((order) => {
        // @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
        describe(`and sortOrder is ${order}`, () => {
          // @ts-expect-error TS(2304): Cannot find name 'beforeEach'.
          beforeEach(() => {
            wrapper = shallow(
              // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
              <HeaderCell column={ column } index={ index } sortOrder={ order } sorting />);
          });

          // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
          it('should describe sort order in aria-label', () => {
            // @ts-expect-error TS(2304): Cannot find name 'expect'.
            expect(wrapper.find('th').prop('aria-label')).toBe(`ID sort ${order}`);
          });

          // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
          it('should render SortCaret correctly', () => {
            // @ts-expect-error TS(2304): Cannot find name 'expect'.
            expect(wrapper.find(SortCaret).length).toBe(1);
            // @ts-expect-error TS(2304): Cannot find name 'expect'.
            expect(wrapper.find(SortCaret).prop('order')).toEqual(order);
          });
        });
      });

      // @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
      describe('when sortCaret is defined ', () => {
        // @ts-expect-error TS(2304): Cannot find name 'beforeEach'.
        beforeEach(() => {
          // @ts-expect-error TS(2304): Cannot find name 'jest'.
          column = { ...column, sortCaret: jest.fn() };
          wrapper = shallow(
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <HeaderCell
              column={ column }
              index={ index }
              onSort={ onSortCallBack }
              sortOrder={ Const.SORT_ASC }
              sorting
            />
          );
        });

        // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
        it('header should not render SortSymbol', () => {
          // @ts-expect-error TS(2304): Cannot find name 'expect'.
          expect(wrapper.find(SortSymbol).length).toBe(0);
        });

        // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
        it('should call column.sortCaret correctly', () => {
          // @ts-expect-error TS(2304): Cannot find name 'expect'.
          expect(column.sortCaret).toHaveBeenCalledTimes(1);
          // @ts-expect-error TS(2304): Cannot find name 'expect'.
          expect(column.sortCaret).toHaveBeenCalledWith(Const.SORT_ASC, column);
        });
      });

      // @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
      describe('when headerSortingClasses is defined ', () => {
        const classes = 'foo';
        const order = Const.SORT_DESC;

        // @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
        describe('if headerSortingClasses is a string', () => {
          // @ts-expect-error TS(2304): Cannot find name 'beforeEach'.
          beforeEach(() => {
            column = { ...column, headerSortingClasses: classes };
            wrapper = shallow(
              // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
              <HeaderCell
                column={ column }
                index={ index }
                sorting
                sortOrder={ order }
              />);
          });

          // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
          it('should append classes correctly', () => {
            // @ts-expect-error TS(2304): Cannot find name 'expect'.
            expect(wrapper.length).toBe(1);
            // @ts-expect-error TS(2304): Cannot find name 'expect'.
            expect(wrapper.hasClass(classes)).toBe(true);
          });

          // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
          it('should have sortable class on header cell', () => {
            // @ts-expect-error TS(2304): Cannot find name 'expect'.
            expect(wrapper.hasClass('sortable')).toBe(true);
          });
        });

        // @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
        describe('if headerSortingClasses is a function', () => {
          let classesCallBack: any;
          let isLastSorting: any;

          // @ts-expect-error TS(2304): Cannot find name 'beforeEach'.
          beforeEach(() => {
            classesCallBack = sinon.stub()
              .withArgs(column, order, isLastSorting, index)
              .returns(classes);

            column = { ...column, headerSortingClasses: classesCallBack };
            wrapper = shallow(
              // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
              <HeaderCell
                column={ column }
                index={ index }
                sorting
                sortOrder={ order }
              />);
          });

          // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
          it('should append classes correctly', () => {
            // @ts-expect-error TS(2304): Cannot find name 'expect'.
            expect(wrapper.length).toBe(1);
            // @ts-expect-error TS(2304): Cannot find name 'expect'.
            expect(wrapper.hasClass(classes)).toBe(true);
          });

          // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
          it('should have sortable class on header cell', () => {
            // @ts-expect-error TS(2304): Cannot find name 'expect'.
            expect(wrapper.hasClass('sortable')).toBe(true);
          });

          // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
          it('should call custom class function with correct params', () => {
            // @ts-expect-error TS(2304): Cannot find name 'expect'.
            expect(classesCallBack.callCount).toBe(1);
            // @ts-expect-error TS(2304): Cannot find name 'expect'.
            expect(classesCallBack.calledWith(column, order, isLastSorting, index)).toBe(true);
          });

          // @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
          describe('when the field is last sorting', () => {
            // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
            it('should call custom classes function with isLastSorting being true', () => {
              isLastSorting = true;
              classesCallBack.reset();

              wrapper = shallow(
                // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                <HeaderCell
                  column={ column }
                  index={ index }
                  sorting
                  sortOrder={ order }
                  isLastSorting
                />);

              // @ts-expect-error TS(2304): Cannot find name 'expect'.
              expect(classesCallBack.callCount).toBe(1);
              // @ts-expect-error TS(2304): Cannot find name 'expect'.
              expect(classesCallBack.calledWith(column, order, isLastSorting, index)).toBe(true);
            });
          });
        });

        // @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
        describe('if column.headerClasses is defined as well', () => {
          // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
          it('should keep both classes', () => {
            column = {
              ...column,
              headerClasses: 'td-test-class',
              headerSortingClasses: classes
            };

            wrapper = shallow(
              // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
              <HeaderCell
                column={ column }
                index={ index }
                sorting
                sortOrder={ order }
              />
            );

            // @ts-expect-error TS(2304): Cannot find name 'expect'.
            expect(wrapper.length).toBe(1);
            // @ts-expect-error TS(2304): Cannot find name 'expect'.
            expect(wrapper.hasClass('sortable')).toBe(true);
            // @ts-expect-error TS(2304): Cannot find name 'expect'.
            expect(wrapper.hasClass(classes)).toBe(true);
            // @ts-expect-error TS(2304): Cannot find name 'expect'.
            expect(wrapper.hasClass(column.headerClasses)).toBe(true);
          });
        });
      });

      // @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
      describe('when headerSortingStyle is defined', () => {
        const style = { backgroundColor: 'red' };
        const order = Const.SORT_DESC;

        // @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
        describe('if headerSortingStyle is an object', () => {
          // @ts-expect-error TS(2304): Cannot find name 'beforeEach'.
          beforeEach(() => {
            column = { ...column, headerSortingStyle: style };

            wrapper = shallow(
              // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
              <HeaderCell
                column={ column }
                index={ index }
                sorting
                sortOrder={ order }
              />
            );
          });

          // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
          it('should append style correctly', () => {
            // @ts-expect-error TS(2304): Cannot find name 'expect'.
            expect(wrapper.length).toBe(1);
            // @ts-expect-error TS(2304): Cannot find name 'expect'.
            expect(wrapper.find('th').prop('style')).toEqual(style);
          });
        });

        // @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
        describe('if headerSortingStyle is a function', () => {
          let styleCallBack: any;
          let isLastSorting: any;

          // @ts-expect-error TS(2304): Cannot find name 'beforeEach'.
          beforeEach(() => {
            styleCallBack = sinon.stub()
              .withArgs(column, order, isLastSorting, index)
              .returns(style);

            column = { ...column, headerSortingStyle: styleCallBack };

            wrapper = shallow(
              // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
              <HeaderCell
                column={ column }
                index={ index }
                sorting
                sortOrder={ order }
              />);
          });

          // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
          it('should append style correctly', () => {
            // @ts-expect-error TS(2304): Cannot find name 'expect'.
            expect(wrapper.length).toBe(1);
            // @ts-expect-error TS(2304): Cannot find name 'expect'.
            expect(wrapper.find('th').prop('style')).toEqual(style);
          });

          // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
          it('should call custom style function with correct params', () => {
            // @ts-expect-error TS(2304): Cannot find name 'expect'.
            expect(styleCallBack.callCount).toBe(1);
            // @ts-expect-error TS(2304): Cannot find name 'expect'.
            expect(styleCallBack.calledWith(column, order, isLastSorting, index)).toBe(true);
          });

          // @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
          describe('when the field is last sorting', () => {
            // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
            it('should call custom classes function with isLastSorting being true', () => {
              isLastSorting = true;
              styleCallBack.reset();

              wrapper = shallow(
                // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                <HeaderCell
                  column={ column }
                  index={ index }
                  sorting
                  sortOrder={ order }
                  isLastSorting
                />);

              // @ts-expect-error TS(2304): Cannot find name 'expect'.
              expect(styleCallBack.callCount).toBe(1);
              // @ts-expect-error TS(2304): Cannot find name 'expect'.
              expect(styleCallBack.calledWith(column, order, isLastSorting, index)).toBe(true);
            });
          });
        });

        // @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
        describe('if column.headerStyle was defined as well', () => {
          // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
          it('should keep both styles', () => {
            column = {
              ...column,
              headerStyle: { opacity: '1' },
              headerSortingStyle: style
            };

            wrapper = shallow(
              // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
              <HeaderCell
                column={ column }
                index={ index }
                sorting
                sortOrder={ order }
              />
            );
            // @ts-expect-error TS(2304): Cannot find name 'expect'.
            expect(wrapper.length).toBe(1);
            // @ts-expect-error TS(2304): Cannot find name 'expect'.
            expect(wrapper.find('th').prop('style')).toEqual(expect.objectContaining({
              ...style,
              ...column.headerStyle
            }));
          });

          // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
          it('headerSortingStyle should have higher priority', () => {
            column = {
              ...column,
              headerStyle: { backgroundColor: 'green' },
              headerSortingStyle: style
            };

            wrapper = shallow(
              // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
              <HeaderCell
                column={ column }
                index={ index }
                sorting
                sortOrder={ order }
              />
            );
            // @ts-expect-error TS(2304): Cannot find name 'expect'.
            expect(wrapper.length).toBe(1);
            // @ts-expect-error TS(2304): Cannot find name 'expect'.
            expect(wrapper.find('th').prop('style')).toEqual(expect.objectContaining({
              ...style
            }));
            // @ts-expect-error TS(2304): Cannot find name 'expect'.
            expect(wrapper.find('th').prop('style')).not.toEqual(expect.objectContaining({
              ...column.headerStyle
            }));
          });
        });
      });
    });

    // @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
    describe('when column.headerEvents prop is defined and have custom onClick', () => {
      // @ts-expect-error TS(2304): Cannot find name 'beforeEach'.
      beforeEach(() => {
        column = {
          dataField: 'id',
          text: 'ID',
          sort: true,
          headerEvents: {
            onClick: sinon.stub()
          }
        };
        wrapper = shallow(
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <HeaderCell column={ column } index={ index } onSort={ onSortCallBack } />);
      });

      // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
      it('custom event hook should still be called when triggering sorting', () => {
        wrapper.find('th').simulate('click');
        // @ts-expect-error TS(2304): Cannot find name 'expect'.
        expect(onSortCallBack.callCount).toBe(1);
        // @ts-expect-error TS(2304): Cannot find name 'expect'.
        expect(column.headerEvents.onClick.callCount).toBe(1);
      });
    });
  });

  // @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
  describe('when column.filter is defined', () => {
    // @ts-expect-error TS(2304): Cannot find name 'jest'.
    const onFilter = jest.fn();
    const filterProps = { a: 123 };
    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    const Filter = () => <div>test</div>;
    let column: any;

    // @ts-expect-error TS(2304): Cannot find name 'beforeEach'.
    beforeEach(() => {
      onFilter.mockClear();
      column = {
        dataField: 'id',
        text: 'ID',
        filter: {
          props: filterProps,
          Filter
        }
      };
      wrapper = shallow(
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <HeaderCell
          column={ column }
          index={ index }
          onFilter={ onFilter }
          currFilters={ {} }
          filterPosition="inline"
        />
      );
    });

    // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('should render successfully', () => {
      // @ts-expect-error TS(2304): Cannot find name 'expect'.
      expect(wrapper.length).toBe(1);
      // @ts-expect-error TS(2304): Cannot find name 'expect'.
      expect(wrapper.find('th').length).toBe(1);
    });

    // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('should render filter correctly', () => {
      // @ts-expect-error TS(2304): Cannot find name 'expect'.
      expect(wrapper.find(Filter).length).toBe(1);
      // @ts-expect-error TS(2304): Cannot find name 'expect'.
      expect(wrapper.find(Filter).props()).toEqual({
        column,
        onFilter,
        ...filterProps
      });
    });
  });

  // @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
  describe('when column.filter and column.filterRenderer is defined', () => {
    // @ts-expect-error TS(2304): Cannot find name 'jest'.
    const onExternalFilter = jest.fn();
    const filterProps = { a: 123 };
    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    const Filter = () => <div>test</div>;
    // @ts-expect-error TS(2304): Cannot find name 'jest'.
    const filterRenderer = jest.fn().mockReturnValue(<Filter />);
    let column;

    // @ts-expect-error TS(2304): Cannot find name 'beforeEach'.
    beforeEach(() => {
      onExternalFilter.mockClear();
      filterRenderer.mockClear();
      column = {
        dataField: 'id',
        text: 'ID',
        filter: {
          props: filterProps
        },
        filterRenderer
      };
      wrapper = shallow(
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <HeaderCell
          column={ column }
          index={ index }
          filterPosition="inline"
          onExternalFilter={ onExternalFilter }
        />);
    });

    // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('should render successfully', () => {
      // @ts-expect-error TS(2304): Cannot find name 'expect'.
      expect(wrapper.length).toBe(1);
      // @ts-expect-error TS(2304): Cannot find name 'expect'.
      expect(wrapper.find('th').length).toBe(1);
    });

    // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('should render filter correctly', () => {
      // @ts-expect-error TS(2304): Cannot find name 'expect'.
      expect(wrapper.find(Filter).length).toBe(1);
    });

    // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('should call filterRenderer function correctly', () => {
      // @ts-expect-error TS(2304): Cannot find name 'expect'.
      expect(filterRenderer).toHaveBeenCalledTimes(1);
    });
  });
});
