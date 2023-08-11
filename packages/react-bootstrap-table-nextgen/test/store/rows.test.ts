import { getRowByRowId, matchRow } from '../../src/store/rows';

// @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
describe('Rows Function', () => {
  const data = [
    { id: 3, name: 'name2' },
    { id: 2, name: 'ABC' },
    { id: 4, name: '123tester' },
    { id: 1, name: '!@#' }
  ];
  const keyField = 'id';

  // @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
  describe('getRowByRowId', () => {
    // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('should returning correct row', () => {
      // @ts-expect-error TS(2304): Cannot find name 'expect'.
      expect(getRowByRowId(data, keyField, 2)).toEqual(data[1]);
    });

    // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('should returning undefined if not existing', () => {
      // @ts-expect-error TS(2304): Cannot find name 'expect'.
      expect(getRowByRowId(data, keyField, 20)).not.toBeDefined();
    });
  });

  // @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
  describe('matchRow', () => {
    // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('should return true if keyField and id is match', () => {
      const row = data[0];
      const fn = matchRow(keyField, row[keyField]);
      // @ts-expect-error TS(2304): Cannot find name 'expect'.
      expect(fn(row)).toBeTruthy();
    });

    // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('should return false if keyField and id is not match', () => {
      const row = data[0];
      const fn = matchRow(keyField, 0);
      // @ts-expect-error TS(2304): Cannot find name 'expect'.
      expect(fn(row)).toBeFalsy();
    });
  });
});
