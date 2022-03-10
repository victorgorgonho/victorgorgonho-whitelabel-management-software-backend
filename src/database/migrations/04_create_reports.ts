import Knex from 'knex';

export async function up(knex: Knex) {
  return knex.schema.createTable('reports', (table) => {
    table.increments('id').primary();
    table.integer('compliants').notNullable().unique();
    table.integer('defaulting').notNullable();
    table.integer('actives').notNullable();
    table.integer('inactives').notNullable();
    table.integer('usersCount').notNullable();
    table
      .timestamp('createdAt')
      .notNullable()
      .defaultTo(knex.raw('CURRENT_TIMESTAMP'));
    table.timestamp('updatedAt').nullable().defaultTo(null);
  });
}

export async function down(knex: Knex) {
  knex.schema.dropTable('reports');
}
