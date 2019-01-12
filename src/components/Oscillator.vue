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
          name: "Portamento",
          id: 0,
          update: value => {
            //value 0 - 264;
            value += 132;
            this.$store.commit({
                type: 'setPortamento',
                synth: 1,
                amount: Math.round(((10 / 264) * value) * 100) / 100,
            });
          }
        },
        {
          value: 0,
          name: "OSC Balance",
          id: 1,
          update: value => {

            // $$y = -40 - (-0.37453/0.00832)\cdot(1 - e^{(-0.00832 \cdot x)})$$
            value += 132;
            let exponent1 = -0.00832282 * ((value * -1) + 264);
            let exponent2 = -0.00832282 * value;
            let gainOSC1 = -40 - (-45 * (1 - Math.pow(Math.E, exponent1)));
            let gainOSC2 = -40 - (-45 * (1 - Math.pow(Math.E, exponent2)));
            this.$store.commit({
                type: 'setOscBalance',
                synth: 1,
                osc1: gainOSC1,
                osc2: gainOSC2,
            })
          },
        },
        {
          value: 0,
          name: "OSC2 Offset",
          id: 2,
          update: value => {
            value += 132;
            //  Harmocity(OSC offset) is mapped (0.5 == -1 octave ~ 2 == +1 Octave)
            //  Below is the quadratic regression mapping the dial value to harmocity.
            //  The equations where chosen so that the top 50% of the dial give fine grain control over the inital 1 tone degree of offset.
            //  I chose this as most sounds aren't looking for radical pitch shifts.
            //  y = 0.5 + 0.007954545*x - 0.0000162611*x^2 - 2.608732e-7 *x^3 + 1.097951e-9 *x^4
            // ALTERNATIVE y = 0.5 + 0.005934343*x + 0.000006695745*x^2 - 3.18845e-7*x^3 + 1.097951e-9*x^4

            const bexp3 = 2.608732 * Math.pow(10, -7);
            const bexp4 = 1.097951 * Math.pow(10, -9);
            const harmocity = 0.5 + (0.007954545  * value) - (0.0000162611 * Math.pow(value, 2)) - (bexp3 * Math.pow(value, 3)) + (bexp4 * Math.pow(value, 4));

            this.$store.commit({
              type: 'setOSC2Offset',
              synth: 1, 
              harmocity,
            });
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
      this.$store.commit("toggleOsc1Wave");
    },
    toggleOsc2() {
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
