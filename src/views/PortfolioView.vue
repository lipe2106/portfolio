<template>
  <Header />
  <section class="project-container">
  <div class="project-card" v-for="project in projects" :project="project" :key="project._id">
    <img :src="`/img/${ project.image }`"  alt="Bild på projektet" />
    <h2>{{ project.name }}</h2>
    <p>{{ project.description }}</p>
    <p>{{ project.image }}</p>
  </div>
  </section>
</template>

<script>
import Header from '../components/Header.vue'

export default {
  data() {
    return {
      projects: []
    }
  },
  components: {
    Header
  },
  methods: {
    async getProjects() {

        //Get saved token
        //const token = localStorage.getItem('token'); 

        //Fetch, turn response into json and save in data variable
        const resp = await fetch("http://127.0.0.1:3000/projects/", {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Content-type": "application/json",
                //'Authorization': "Bearer " + token
            }
        });

        const data = await resp.json();

        //Save response in products array
        this.projects = data;  
    }
  },
  mounted() {
    this.getProjects();
  }
}
</script>

<style scoped>

@import url('https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@300&display=swap');

.project-container {
  display: grid;
  grid-template-columns: auto auto auto auto auto;
}

.project-card {
  background-color: white;
  width: 94%;
  max-width: 200px;
  margin: 3%;
  text-align: center;
  border: 0.5px solid lightgray;
}

img {
  width: 180px;
}

h2 {
  font-family: 'Cinzel', serif;
  font-weight: lighter;
  color: gray;
  font-size: 1em;

}

p {
  font-family: 'Source Sans Pro', sans-serif;
  font-weight: 100;
  color: gray;
  font-size: 0.8em;

}

</style>
