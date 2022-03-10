import Knex from 'knex';

export async function up(knex: Knex) {
  return knex.schema.createTable('payments', (table) => {
    table.increments('id').primary();
    table.integer('user_id').notNullable().references('id').inTable('users');

    table.string('date').notNullable();
    table.string('payment_type').notNullable();
    table.float('amount').notNullable();
    table.boolean('isPaid').notNullable().defaultTo(false);
    table
      .timestamp('createdAt')
      .notNullable()
      .defaultTo(knex.raw('CURRENT_TIMESTAMP'));
    table.timestamp('updatedAt').nullable().defaultTo(null);
  });
}

export async function down(knex: Knex) {
  knex.schema.dropTable('payments');
}
