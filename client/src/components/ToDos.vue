<template>
    <div class="columns">
      <ul class="todos">
        <transition-group name="fade">
          <li class="todo" v-for="todo in list" v-bind:key="todo.id">
            <button class="btn btn-warning btn-circle mr-4" v-on:click.prevent="deleteTask(todo.id)">X</button>
            {{ todo.title }}
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
                    archive: ''
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
            deleteTask(id) {
              const url = `http://localhost:3333/tasks/${id}`;
              axios.delete(url).then(result => {
                    this.fetchTaskList();
                }).catch(err => {
                    console.log(err);
                });
            }
            // isActive(menuItem) {
            //     return this.activeItem === menuItem;
            // },
            // setActive(menuItem) {
            //     this.activeItem = menuItem;
            // },
            // createTask() {
            //     axios.post('create_task', this.task).then(result                        => {
            //         this.task.body = '';
            //         this.fetchTaskList();
            //     }).catch(err => {
            //         console.log(err);
            //     });
            // },
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

  .btn {
    border: none;
    cursor: pointer;
    background: lightgrey;
    padding: 3px 5px;
    font-weight: bold;
  }

  .btn-circle {
    border-radius: 50%;
  }

  .btn-warning {
    background: #ff7070;
    color: #fff;
    font-size: 8px;
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0
  }
</style>
