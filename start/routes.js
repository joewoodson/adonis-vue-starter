'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/guides/routing
|
*/

const Route = use('Route')

// Route.on('/').render('welcome')

Route.get('/tasks', 'TaskController.index')
Route.get('/tasks/uncompleted', 'TaskController.uncompleted')
Route.post('tasks', 'TaskController.store')
Route.delete('tasks/:id', 'TaskController.destroy')
Route.put('tasks/:id', 'TaskController.update')
