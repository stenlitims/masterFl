export default {
  data() {
    return {

    }
  },

  created() {
    this.clearChenge();
    this.$bus.on(this.$route.params.id, this.send);
    window.routeParam = {
      name: this.$route.name,
      params: this.$route.params
    };
  },

  beforeDestroy() {
    this.$bus.off(this.$route.params.id, this.send);
  },

  methods: {
    
  }
}
