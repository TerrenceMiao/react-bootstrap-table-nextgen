/* eslint react/prefer-stateless-function: 0 */
import React from 'react';
// @ts-expect-error TS(7016): Could not find a declaration file for module 'sino... Remove this comment to see the full error message
import sinon from 'sinon';
// @ts-expect-error TS(7016): Could not find a declaration file for module 'enzy... Remove this comment to see the full error message
import { shallow } from 'enzyme';

import Container from '../../index';
// import remoteResolver from '../../src/props-resolver/remote-resolver';

// @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
describe('remoteResolver', () => {
  let wrapper: any;

  const keyField = 'id';

  const columns = [{
    dataField: keyField,
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

  const shallowContainer = (props: any) => {
    wrapper = shallow(
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <Container
        keyField={ keyField }
        data={ data }
        columns={ columns }
        { ...props }
      />
    );
  };

  // @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
  describe('isRemotePagination', () => {
    // @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
    describe('when remote is false', () => {
      // @ts-expect-error TS(2304): Cannot find name 'beforeEach'.
      beforeEach(() => {
        // @ts-expect-error TS(2554): Expected 1 arguments, but got 0.
        shallowContainer();
      });

      // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
      it('should return false', () => {
        // @ts-expect-error TS(2304): Cannot find name 'expect'.
        expect(wrapper.instance().isRemotePagination()).toBeFalsy();
      });
    });

    // @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
    describe('when remote is true', () => {
      // @ts-expect-error TS(2304): Cannot find name 'beforeEach'.
      beforeEach(() => {
        shallowContainer({ remote: true });
      });

      // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
      it('should return true', () => {
        // @ts-expect-error TS(2304): Cannot find name 'expect'.
        expect(wrapper.instance().isRemotePagination()).toBeTruthy();
      });
    });

    // @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
    describe('when remote.pagination is true', () => {
      // @ts-expect-error TS(2304): Cannot find name 'beforeEach'.
      beforeEach(() => {
        shallowContainer({ remote: { pagination: true } });
      });

      // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
      it('should return true', () => {
        // @ts-expect-error TS(2304): Cannot find name 'expect'.
        expect(wrapper.instance().isRemotePagination()).toBeTruthy();
      });
    });
  });

  // @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
  describe('isRemoteFiltering', () => {
    // @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
    describe('when remote is false', () => {
      // @ts-expect-error TS(2304): Cannot find name 'beforeEach'.
      beforeEach(() => {
        // @ts-expect-error TS(2554): Expected 1 arguments, but got 0.
        shallowContainer();
      });

      // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
      it('should return false', () => {
        // @ts-expect-error TS(2304): Cannot find name 'expect'.
        expect(wrapper.instance().isRemoteFiltering()).toBeFalsy();
      });
    });

    // @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
    describe('when remote is true', () => {
      // @ts-expect-error TS(2304): Cannot find name 'beforeEach'.
      beforeEach(() => {
        shallowContainer({ remote: true });
      });

      // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
      it('should return true', () => {
        // @ts-expect-error TS(2304): Cannot find name 'expect'.
        expect(wrapper.instance().isRemoteFiltering()).toBeTruthy();
      });
    });

    // @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
    describe('when remote.filter is true', () => {
      // @ts-expect-error TS(2304): Cannot find name 'beforeEach'.
      beforeEach(() => {
        shallowContainer({ remote: { filter: true } });
      });

      // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
      it('should return true', () => {
        // @ts-expect-error TS(2304): Cannot find name 'expect'.
        expect(wrapper.instance().isRemoteFiltering()).toBeTruthy();
      });
    });

    // @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
    describe('when this.isRemotePagination return true', () => {
      // @ts-expect-error TS(2304): Cannot find name 'beforeEach'.
      beforeEach(() => {
        shallowContainer({ remote: { pagination: true } });
      });

      // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
      it('should return true', () => {
        // @ts-expect-error TS(2304): Cannot find name 'expect'.
        expect(wrapper.instance().isRemoteFiltering()).toBeTruthy();
      });
    });
  });

  // @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
  describe('isRemoteSort', () => {
    // @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
    describe('when remote is false', () => {
      // @ts-expect-error TS(2304): Cannot find name 'beforeEach'.
      beforeEach(() => {
        // @ts-expect-error TS(2554): Expected 1 arguments, but got 0.
        shallowContainer();
      });

      // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
      it('should return false', () => {
        // @ts-expect-error TS(2304): Cannot find name 'expect'.
        expect(wrapper.instance().isRemoteSort()).toBeFalsy();
      });
    });

    // @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
    describe('when remote is true', () => {
      // @ts-expect-error TS(2304): Cannot find name 'beforeEach'.
      beforeEach(() => {
        shallowContainer({ remote: true });
      });

      // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
      it('should return true', () => {
        // @ts-expect-error TS(2304): Cannot find name 'expect'.
        expect(wrapper.instance().isRemoteSort()).toBeTruthy();
      });
    });

    // @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
    describe('when remote.sort is true', () => {
      // @ts-expect-error TS(2304): Cannot find name 'beforeEach'.
      beforeEach(() => {
        shallowContainer({ remote: { sort: true } });
      });

      // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
      it('should return true', () => {
        // @ts-expect-error TS(2304): Cannot find name 'expect'.
        expect(wrapper.instance().isRemoteSort()).toBeTruthy();
      });
    });

    // @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
    describe('when this.isRemotePagination return true', () => {
      // @ts-expect-error TS(2304): Cannot find name 'beforeEach'.
      beforeEach(() => {
        shallowContainer({ remote: { pagination: true } });
      });

      // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
      it('should return true', () => {
        // @ts-expect-error TS(2304): Cannot find name 'expect'.
        expect(wrapper.instance().isRemoteSort()).toBeTruthy();
      });
    });
  });

  // @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
  describe('isRemoteCellEdit', () => {
    // @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
    describe('when remote is false', () => {
      // @ts-expect-error TS(2304): Cannot find name 'beforeEach'.
      beforeEach(() => {
        // @ts-expect-error TS(2554): Expected 1 arguments, but got 0.
        shallowContainer();
      });

      // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
      it('should return false', () => {
        // @ts-expect-error TS(2304): Cannot find name 'expect'.
        expect(wrapper.instance().isRemoteCellEdit()).toBeFalsy();
      });
    });

    // @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
    describe('when remote is true', () => {
      // @ts-expect-error TS(2304): Cannot find name 'beforeEach'.
      beforeEach(() => {
        shallowContainer({ remote: true });
      });

      // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
      it('should return true', () => {
        // @ts-expect-error TS(2304): Cannot find name 'expect'.
        expect(wrapper.instance().isRemoteCellEdit()).toBeTruthy();
      });
    });

    // @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
    describe('when remote.cellEdit is true', () => {
      // @ts-expect-error TS(2304): Cannot find name 'beforeEach'.
      beforeEach(() => {
        shallowContainer({ remote: { cellEdit: true } });
      });

      // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
      it('should return true', () => {
        // @ts-expect-error TS(2304): Cannot find name 'expect'.
        expect(wrapper.instance().isRemoteCellEdit()).toBeTruthy();
      });
    });
  });

  // @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
  describe('isRemoteSearch', () => {
    // @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
    describe('when remote is false', () => {
      // @ts-expect-error TS(2304): Cannot find name 'beforeEach'.
      beforeEach(() => {
        // @ts-expect-error TS(2554): Expected 1 arguments, but got 0.
        shallowContainer();
      });

      // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
      it('should return false', () => {
        // @ts-expect-error TS(2304): Cannot find name 'expect'.
        expect(wrapper.instance().isRemoteSearch()).toBeFalsy();
      });
    });

    // @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
    describe('when remote is true', () => {
      // @ts-expect-error TS(2304): Cannot find name 'beforeEach'.
      beforeEach(() => {
        shallowContainer({ remote: true });
      });

      // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
      it('should return true', () => {
        // @ts-expect-error TS(2304): Cannot find name 'expect'.
        expect(wrapper.instance().isRemoteSearch()).toBeTruthy();
      });
    });

    // @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
    describe('when remote.search is true', () => {
      // @ts-expect-error TS(2304): Cannot find name 'beforeEach'.
      beforeEach(() => {
        shallowContainer({ remote: { search: true } });
      });

      // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
      it('should return true', () => {
        // @ts-expect-error TS(2304): Cannot find name 'expect'.
        expect(wrapper.instance().isRemoteSearch()).toBeTruthy();
      });
    });

    // @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
    describe('when this.isRemotePagination return true', () => {
      // @ts-expect-error TS(2304): Cannot find name 'beforeEach'.
      beforeEach(() => {
        shallowContainer({ remote: { pagination: true } });
      });

      // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
      it('should return true', () => {
        // @ts-expect-error TS(2304): Cannot find name 'expect'.
        expect(wrapper.instance().isRemoteSearch()).toBeTruthy();
      });
    });
  });

  // @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
  describe('handleRemoteCellChange', () => {
    const onTableChangeCB = sinon.stub();
    const rowId = 1;
    const dataField = 'name';
    const newValue = 'test';

    // @ts-expect-error TS(2304): Cannot find name 'beforeEach'.
    beforeEach(() => {
      onTableChangeCB.reset();
      shallowContainer({ onTableChange: onTableChangeCB });
      wrapper.instance().handleRemoteCellChange(rowId, dataField, newValue);
    });

    // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('should calling props.onTableChange correctly', () => {
      const cellEdit = { rowId, dataField, newValue };
      // @ts-expect-error TS(2304): Cannot find name 'expect'.
      expect(onTableChangeCB.calledOnce).toBeTruthy();
      // @ts-expect-error TS(2304): Cannot find name 'expect'.
      expect(onTableChangeCB.calledWith(
        'cellEdit', wrapper.instance().getNewestState({ cellEdit }))).toBeTruthy();
    });
  });

  // @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
  describe('handleSortChange', () => {
    const onTableChangeCB = sinon.stub();
    const newSortFiled = 'name';
    const newSortOrder = 'asc';
    // @ts-expect-error TS(2304): Cannot find name 'beforeEach'.
    beforeEach(() => {
      onTableChangeCB.reset();
      shallowContainer({ onTableChange: onTableChangeCB });
      wrapper.instance().handleRemoteSortChange(newSortFiled, newSortOrder);
    });

    // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('should calling props.onTableChange correctly', () => {
      // @ts-expect-error TS(2304): Cannot find name 'expect'.
      expect(onTableChangeCB.calledOnce).toBeTruthy();
      // @ts-expect-error TS(2304): Cannot find name 'expect'.
      expect(onTableChangeCB.calledWith('sort', wrapper.instance().getNewestState({
        sortField: newSortFiled,
        sortOrder: newSortOrder
      }))).toBeTruthy();
    });
  });

  // @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
  describe('handleRemotePageChange', () => {
    const onTableChangeCB = sinon.stub();
    const newPage = 2;
    const newSizePerPage = 10;
    // @ts-expect-error TS(2304): Cannot find name 'beforeEach'.
    beforeEach(() => {
      onTableChangeCB.reset();
      shallowContainer({ onTableChange: onTableChangeCB });
      wrapper.instance().handleRemotePageChange(newPage, newSizePerPage);
    });

    // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('should calling props.onTableChange correctly', () => {
      // @ts-expect-error TS(2304): Cannot find name 'expect'.
      expect(onTableChangeCB.calledOnce).toBeTruthy();
      // @ts-expect-error TS(2304): Cannot find name 'expect'.
      expect(onTableChangeCB.calledWith('pagination', wrapper.instance().getNewestState({
        page: newPage,
        sizePerPage: newSizePerPage
      }))).toBeTruthy();
    });
  });

  // @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
  describe('handleRemoteSearchChange', () => {
    const onTableChangeCB = sinon.stub();
    const searchText = 'abc';

    // @ts-expect-error TS(2304): Cannot find name 'beforeEach'.
    beforeEach(() => {
      onTableChangeCB.reset();
      shallowContainer({
        onTableChange: onTableChangeCB
      });
      wrapper.instance().handleRemoteSearchChange(searchText);
    });

    // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('should calling props.onTableChange correctly', () => {
      // @ts-expect-error TS(2304): Cannot find name 'expect'.
      expect(onTableChangeCB.calledOnce).toBeTruthy();
      // @ts-expect-error TS(2304): Cannot find name 'expect'.
      expect(onTableChangeCB.calledWith('search', wrapper.instance().getNewestState({
        searchText
      }))).toBeTruthy();
    });
  });

  // @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
  describe('handleRemoteFilterChange', () => {
    const onTableChangeCB = sinon.stub();
    const filters = { price: { filterVal: 20, filterType: 'TEXT' } };
    // @ts-expect-error TS(2304): Cannot find name 'beforeEach'.
    beforeEach(() => {
      onTableChangeCB.reset();
      shallowContainer({ onTableChange: onTableChangeCB });
    });

    // @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
    describe('when remote pagination is disabled', () => {
      // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
      it('should calling props.onTableChange correctly', () => {
        wrapper.instance().handleRemoteFilterChange(filters);
        // @ts-expect-error TS(2304): Cannot find name 'expect'.
        expect(onTableChangeCB.calledOnce).toBeTruthy();
        // @ts-expect-error TS(2304): Cannot find name 'expect'.
        expect(onTableChangeCB.calledWith('filter', wrapper.instance().getNewestState({
          filters
        }))).toBeTruthy();
      });
    });

    // @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
    describe('when remote pagination is enabled', () => {
      const createContext = () => {};

      // @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
      describe('and pagination.options.pageStartIndex is defined', () => {
        const options = { pageStartIndex: 0 };
        // @ts-expect-error TS(2304): Cannot find name 'beforeEach'.
        beforeEach(() => {
          shallowContainer({
            remote: true,
            onTableChange: onTableChangeCB,
            pagination: { options, createContext }
          });
          wrapper.instance().handleRemoteFilterChange(filters);
        });

        // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
        it('should calling onTableChange with page property by pageStartIndex', () => {
          // @ts-expect-error TS(2304): Cannot find name 'expect'.
          expect(onTableChangeCB.calledOnce).toBeTruthy();
          const newState = wrapper.instance().getNewestState({
            filters
          });
          newState.page = options.pageStartIndex;
          // @ts-expect-error TS(2304): Cannot find name 'expect'.
          expect(onTableChangeCB.calledWith('filter', newState)).toBeTruthy();
        });
      });

      // @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
      describe('and pagination.options.pageStartIndex is not defined', () => {
        // @ts-expect-error TS(2304): Cannot find name 'beforeEach'.
        beforeEach(() => {
          shallowContainer({
            remote: true,
            onTableChange: onTableChangeCB,
            pagination: { createContext }
          });
          wrapper.instance().handleRemoteFilterChange(filters);
        });

        // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
        it('should calling onTableChange with page property by default 1', () => {
          // @ts-expect-error TS(2304): Cannot find name 'expect'.
          expect(onTableChangeCB.calledOnce).toBeTruthy();
          const newState = wrapper.instance().getNewestState({ filters });
          newState.page = 1;
          // @ts-expect-error TS(2304): Cannot find name 'expect'.
          expect(onTableChangeCB.calledWith('filter', newState)).toBeTruthy();
        });
      });
    });
  });
});
