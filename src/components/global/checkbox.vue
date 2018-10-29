<template>
<div class="checkbox checkbox-custom">
    <input
    :id="'checkbox_'+ id"
     type="checkbox" 
    @change="$emit('change', $event.target.checked)"
    v-model="val" :checked="val">
    <label :for="'checkbox_'+ id">
        {{title}}
    </label>
</div>
</template>

<script>


export default {
  name: "checkbox",
  props: ["val", "title"],
  data() {
    return {
      id: 123,
    };
  },
created(){
  this.id = Math.random() * (9999 - 1) + 1;
},
  mounted() {},
  computed: {},
  methods: {
  
  }
};
</script>

<style lang="scss">
</style>
