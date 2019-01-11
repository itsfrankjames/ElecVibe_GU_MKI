// --- Notes ---
// https://mir-s3-cdn-cf.behance.net/project_modules/disp/1dd3e221774089.56307491c7600.png
// https://www.surrealmachines.com/wp-content/uploads/xmodnetic-laptop.png.pagespeed.ic.EB89gLdCx-.webp

// - To Do -
// Make components for the knobs
// Need to make two way knobs
// - for this i have to figure out how to have the svg break point in the middle of the arc

<template>
  <div class="rela-block container">
    <!-- Knobs -->
    <div :class="['rela-inline', 'knob', 'style'+knob.style]">
      <div
        class="knob-active-light"
        :style="{'background-color': knob.active?knob.color:'#888'}"
        @click="knob.active = !knob.active"
      ></div>
      <div class="rela-block knob-dial" :style="{'color':knob.active?knob.color:'#888'}">
        <div
          class="abs-center dial-grip"
          :style="{'transform': 'translate(-50%,-50%) rotate('+knob.rotation+'deg)'}"
          @mousedown="knobSelected"
        ></div>
        <svg class="dial-svg" viewBox="0 0 100 100">
          <path d="M20,76 A 40 40 0 1 1 80 76" fill="none" stroke="#55595C"></path>
          <path
            d="M20,76 A 40 40 0 1 1 80 76"
            fill="none"
            :stroke="knob.active?knob.color:'#888'"
            :style="{'stroke-dashoffset':184 - 184*((knob.rotation*1 + 132)/264)}"
          ></path>
        </svg>
      </div>
      <div
        class="rela-block knob-label"
        :style="{'color':knob.active?'#E4E8EA':'#888'}"
      >{{knob.label}}</div>
    </div>
  </div>
</template>


// - Vue Stuff -
<script>
export default {
    data() {
        return {
        colorArray: ['#23CDE8','#23F376','#FFFB43','#FA9C34','#21CD92','#ED31A2','#E22'],
        knob: {
                id: 0,
                label: 'Test Knob',
                rotation: -132,
                color: '#FA9C34',
                active: true,
                selected: false,
                style: 1
        },
        currentY: 0,
        }
    },
    //computed: {},
    methods: {
        unselectKnob(event) {
            event.preventDefault();
            this.knob.selected = false;
        },
        knobSelected(event) {
            event.preventDefault();
            this.knob.selected = true; 
            this.currentY = event.pageY; 
        },
        mousemoveFunction(e) {

        if(this.knob.selected) {
            // Knob Rotation
            if(e.pageY - this.currentY !== 0) { this.knob.rotation -= (e.pageY - this.currentY); }
            this.currentY = e.pageY;
            
            // Setting Max rotation
            if(this.knob.rotation >= 132) { this.knob.rotation = 132; } 
            else if(this.knob.rotation <= -132) { this.knob.rotation = -132; }
            
            // Knob method to update parameters based on the know rotation
            // selectedKnob.method(selectedKnob.rotation, selectedKnob.modifier);
            }
      },
    },
    mounted(){
        window.addEventListener('mousemove', this.mousemoveFunction);
        window.addEventListener('mouseup', this.unselectKnob);
    }
}
</script>


<style scoped>
* {
  box-sizing: border-box;
  transition: 0.3s cubic-bezier(0.6, 0, 0.2, 1);
}
.abs-center {
  position: absolute;
  top: 50%;
  left: 50%;
  right: ;
  bottom: ;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}
.vert-center {
  position: absolute;
  top: 50%;
  left: ;
  right: ;
  bottom: ;
  -webkit-transform: translateY(-50%);
  transform: translateY(-50%);
}
.horz-center {
  position: absolute;
  top: ;
  left: 50%;
  right: ;
  bottom: ;
  -webkit-transform: translateX(-50%);
  transform: translateX(-50%);
}
.rela-block {
  display: block;
  position: relative;
}
.rela-inline {
  display: inline-block;
  position: relative;
}
.left {
  position: relative;
  float: left;
}
.right {
  position: relative;
  float: right;
}
body {
  transition: 0s;
  background-color: #181b1c;
  font-family: monospace;
  color: #e4e8ea;
  font-size: 16px;
}
.container {
  margin: 20px auto;
  max-width: 700px;
  text-align: center;
}
.effect-container {
  width: 140px;
  border-radius: 3px;
  text-align: center;
  margin: 0 10px 20px;
  background-color: #2c2d2f;
}
.effect-container.wide {
  width: auto;
}
.effect-container .knob {
  padding: 0;
  margin: 0 0 10px;
}
.effect-label {
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  padding: 10px 0 10px 10px;
  border-bottom: 4px solid #181b1c;
}
.effect-active-light {
  position: absolute;
  top: 50%;
  left: 10px;
  right: ;
  bottom: ;
  -webkit-transform: translateY(-50%);
  transform: translateY(-50%);
  height: 10px;
  width: 10px;
  border-radius: 100%;
}
.knob-container {
  padding: 10px 0;
}
.knob {
  border-radius: 3px;
  padding: 20px;
  background-color: #2c2d2f;
  margin: 0 10px 10px 0;
}
.knob.style1 .dial-grip {
  height: 72px;
  width: 72px;
  border: 6px solid #181b1c;
}
.knob.style1 .dial-grip::after {
  position: absolute;
  top: 5px;
  left: 50%;
  right: ;
  bottom: ;
  height: 10px;
  background-color: #e4e8ea;
}
.knob.style2 .dial-svg {
  stroke-width: 2.5;
}
.knob.style2 .dial-grip {
  height: 60px;
  width: 60px;
  background-color: #888;
}
.knob.style2 .dial-grip::after {
  height: 15px;
  background-color: #2c2d2f;
}
.knob.style3 .dial-svg {
  stroke-width: 2.75;
}
.knob.style3 .dial-grip {
  z-index: 5;
  height: 82px;
  width: 82px;
  transition: 0.3s cubic-bezier(0, 0, 0.24, 1);
}
.knob.style3 .dial-grip::after {
  height: 25px;
  width: 3px;
  border-radius: 4px;
  background-color: currentColor;
}
.knob-active-light {
  position: absolute;
  top: 12px;
  left: 12px;
  right: ;
  bottom: ;
  height: 10px;
  width: 10px;
  border-radius: 100%;
}
.knob-dial {
  height: 100px;
  width: 100px;
  text-align: left !important;
  transition: 0s;
}
.dial-grip {
  border-radius: 100%;
  transition: 0s;
}
.dial-grip::after {
  content: "";
  position: absolute;
  top: 0;
  left: 50%;
  right: ;
  bottom: ;
  width: 2px;
  -webkit-transform: translateX(-50%);
  transform: translateX(-50%);
}
.dial-svg {
  pointer-events: none;
  position: absolute;
  stroke-width: 8;
  stroke-dasharray: 184 184;
}
.dial-svg path {
  transition: 0.3s cubic-bezier(0, 0, 0.24, 1);
}
.knob-label {
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
</style>