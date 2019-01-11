import Vuex from 'vuex';
import Vue from 'vue';
import Actions from './actions';
import Tone from '../../node_modules/tone';
// import Mutations from './mutations';

Vue.use(Vuex)


const store = new Vuex.Store({
    state: {
        synth1: {
            toneObject: new Tone.DuoSynth().toMaster(),
            osc1: {
                type: 'sine',
                portamento: 0,
                volume: 0,
            },
            osc2: {
                type: 'sine',
                portamento: 0,
                volume: 0,
            },
            oscOffset: 1,
            oscBalance: 0,
        }
    },
    mutations: {
        toggleOsc1Wave(state) {
            switch (state.synth1.osc1.type) {
                case 'sawtooth':
                    state.synth1.osc1.type = 'sine';
                    break;
                case 'sine':
                    state.synth1.osc1.type = 'square';
                    break;
                case 'square':
                    state.synth1.osc1.type = 'sawtooth'
                    break;
            }
            state.synth1.toneObject.voice0.oscillator.type = state.synth1.osc1.type;
        },
        toggleOsc2Wave(state) {
            switch (state.synth1.osc2.type) {
                case 'sawtooth':
                    state.synth1.osc2.type = 'sine';
                    break;
                case 'sine':
                    state.synth1.osc2.type = 'square';
                    break;
                case 'square':
                    state.synth1.osc2.type = 'sawtooth'
                    break;
            }
            state.synth1.toneObject.voice1.oscillator.type = state.synth1.osc2.type;
        },
        setPornamento(state, payload) {

            // FIX PORNMENTO SET VALUE

            switch(payload.synth){
                case 1:
                    console.log('case1');
                    console.log(payload.amount);
                    state.synth1.toneObject.voice0.portamento = '8n';
                    state.synth1.toneObject.voice1.portamento = '8n';
                    break;
                case 2:
                    state.synth2.toneObject.voice0.portamento = payload.amount;
                    state.synth2.toneObject.voice1.portamento = payload.amount;
                    break;
            }
            console.log(state.synth1.toneObject.voice1.portamento);
        },
        setOscBalance(state, payload) {

            // FIND GAIN AMOUNT TO BALANCE OSCs

            console.log(state.synth1.toneObject);
            switch(payload.synth){
                case 1:
                    console.log('case1');
                    console.log(payload.amount);
                    state.synth1.osc1.volume = (payload.amount * -1) - 20;
                    state.synth1.osc2.volume = payload.amount - 20;
                    break;
                case 2:
                    // state.synth2.toneObject.voice0.volume = payload.amount * -1;
                    // state.synth2.toneObject.voice1.volume = payload.amount;
                    break;
            }
            state.synth1.toneObject.voice0.volume.value = state.synth1.osc1.volume;
            state.synth1.toneObject.voice1.volume.value = state.synth1.osc2.volume;
            console.log(state.synth1.toneObject.voice0.volume.value);
            console.log(state.synth1.toneObject.voice1.volume.value);
        }
        
    },
    actions: Actions,
});


export default store;