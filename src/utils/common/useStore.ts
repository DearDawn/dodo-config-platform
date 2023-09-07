import { Dispatch, SetStateAction, useEffect, useState } from 'react';

type Temp<T> = Partial<{
  [K in keyof T]: T[K] | ((info: T[K]) => T[K]);
}>;

export const useStore = <T extends Record<string, any>>(
  initialData: T
): [T, Dispatch<SetStateAction<Temp<T>>>] => {
  const [temp, setStore] = useState<Temp<T>>({});
  const [store, _set] = useState<T>(initialData);

  useEffect(() => {
    _set((_store) => {
      const obj: Partial<T> = {};
      Object.entries(temp).forEach(([key, val]) => {
        if (typeof val === 'function') {
          obj[key as keyof T] = val(_store[key]);
        }
      });

      return { ..._store, ...obj };
    });
  }, [temp]);

  return [store, setStore];
};
