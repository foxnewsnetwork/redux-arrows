import { set } from '../src/utils';

describe('utils', () => {
  describe('set', () => {
    const obj = { dog: 1 };
    let obj2;
    beforeAll(() => {
      obj2 = set(obj, 'cat', 2)
    })
    it('should be propertly imported', () => {
      expect(set).toBeInstanceOf(Function)
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

    describe('deep', () => {
      const expectedObj3 = {
        dog: 1,
        cat: 2,
        bird: {
          plane: {
            man: 44
          }
        }
      }
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
        expect(obj3).toMatchObject(expectedObj3)
      })

      describe('existing', () => {
        const expectedObj4 = {
          dog: 1,
          cat: 2,
          bird: {
            plane: {
              man: 44,
              superman: 666
            }
          }
        }
        let obj4;
        beforeAll(() => {
          obj4 = set(obj3, 'bird.plane.superman', 666)
        })
        it('should not alter obj3', () => {
          expect(obj3).toMatchObject(expectedObj3)
        })
        it('should put stuff into obj4', () => {
          expect(obj4).toMatchObject(expectedObj4)
        })
      })
    })
  })
})
