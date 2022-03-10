import Knex from 'knex';

export async function up(knex: Knex) {
  return knex.schema.table('users', (table) => {
    table.timestamp('startDatePayment').nullable().defaultTo(null);
  });
}

export async function down(knex: Knex) {
  knex.schema.table('users', (table) => {
    table.dropColumn('startDatePayment');
  });
}
