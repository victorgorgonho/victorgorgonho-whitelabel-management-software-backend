import { Request, Response } from 'express';
import reportsController from '../../src/app/controllers/reportsController';
import usersController from '../../src/app/controllers/usersController';
import { TIMEOUT } from '../constants';

describe('reportsController', () => {
  let token: string;

  const res: Response = {
    status: (status: number) => {
      return {
        send: (data: any) => {
          return data;
        },
        json: (data: any) => {
          return data;
        },
      };
    },
    json: (data: any) => {
      return data;
    },
  } as Response;

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
    'index should return all reports',
    async () => {
      const req: Request = {
        query: {
          year: '2021',
          month: '1',
        },
      } as unknown as Request;

      const reports: any = await reportsController.index(req, res);

      expect(reports.length).toBeGreaterThan(0);
    },
    TIMEOUT,
  );
});
