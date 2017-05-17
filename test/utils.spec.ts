import { set } from '../src/utils';

describe('utils', () => {
  it('should be propertly imported', () => {
    expect(set).toBeInstanceOf(Function)
  })

  describe('set', () => {
    const obj = { dog: 1 };
    let obj2;
    beforeAll(() => {
      obj2 = set(obj, 'cat', 2)
    })
    it('should immutably set to the object', () => {
      expect(obj2).not.toBe(obj)
    })
    it('should not affect obj1', () => {
      expect(obj).toMatchObject({ dog: 1 })
    })
    it('should properly change obj2', () => {
      expect(obj2).toMatchObject({ dog: 1, cat: 2 })
    })

    describe('deep set', () => {
      let obj3;
      beforeAll(() => {
        obj3 = set(obj2, 'bird.plane.man', 44)
      })
      it('should not alter obj1', () => {
        expect(obj).toMatchObject({ dog: 1 })
      })
      it('should not alter obj2 either', () => {
        expect(obj2).toMatchObject({ dog: 1, cat: 2 })
      })
      it('should properly create a deep object', () => {
        expect(obj3).toMatchObject({
          dog: 1,
          cat: 2,
          bird: {
            plane: {
              man: 44
            }
          }
        })
      })
    })
  })
})
