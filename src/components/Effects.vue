<template>
    <div class='effects'>
        <h2>Effects</h2>
        <div class="dials">
        <Knob v-for="dial in controls" :key="dial.id" :label="dial.name" :id="dial.id" :startPos="dial.value" :onRelease='dial.method' color='#FA9C34'></Knob>
        </div>
        <div class='effectToggler'>
        <Toggle :options="effectType" control='Type Select' :onToggle='toggleEffect'></Toggle>
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
          activeEffect: this.$store.state.synth1.effects.active,
          controls: [ {
              value: -132,
              name: 'Depth',
              id: 0,
              method: this.setEffectDepth,
          },
          {
              value: 0,
              name: 'Time',
              id: 1,
              method: this.setEffectTime,
          },
          ],
          effectType: [
            {
            label: 'Phaser',
            active: this.$store.state.synth1.effects.active === 'phaser',
            id: 'phaser',
            },
            {
            label: 'Delay',
            active: this.$store.state.synth1.effects.active === 'delay',
            id: 'delay',
            },
            //        {
            // label: 'Reverb',
            // active: this.$store.state.synth1.effects.active === 'reverb',
            // id: 'reverb',
            // }
          ],
      }
  },
  components: {
      Knob,
      Toggle
  },
  methods: {
      toggleEffect(){
          this.$store.commit('toggleEffectsType');
        //   switch(this.activeEffect) {
        //       case 'phaser':
        //       case  'delay':
        //       case  'reverb':
        //   }
      },
      setEffectDepth(value){
          value += 132;
          this.$store.commit({
              type: 'setEffectDepth',
              value,
            });
      },
      setEffectTime(value) {
          value += 132;
          this.$store.commit({
              type: 'setEffectTime',
              value,
            });
      }
  }
}
</script>

<style scoped>
.effects {
    padding: 20px;
    width: 520px;
    color: aliceblue;
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

.effectToggler {
    display: flex;
    justify-content: start;
}

</style>
