import { Result } from 'src/common/result.type';
import { Name } from '../value-objects/name.vo';
import { UniqueEntityId } from 'src/common/unique-entity-id';
import { DomainError } from 'src/common/errors/domain/domain.error';

export type SeederEntityProps = {
  name: string | Name;
  seedId: UniqueEntityId;
};

export class SeederEntity {
  #id: UniqueEntityId;
  #name: Name;
  #seedId: UniqueEntityId;

  private constructor(id: UniqueEntityId) {
    this.#id = id;
  }

  static load(
    props: SeederEntityProps,
    id: UniqueEntityId,
  ): Result<SeederEntity, DomainError> {
    const instance = new SeederEntity(id);

    const setNameError = instance.setName(props.name);
    if (setNameError) return [null, setNameError];

    instance.#seedId = props.seedId;

    return [instance, null];
  }

  setName(name: string | Name): DomainError | undefined {
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

  get seedId(): string {
    return this.#seedId.value;
  }
}
