import { Request, Response } from 'express';
import knex from '../../database/connection';
import schemas from '../../config/joiSchemas';

class PaymentsController {
  async create(req: Request, res: Response) {
    try {
      let body = req.body;
      const { user_id, payment_type, date } = body;

      // Valida corpo da requisição com formato esperado
      await schemas.createPaymentSchema.body.validateAsync(req.body);

      if (
        payment_type !== 'creditcard' &&
        payment_type !== 'billet' &&
        payment_type !== 'cash' &&
        payment_type !== 'transfer'
      ) {
        return res
          .status(400)
          .json({ message: 'Tipo de pagamento não suportado' });
      }

      let user = await knex('users').where('id', user_id).first();

      if (!user) {
        return res.status(404).json({ message: 'Usuário não encontrado' });
      }

      const now = new Date();

      body.date = date ? date : now;
      body.updatedAt = now;

      const payment = await knex('payments').insert(body).returning('*');

      return res.json(payment);
    } catch (error) {
      if (error.details) {
        return res.status(400).send({ message: error.details[0].message });
      }

      return res
        .status(500)
        .send({ message: error.detail ? error.detail : error });
    }
  }

  async index(req: Request, res: Response) {
    try {
      const payments = await knex('payments');

      return res.json(payments);
    } catch (error) {
      return res
        .status(500)
        .send({ message: error.detail ? error.detail : error });
    }
  }

  async filter(req: Request, res: Response) {
    try {
      const { id, user_id } = req.query;

      let payments: Array<any> = [];

      // Valida corpo da requisição com formato esperado
      await schemas.searchPaymentSchema.query.validateAsync(req.query);

      if (user_id) {
        payments = await knex('payments').where('user_id', user_id as string);
      }

      if (id) {
        payments = await knex('payments')
          .where('id', id as string)
          .first();

        if (!payments) {
          return res.status(404).json({ message: 'Pagamento não encontrado.' });
        }
      }

      return res.json(payments);
    } catch (error) {
      if (error.details) {
        return res.status(400).send({ message: error.details[0].message });
      }

      return res
        .status(500)
        .send({ message: error.detail ? error.detail : error });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const body = req.body;
      const { user_id, payment_type } = body;

      // Valida corpo da requisição com formato esperado
      await schemas.updatePaymentSchema.body.validateAsync(req.body);

      if (
        payment_type &&
        payment_type !== 'creditcard' &&
        payment_type !== 'billet' &&
        payment_type !== 'cash' &&
        payment_type !== 'transfer'
      ) {
        return res
          .status(400)
          .json({ message: 'Tipo de pagamento não suportado' });
      }

      if (user_id) {
        const user = await knex('users').where('id', user_id).first();

        if (!user) {
          return res.status(404).json({ message: 'Usuário não encontrado' });
        }
      }

      const now = new Date();
      body.updatedAt = now;

      const updatedPayment = await knex('payments')
        .where('id', id)
        .update(body)
        .returning('*');

      return res.json(updatedPayment);
    } catch (error) {
      if (error.details) {
        return res.status(400).send({ message: error.details[0].message });
      }

      return res
        .status(500)
        .send({ message: error.detail ? error.detail : error });
    }
  }

  async destroy(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const payments = await knex('payments').where('id', id).delete();

      if (!payments) {
        return res.status(404).json({ error: 'Pagamento não encontrado' });
      }

      return res.json({
        paymentsDeleted: payments,
      });
    } catch (error) {
      return res
        .status(500)
        .send({ message: error.detail ? error.detail : error });
    }
  }
}

export default new PaymentsController();
