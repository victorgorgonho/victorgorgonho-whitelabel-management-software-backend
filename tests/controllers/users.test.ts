import { Request, Response, response } from 'express';
import usersController from '../../src/app/controllers/usersController';
import { TIMEOUT } from '../constants';

describe('UsersController', () => {
  let controller = usersController;
  let token: string;
  let userId: number;

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

  test(
    'auth should return a token',
    async () => {
      const req: Request = {
        body: {
          email: 'admin@kumon.com',
          password: 'a1b2c3d4e5',
        },
      } as Request;

      const auth: any = await controller.auth(req, res);
      token = auth.token;
      expect(auth.user).not.toBe(undefined);
    },
    TIMEOUT,
  );

  test(
    'auth should not return a token',
    async () => {
      const req: Request = {
        body: {
          email: 'wrong@kumon.com',
          password: '123456',
        },
      } as Request;

      const auth: any = await controller.auth(req, res);
      expect(auth.message).toBe('Usuário não encontrado');
    },
    TIMEOUT,
  );

  test(
    'getAll should return all users',
    async () => {
      const req: Request = {
        headers: {
          authorization: `Bearer ${token}`,
        },
      } as Request;

      const data: any = await controller.index(req, res);

      expect(data.users.length).toBeGreaterThan(0);
    },
    TIMEOUT,
  );

  test(
    'getOne should return one user',
    async () => {
      const req: Request = {
        headers: {
          authorization: `Bearer ${token}`,
        },
        query: {
          id: 1,
        },
      } as unknown as Request;

      const data: any = await controller.filter(req, res);
      expect(data.user).not.toBe(undefined);
    },
    TIMEOUT,
  );

  test(
    'create should create a user',
    async () => {
      const req: Request = {
        headers: {
          authorization: `Bearer ${token}`,
        },
        body: {
          email: 'admin-2@kumon.com',
          password: 'a1b2c3d4e5',
          name: 'Kumon',
          user_type: 'admin',
        },
      } as Request;

      const data: any = await controller.register(req, res);

      userId = data.user[0].id;

      expect(data.user[0]).not.toBe(undefined);
    },
    TIMEOUT,
  );

  test(
    'update should update a user',
    async () => {
      const req: Request = {
        headers: {
          authorization: `Bearer ${token}`,
        },
        params: {
          id: userId,
        },
        body: {
          email: 'admin-updated-2@kumon.com',
        },
      } as unknown as Request;

      const data: any = await controller.update(req, res);

      expect(data).not.toBe(undefined);
    },
    TIMEOUT,
  );

  test(
    'delete should delete a user',
    async () => {
      const req: Request = {
        headers: {
          authorization: `Bearer ${token}`,
        },
        params: {
          id: userId,
        },
      } as unknown as Request;

      const data: any = await controller.destroy(req, res);

      expect(data.usersDeleted).not.toBe(undefined);
    },
    TIMEOUT,
  );
});
