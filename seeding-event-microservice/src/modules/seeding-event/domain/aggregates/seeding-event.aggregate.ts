import { Result } from 'src/common/result.type';
import { Name } from '../value-objects/name.vo';
import { UniqueEntityId } from '../../../../common/unique-entity-id';
import { SeederEntity } from '../entities/seeder.entity';
import { PlayerEntity } from '../entities/player.entity';
import { ProgressionEntity } from '../entities/progression.entity';

export type SeedingEventAggregateProps = {
  name: string | Name;
  seasonId: UniqueEntityId;
  seeders: SeederEntity[];
};

export class SeedingEventAggregate {
  #id: UniqueEntityId;
  #name: Name;
  #seasonId: UniqueEntityId;
  #seeders: SeederEntity[];

  private constructor(id: UniqueEntityId) {
    this.#id = id;
  }

  static load(
    props: SeedingEventAggregateProps,
    id: UniqueEntityId,
  ): Result<SeedingEventAggregate, Error> {
    const instance = new SeedingEventAggregate(id);

    const setNameError = instance.setName(props.name);
    if (setNameError) return [null, setNameError];

    instance.#seasonId = props.seasonId;
    instance.#seeders = props.seeders;

    return [instance, null];
  }

  setName(name: string | Name): Error | undefined {
    if (!(name instanceof Name)) {
      const [nameInstance, error] = Name.create(name);
      if (error) return error;
      this.#name = nameInstance;
      return;
    }
    this.#name = name;
  }

  get id(): string {
    return this.#id.value;
  }

  get name(): string {
    return this.#name.value;
  }

  get seasonId(): string {
    return this.#seasonId.value;
  }

  get seeders(): SeederEntity[] {
    return this.#seeders;
  }

  generateProgressionsToPlayer(
    player: PlayerEntity,
  ): Result<ProgressionEntity[], Error> {
    const progressions = [];

    for (const seeder of this.seeders) {
      const [validPlayerId, playerIdError] = UniqueEntityId.load(player.id);
      if (playerIdError) return [null, playerIdError];

      const [validSeedId, seedIdError] = UniqueEntityId.load(seeder.seedId);
      if (seedIdError) return [null, seedIdError];

      const [validSeederId, seederIdError] = UniqueEntityId.load(seeder.id);
      if (seederIdError) return [null, seederIdError];

      const [progression, progressionError] = ProgressionEntity.create({
        playerId: validPlayerId,
        seedId: validSeedId,
        seasonId: this.#seasonId,
        seederId: validSeederId,
      });
      if (progressionError) return [null, progressionError];

      progressions.push(progression);
    }

    return [progressions, null];
  }
}
