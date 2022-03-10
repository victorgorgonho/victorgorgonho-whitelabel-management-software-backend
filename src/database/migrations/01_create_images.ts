import Knex from 'knex';

export async function up(knex: Knex) {
  return knex.schema.createTable('images', (table) => {
    table.increments('id').primary();
    table.string('name').notNullable();
    table.integer('size').notNullable();
    table.string('key').notNullable().unique();
    table.string('url').notNullable().unique();
    table
      .timestamp('createdAt')
      .notNullable()
      .defaultTo(knex.raw('CURRENT_TIMESTAMP'));
    table.timestamp('updatedAt').nullable().defaultTo(null);
  });
}

export async function down(knex: Knex) {
  knex.schema.dropTable('images');
}
