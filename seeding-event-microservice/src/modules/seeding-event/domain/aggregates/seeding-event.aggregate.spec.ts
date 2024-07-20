import { Result } from 'src/common/result.type';
import { UniqueEntityId } from '../../../../common/unique-entity-id';
import { SeedingEventAggregate } from './seeding-event.aggregate';
import { SeederEntity } from '../entities/seeder.entity';
import { PlayerEntity } from '../entities/player.entity';
import { ProgressionEntity } from '../entities/progression.entity';

function makeSut(
  sutName: string = 'name',
): Result<SeedingEventAggregate, Error> {
  const [fakeSeedId] = UniqueEntityId.create();
  const [fakeSeederId] = UniqueEntityId.create();
  const [seeder] = SeederEntity.load(
    { name: 'someName', seedId: fakeSeedId },
    fakeSeederId,
  );
  const [fakeSeasonId] = UniqueEntityId.create();
  const [fakeSutId] = UniqueEntityId.create();
  const [sut, sutError] = SeedingEventAggregate.load(
    { name: sutName, seasonId: fakeSeasonId, seeders: [seeder] },
    fakeSutId,
  );

  return [sut, sutError];
}

describe('SeedingEventAggregate', () => {
  describe('load', () => {
    it('should load an instance', () => {
      const [sut] = makeSut();
      expect(sut).toBeInstanceOf(SeedingEventAggregate);
    });

    it('should validade the name if other than an Name instance is provided and return error if its invalid', () => {
      const [sut, error] = makeSut(123 as any);
      expect(sut).toBeNull();
      expect(error).not.toBeNull();
    });
  });

  describe('generateProgressionToPlayer', () => {
    it('should generate progressions to a Player', () => {
      const [sut] = makeSut();
      const [fakePlayerId] = UniqueEntityId.create();
      const [player] = PlayerEntity.load({ name: 'PlayerName' }, fakePlayerId);
      const [progressions] = sut.generateProgressionsToPlayer(player);
      expect(progressions[0]).toBeInstanceOf(ProgressionEntity);
    });

    it('should return error if some prop is invalid', () => {
      const [sut] = makeSut();
      // this will cause player.id to be undefined
      const [player] = PlayerEntity.load(
        { name: 'PlayerName' },
        'invalidPlayerId' as any,
      );
      const [progressions, error] = sut.generateProgressionsToPlayer(player);
      expect(progressions).toBeNull();
      expect(error).not.toBeNull();
    });
  });
});
