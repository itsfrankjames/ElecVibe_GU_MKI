<template>
  <div class="amp">
    <h2>Amp</h2>
    <div class="dials">
      <Knob
        v-if="distortion.active"
        :label="distortion.name"
        :id="distortion.id"
        :startPos="distortion.startPos"
        :onRelease='setDistortionLevel'
        color="#FA9C34"
      ></Knob>
      <Knob
        v-if="bitcrush.active"
        :label="bitcrush.name"
        :id="bitcrush.id"
        :startPos="bitcrush.startPos"
        :onRelease='setBitcrusherLevel'
        color="#FA9C34"
      ></Knob>
    </div>
    <Toggler :options="togglerOptions" :onToggle="toggleFx"/>
  </div>
</template>

<script>
import Knob from "./Knob";
import Toggler from "./Toggler";

export default {
  name: "Oscillator",
  data() {
    return {
      distortion: {
        id: 0,
        name: "distortion",
        startPos: -132,
        active: true
      },
      bitcrush: {
        id: 1,
        name: "bitcrusher",
        startPos: -132,
        active: false
      },
      togglerOptions: [
        {
          label: "distortion",
          active: true,
          id: "distortion"
        },
        {
          label: "bitcrusher",
          active: false,
          id: "bitcrusher"
        }
      ]
    };
  },
  components: {
    Knob,
    Toggler
  },
  methods: {
    toggleFx() {
      this.distortion.active = !this.distortion.active;
      this.bitcrush.active = !this.bitcrush.active;
      
      if (this.distortion.active) {
        this.$store.commit("setDistortionActive");
        this.$store.commit("setBitcrusherInactive");
      } else {
        this.$store.commit("setDistortionInactive");
        this.$store.commit("setBitcrusherActive");
      }
    },
    setDistortionLevel(value) {
      value += 132;
      const inc = 1 / 264;

      this.$store.commit({
        type: "setDistortionLevel",
        level: inc * value
      });
    },
    setBitcrusherLevel(value) {
      value += 132;
      const inc = 8 / 264;
      let bit = Math.round(inc * value);
      console.log(bit);
      this.$store.commit({
        type: "setBitcrusherLevel",
        bits: bit,
      });
    }
  }
};
</script>

<style scoped>
.amp {
  padding: 20px;
  width: 200px;
  color: aliceblue;
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
