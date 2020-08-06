const cleaner = require('knex-cleaner');

function cleanTables(knex) {
  return cleaner
    .clean(knex, {
      mode: 'truncate',
      restartIdentity: true,
      ignoreTables: ['knex_migrations', 'knex_migrations_lock']
    })
    .then(() => console.log('\n*** Tables truncated, ready to seed *** \n'));
}

exports.seed = function (knex) {
  return cleanTables(knex);
};
