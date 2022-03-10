import { Request, Response } from 'express';
import knex from '../../database/connection';

import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import authConfig from '../../config/auth.json';
import schemas from '../../config/joiSchemas';

//Get user ID and make a unique token based on a Secret key hide in /config
function generateToken(params = {}) {
  return jwt.sign(params, authConfig.secret, {
    expiresIn: 86400,
  });
}

function isValidDate(d: Date | any) {
  return d && !isNaN(d);
}

class UsersController {
  async register(req: Request, res: Response) {
    try {
      let userBody = req.body;

      if (
        userBody.user_type !== 'student' &&
        userBody.user_type !== 'admin' &&
        userBody.user_type !== 'contributor'
      )
        return res
          .status(404)
          .send({ message: 'Tipo de usuário não encontrado' });

      if (userBody.user_type === 'student') {
        // Valida corpo da requisição com formato esperado
        await schemas.createStudentSchema.body.validateAsync(userBody);
      }

      if (userBody.user_type === 'admin') {
        // Valida corpo da requisição com formato esperado
        await schemas.createAdminSchema.body.validateAsync(userBody);
      }

      if (userBody.user_type === 'student') {
        if (
          (userBody.gender !== 'male' && userBody.gender !== 'female') ||
          (userBody.parent_gender !== 'male' &&
            userBody.parent_gender !== 'female')
        ) {
          return res.status(400).send({ message: 'Gênero inválido' });
        }
      }

      if (userBody.password) {
        //Hash to encrypt password in a way that if someone ever access database, won't be able to steal password
        const hash = await bcrypt.hash(String(userBody.password), 10);
        userBody.password = hash;
      }

      const now = new Date();

      let dateParts = userBody.birthDate.split('/');
      let dateFormatted = new Date(
        `${dateParts[1]}/${dateParts[0]}/${dateParts[2]}`,
      );

      if (!isValidDate(dateFormatted))
        return res.status(400).send({ message: 'Data de nascimento inválida' });

      if (!isValidDate(dateFormatted))
        return res
          .status(400)
          .send({ message: 'Data de primeiro pagamento inválida' });

      if (!userBody.paymentDay) userBody.paymentDay = 1;
      if (!userBody.tolerance) userBody.tolerance = 1;
      if (!userBody.recurrence) userBody.recurrence = [1, 2, 3, 4, 5, 6, 7];

      if (userBody.subjects) userBody.subjects = userBody.subjects.join(',');
      if (userBody.recurrence)
        userBody.recurrence = userBody.recurrence.join(',');
      userBody.updatedAt = now;

      const newUser: any = await knex('users').insert(userBody).returning('*');

      if (newUser.subjects) newUser.subjects = newUser.subjects.split(',');
      if (newUser.recurrence)
        newUser.recurrence = newUser.recurrence.split(',');
      newUser.password = undefined;

      return res.json({
        user: newUser,
        token: `Bearer ${generateToken({ id: newUser.id })}`,
      });
    } catch (error) {
      if (error.details) {
        return res.status(400).send({ message: error.details[0].message });
      }

      return res
        .status(500)
        .send({ message: error.detail ? error.detail : error });
    }
  }

  async auth(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      // Valida corpo da requisição com formato esperado
      await schemas.authenticateUserSchema.body.validateAsync(req.body);

      let user = await knex('users').where('email', email).first();

      if (!user)
        return res.status(404).send({ message: 'Usuário não encontrado' });

      //Compare typed password with the real password stored on MongoDB
      if (!(await bcrypt.compare(password, user.password)))
        return res.status(400).send({ message: 'Senha errada' });

      //Hide password from user, then it won't be sent as response
      user.password = undefined;
      if (user.subjects) user.subjects = user.subjects.split(',');
      if (user.recurrence) user.recurrence = user.recurrence.split(',');

      return res.json({
        user,
        token: `Bearer ${generateToken({ id: user.id })}`,
      });
    } catch (error) {
      if (error.details) {
        return res.status(400).send({ message: error.details[0].message });
      }

      return res.status(500).send({ message: 'Falha ao autenticar usuário' });
    }
  }

  async confirmPayment(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { date, payment_id } = req.body;

      // Valida corpo da requisição com formato esperado
      await schemas.confirmPaymentSchema.body.validateAsync(req.body);

      const payments = await knex('payments').where('user_id', id);

      let user = await knex('users').where('id', id).first();

      let newPayment = null;
      const now = new Date();

      let dateParts = date.split('/');
      const dateFormatted = new Date(
        `${dateParts[1]}/${dateParts[0]}/${dateParts[2]}`,
      );

      let body = {
        user_id: id,
        payment_type: req.body.payment_type,
        amount: req.body.amount,
        date: `${dateFormatted.getMonth() + 1}/${
          payments.length > 1 || !user.startDatePayment
            ? user.paymentDay
            : user.startDatePayment.getDate()
        }/${dateFormatted.getFullYear()}`,
        receipt_url: req.body.receipt_url,
        isPaid: true,
        updatedAt: `${
          dateFormatted.getMonth() + 1
        }/${dateFormatted.getDate()}/${dateFormatted.getFullYear()}`,
      };

      await knex('users').where('id', id).update('isCompliant', true);

      newPayment = await knex('payments')
        .where('id', payment_id)
        .update(body)
        .returning('*');

      body.isPaid = false;

      // Confere se mês que vem é maior que 11 (dezembro)
      if (dateFormatted.getMonth() + 1 > 11) {
        body.date = `1/${user.paymentDay}/${dateFormatted.getFullYear() + 1}`;
      } else {
        body.date = `${dateFormatted.getMonth() + 2}/${
          user.paymentDay
        }/${dateFormatted.getFullYear()}`;
      }

      body.receipt_url = null;
      await knex('payments').insert(body);

      return res.json({ payment: newPayment });
    } catch (error) {
      console.log(error);

      if (error.details) {
        return res.status(400).send({ message: error.details[0].message });
      }

      return res.status(500).send({ message: 'Falha ao confirmar pagamento' });
    }
  }

  async index(req: Request, res: Response) {
    try {
      let users = await knex('users').orderBy('createdAt', 'desc');

      const studentCount = await knex('users').where('user_type', 'student');

      const actives = await knex('users')
        .where('isActive', true)
        .where('user_type', 'student');

      const compliants = await knex('users')
        .where('isCompliant', true)
        .where('user_type', 'student');

      users = users.map((user) => {
        if (user.subjects) user.subjects = user.subjects.split(',');
        if (user.recurrence) user.recurrence = user.recurrence.split(',');
        user.password = undefined;
        return user;
      });

      return res.json({
        actives: actives.length,
        inactives: studentCount.length - actives.length,
        compliants: compliants.length,
        defaulting: studentCount.length - compliants.length,
        users,
      });
    } catch (error) {
      return res
        .status(500)
        .send({ message: error.detail ? error.detail : error });
    }
  }

  async filter(req: Request, res: Response) {
    try {
      const {
        name,
        registration,
        isActive,
        isCompliant,
        user_type,
        id,
      } = req.query;

      let users: Array<any> = [];

      // Valida corpo da requisição com formato esperado
      await schemas.searchUserSchema.query.validateAsync(req.query);

      const studentCount = await knex('users').where('user_type', 'student');

      const actives = await knex('users')
        .where('isActive', true)
        .andWhere('user_type', 'student');

      const compliants = await knex('users')
        .where('isCompliant', true)
        .andWhere('user_type', 'student');

      if (name) {
        users = await knex('users')
          .where('name', 'like', `%${name}%`)
          .orderBy('createdAt', 'desc');
      }

      if (registration) {
        users = await knex('users')
          .where('registration', registration as string)
          .andWhere('user_type', 'student')
          .orderBy('createdAt', 'desc');
      }

      if (isActive) {
        users = await knex('users')
          .where('isActive', isActive as string)
          .andWhere('user_type', 'student')
          .orderBy('createdAt', 'desc');
      }

      if (isCompliant) {
        users = await knex('users')
          .where('isCompliant', isCompliant as string)
          .andWhere('user_type', 'student')
          .orderBy('createdAt', 'desc');
      }

      if (user_type) {
        users = await knex('users')
          .where('user_type', user_type as string)
          .orderBy('createdAt', 'desc');
      }

      if (id) {
        users = await knex('users').where('id', id as string);

        if (!users[0]) {
          return res.status(400).json({ message: 'User not found.' });
        }

        const payments = await knex('payments')
          .where('user_id', id as string)
          .orderBy('date', 'desc');

        if (users[0].subjects) users[0].subjects = users[0].subjects.split(',');
        if (users[0].recurrence)
          users[0].recurrence = users[0].recurrence.split(',');
        users[0].password = undefined;

        return res.json({ user: users[0], payments });
      }

      users = users.map((user) => {
        if (user.subjects) user.subjects = user.subjects.split(',');
        if (user.recurrence) user.recurrence = user.recurrence.split(',');
        user.password = undefined;
        return user;
      });

      return res.json({
        actives: actives.length,
        inactives: studentCount.length - actives.length,
        compliants: compliants.length,
        defaulting: studentCount.length - compliants.length,
        users,
      });
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
      let userBody = req.body;

      // Valida corpo da requisição com formato esperado
      await schemas.updateUserSchema.body.validateAsync(req.body);

      if (
        userBody.user_type &&
        userBody.user_type !== 'student' &&
        userBody.user_type !== 'admin' &&
        userBody.user_type !== 'contributor'
      )
        return res
          .status(404)
          .send({ message: 'Tipo de usuário não encontrado' });

      const user = await knex('users').where('id', id);

      if (!user)
        return res.status(404).send({ message: 'Usuário não encontrado' });

      if (userBody.password) {
        //Hash to encrypt password in a way that if someone ever access database, won't be able to steal password
        const hash = await bcrypt.hash(String(userBody.password), 10);
        userBody.password = hash;
      }

      const now = new Date();

      if (userBody.birthDate) {
        const dateParts = userBody.birthDate.split('/');
        const dateFormatted = new Date(
          `${dateParts[1]}/${dateParts[0]}/${dateParts[2]}`,
        );

        if (!isValidDate(dateFormatted))
          return res
            .status(400)
            .send({ message: 'Data de nascimento inválida' });
      }

      if (userBody.paymentDay) {
        const payments = await knex('payments').where('user_id', id);

        const last_payment = payments[payments.length - 1];

        if (last_payment.isPaid === false) {
          if (
            last_payment.date.getFullYear() > now.getFullYear() ||
            last_payment.date.getMonth() > now.getMonth() ||
            userBody.paymentDay > now.getDate()
          ) {
            const updatedDate = new Date(
              `${last_payment.date.getMonth() + 1}/${
                userBody.paymentDay
              }/${last_payment.date.getFullYear()}`,
            );

            await knex('payments')
              .where('id', last_payment.id)
              .update('date', updatedDate);
          }
        }
      }

      if (userBody.monthly_cost) {
        const payments = await knex('payments').where('user_id', id);

        const last_payment = payments[payments.length - 1];

        if (last_payment.isPaid === false) {
          await knex('payments')
            .where('id', last_payment.id)
            .update('amount', userBody.monthly_cost);
        }
      }

      if (userBody.subjects) userBody.subjects = userBody.subjects.join(',');
      if (userBody.recurrence)
        userBody.recurrence = userBody.recurrence.join(',');
      userBody.updatedAt = now;

      let updatedUser: any = await knex('users')
        .where('id', id)
        .update(userBody)
        .returning('*');

      if (updatedUser[0].subjects)
        updatedUser[0].subjects = updatedUser[0].subjects.split(',');
      if (updatedUser[0].recurrence)
        updatedUser[0].recurrence = updatedUser[0].recurrence.split(',');
      updatedUser[0].password = undefined;

      return res.json(updatedUser[0]);
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
    const { id } = req.params;

    const user = await knex('users').where('id', id).delete();

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const payments = await knex('payments').where('user_id', id).delete();

    return res.json({
      usersDeleted: user,
      paymentsDeleted: payments,
    });
  }
}

export default new UsersController();
