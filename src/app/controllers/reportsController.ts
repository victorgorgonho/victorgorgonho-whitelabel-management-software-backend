import { Request, Response } from 'express';
import knex from '../../database/connection';

class ReportsController {
  async index(req: Request, res: Response) {
    try {
      const { year, month } = req.query;

      let reports = await knex('reports');

      if (year && reports.length > 0) {
        reports = reports.filter(
          (report) => report.createdAt.getFullYear() === Number(year),
        );
      }

      if (month && reports.length > 0) {
        reports = reports.filter(
          (report) => report.createdAt.getMonth() + 1 === Number(month),
        );
      }

      return res.json(reports);
    } catch (error) {
      if (error.details) {
        return res.status(400).send({ message: error.details[0].message });
      }

      return res
        .status(500)
        .send({ message: error.detail ? error.detail : error });
    }
  }
}

export default new ReportsController();
