import { Response, Request } from 'express';
import { BooksFileRepo } from '../repository/books.file.repo.js';

export class BooksController {
  // eslint-disable-next-line no-useless-constructor, no-unused-vars
  constructor(public repo: BooksFileRepo) {}

  getAll(_req: Request, resp: Response) {
    this.repo.viewAll().then((data) => {
      resp.json(data);
    });
  }

  get(req: Request, resp: Response) {
    this.repo
      .viewOne(Number(req.params.id))
      .then((data) => (data === undefined ? resp.send('') : resp.json(data)));
  }

  post(req: Request, resp: Response) {
    console.log(req.body);
    this.repo.write(req.body).then();
    resp.send('<h1>Write Successful</h1>');
  }

  patch(req: Request, resp: Response) {
    const id = Number(req.params.id);
    this.repo.update(id, req.body).then((data) => resp.json(data));
  }

  delete(req: Request, resp: Response) {
    const id = Number(req.params.id);
    this.repo.delete(id).then((data) => resp.json(data));
  }
}
