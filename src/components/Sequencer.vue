<template>
<div>
    <div class='sequencer'>
    <div class='step-container' v-for="step in steps" :key="step.id">
        <button v-on:click="incrementNote(step.id)" class='up-note'>+</button>
        <p class='note'>{{getNote(step.note)}}<p/>
         <button v-on:click="decramentNote(step.id)" class='down-note'>-</button>
        <input v-bind:id="stepId(step.id)" class='step-button' type="checkbox" v-on:click='toggleStep(step.id)'>
    </div>
    </div>
    <button id="start" v-on:click="start()">Start</button>
    <button id="stop" v-on:click="stop()">Stop</button>
</div>
</template>

<script>
import Tone from '../../node_modules/tone';
export default {
  name: 'Sequencer',
  props: {
      synth: Tone.DuoSynth,
  },
  data() {
      return {
          steps: [],
          notes: ['A4', 'A#4', 'B4', 'C4', 'C#4', 'D4', 'D#4', 'E4', 'F4', 'F#4', 'G4', 'G#4'],
          index: 0,
      }
  },
  methods: {
      stepId(id) {
          return `step-${id}`;
      },
      createStep(id) {
          return {
              id: id,
              note: id%12,
              active: false,
          }
      },
      getNote(key){
          return this.notes[key];
      },
      incrementNote(id) {
          let current = this.steps[id-1].note;
          this.steps[id-1].note = current+1 <= 11 ? current+1 : 0; 
      },
      decramentNote(id){
          let current = this.steps[id-1].note;
          this.steps[id-1].note = current-1 >= 0 ? current-1 : this.notes.length-1; 
      },
      toggleStep(id){
          this.steps[id-1].active = !this.steps[id-1].active;
      },
      sequence() {
            let step = this.index % 16;
            let note = this.notes[this.steps[step].note];
            if(this.steps[step].active) {
                this.synth.triggerAttackRelease(note, '16n');
            }
            this.index++;
        },
        stop() {
            Tone.Transport.stop();
        },
        start() {
            Tone.Transport.start();
        }

  },
  created() {

      for(let i = 1; i < 17; i++) {
          this.steps.push(this.createStep(i));
      }
      
  },
  mounted() {

        Tone.Transport.scheduleRepeat(this.sequence, '16n');
  }
}
</script>

<style scoped>

.sequencer {
    display: flex;
    justify-content: center;
    flex-direction: row;
    width: 1080px;
    border: #fff solid 2px;
    border-radius: 2px;
    padding: 20px;
    margin: auto;

}

.step-container {
    padding: 40px 12px 12px;
    margin: 6px;
    border-radius: 4px;
    background-color: grey;
    display: flex;
    flex-direction: column;
}

.step-container p {
    color: #fff;
}

.step-container button {
    height: 24px;
    width: 24px;
    border: 2px;
    padding: 0px;
    border-radius: 2px;
    align-self: auto;
    margin: auto;
}

.step-container input {

}

.step-button {
    appearance: none;
    height: 24px;
    width: 24px;
    border-radius: 2px;
    background-color: #fff;
    margin: 10px 4px 0px;
}

input[type="checkbox"]:checked {
    background-color: red;
}

#start {
    margin: 20px;
}

#stop {
    margin: 20px;
}

</style>
