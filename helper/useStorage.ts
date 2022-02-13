import { useState, useEffect } from 'react';
import localForage from 'localforage';

const isObjectLiked = (value) => value.constructor.name === 'Array' || value.constructor.name === 'Object';

const rehydrate = (value: any, defaultValue?: any) => {
  if (!value) return defaultValue;
  try {
    if (typeof value === "string") {
      return JSON.parse(value)
    } else {
      return value;
    }
  } catch (err) {
    console.log('!!! #0', err, value);
    return defaultValue;
  }
};

const hydrate = (value) => {
  if (!isObjectLiked(value)) {
    return value;
  }
  return JSON.stringify(value);
};
const createMigration = async (opts, data) => {
  return new Promise((resolve, reject) => {
    const key = `${opts.key}-version`;
    localForage.getItem(key, (err, version) => {
      console.log('!!! #1', err, version, opts.version);
      if (version !== opts.version) {
        data = opts.migrate(data);
        localForage.setItem(opts.key, rehydrate(data), (err) => {
          console.log('!!! #2', err);
          if (err) return reject(err);
          localForage.setItem(key, opts.version, (err) => {
            console.log('!!! #3', err);
            if (err) return reject(err);
            return resolve(data);
          });
        });
      } else {
        resolve(data);
      }
    });
  });
};

const config = {
  key: '@sessionclassroom',
  version: 6,
  migrate: (state) => {
    return { ...state };
  },
};

export const useStorage = <T>(state: T, setState: (val: T) => void) => {
  const [rehydrated, setRehydrated] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function init() {
      await localForage.getItem(config.key, (err, value) => {
        console.log('!!! #4', err, value);
        if (err) {
          setRehydrated(err);
          return setError(err);
        }

        const restoredValue = rehydrate(value);
        if (typeof config.migrate === 'function') {
          createMigration(config, restoredValue)
            .then((data) => setState(data as T))
            .then(() => setRehydrated(true))
            .catch(err => {
              setError(err);
              console.log('!!! #5', err);
            })
        } else {
          setState(restoredValue);
          setRehydrated(true);
        }
      });
    }
    init().then(x => setError(null)).catch(err => console.log('!!! #6', err));
  }, []);

  useEffect(() => {
    setTimeout(() => {
      console.log('!!! #8', state);
      localForage.setItem(config.key, hydrate(state))
        .then(x => {
          console.log('!!! #9', x);
          setError(null);
        })
        .catch(err => {
          setError(err);
          console.log('!!! #7', err);
        });
    }, 50);
  }, [state]);

  return {
    rehydrated,
    error,
  };
};
