import { Result } from 'src/common/result.type';
import { Name } from '../value-objects/name.vo';
import { UniqueEntityId } from 'src/common/unique-entity-id';

export type PlayerEntityProps = {
  name: string | Name;
};

export class PlayerEntity {
  #id: UniqueEntityId;
  #name: Name;

  private constructor(id: UniqueEntityId) {
    this.#id = id;
  }

  static load(
    props: PlayerEntityProps,
    id: UniqueEntityId,
  ): Result<PlayerEntity, Error> {
    const instance = new PlayerEntity(id);
    const setNameError = instance.setName(props.name);
    if (setNameError) return [null, setNameError];
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
}
