import _ from '../src/utils';

// @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
describe('Utils', () => {
  // @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
  describe('get', () => {
    const data = {
      name: 'A',
      address: {
        road: 'BCD',
        postal: '1234-12345',
        city: {
          name: 'B'
        }
      },
      'person.name': 'John Doe'
    };

    // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('should return correct data', () => {
      // @ts-expect-error TS(2304): Cannot find name 'expect'.
      expect(_.get(data, 'name')).toEqual(data.name);
      // @ts-expect-error TS(2304): Cannot find name 'expect'.
      expect(_.get(data, 'address.road')).toEqual(data.address.road);
      // @ts-expect-error TS(2304): Cannot find name 'expect'.
      expect(_.get(data, 'address.city.name')).toEqual(data.address.city.name);
      // @ts-expect-error TS(2304): Cannot find name 'expect'.
      expect(_.get(data, 'address.notExist')).toEqual(undefined);
      // @ts-expect-error TS(2304): Cannot find name 'expect'.
      expect(_.get(data, 'address.not.exist')).toEqual(undefined);
      // @ts-expect-error TS(2304): Cannot find name 'expect'.
      expect(_.get(data, 'person.name')).toEqual(data['person.name']);
    });
  });

  // @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
  describe('set', () => {
    const newValue = 'test';
    const data = {
      name: 'A',
      address: {
        road: 'BCD',
        postal: '1234-12345',
        city: {
          name: 'B'
        }
      }
    };

    // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('should set data successfully', () => {
      _.set(data, 'name', newValue);
      _.set(data, 'address.road', newValue);
      _.set(data, 'address.city.name', newValue);
      // @ts-expect-error TS(2304): Cannot find name 'expect'.
      expect(data.name).toEqual(newValue);
      // @ts-expect-error TS(2304): Cannot find name 'expect'.
      expect(data.address.road).toEqual(newValue);
      // @ts-expect-error TS(2304): Cannot find name 'expect'.
      expect(data.address.city.name).toEqual(newValue);
    });

    // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('should throw error if target not existing', () => {
      // @ts-expect-error TS(2304): Cannot find name 'expect'.
      expect(() => {
        _.set(data, 'address.not.existing', newValue);
      }).toThrow();
    });

    // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('should not throw error if target not existing but with safe=true', () => {
      // @ts-expect-error TS(2304): Cannot find name 'expect'.
      expect(() => {
        _.set(data, 'address.not.existing', newValue, true);
      }).not.toThrow();
      // @ts-expect-error TS(2304): Cannot find name 'expect'.
      expect(data.address.not.existing).toEqual({});
    });
  });

  // @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
  describe('isEmptyObject', () => {
    // @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
    describe('when given empty Object', () => {
      // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
      it('should return true', () => {
        // @ts-expect-error TS(2304): Cannot find name 'expect'.
        expect(_.isEmptyObject({})).toBe(true);
      });
    });

    // @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
    describe('when given non-empty Object', () => {
      // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
      it('should return false', () => {
        // @ts-expect-error TS(2304): Cannot find name 'expect'.
        expect(_.isEmptyObject({ foo: 'test' })).toBe(false);
      });
    });

    // @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
    describe('when given Function', () => {
      // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
      it('should return true', () => {
        // @ts-expect-error TS(2304): Cannot find name 'expect'.
        expect(_.isEmptyObject(() => 'test')).toBe(true);
      });
    });

    // @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
    describe('when given Array', () => {
      // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
      it('should return true', () => {
        // @ts-expect-error TS(2304): Cannot find name 'expect'.
        expect(_.isEmptyObject([])).toBe(true);
      });
    });

    // @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
    describe('when given null', () => {
      // @ts-expect-error TS(2582): Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
      it('should return false', () => {
        // @ts-expect-error TS(2304): Cannot find name 'expect'.
        expect(_.isEmptyObject(null)).toBe(false);
      });
    });
  });
});
