import { Response, Request, NextFunction } from 'express';
import { BooksFileRepo } from '../repository/books.file.repo.js';

export class BooksController {
  // eslint-disable-next-line no-useless-constructor, no-unused-vars
  constructor(public repo: BooksFileRepo) {}

  async getAll(_req: Request, resp: Response, next: NextFunction) {
    try {
      const data = await this.repo.query();
      resp.json({ results: data });
    } catch (error) {
      next(error);
    }
  }

  async get(req: Request, resp: Response, next: NextFunction) {
    try {
      const data = await this.repo.queryId(req.params.id);
      resp.json({ results: [data] });
    } catch (error) {
      next(error);
    }
  }

  async post(req: Request, resp: Response, next: NextFunction) {
    try {
      const data = await this.repo.create(req.body);
      resp.json({ results: [data] });
    } catch (error) {
      next(error);
    }
  }

  async patch(req: Request, resp: Response, next: NextFunction) {
    try {
      req.body.id = req.params.id ? req.params.id : req.body.id;
      const data = await this.repo.update(req.body);
      resp.json({ results: [data] });
    } catch (error) {
      next(error);
    }
  }

  async delete(req: Request, resp: Response, next: NextFunction) {
    try {
      const data = await this.repo.delete(req.params.id);
      resp.json({ results: [data] });
    } catch (error) {
      next(error);
    }
  }
}
