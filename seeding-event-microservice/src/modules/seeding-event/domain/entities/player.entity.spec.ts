import { Result } from 'src/common/result.type';
import { UniqueEntityId } from '../../../../common/unique-entity-id';
import { PlayerEntity } from './player.entity';
import { Name } from '../value-objects/name.vo';

function makeSut(sutName: string | Name = 'name'): Result<PlayerEntity, Error> {
  const [fakePlayerId] = UniqueEntityId.create();
  const [sut, error] = PlayerEntity.load({ name: sutName }, fakePlayerId);
  return [sut, error];
}

describe('PlayerEntity', () => {
  describe('load', () => {
    it('should load an instance', () => {
      const [sut] = makeSut();
      expect(sut).toBeInstanceOf(PlayerEntity);
    });

    it('should validade the name if other than an Name instance is provided and return error if its invalid', () => {
      const [sut, error] = makeSut(123 as any);
      expect(sut).toBeNull();
      expect(error).not.toBeNull();
    });

    it('should accept an instance of Name', () => {
      const [nameInstance] = Name.create('nameFromInstance');
      const [sut] = makeSut(nameInstance);
      expect(sut).toBeInstanceOf(PlayerEntity);
      expect(sut.name).toEqual('nameFromInstance');
    });
  });
});
