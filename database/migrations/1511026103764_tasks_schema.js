'use strict'

const Schema = use('Schema')

class TasksSchema extends Schema {
  up () {
    this.table('tasks', (table) => {
      table.boolean('completed')
    })
  }

  down () {
    this.table('tasks', (table) => {
      // reverse alternations
    })
  }
}

module.exports = TasksSchema
