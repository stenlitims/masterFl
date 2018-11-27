export default {
  data() {
    return {
      changes: {
        count: []
      }
    }
  },

  created() {
    this.clearChenge();
    this.$bus.on(this.$route.params.id, this.send);
    window.routeParam = {name: this.$route.name, params: this.$route.params};
  },

  beforeDestroy() {
    this.$bus.off(this.$route.params.id, this.send);
  },

  methods: {
    clearChenge() {
      this.$store.commit("setChanges", {
        count: []
      });
    },
    setChanges(item) {
      // console.log(item);
      if (!this.$store.state.changes.count.includes(item)) {
        this.changes = this.$store.state.changes;
        this.changes.count.push(item);
        this.$store.commit("setChanges", this.changes);
      }
      // if(!this.$store.state.changes.count.length){
      //   this.changes.count = [];
      // }
    }
  }
}
