'use strict'

const Task = use('App/Models/Task')
const { validate } = use('Validator')

class TaskController {

  async index ({ request, response, sessions }) {
    let tasks = await Task.all()

    // return tasks
    response.json(tasks);
  }

  async uncompleted ({ request, response, sessions }) {
    let tasks = await Task.query().where('completed', 0).fetch()

    // return tasks
    response.json(tasks);
  }

  async store ({ request, response, session }) {

    // get task from the request
    const reqTask = request.post()

    // persist to database
    const task = new Task()
    task.title = reqTask.body
    task.completed = false
    await task.save()

  }

  async destroy ({ params, session, response }) {
    const task = await Task.find(params.id)
    await task.delete()

  }

  async update ({ params, session, response }) {
    const task = await Task.find(params.id)
    task.completed = !task.completed

    await task.save()

  }

}

module.exports = TaskController
