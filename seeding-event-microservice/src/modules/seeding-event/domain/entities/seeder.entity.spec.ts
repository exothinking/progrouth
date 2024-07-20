import { UniqueEntityId } from '../../../../common/unique-entity-id';
import { Name } from '../value-objects/name.vo';
import { SeederEntity } from './seeder.entity';

describe('SeederEntity', () => {
  describe('load', () => {
    it('should load an instance', () => {
      const [sutId] = UniqueEntityId.create();
      const [seedId] = UniqueEntityId.create();
      const [sut] = SeederEntity.load({ name: 'some', seedId }, sutId);
      expect(sut).toBeInstanceOf(SeederEntity);
    });

    it('should validade the name if other than an Name instance is provided and return error if its invalid', () => {
      const [sutId] = UniqueEntityId.create();
      const [seedId] = UniqueEntityId.create();
      const [sut, error] = SeederEntity.load(
        { name: 123 as any, seedId },
        sutId,
      );
      expect(sut).toBeNull();
      expect(error).not.toBeNull();
    });

    it('should accept an instance of Name', () => {
      const [sutId] = UniqueEntityId.create();
      const [seedId] = UniqueEntityId.create();
      const [nameInstance] = Name.create('someNameInstance');
      const [sut] = SeederEntity.load({ name: nameInstance, seedId }, sutId);
      expect(sut.name).toEqual('someNameInstance');
    });
  });
});
