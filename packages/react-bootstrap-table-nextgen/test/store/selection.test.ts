import {
  selectableKeys,
  unSelectableKeys,
  getSelectedRows,
  getSelectionSummary
} from '../../src/store/selection';

// @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
describe('Selection Function', () => {
  const data = [
    { id: 3, name: 'name2' },
    { id: 2, name: 'ABC' },
    { id: 4, name: '123tester' },
    { id: 1, name: '!@#' }
  ];
  const keyField = 'id';
  let skip;

  // @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
  describe('selectableKeys', () => {
    // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('should returning all row keys if skip is empty', () => {
      // @ts-expect-error TS(2304): Cannot find name 'expect'.
      expect(selectableKeys(data, keyField)).toEqual(data.map(d => d[keyField]));
    });

    // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('should returngin row keys expect the skip', () => {
      skip = [data[1][keyField]];
      // @ts-expect-error TS(2304): Cannot find name 'expect'.
      expect(selectableKeys(data, keyField, skip)).toHaveLength(data.length - skip.length);
    });
  });

  // @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
  describe('unSelectableKeys', () => {
    // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('should returning empty array if skip is empty', () => {
      // @ts-expect-error TS(2304): Cannot find name 'expect'.
      expect(unSelectableKeys()).toHaveLength(0);
    });

    // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('should returning array which must contain skip', () => {
      skip = [data[1][keyField]];
      const selected = data.map(d => d[keyField]);
      // @ts-expect-error TS(2304): Cannot find name 'expect'.
      expect(unSelectableKeys(selected, skip)).toHaveLength(skip.length);
    });
  });

  // @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
  describe('getSelectedRows', () => {
    // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('should returning rows object correctly', () => {
      const selected = data.map(d => d[keyField]);
      const result = getSelectedRows(data, keyField, selected);
      // @ts-expect-error TS(2304): Cannot find name 'expect'.
      expect(result).toHaveLength(selected.length);
      // @ts-expect-error TS(2304): Cannot find name 'expect'.
      expect(result).toEqual(data);
    });

    // @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
    describe('if can not find the row', () => {
      // @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
      describe('should just skip it', () => {
        const selected = [1, 4, 6, 7];
        const result = getSelectedRows(data, keyField, selected);
        // @ts-expect-error TS(2304): Cannot find name 'expect'.
        expect(result).toHaveLength(2);
      });
    });
  });

  // @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
  describe('getSelectionSummary', () => {
    let result;

    // @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
    describe('if selected argument is able to cover all the data argument', () => {
      // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
      it('should return an obj which allRowsSelected is true and allRowsNotSelected is false', () => {
        const selected = data.map(d => d[keyField]);
        result = getSelectionSummary(data, keyField, selected);
        // @ts-expect-error TS(2304): Cannot find name 'expect'.
        expect(result).toEqual({
          allRowsSelected: true,
          allRowsNotSelected: false
        });
      });
    });

    // @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
    describe('if selected argument empty', () => {
      // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
      it('should return an obj which allRowsSelected is false but allRowsNotSelected is true', () => {
        result = getSelectionSummary(data, keyField);
        // @ts-expect-error TS(2304): Cannot find name 'expect'.
        expect(result).toEqual({
          allRowsSelected: false,
          allRowsNotSelected: true
        });
      });
    });

    // @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
    describe('if selected argument is only cover partial data', () => {
      // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
      it('should return an obj which allRowsSelected and allRowsNotSelected both are false', () => {
        const selected = [1, 2];
        result = getSelectionSummary(data, keyField, selected);
        // @ts-expect-error TS(2304): Cannot find name 'expect'.
        expect(result).toEqual({
          allRowsSelected: false,
          allRowsNotSelected: false
        });
      });
    });
  });
});
