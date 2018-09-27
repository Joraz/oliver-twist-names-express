import { countNames } from 'name-counter';
import { getTextFromFile, getNamesFromFile } from '../utils/util';

export interface INameStore {
  getCountForName(name: string): Promise<number>;
}
/**
 * Simple implementation of a name store that reads the required files, uses the 'name-counter' package to parse
 * the contents and then constructs a map in memory for easy querying.
 * If dealing with extremely large datasets, this could be replaced with something like a simple mongodb implementation
 * or redis.
 */
export class InMemoryNameStore implements INameStore {
  private nameToCountMap = new Map<string, number>();

  constructor() {
    Promise.all([
      getTextFromFile('./resources/oliver-twist.txt'),
      getNamesFromFile('./resources/titles.txt'),
      getNamesFromFile('./resources/first-names.txt'),
      getNamesFromFile('./resources/last-names.txt'),
    ])
      .then(([text, titles, firstNames, lastNames]) => {
        const countedNames = countNames(text, titles, firstNames, lastNames);
        countedNames.forEach(({ name, timesFound }) => {
          this.nameToCountMap.set(name, timesFound);
        });
      });
  }

  public async getCountForName(name: string): Promise<number> {
    return new Promise<number>((resolve, reject) => {
      if (this.nameToCountMap.size === 0) {
        return reject('Name store empty');
      }

      if (this.nameToCountMap.has(name)) {
        return resolve(this.nameToCountMap.get(name));
      } else {
        return resolve(0);
      }
    });
  }
}