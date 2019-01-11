<template>
  <div id="app">
    <Sequencer/>
    <Knob/>
  </div>
</template>

<script>
import Sequencer from './components/Sequencer.vue'
import Knob from './components/Knob.vue';

export default {
  name: 'app',
  components: {
    Sequencer,
    Knob,
  },
}
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

body {
  /* background-image: url('./assets/leather-background.jpg'); */
  background-color: black

}

</style>
