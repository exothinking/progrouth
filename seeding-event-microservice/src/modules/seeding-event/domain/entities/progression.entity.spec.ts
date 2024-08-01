import { UniqueEntityId } from '../../../../common/unique-entity-id';
import { ProgressionEntity } from './progression.entity';
import { Result } from '../../../../common/result.type';
import { DomainError } from '../../../../common/errors/domain/domain.error';
import { IError } from 'src/common/errors/error.interface';

function makeSut(): Result<ProgressionEntity, IError> {
  const [fakePlayerId] = UniqueEntityId.create();
  const [fakeSeasonId] = UniqueEntityId.create();
  const [fakeSeederId] = UniqueEntityId.create();
  const [fakeSeedId] = UniqueEntityId.create();

  const [sut, error] = ProgressionEntity.create({
    playerId: fakePlayerId,
    seasonId: fakeSeasonId,
    seederId: fakeSeederId,
    seedId: fakeSeedId,
  });

  return [sut, error];
}

describe('ProgressionEntity', () => {
  describe('create', () => {
    it('should create an instance', () => {
      const [sut] = makeSut();
      expect(sut).toBeInstanceOf(ProgressionEntity);
    });

    it('should return an error if something goes wrong with UniqueEntityId', () => {
      jest
        .spyOn(UniqueEntityId, 'create')
        .mockReturnValueOnce([null, new DomainError('something wrong')])
        .mockReturnValueOnce([null, new DomainError('something wrong')])
        .mockReturnValueOnce([null, new DomainError('something wrong')])
        .mockReturnValueOnce([null, new DomainError('something wrong')])
        .mockReturnValueOnce([null, new DomainError('something wrong')]);
      const [sut, error] = makeSut();
      expect(sut).toBeNull();
      expect(error).not.toBeNull();
    });
  });

  describe('instance', () => {
    it('should expose its id', () => {
      const [sut] = makeSut();
      expect(sut.id).toBeDefined();
    });

    it('should expose its playerId', () => {
      const [sut] = makeSut();
      expect(sut.playerId).toBeDefined();
    });

    it('should expose its seasonId', () => {
      const [sut] = makeSut();
      expect(sut.seasonId).toBeDefined();
    });

    it('should expose its seederId', () => {
      const [sut] = makeSut();
      expect(sut.seederId).toBeDefined();
    });

    it('should expose its seedId', () => {
      const [sut] = makeSut();
      expect(sut.seedId).toBeDefined();
    });
  });
});
