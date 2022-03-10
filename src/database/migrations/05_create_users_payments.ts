import Knex from 'knex';

export async function up(knex: Knex) {
  return knex.schema.createTable('users_payments', (table) => {
    table.increments('id').primary();
    table.integer('user_id').notNullable().references('id').inTable('users');

    table
      .integer('payment_id')
      .notNullable()
      .references('id')
      .inTable('payments');
  });
}

export async function down(knex: Knex) {
  knex.schema.dropTable('users_payments');
}
