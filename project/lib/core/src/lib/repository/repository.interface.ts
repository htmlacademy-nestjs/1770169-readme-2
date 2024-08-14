import { Entity, EntityId } from './repository.entity';

export interface Repository<T extends Entity<EntityId>> {
  findById(id: T['id']): Promise<null | T>;
  save(entity: T): Promise<T>;
  update(id: T['id'], entity: T): Promise<T>;
  delete(id: T['id']): Promise<void>;
}
