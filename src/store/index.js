import Vuex from 'vuex';
import Vue from 'vue';
import Actions from './actions';
import Tone from '../../node_modules/tone';
// import Mutations from './mutations';

Vue.use(Vuex)


const store = new Vuex.Store({
    // Refactor init synths into new file ...spread to syunth objects and
    // use properties to init Tone Objects.
    // Get Components to init view from store properties so synth and view are in sync.
    state: {
        synth1: {
            filterObject: new Tone.Filter(1000, "lowpass"),
            bitcrusherObject: new Tone.BitCrusher(4),
            distortionObject: new Tone.Distortion(0),
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
                rolloff: -12,
            },
            amp: {
                distortion: {
                    level: 0,
                    active: true,
                },
                bitcrusher: {
                    bits: 0,
                    active: false,
                },
            },
            effects: {
                active: 'phaser',
                phaser: {
                    id: 'phaser',
                    depth: 0,
                    time: 0,
                    // active: true,
                    effectObject: new Tone.Phaser(),
                },
                delay: {
                    id: 'delay',
                    depth: 0,
                    time: 0,
                    // active: false,
                    effectObject: new Tone.FeedbackDelay(),
                },
                reverb: {
                    id: 'reverb',
                    depth: 0,
                    time: 0,
                    // active: false,
                    effectObject: new Tone.Freeverb(),  
                },
            }
        },
        effectsKeys: ['phaser', 'delay', 'reverb'],
    },
    mutations: {
        // OSC MUTATORS
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
                    state.synth1.toneObject.voice0.portamento.value = payload.amount;
                    state.synth1.toneObject.voice1.portamento.value = payload.amount;
                    break;
                case 2:
                    state.synth2.toneObject.voice0.portamento = payload.amount;
                    state.synth2.toneObject.voice1.portamento = payload.amount;
                    break;
            }
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
            // for the equation for the curve mapping dial value to harmocity see the Oscillator vue.
            switch(payload.synth){
                case 1:
                    state.synth1.oscOffest = payload.harmocity;
                    break;
                case 2:
                    state.synth2.oscOffest = payload.harmocity;
                    break;
            }
            state.synth1.toneObject.harmonicity.value = state.synth1.oscOffest;
        },
        // FILTER MUTATORS
        toggleFilterType(state){
            // refactor for dual synth use.
            switch (state.synth1.filter.type) {
                case 'lowpass':
                    state.synth1.filter.type = 'highpass';
                    break;
                case 'highpass':
                    state.synth1.filter.type = 'bandpass';
                    break;
                case 'bandpass':
                    state.synth1.filter.type = 'lowpass'
                    break;
            }
            state.synth1.filterObject.type = state.synth1.filter.type;

        },
        toggleFilterRolloff(state) {
            // refactor for dual synth use.
            switch (state.synth1.filter.rolloff) {
                //-12, -24, -48 and -96
                case -12:
                    state.synth1.filter.rolloff = -24;
                    break;
                case -24:
                    state.synth1.filter.rolloff = -48;
                    break;
                case -48:
                    state.synth1.filter.rolloff = -12
                    break;
            }
            state.synth1.filterObject.rolloff = state.synth1.filter.rolloff;
        },
        setFilterFrequency(state, payload) {
            // refactor for dual synth use.
            state.synth1.filter.frequency = payload.frequency;
            state.synth1.filterObject.frequency.value = state.synth1.filter.frequency;
        },
        setFilterQ(state, payload) {
            // refactor for dual synth use.
            state.synth1.filter.Q = payload.Q;
            state.synth1.filterObject.Q.value = state.synth1.filter.Q;

        },
        // AMP MUTATORS
        setDistortionActive(state) {
            state.synth1.amp.distortion.active = true;
            state.synth1.distortionObject.wet.value = 1;
        },
        setBitcrusherActive(state) {
            state.synth1.amp.bitcrusher.active = true;
            state.synth1.bitcrusherObject.wet.value = 1;
        },
        setDistortionInactive(state) {
            state.synth1.amp.distortion.active = false;
            state.synth1.distortionObject.wet.value = 0;
        },
        setBitcrusherInactive(state) {
            state.synth1.amp.bitcrusher.active = false;
            state.synth1.bitcrusherObject.wet.value = 0;
        },
        setBitcrusherLevel(state, payload) {
            state.synth1.amp.bitcrusher.bits = payload.bits;
            // Bitcrush has no 0 bit value so allow the silent toggling off of the effect if dial value is 0.
            if(state.synth1.amp.bitcrusher.bits === 0 && state.synth1.amp.bitcrusher.active) {
                state.synth1.bitcrusherObject.wet.value = 0;    
            } else {
                state.synth1.bitcrusherObject.wet.value = 1;
                state.synth1.bitcrusherObject.bits = state.synth1.amp.bitcrusher.bits;
            }
        },
        // SOME ERROR WITH DISTORTION LEVEL ELSE WHERE
        // DISTORTION REMAINS ACTIVE AND AT SAME LEVEL as BITCRUSHER
        // TEST
        setDistortionLevel(state, payload) {
            state.synth1.amp.distortion.level = payload.level;
            state.synth1.distortionObject.distortion = payload.level;
        },
        // EFFECTS SECTION
        toggleEffectsType(state) {
            // refactor for dual synth use.
            switch(state.synth1.effects.active) {
                case 'phaser':
                    state.synth1.effects.phaser.effectObject.wet.value = 0;
                    state.synth1.effects.delay.effectObject.wet.value = 1;
                    state.synth1.effects.active = 'delay';
                    break;
                case 'delay':
                    state.synth1.effects.delay.effectObject.wet.value = 0;
                    state.synth1.effects.phaser.effectObject.wet.value = 1;
                    state.synth1.effects.active = 'phaser';
                    break;
                // case 'reverb':  
                //     state.synth1.effects.reverb.effectObject.wet.value = 0;
                //     state.synth1.effects.phaser.effectObject.wet.value = 1;
                //     state.synth1.effects.active = 'phaser';
                //     break;
            }

        },
        setEffectDepth(state, payload) {
            switch(state.synth1.effects.active) {
                case 'phaser': {
                    // convert value to octave Amount
                    const inc = 12 / 264;
                    let octave = Math.round(inc * payload.value);
                    state.synth1.effects.phaser.effectObject.octaves = octave;
                    state.synth1.effects.phaser.depth = octave;
                    break;
                }
                case 'delay': {
                    //Convert value to feedback amount (0 - 1)
                    let feedback = (1 / 264) * payload.value;   
                    state.synth1.effects.delay.effectObject.feedback.value = feedback;
                    state.synth1.effects.delay.depth = feedback;
                    break;
                }
                case 'reverb':  {
                    //Convert value to reverb Dampening Frequency; :/
                    const y = Math.pow(1 + payload.value, 2) / Math.pow(1 + 265, 2);
                    // 20hz ~ 12000hz is the bounds of the filter.
                    const reverbFilterCutoff = y * 16000 + 20;
                    state.synth1.effects.reverb.effectObject.dampening.value = reverbFilterCutoff;
                    state.synth1.effects.reverb.depth = reverbFilterCutoff;
                    break;
                }
            }
        },
        setEffectTime(state, payload) {
            switch(state.synth1.effects.active) {
                case 'phaser': {
                    // to frequency 
                    // 20hz ~ 12000hz is the bounds of the filter.
                    // const reverseValue = (payload.value * -1) + 264;
                    const max_bounds = 69696;
                    const reverbFilterCutoff = (30 / max_bounds) * Math.pow(payload.value, 2);
                    state.synth1.effects.phaser.effectObject.frequency.value = reverbFilterCutoff;
                    state.synth1.effects.phaser.time = reverbFilterCutoff;
                    break;
                }
                case 'delay': {
                    //
                    let delayTime = (1 / 264) * payload.value;  
                    state.synth1.effects.delay.effectObject.delayTime.value = delayTime;
                    state.synth1.effects.delay.time = delayTime ;
                    break;
                }
                case 'reverb':  {
                    // Convert value to reverb (0 - 1)
                    let roomSize = (1 / 264) * payload.value;  
                    state.synth1.effects.reverb.effectObject.roomSize.value = roomSize;
                    state.synth1.effects.reverb.time = roomSize;
                    break;
                }
            }
        },
        setReverbWetHalf(state) {
            state.synth1.effects.reverb.effectObject.wet.value = 0.6;
        },
        setPhaserInactive(state) {
            state.synth1.effects.phaser.effectObject.wet.value = 0;
        },
        setDelayInactive(state) {
            state.synth1.effects.delay.effectObject.wet.value = 0;
        },
        setReverbInactive(state) {
            state.synth1.effects.reverb.effectObject.wet.value = 0;
        }

    },
    actions: Actions,
});


export default store;