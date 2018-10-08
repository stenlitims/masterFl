<template>
  <div id="app">
    <div class="wrap-v-master">
      <router-view/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
}

body{
  background: #fff;
}


/* width */
.c-sc::-webkit-scrollbar {
  width: 5px;
}

/* Track */
.c-sc::-webkit-scrollbar-track {
  background: #f1f1f1;
}

/* Handle */
.c-sc::-webkit-scrollbar-thumb {
  background: rgb(130,190,177);
}

/* Handle on hover */
.c-sc::-webkit-scrollbar-thumb:hover {
  background: rgb(95,190,170);
}


</style>
