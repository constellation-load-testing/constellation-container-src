/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('cache').del()
  await knex('cache').insert([
    {id: 1, timestamp:Date.now() + 0 , data: '{message: this is a seed value 1@cache}'},
    {id: 2, timestamp:Date.now() + 100 , data: '{message: this is a seed value 2@cache}'},
    {id: 3, timestamp:Date.now() + 200 , data: '{message: this is a seed value 3@cache}'}
  ]);
};
