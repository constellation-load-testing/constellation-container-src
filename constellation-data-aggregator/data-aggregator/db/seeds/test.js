/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('test').del()
  await knex('test').insert([
    {id: 1, data: '{message: this is a seed value 1}'},
    {id: 2, data: '{message: this is a seed value 2}'},
    {id: 3, data: '{message: this is a seed value 3}'}
  ]);
};
