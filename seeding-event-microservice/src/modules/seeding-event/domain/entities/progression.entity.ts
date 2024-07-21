import { Result } from 'src/common/result.type';
import { UniqueEntityId } from '../../../../common/unique-entity-id';
import { DomainError } from '../../../../common/errors/domain/domain.error';

export type ProgressionEntityProps = {
  playerId: UniqueEntityId;
  seedId: UniqueEntityId;
  seederId: UniqueEntityId;
  seasonId: UniqueEntityId;
};

export class ProgressionEntity {
  #id: UniqueEntityId;
  #playerId: UniqueEntityId;
  #seedId: UniqueEntityId;
  #seederId: UniqueEntityId;
  #seasonId: UniqueEntityId;

  private constructor(id: UniqueEntityId) {
    this.#id = id;
  }

  static create(
    props: ProgressionEntityProps,
  ): Result<ProgressionEntity, DomainError> {
    const [id, idError] = UniqueEntityId.create();
    if (idError) return [null, idError];

    const instance = new ProgressionEntity(id);

    instance.#playerId = props.playerId;
    instance.#seedId = props.seedId;
    instance.#seederId = props.seederId;
    instance.#seasonId = props.seasonId;

    return [instance, null];
  }

  get id(): string {
    return this.#id.value;
  }

  get playerId(): string {
    return this.#playerId.value;
  }

  get seedId(): string {
    return this.#seedId.value;
  }

  get seederId(): string {
    return this.#seederId.value;
  }

  get seasonId(): string {
    return this.#seasonId.value;
  }
}
