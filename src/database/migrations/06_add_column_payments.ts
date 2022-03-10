import Knex from 'knex';

export async function up(knex: Knex) {
  return knex.schema.table('payments', (table) => {
    table.timestamp('date2').nullable().defaultTo(null);
    table.string('receipt_url').nullable().defaultTo(null);
  });
}

export async function down(knex: Knex) {
  knex.schema.table('payments', (table) => {
    table.dropColumn('date2');
    table.dropColumn('receipt_url');
  });
}
