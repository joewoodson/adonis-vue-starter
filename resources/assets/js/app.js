// load all dependencies
import axios from 'axios';
window.Vue = require('vue');
window.axios = axios;
// load all components
Vue.component('task-list', require('./components/TaskList.vue'));
// define new Vue instances
const app = new Vue({
    el: '#app'
});
