<template>
    <div class="columns">
      <ul class="todos">
        <li class="todo" v-for="todo in list">
          {{ todo.title }}
          <button v-on:click="deleteTask(todo.id)">Delete</button>
        </li>
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
