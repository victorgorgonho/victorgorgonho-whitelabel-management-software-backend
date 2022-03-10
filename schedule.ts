import knex from './src/database/connection';

// Every day at 12 AM
const updateCompliant = async () => {
  try {
    let users = await knex('users').orderBy('createdAt', 'desc');

    const now = new Date();
    const actualDay = now.getDate();
    const actualMonth = now.getMonth() + 1;
    const actualYear = now.getFullYear();

    //Atualizar adimplentes e inadimplentes
    if (users) {
      const promises2 = users.map(async (user) => {
        let { id, paymentDay, recurrence, tolerance } = user;

        if (recurrence) recurrence = recurrence.split(',');

        const payments = await knex('payments')
          .where('user_id', id)
          .orderBy('date', 'desc');

        if (payments) {
          let paid = false;

          const promises = payments.map(async (payment) => {
            let { date, isPaid } = payment;
            const yearPaid = date.getFullYear();
            const monthPaid = date.getMonth() + 1;

            if (paid) return;

            if (isPaid) {
              if (actualMonth === monthPaid) {
                paid = true;

                await knex('users').where('id', id).update('isCompliant', true);
              }
            } else {
              if (
                yearPaid > actualYear ||
                (yearPaid === actualYear && monthPaid > actualMonth) ||
                (yearPaid === actualYear &&
                  monthPaid === actualMonth &&
                  paymentDay > actualDay)
              ) {
                paid = true;

                await knex('users').where('id', id).update('isCompliant', true);
              }
            }
          });

          await Promise.all(promises);

          //  Se o usuário não pagou, e o mês da criação for diferente do mês atual
          if (
            !paid &&
            user.createdAt.getMonth() !== now.getMonth() &&
            user.isActive
          ) {
            await knex('users').where('id', id).update('isCompliant', false);
          }
        } else if (
          user.createdAt.getMonth() !== now.getMonth() &&
          user.isActive
        ) {
          // Se não houver pagamentos, e o mês da criação do usuário for diferente do mês atual
          await knex('users').where('id', id).update('isCompliant', false);
        }
      });

      await Promise.all(promises2);
    }
  } catch (error) {
    console.log(error);
  }
};

// Reports every 1st day of month
const createReport = async () => {
  try {
    const studentCount = await knex('users').where('user_type', 'student');

    const actives = await knex('users')
      .where('isActive', true)
      .where('user_type', 'student');

    const compliants = await knex('users')
      .where('isCompliant', true)
      .where('user_type', 'student');

    let now = new Date();

    if (now.getMonth() === 0) {
      // now = new Date(`12/${now.getDate()}/${now.getFullYear() - 1}`);
      now = new Date(now.getFullYear() - 1, 11, now.getDate(), 12); // Month is 0 indexed
    } else {
      // now = new Date(`${now.getMonth()}/${now.getDate()}/${now.getFullYear()}`);
      now = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate(), 12); // Month is 0 indexed
    }

    const body = {
      compliants: compliants.length,
      defaulting: studentCount.length - compliants.length,
      actives: actives.length,
      inactives: studentCount.length - actives.length,
      usersCount: studentCount.length,
      createdAt: now,
      updatedAt: now,
    };

    const report = await knex('reports').insert(body).returning('*');

    console.log(report);
  } catch (error) {
    console.log(error);
  }
};

const now = new Date();

if (now.getDate() === 1) {
  createReport();
  updateCompliant();
} else {
  updateCompliant();
}
