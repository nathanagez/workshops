import { container, singleton } from 'tsyringe';
import { DelayedConstructor } from 'tsyringe/dist/typings/lazy-helpers';

export function register<T>(
  service: DelayedConstructor<T>,
  { useValue }: { useValue: SameTypeAs<T> }
) {
  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  container.register(service as any, { useValue });
}

/**
 * Injects a singleton even if tsyringe singleton was not used.
 */
export function inject<T>(service: DelayedConstructor<T>) {
  if (!container.isRegistered(service)) {
    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
    singleton()(service as any);
  }
  return container.resolve(service);
}

export type Type<T> = new () => T;
export type SameTypeAs<T> = T extends infer U ? U : never;
