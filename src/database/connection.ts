import knex from 'knex';

const connection = knex({
  client: 'pg',
  connection: {
    host: 'ec2-34-204-121-199.compute-1.amazonaws.com',
    user: 'axvqswgoyxecmh',
    password:
      '5b9f41391355ca6091b30a01f7f469606e6db9002f9a83a04d78051cf4bcde72',
    database: 'd4h6tiksndpamv',
    port: 5432,
    ssl: {
      rejectUnauthorized: false,
    },
  },
  useNullAsDefault: true,
});

export default connection;
