<template>
<div>
    <div class='sequencer'>
    <div class='step-container' v-for="step in steps" :key="step.id" v-bind:style="{ 'background-color': step.colour }">
        <button v-on:click="incrementNote(step.id)" class='up-note'>+</button>
        <p class='note'>{{getNote(step.note)}}<p/>
         <button v-on:click="decramentNote(step.id)" class='down-note'>-</button>
        <input v-bind:id="stepId(step.id)" class='step-button' type="checkbox" :checked='step.active' v-on:click='toggleStep(step.id)'>
    </div>
    </div>
    <div class='global-controls'>
    <div class='transport-controls'>
        <button class='transport' id="start" v-on:click="start()"><img src="../assets/play-96.png"></button>
        <button class='transport' id="stop" v-on:click="stop()"><img src="../assets/stop-96.png"></button>
    </div>
    <div class='bpm-controls'>
        <h2>BPM</h2>
        <button class='bpm-control' v-on:click='decrementBPM'>-</button>
        <p>{{ bpm }}</p>
        <button class='bpm-control' v-on:click='incrementBPM'>+</button>
    </div>
    </div>
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
          notes: ['A2', 'A#2', 'B2', 'C3', 'C#3', 'D3', 'D#3', 'E3', 'F3', 'F#3', 'G3', 'G#3', 'A3', 'A#3', 'B3', 'C4', 'C#4', 'D4', 'D#4', 'E4', 'F4', 'F#4', 'G4', 'G#4', 'A4', 'A#4', 'B4', 'C5'],
          index: 0,
          bpm: 100,   
    }
  },
  methods: {
      stepId(id) {
          return `step-${id}`;
      },
      createStep(id) {
          return {
              id: id,
              note: id % 12,
              active: (id - 1) % 2 == 0 ? true : false,
              colour: 'rgba(128, 128, 128, 1)',
            //   active: true,
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
      incrementBPM() {
        this.bpm = this.bpm + 1;
        Tone.Transport.bpm.value = this.bpm
      },
      decrementBPM(){
        this.bpm = this.bpm - 1;
        Tone.Transport.bpm.value = this.bpm;
      },
      sequence() {
            let step = this.index % 16;
            let lastStep = step - 1 >= 0 ? step - 1 : 15;
            let note = this.notes[this.steps[step].note];
     
            this.steps[lastStep].colour = 'rgba(128, 128, 128, 1)';
            this.steps[step].colour = 'rgba(86, 98, 37, 1)';

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
        Tone.Transport.bpm.value = this.bpm;
        Tone.Transport.scheduleRepeat(this.sequence, '16n');
  }
}
</script>

<style scoped>

.transport {
    border: none;
    border-radius: 8px;
    background-color: #fff;
    padding: 4px 20px;
    padding-top: 6px;
    margin: 20px 10px;
}

.transport img {
    height: 40px;
}

.transport-controls {
    display: flex;
    justify-content: space-between;
    width: 220px;

}

.global-controls {
    display: flex;
    width: 1080px;
    margin: auto;
    justify-content: space-between;
}

.bpm-controls {
    display: inline-flex;
    width: 340px;
    justify-content: space-evenly;
    margin: 20px;
}

.bpm-controls p {
    color: #fff;
    font-size: 24px;
    margin: 20px 0px 0px;
}

.bpm-controls h2 {
    color: #fff
}

.bpm-controls button {
    border: none;
    border-radius: 8px;
    background-color: #fff;
    padding: 6px 20px;
    width: 64px;
    font-size: 26px;
}
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
    /* margin: 20px; */
}

#stop {
    /* margin: 20px; */
}

</style>
