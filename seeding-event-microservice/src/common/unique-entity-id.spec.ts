import { UniqueEntityId } from './unique-entity-id';

describe('UniqueEntityId', () => {
  describe('load', () => {
    it('should validade if the provided value is a string and return error it its not', () => {
      const [sut, error] = UniqueEntityId.load(123 as any);
      expect(sut).toBeNull();
      expect(error).not.toBeNull();
    });

    it('should compare the id lengh and return error if its invalid', () => {
      const [sut, error] = UniqueEntityId.load('someInvalidId');
      expect(sut).toBeNull();
      expect(error).not.toBeNull();
    });
  });
});
