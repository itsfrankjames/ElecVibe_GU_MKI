<template>
  <div class="osc">
    <h2>Oscillator</h2>
    <div class="dials">
      <Knob
        v-for="dial in controls"
        :key="dial.id"
        :label="dial.name"
        :id="dial.id"
        :startPos="dial.value"
        :onRelease="dial.update"
        color="#FA9C34"
      ></Knob>
    </div>
    <div class="waveformTogglers">
      <Toggle :options="osc1Waveform" :onToggle="toggleOsc1" control="OSC1"></Toggle>
      <Toggle :options="osc2Waveform" :onToggle="toggleOsc2" control="OSC2"></Toggle>
    </div>
  </div>
</template>

<script>
import Knob from "./Knob";
import Toggle from "./Toggler";

export default {
  name: "Oscillator",
  data() {
    return {
      controls: [
        {
          value: -132,
          name: "Pornamento",
          id: 0,
          update: value => {
            //value 0 - 264;
            value += 132;
            this.$store.commit({
                type: 'setPornamento',
                synth: 1,
                amount: Math.round(((3 / 264) * value) * 100) / 100,
            });
          }
        },
        {
          value: 0,
          name: "OSC Balance",
          id: 1,
          update: value => {
            this.$store.commit({
                type: 'setOscBalance',
                synth: 1,
                amount: Math.round(((40 / 264) * value) * 100) / 100,
            })
          },
        },
        {
          value: 0,
          name: "OSC2 Offset",
          id: 2,
          update: value => {
            this.$store.commit('');
          }
        }
      ],
      osc1Waveform: [
        {
          label: "Saw",
          active: false,
          id: "saw"
        },
        {
          label: "Sine",
          active: true,
          id: "sine"
        },
        {
          label: "Square",
          active: false,
          id: "square"
        }
      ],
      osc2Waveform: [
        {
          label: "Saw",
          active: false,
          id: "saw"
        },
        {
          label: "Sine",
          active: true,
          id: "sine"
        },
        {
          label: "Square",
          active: false,
          id: "square"
        }
      ]
    };
  },
  components: {
    Knob,
    Toggle
  },
  methods: {
    toggleOsc1() {
      console.log("toggleOsc1Wave");
      this.$store.commit("toggleOsc1Wave");
    },
    toggleOsc2() {
      console.log("toggleOsc2Wave");
      this.$store.commit("toggleOsc2Wave");
    }
  }
};
</script>

<style scoped>
.osc {
  padding: 20px;
  width: 520px;
  color: aliceblue;
  border-bottom: solid #fff 2px;
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
