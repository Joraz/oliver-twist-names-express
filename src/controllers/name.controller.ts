import { Request, Response } from 'express';
import { INameStore } from '../stores/name.store';

/**
 * Controller for the name-count routes.
 * The mechanism for retrieving names is abstracted out to the name store, allowing different implementations to be
 * supplied without needing to change the controller
 */
export class NameController {
  constructor(private store: INameStore) { }

  public getNameCount(req: Request, res: Response): Response {
    const name: string = req.params.name;
    if (!name || name.trim().length === 0) {
      return res.status(400).send('You must supply a \'name\' parameter');
    }

    this.store.getCountForName(name)
      .then((count) => {
        if (count === 0) {
          return res.status(404).send('Name not found in oliver twist');
        }
        return res.status(200).send({ name: name, numberOfTimesFound: count });
      })
      .catch(err => {
        return res.status(500).send(err);
      });
  }
}