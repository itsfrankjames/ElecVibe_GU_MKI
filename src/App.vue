<template>
  <div id="app">
    <Sequencer/>
    <div class="synth">
      <div class="osc">
        <Oscillator/>
      </div>
      <div class="amp+filter">
        <Amp/>
      </div>
    </div>
  </div>
</template>

<script>
import Sequencer from "./components/Sequencer.vue";
import Oscillator from "./components/Oscillator.vue";
import Amp from "./components/Amp";

export default {
  name: "app",
  components: {
    Sequencer,
    Oscillator,
    Amp
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

body {
  /* background-image: url('./assets/leather-background.jpg'); */
  background-color: black;
}

.synth {
  min-width: 1080px;
  margin: auto;
  max-width: 1124px;
  display: flex;
}

</style>
