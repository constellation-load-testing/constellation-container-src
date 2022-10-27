/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
 exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('permanent').del()
  await knex('permanent').insert([
    {id: 1, data: '{message: this is a seed value 1@permanent}'},
    {id: 2, data: '{message: this is a seed value 2@permanent}'},
    {id: 3, data: '{message: this is a seed value 3@permanent}'}
  ]);
};
