<template>
    <div class='toggle'>
    <button @click="toggleOption()" class='toggle-button'>{{control}}</button>
    <div class='options'>
    <div class='option' v-for="option in options" :key="option.id">
        <div v-bind:class="['light', option.active ? 'active' : 'inactive']"></div>
        <p class='option-text'>{{option.label}}</p>
    </div>
    <!-- <div>
        <p class='option-text'>label</p>
        <div class="light"></div>
    </div> -->
    </div>
    </div>
</template>

<script>
 
export default {
  name: 'Toggle',
  props: {
      control: String,
      options: Array, 
  },
  data() {
      return{
          
      }
  },
  methods: {
      toggleOption() {
          for(let i = 0; i < this.options.length; i++) {
              if(this.options[i].active === true) {
                  this.options[i].active = false;
                  if(i + 1 == this.options.length){
                      this.options[0].active = true;
                      break;
                  } else {
                      this.options[i+1].active = true;
                      break;
                  }
              }
          }
      }
  }

}
</script>

<style scoped>
.toggle {
    display: flex;

}

.toggle-button {
    height: 40px;
    width: 80px;
    border-radius: 10px;
    background-color: grey;
    border: none;
    color: #fff;
    margin: 26px;
}

.options {
    margin: 20px;
    margin-left: 0px; 
    display: flex;
    flex-direction: column;
}

.option {
    display: inline-flex;
    padding: 8px;
}

.option-text {
    color: azure;
    margin: 0px;
}

.active {
    background-color: aqua;
}
.inactive {
    background-color: gray;
}

.light {
    top: 4px;
    height: 10px;
    width: 10px;
    border-radius: 5px;
    position: relative;
    margin-right: 10px;
}
</style>
