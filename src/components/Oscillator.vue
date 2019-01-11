<template>
    <div class='osc'>
        <h2>Oscillator</h2>
        <div class="dials">
        <Knob v-for="dial in controls" :key="dial.id" :label="dial.name" :id="dial.id" :startPos="dial.value" color='#FA9C34'></Knob>
        </div>
        <div class='waveformTogglers'>
        <Toggle :options="osc1Waveform" control='OSC1'></Toggle>
        <Toggle :options="osc2Waveform" control='OSC2'></Toggle>
        </div>
    </div>
</template>

<script>
import Knob from './Knob';
import Toggle from './Toggler'; 

export default {
  name: 'Oscillator',
  data() {
      return {
          controls: [ {
              value: -132,
              name: 'Pornamento',
              id: 0,
          },
          {
              value: 0,
              name: 'OSC Balance',
              id: 1,
          },
          {
              value: 0,
              name: 'OSC2 Offset',
              id: 2,
          }
          ],
          osc1Waveform: [
            {
            label: 'Saw',
            active: true,
            id: 'saw',
            },
            {
            label: 'Sine',
            active: false,
            id: 'sine',
            },
                   {
            label: 'Square',
            active: false,
            id: 'square',
            }
          ],
          osc2Waveform: [
              {
            label: 'Saw',
            active: true,
            id: 'saw',
            },
            {
            label: 'Sine',
            active: false,
            id: 'sine',
            },
                   {
            label: 'Square',
            active: false,
            id: 'square',
            }
          ]
      }
  },
  components: {
      Knob,
      Toggle
  },
  methods: {

  }

}
</script>

<style scoped>
.osc {
    padding: 20px;
    width: 520px;
    color: aliceblue;
    border: solid #fff 2px;
    border-radius: 2px;
}

h2 {
    margin-top: 0px;
}

.dials {
    display: flex;
    justify-content: space-between;
    width: 520px;
}

.waveformTogglers {
    display: flex;
    justify-content: start;
}

</style>
