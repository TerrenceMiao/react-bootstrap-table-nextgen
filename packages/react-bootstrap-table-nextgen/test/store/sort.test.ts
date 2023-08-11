// @ts-expect-error TS(7016): Could not find a declaration file for module 'sino... Remove this comment to see the full error message
import sinon from 'sinon';

import { sort, nextOrder } from '../../src/store/sort';
import Const from '../../src/const';

// @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
describe('Sort Function', () => {
  const data = [
    { id: 3, name: 'name2' },
    { id: 2, name: 'ABC' },
    { id: 4, name: '123tester' },
    { id: 1, name: '!@#' }
  ];

  // @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
  describe('sort', () => {
    const sortColumn = {
      dataField: 'id',
      text: 'ID'
    };
    let sortOrder;
    let result: any;

    // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('should sort array with ASC order correctly', () => {
      sortOrder = Const.SORT_ASC;
      result = sort(data, sortOrder, sortColumn);
      // @ts-expect-error TS(2304): Cannot find name 'expect'.
      expect(result.length).toEqual(data.length);

      const sortedArray = data.map(e => e.id).sort((a, b) => a - b);
      sortedArray.forEach((e, i) => {
        // @ts-expect-error TS(2304): Cannot find name 'expect'.
        expect(e).toEqual(result[i].id);
      });
    });

    // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('should sort array with DESC order correctly', () => {
      sortOrder = Const.SORT_DESC;
      result = sort(data, sortOrder, sortColumn);
      // @ts-expect-error TS(2304): Cannot find name 'expect'.
      expect(result.length).toEqual(data.length);

      const sortedArray = data.map(e => e.id).sort((a, b) => b - a);
      sortedArray.forEach((e, i) => {
        // @ts-expect-error TS(2304): Cannot find name 'expect'.
        expect(e).toEqual(result[i].id);
      });
    });

    // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('should call custom sort function when sortFunc given', () => {
      const sortFunc = sinon.stub().returns(1);
      sortOrder = Const.SORT_DESC;
      sort(data, sortOrder, { ...sortColumn, sortFunc });
      // @ts-expect-error TS(2304): Cannot find name 'expect'.
      expect(sortFunc.callCount).toBe(3);
    });
  });

  // @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
  describe('nextOrder', () => {
    const currentSortColumn = {
      dataField: 'name',
      text: 'Product Name'
    };
    // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('should return correcly order when current sortField is not eq next sort field', () => {
      const nextSort = {
        sortColumn: {
          dataField: 'id',
          text: 'ID'
        },
        sortOrder: Const.SORT_DESC
      };
      // @ts-expect-error TS(2304): Cannot find name 'expect'.
      expect(nextOrder(currentSortColumn, nextSort)).toBe(Const.SORT_DESC);
    });

    // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('should return correcly order if even next sort column is undefined', () => {
      // @ts-expect-error TS(2304): Cannot find name 'expect'.
      expect(nextOrder(currentSortColumn, {})).toBe(Const.SORT_DESC);
    });

    // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('should return correcly order when current sortField is not eq next sort field and default sort direction is given', () => {
      const nextSort = {
        sortColumn: {
          dataField: 'id',
          text: 'ID'
        },
        sortOrder: Const.SORT_DESC
      };
      // @ts-expect-error TS(2304): Cannot find name 'expect'.
      expect(nextOrder(currentSortColumn, nextSort, Const.SORT_ASC)).toBe(Const.SORT_ASC);
    });

    // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('should return correcly order when current sortField is eq next sort field', () => {
      const nextSort = {
        sortColumn: currentSortColumn,
        sortOrder: Const.SORT_ASC
      };
      // @ts-expect-error TS(2304): Cannot find name 'expect'.
      expect(nextOrder(currentSortColumn, nextSort)).toBe(Const.SORT_DESC);
    });
  });
});
