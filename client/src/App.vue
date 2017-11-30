<template>
  <div id="app">
    <img class="img-logo" src="./assets/logo.png">
    <HelloWorld/>
    <ToDos/>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld';
import ToDos from './components/ToDos';

export default {
  name: 'app',
  components: {
    HelloWorld,
    ToDos,
  },
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.img-logo {
  max-width: 50px;
}
</style>
