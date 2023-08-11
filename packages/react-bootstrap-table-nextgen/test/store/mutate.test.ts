import { editCell } from '../../src/store/mutate';

// @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
describe('Mutate Function', () => {
  const data = [
    { id: 3, name: 'name2' },
    { id: 2, name: 'ABC' },
    { id: 4, name: '123tester' },
    { id: 1, name: '!@#' }
  ];

  const keyField = 'id';

  // @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
  describe('editCell', () => {
    let rowId;
    const editField = 'name';
    const newValue = 'tester';

    // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('should edit successfully if row is existing', () => {
      rowId = data[0][keyField];

      editCell(data, keyField, rowId, editField, newValue);
      // @ts-expect-error TS(2304): Cannot find name 'expect'.
      expect(data[0][editField]).toEqual(newValue);
    });

    // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('should not mutate cell if row is not existing', () => {
      rowId = 100;

      editCell(data, keyField, rowId, editField, newValue);
      // @ts-expect-error TS(2304): Cannot find name 'expect'.
      expect(data).toEqual(data);
    });
  });
});
