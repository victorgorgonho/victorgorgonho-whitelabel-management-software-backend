import Knex from 'knex';

export async function up(knex: Knex) {
  return knex.schema.createTable('users', (table) => {
    table.increments('id').primary();
    table.string('name').notNullable();
    table.string('email').notNullable().unique();
    table.string('password').nullable().defaultTo(null);
    table.enum('user_type', ['admin', 'student', 'contributor']).notNullable();
    table.string('phone').nullable().defaultTo(null);

    table.string('birthDate').nullable().defaultTo(null);
    table
      .enum('gender', ['male', 'female', 'not specified'])
      .nullable()
      .defaultTo(null);
    table.string('registration').nullable().defaultTo(null);
    table.string('subjects').nullable().defaultTo(null);

    table.string('parent_name').nullable().defaultTo(null);
    table.string('parent_birthDate').nullable().defaultTo(null);
    table
      .enum('parent_gender', ['male', 'female', 'not specified'])
      .nullable()
      .defaultTo(null);
    table.string('parent_cpf').nullable().defaultTo(null);
    table.string('parent_whatsapp').nullable().defaultTo(null);

    table.string('address_zipcode').nullable().defaultTo(null);
    table.string('address_state').nullable().defaultTo(null);
    table.string('address_city').nullable().defaultTo(null);
    table.string('address_neighborhood').nullable().defaultTo(null);
    table.string('address_street').nullable().defaultTo(null);
    table.string('address_houseNumber').nullable().defaultTo(null);
    table.string('address_complement').nullable().defaultTo(null);

    table.integer('paymentDay').nullable().defaultTo(null);
    table.string('recurrence').nullable().defaultTo(null);
    table.boolean('isActive').notNullable().defaultTo(false);
    table.boolean('isCompliant').notNullable().defaultTo(false);
    table
      .timestamp('createdAt')
      .notNullable()
      .defaultTo(knex.raw('CURRENT_TIMESTAMP'));
    table.timestamp('updatedAt').nullable().defaultTo(null);
  });
}

export async function down(knex: Knex) {
  knex.schema.dropTable('users');
}
