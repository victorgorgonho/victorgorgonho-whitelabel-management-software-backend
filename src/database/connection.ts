import knex from 'knex';

const connection = knex({
  client: 'pg',
  connection: {
    host: 'ec2-18-213-219-169.compute-1.amazonaws.com',
    user: 'mntqahjvotvfxr',
    password:
      '29b0e97ad8b6aaf1e0ce1f6ce693d02d3e0a878e794ec174ae0467a2fc4bb247',
    database: 'd6he4q65lt78ci',
    port: 5432,
    ssl: {
      rejectUnauthorized: false,
    },
  },
  useNullAsDefault: true,
});

export default connection;
