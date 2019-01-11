<template>
    <div class='amp'>
        <h2>Amp</h2>
        <div class="dials">
         <Knob :label="distortion.name" :id="distortion.id" :startPos="distortion.value" color='#FA9C34'></Knob>
        </div>
        <Toggler :options="togglerOptions" />
    </div>
</template>

<script>
import Knob from './Knob';
import Toggler from './Toggler'; 

export default {
  name: 'Oscillator',
  data() {
      return {
          distortion: {
              id: 0,
              name: 'distortion',
              startPos: 0,
              active: true,

          },
          bitcrush: {
              id: 1,
              name: 'bitcrusher',
              startPos: 0,
              active: false,
          },
          togglerOptions: [{
            label: 'distortion',
            active: true,
            id: 'distortion',
            },
            {
            label: 'bitcrusher',
            active: false,
            id: 'bitcrusher',
            },
          ]

      }
  },
  components: {
      Knob,
      Toggler,
  },
  methods: {

  }

}
</script>

<style scoped>
.amp {
    padding: 20px;
    width: 200px;
    color: aliceblue;
    border: solid #fff 2px;
    border-radius: 2px;
}

h2 {
    margin-top: 0px;
}

.dials {
    display: flex;
    justify-content: center;
    width: 200px;
}

.waveformTogglers {
    display: flex;
    justify-content: start;
}

</style>
