import { Request } from 'express';
import paymentsController from '../../src/app/controllers/paymentsController';
import usersController from '../../src/app/controllers/usersController';
import { TIMEOUT } from '../constants';
import { res } from '../utils/response';

describe('PaymentsController', () => {
  let token: string;
  let paymentId: number;

  beforeAll(async () => {
    const req: Request = {
      body: {
        email: 'admin@kumon.com',
        password: 'a1b2c3d4e5',
      },
    } as Request;

    const auth: any = await usersController.auth(req, res);
    token = auth.token;
    expect(auth.user).not.toBe(undefined);
  }, TIMEOUT);

  test(
    'create should return a payment',
    async () => {
      const req: Request = {
        body: {
          user_id: 534,
          payment_type: 'billet',
          date: '01/01/2021',
          amount: 100,
          isPaid: true,
        },
      } as Request;

      const payment: any = await paymentsController.create(req, res);
      paymentId = payment[0].id;

      expect(paymentId).not.toBe(undefined);
    },
    TIMEOUT,
  );

  test(
    'index should return all payments',
    async () => {
      const req: Request = {} as unknown as Request;

      const payments: any = await paymentsController.index(req, res);

      expect(payments.length).toBeGreaterThan(0);
    },
    TIMEOUT,
  );

  test(
    'show should return a payment',
    async () => {
      const req: Request = {
        query: {
          user_id: 534,
        },
      } as unknown as Request;

      const payments: any = await paymentsController.filter(req, res);

      expect(payments.length).toBeGreaterThan(0);
    },
    TIMEOUT,
  );

  test(
    'show should not return a payment',
    async () => {
      const req: Request = {
        query: {
          id: 1000000000,
          user_id: 100000000,
        },
      } as unknown as Request;

      const payments: any = await paymentsController.filter(req, res);

      console.log(payments);

      expect(payments.message).toBe('Pagamento não encontrado.');
    },
    TIMEOUT,
  );

  test(
    'update should update a payment',
    async () => {
      const req: Request = {
        headers: {
          authorization: `Bearer ${token}`,
        },
        params: {
          id: paymentId,
        },
        body: {
          user_id: 534,
          payment_type: 'creditcard',
        },
      } as unknown as Request;

      const payment: any = await paymentsController.update(req, res);

      expect(payment[0].id).not.toBe(undefined);
    },
    TIMEOUT,
  );

  test(
    'delete should delete a payment',
    async () => {
      const req: Request = {
        headers: {
          authorization: `Bearer ${token}`,
        },
        params: {
          id: paymentId,
        },
      } as unknown as Request;

      const payment: any = await paymentsController.destroy(req, res);

      expect(payment.paymentsDeleted).not.toBe(undefined);
    },
    TIMEOUT,
  );
});
