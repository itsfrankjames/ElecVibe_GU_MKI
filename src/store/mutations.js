import store from './index';

const Mutations = {
    toggleOsc1Wave() {
        console.log('mutations - osc1');
        switch(store.state.osc1.type) {
            case 'saw':
                store.state.osc1.type = 'sine';
                break;
            case 'sine':
                store.state.osc1.type = 'square';
                break;
            case 'square':
                store.state.osc1.type = 'saw'
                break;
        }
    },
    toggleOsc2Wave() {
        console.log('mutations - osc2');
        switch(store.state.osc2.type) {
            case 'saw':
                store.state.osc2.type = 'sine';
                break;
            case 'sine':
                store.state.osc2.type = 'square';
                break;
            case 'square':
                store.state.osc2.type = 'saw'
                break;
        }
        
    },
}

export default Mutations;