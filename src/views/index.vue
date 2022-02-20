<template>

  <div class="d-flex">
    <transition-group tag="div" name="zoom" class="thetext">
        <p v-for="(t, i) in text" :key="i"> {{t}}</p>
    </transition-group>
  </div>

</template>

<style lang="scss" scoped>
  .thetext{
    color: #fff;
    position: absolute;
    left: 0;
    text-align: center;
    right: 0;
    bottom: 15%;
    font-family: cursive;
  }
</style>

<script>
export default {
  data(){
    return {
      text:[]
    }
  },
  mounted(){
    (["Think for your self.", "Question Authority"]).forEach((t,i) => {
      setTimeout(()=>{this.text.push(t)}, 1000* (i+1));
    });
    
  }
}
</script>



