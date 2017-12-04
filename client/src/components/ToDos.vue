<template>
    <div class="columns">
      <input class="input" type="text" placeholder="New task" v-model="task.body">
      <button class="btn" @click="createTask()">Add Task</button>
      <div class="filter-toggle">
        <button class="toggle" @click="fetchTaskList()">All</button>
        <button class="toggle" @click="fetchTaskListCompleted()">Uncompleted</button>
      </div>
      <ul class="todos">
        <transition-group name="fade">
          <li class="todo" v-for="todo in list" @click="completeTask(todo.id)" v-bind:key="todo.id">
            <button class="btn btn-warning btn-circle mr-4" v-on:click.prevent="deleteTask(todo.id)">X</button>
            <span v-bind:class="{ 'completed': todo.completed }">{{ todo.title }}</span>
          </li>
        </transition-group>
      </ul>
    </div>
</template>

<script>
  import axios from 'axios'

    export default {
        directives: {
            'autofocus': {
                inserted(el) {
                    el.focus();
                }
            }
        },
        data() {
            return {
                message: 'Double click for editing.',
                list: [],
                task: {
                    id: '',
                    body: '',
                    archive: '',
                    completed: false,
                },
                editingTask: {},
                activeItem: 'current'
            }
        },
        created() {
            this.fetchTaskList();
        },
        methods: {
            fetchTaskList() {
                const url = 'http://localhost:3333/tasks';
                axios.get(url).then(result => {
                    this.list = result.data;
                });
            },
            fetchTaskListCompleted() {
                const url = 'http://localhost:3333/tasks/uncompleted';
                axios.get(url).then(result => {
                    this.list = result.data;
                });
            },
            deleteTask(id) {
              const url = `http://localhost:3333/tasks/${id}`;
              axios.delete(url).then(result => {
                    this.fetchTaskList();
                }).catch(err => {
                    console.log(err);
                });
            },
            createTask() {
                axios.post('http://localhost:3333/tasks', this.task).then(result => {
                    this.task.body = '';
                    this.fetchTaskList();
                }).catch(err => {
                    console.log(err);
                });
            },
            completeTask(id) {
              axios.put(`http://localhost:3333/tasks/${id}`).then(result => {
                this.fetchTaskList();
              }).catch(err => {
                console.log(err);
              })
            }
            // editTask(task) {
            //     this.editingTask = task;
            // },
            // endEditing(task) {
            //     this.editingTask = {};
            //     if (task.body.trim() === '') {
            //         this.deleteTask(task.id);
            //     } else {
            //         axios.post('edit_task', task).then(result => {
            //             console.log('access!')
            //         }).catch(err => {
            //             console.log(err);
            //         });
            //     }
            // },
            // deleteTask(id) {
            //     axios.post('delete_task/' + id).then(result => {
            //         this.fetchTaskList();
            //     }).catch(err => {
            //         console.log(err);
            //     });
            // },
            // archiveTask(id) {
            //     axios.post('archive_task/' + id).then(result => {
            //         this.fetchTaskList();
            //     }).catch(err => {
            //         console.log(err);
            //     });
            // }
        }
    }
</script>

<style>
  .mr-4 {
    margin-right: 4px;
  }

  .input {
    font-size: 16px;
  }

  .todos {
    list-style-type: none;
    padding-left: 0;
    display: flex;
    justify-content: center;
  }

  .todo {
    margin: 12px 0;
    display: flex;
    align-items: center;
  }

  .todo .completed {
    text-decoration: line-through;
  }

  .btn {
    border: none;
    border-radius: 3px;
    cursor: pointer;
    background: lightgrey;
    padding: 2px 4px;
  }

  .btn-circle {
    border-radius: 50%;
  }

  .btn-warning {
    border: 1px solid #ff7070;
    background: transparent;
    color: #ff7070;
    font-size: 8px;
  }

  .btn-warning:hover {
    background: #ff7070;
    color: #fff;
    border-color: transparent;
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0
  }
</style>
