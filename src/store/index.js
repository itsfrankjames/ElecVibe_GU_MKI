import Vuex from 'vuex';
import Vue from 'vue';
import Actions from './actions';
import Tone from '../../node_modules/tone';
// import Mutations from './mutations';

Vue.use(Vuex)


const store = new Vuex.Store({
    state: {
        synth1: {
            toneObject: new Tone.DuoSynth(),
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
            filter: {
                type: 'lowpass',
                frequency: 0,
                Q: 0,
            },
            effects: {
                distortion: {
                    level: 0,
                    active: true,
                },
                bitcruch: {
                    level: 0,
                    active: false,
                },
                phaser: {
                    depth: 0,
                    time: 0,
                },
                delay: {
                    depth: 0,
                    time: 0,
                },
                reverb: {
                    depth: 0,
                    time: 0,
                },
            }
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
        setPortamento(state, payload) {

            // FIX PORNMENTO SET VALUE

            switch(payload.synth){
                case 1:
                    console.log('case1');
                    console.log(payload.amount);
                    state.synth1.toneObject.voice0.portamento.value = payload.amount;
                    state.synth1.toneObject.voice1.portamento.value = payload.amount;
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
            // See Osillator Vue 
            // $$y = -40 - (-0.37453/0.00832)\cdot(1 - e^{(-0.00832 \cdot x)})$$
            // invert x for one osc to create inverse curve

            switch(payload.synth){
                case 1:
                    state.synth1.osc1.volume = payload.osc1
                    state.synth1.osc2.volume = payload.osc2;
                    break;
                case 2:
                    // state.synth2.toneObject.voice0.volume = payload.amount * -1;
                    // state.synth2.toneObject.voice1.volume = payload.amount;
                    break;
            }
            state.synth1.toneObject.voice0.volume.value = state.synth1.osc1.volume;
            state.synth1.toneObject.voice1.volume.value = state.synth1.osc2.volume;
            // console.log(`OSC1 Gain is ${state.synth1.toneObject.voice0.volume.value}db`);
            // console.log(`OSC2 Gain is ${state.synth1.toneObject.voice1.volume.value}db`);
        },
        setOSC2Offset(state, payload) {
            // Equation for the curve mapping dial value to harmocity:
            // hamocity = 0.5 + 0.001893939 * dialV + 0.00001434803 * dialV^2
            // y = 0.5 + 0.007954545 * x - 0.0000162611 * x^2 - 2.608732e-7 * x^3 + 1.097951e-9 * x^4
            switch(payload.synth){
                case 1:
                    state.synth1.oscOffest = payload.harmocity;
                    break;
                case 2:
                    state.synth2.oscOffest = payload.harmocity;
                    break;
            }
            console.log(state.synth1.oscOffest);
            state.synth1.toneObject.harmonicity.value = state.synth1.oscOffest;
        }
        
    },
    actions: Actions,
});


export default store;