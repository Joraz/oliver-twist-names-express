import { readFile } from "fs";
import { join } from "path";

// Copied this file from the cli tool for speed
export async function getNamesFromFile(filePath: string): Promise<Array<string>> {
  return new Promise<Array<string>>((resolve, reject) => {
    readFile(join(process.cwd(), filePath), { encoding: 'utf-8' }, (err, contents) => {
      if (err) {
        reject(err);
      } else {
        return resolve(parseNames(contents));
      }
    });
  });
}

export async function getTextFromFile(filePath: string): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    readFile(join(process.cwd(), filePath), { encoding: 'utf-8' }, (err, contents) => {
      if (err) {
        reject(err);
      } else {
        return resolve(contents);
      }
    });
  });
}

function parseNames(names: string): string[] {
  return names.split(/\s+/);
}