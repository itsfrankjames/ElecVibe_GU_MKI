<template>
  <div id="app">
    <Sequencer :synth='synth'/>
    <div class="synth">
      <div class="osc">
        <Oscillator/>
        <Amp/>
      </div>
      <div class="amp+filter">
        <SFilter />
        <Effects />
      </div>
    </div>
  </div>
</template>

<script>
import Tone from '../node_modules/tone';
import Sequencer from "./components/Sequencer.vue";
import Oscillator from "./components/Oscillator.vue";
import SFilter from './components/Filter';
import Amp from "./components/Amp";
import Effects from './components/Effects';

export default {
  name: "app",
  components: {
    Sequencer,
    Oscillator,
    SFilter,
    Effects,
    Amp
  },
  data() {
    return {
      synth: this.$store.state.synth1.toneObject,
      filter: this.$store.state.synth1.filterObject,
    }
  },
  methods: {
    
  },
  created() {
    this.synth.chain(this.filter, Tone.Master);
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
  border: solid #fff 2px;
  border-radius: 2px;
}

</style>
