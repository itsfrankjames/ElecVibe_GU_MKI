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
      effects: {
        distortion: this.$store.state.synth1.distortionObject,
        bitcrusher: this.$store.state.synth1.bitcrusherObject,
        phaser: this.$store.state.synth1.effects.phaser.effectObject,
        delay: this.$store.state.synth1.effects.delay.effectObject,
        reverb: this.$store.state.synth1.effects.reverb.effectObject,
      }
    }
  },
  methods: {
    
  },
  created() {

    this.synth.chain(
      this.filter, 
      this.effects.distortion, 
      this.effects.bitcrusher,
      this.effects.phaser,
      this.effects.delay,
      this.effects.reverb, 
      Tone.Master);

    this.$store.commit('setBitcrusherInactive');
    this.$store.commit('setDelayInactive');
    this.$store.commit('setReverbInactive');
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
