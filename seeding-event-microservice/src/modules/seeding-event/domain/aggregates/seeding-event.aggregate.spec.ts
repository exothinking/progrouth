import { Result } from 'src/common/result.type';
import { UniqueEntityId } from '../../../../common/unique-entity-id';
import { SeedingEventAggregate } from './seeding-event.aggregate';
import { SeederEntity } from '../entities/seeder.entity';
import { PlayerEntity } from '../entities/player.entity';
import { ProgressionEntity } from '../entities/progression.entity';
import { Name } from '../value-objects/name.vo';
import { DomainError } from '../../../../common/errors/domain/domain.error';
import { IError } from 'src/common/errors/error.interface';

function makeSut(
  sutName: string | Name = 'name',
): Result<SeedingEventAggregate, IError> {
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

function makeInvalidSut(
  badProp: string,
): Result<SeedingEventAggregate, IError> {
  const [fakeSeedId] = UniqueEntityId.create();
  const [fakeSeederId] = UniqueEntityId.create();
  const [fakeSutId] = UniqueEntityId.create();
  let [fakeSeasonId] = UniqueEntityId.create();

  let seeder;

  if (badProp === 'seeder') {
    [seeder] = SeederEntity.load(
      { name: 'someName', seedId: fakeSeedId },
      'invalidSeederId' as any,
    );
  } else if (badProp === 'seed') {
    [seeder] = SeederEntity.load(
      { name: 'someName', seedId: 'invalidSeedId' as any },
      fakeSeederId,
    );
  } else {
    [seeder] = SeederEntity.load(
      { name: 'someName', seedId: fakeSeedId },
      fakeSeederId,
    );
  }

  if (badProp === 'season') {
    fakeSeasonId = 'invalidSeasonId' as any;
  }

  const [sut, sutError] = SeedingEventAggregate.load(
    { name: 'name', seasonId: fakeSeasonId, seeders: [seeder] },
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

    it('should accept an instance of Name', () => {
      const [nameInstance] = Name.create('nameFromInstance');
      const [sut] = makeSut(nameInstance);
      expect(sut).toBeInstanceOf(SeedingEventAggregate);
      expect(sut.name).toEqual('nameFromInstance');
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

    it('should return error if some player is invalid', () => {
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

    it('should return error if some seeder is invalid', () => {
      const [sut] = makeInvalidSut('seeder');
      const [fakePlayerId] = UniqueEntityId.create();
      const [player] = PlayerEntity.load({ name: 'PlayerName' }, fakePlayerId);
      const [progressions, error] = sut.generateProgressionsToPlayer(player);
      expect(progressions).toBeNull();
      expect(error).not.toBeNull();
    });

    it('should return error if some seed of seeders is invalid', () => {
      const [sut] = makeInvalidSut('seed');
      const [fakePlayerId] = UniqueEntityId.create();
      const [player] = PlayerEntity.load({ name: 'PlayerName' }, fakePlayerId);
      const [progressions, error] = sut.generateProgressionsToPlayer(player);
      expect(progressions).toBeNull();
      expect(error).not.toBeNull();
    });

    it('should return error if something goes wrong with ProgressionEntity', () => {
      const [sut] = makeSut();
      const [fakePlayerId] = UniqueEntityId.create();
      const [player] = PlayerEntity.load({ name: 'PlayerName' }, fakePlayerId);
      jest
        .spyOn(ProgressionEntity, 'create')
        .mockReturnValue([null, new DomainError('something wrong')]);
      const [progressions, error] = sut.generateProgressionsToPlayer(player);
      expect(progressions).toBeNull();
      expect(error).not.toBeNull();
    });
  });

  describe('instance', () => {
    it('should expose its id', () => {
      const [sut] = makeSut();
      expect(sut.id).toBeDefined();
    });

    it('should expose its name', () => {
      const [sut] = makeSut();
      expect(sut.name).toEqual('name');
    });

    it('should expose its seasonId', () => {
      const [sut] = makeSut();
      expect(sut.seasonId).toBeDefined();
    });

    it('should expose its seeders', () => {
      const [sut] = makeSut();
      expect(sut.seeders).toBeDefined();
    });
  });
});
