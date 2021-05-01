<template>
<div id="back">
    <login></login>
</div> 
</template>

<script>
import login from '../components/login.vue'
export default {
  components: { login },
    
}
</script>

<style>
#back{
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url("../resources/Recurso1.png");
  background-size: cover;
}
</style>