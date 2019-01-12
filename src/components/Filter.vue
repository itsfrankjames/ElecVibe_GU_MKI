<template>
  <div class="filter">
    <h2>Filter</h2>
    <div class="dials">
      <Knob
        v-for="dial in controls"
        :key="dial.id"
        :label="dial.name"
        :id="dial.id"
        :startPos="dial.value"
        :onRelease="dial.setValue"
        color="#FA9C34"
      ></Knob>
    </div>
    <div class="waveformTogglers">
      <Toggle :options="filterType" control="Type" :onToggle="toggleFilterType"></Toggle>
      <Toggle :options="filterRolloff" control="Rolloff Gain" :onToggle="toggleFilterRolloff"></Toggle>
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
          name: "Frequency",
          id: 0,
          setValue: this.setFrequency,
        },
        {
          value: 0,
          name: "Q",
          id: 1,
          setValue: this.setQ,
        }
      ],
      filterType: [
        {
          label: "Lowpass",
          active: true,
          id: "lowpass"
        },
        {
          label: "Highpass",
          active: false,
          id: "highpass"
        },
        {
          label: "Bandpass",
          active: false,
          id: "bandpass"
        }
      ],
      filterRolloff: [
        {
          label: "-12db",
          active: true,
          id: "roll-12"
        },
        {
          label: "-24db",
          active: false,
          id: "roll-24"
        },
        {
          label: "-48db",
          active: false,
          id: "roll-48"
        }
      ]
    };
  },
  components: {
    Knob,
    Toggle
  },
  methods: {
    toggleFilterType() {
      this.$store.commit({
        type: "toggleFilterType"
      });
    },
    toggleFilterRolloff() {
      this.$store.commit({
        type: "toggleFilterRolloff"
      });
    },
    setFrequency(value) {
      // Maps the dial turn value to a log function
      // gives better control of the exponential nature of the frequency perception.
      value += 132;
      const y = Math.pow(1 + value, 2) / Math.pow(1 + 265, 2);

      // 20hz ~ 12000hz is the bounds of the filter.
      const f = y * 12000 + 20;

      this.$store.commit({
        type: "setFilterFrequency",
        synth: 1,
        frequency: f
      });
    },
    setQ(value) {
      value += 132;
      console.log((10 / 264) * value);
      this.$store.commit({
        type: "setFilterQ",
        synth: 1,
        Q: (10 / 264) * value,
      });
    }
  }
};
</script>

<style scoped>
.filter {
  padding: 20px;
  width: 520px;
  color: aliceblue;
  border-bottom: solid #fff 2px;
  border-left: solid #fff 2px;
}

h2 {
  margin-top: 0px;
}

.dials {
  display: flex;
  justify-content: space-around;
  width: 520px;
}

.waveformTogglers {
  display: flex;
  justify-content: start;
}
</style>
