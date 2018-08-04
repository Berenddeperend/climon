<template>
  <div class="hello">
    <p>Dit zijn de models:</p>

    <select @change="onSelectModel">
      <option :value="model" v-for="model in models">
        {{model}}
      </option>
    </select>

  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data() {
  	return {
  		models: []
    }
  },
  methods: {
  	getCollections() {
  	  fetch('http://localhost:4000/api/collections')
        .then(res => res.json())
        .then(json => {
	        this.models = json;
        });
    },
    onSelectModel(event) {
  		console.log(event.target.value);
  		this.fetchAllFromCollection(event.target.value);
    },

    fetchAllFromCollection(collection) {
      fetch(`http://localhost:4000/climon/data/${collection}`)
          .then(res => res.json())
          .then(json => {
          	console.log(json);
          });
    }
  },
  mounted() {
    this.getCollections();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
a {
  color: #42b983;
}
</style>
