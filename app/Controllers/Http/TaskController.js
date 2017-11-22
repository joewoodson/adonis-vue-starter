'use strict'

const Task = use('App/Models/Task')
const { validate } = use('Validator')

class TaskController {

  async index ({ request, response, sessons }) {
    const tasks = await Task.all()

    // return tasks;
    response.json(tasks);
  }

  async store ({ request, response, session }) {
    // validate form input
    const validation = await validate(request.all(), {
      title: 'required|min:3|max:255'
    })

    // show error messages upon validation fail
    if (validation.fails()) {
      session.withErrors(validation.messages())
              .flashAll()

      return response.redirect('back')
    }

    // persist to database
    const task = new Task()
    task.title = request.input('title')
    task.completed = false
    await task.save()

    // Flash success message to session
    session.flash({ notification: 'Task added!' })

    return response.redirect('back')
  }

  async destroy ({ params, session, response }) {
    const task = await Task.find(params.id)
    await task.delete()

    // Flash success message to session
    // session.flash({ notification: 'Task deleted!' })

    // return response.redirect('back')
  }

  async update ({ params, session, response }) {
    const task = await Task.find(params.id)
    task.completed = !task.completed

    await task.save()

    // Flash success message to session
    session.flash({ notification: 'Task completed!' })

    return response.redirect('back')
  }

}

module.exports = TaskController
