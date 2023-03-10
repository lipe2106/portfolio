<!--Created by Lina Petersson 2023-->
<template>
  <Header />
  <section>
    <h2>Vem är jag?</h2>
    <div class="user-info">
      <p>{{ myDesc }}</p>
      <blockquote>"{{ myQuote }}"</blockquote>
    </div>
  </section>
  <section>
    <h2>Mina projekt</h2>
    <div class="project-container">
      <!--Loop through projects, print cards as link to project view-->
      <div class="project-card" v-for="project in projects" :project="project" :key="project._id">
        <RouterLink v-if="project.path" :to="{name: `${ project.path }`, params:{id: project._id}}" title="Klicka för mer info">
          <img :src="`/img/${ project.image1 }`"  alt="Bild på projektet" />
          <h3>{{ project.name }}</h3>
          <p class="description">{{ project.description }}</p>
          <p>...</p>
        </RouterLink>
        <div v-else>
          <!--Control if image exists else show default image-->
          <img v-if="project.image1 == undefined" src="../assets/image.png" alt="Bild finns ej" class="undefined" />
          <img v-else :src="`/img/${ project.image1 }`"  alt="Bild på projektet" />
          <h3>{{ project.name }}</h3>
          <p class="description">{{ project.description }}</p>
        </div>
      </div>
    </div>
  </section>
  <section class="course-container">
    <h2>Utbildningen har inkluderat</h2>
    <div class="table-container">
      <table>
        <thead>
          <th class="one">Kurs:</th>
          <th class="two">Inkluderat:</th>
          <th class="three">Kursplan:</th>
        </thead>
        <tbody>
          <!--Loop through and show courses -->
          <tr v-for="courses in courses" :course="courses" :key="courses._id">
            <td class="one">{{courses.name}}</td>
            <td class="two">{{courses.knowledge}}</td>
            <td class="three"><a :href=" courses.syllabus " target="_blank" title="Länk till kursplan"><img src="../assets/link.png" alt="Länkikon" class="link" /></a></td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>

  <section class="work-container">
    <h2>Mina tidigare arbetsplatser</h2>
    <div class="table-container">
      <table>
        <thead>
          <th class="one">Företag:</th>
          <th class="two">Jobbtitel:</th>
          <th class="three">Period:</th>
        </thead>
        <tbody>
          <!--Loop through and show work -->
          <tr v-for="work in work" :work="work" :key="work._id">
            <td class="one">{{work.company}}</td>
            <td class="two">{{work.title}}</td>
            <td class="three">{{work.period}}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>

<script>
import Header from '../components/Header.vue'
import { RouterLink } from 'vue-router';


export default {
  data() {
    return {
      projects: [],
      courses: [],
      work: [],
      myDesc: "",
      myQuote: ""
    }
  },
  components: {
    Header,
    RouterLink
  },
  methods: {
    async getProjects() {

        //Fetch, turn response into json and save in data variable
        const resp = await fetch("http://127.0.0.1:3000/projects/", {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Content-type": "application/json"
            }
        });

        const data = await resp.json();

        //Save response in products array
        this.projects = data;  
    },
    async getCourses() {

      //Fetch, turn response into json and save in data variable
      const resp = await fetch("http://127.0.0.1:3000/courses/", {
          method: "GET",
          headers: {
              "Accept": "application/json",
              "Content-type": "application/json"
          }
      });

      const data = await resp.json();

      //Save response in course array
      this.courses = data;  
    },
    async getUserById() {

      let id = "63a582a8732d6aaaa3550873";

      //Fetch, turn response into json and save in data variable
      const resp = await fetch("http://127.0.0.1:3000/user/" + id, {
          method: "GET",
          headers: {
              "Accept": "application/json",
              "Content-type": "application/json"
          }
      });

      const data = await resp.json();

      //Save description and quote
      this.myDesc = data['description'],
      this.myQuote = data['quote']
    },
    async getWork() {

      //Fetch, turn response into json and save in data variable
      const resp = await fetch("http://127.0.0.1:3000/work", {
          method: "GET",
          headers: {
              "Accept": "application/json",
              "Content-type": "application/json"
          }
      });

      const data = await resp.json();

      //Save response in work array
      this.work = data;  
      }
  },
  mounted() {
    this.getProjects();
    this.getCourses();
    this.getUserById();
    this.getWork();
  }
}
</script>

<style scoped>

@import url('https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@300&display=swap');

.project-container {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  width: 100%;
}

.project-card {
  background-color: white;
  width: 94%;
  max-width: 180px;
  margin: 3%;
  text-align: center;
  border: 0.5px solid lightgray;
}

.undefined {
  width: 100%;
  height: auto;
}

a {
  text-decoration: none;
}

img {
  width: 100%;
  max-width: 180px;
  height: 200px;
}

h2, h3 {
  font-family: 'Cinzel', serif;
  font-weight: lighter;
  color: gray;
  font-size: 1em;
}

.description {
  overflow: hidden;
  padding: 3%;
  height: 75px;
}

p, li, blockquote, table {
  font-family: 'Source Sans Pro', sans-serif;
  font-weight: 100;
  color: rgb(68, 68, 68);
  font-size: 0.8em;
}

.user-info p {
  line-height: 1.4em;
  text-align: justify;
}

ul {
  list-style-type: circle;
  width: 95%;
  margin: auto;
}

li {
  display: inline;
}

.link {
  width: 15px;
  height: 15px;
  margin-right: 10%;
}

.user-info {
  background-color: white;
  padding: 2% 3%;
  border: 0.5px solid lightgray;
}

section {
  margin-bottom: 5%;
}

blockquote {
  background-color: lightgray;
  padding: 1%;
  color: rgb(64, 64, 64);
  text-align: center;
}

.table-container {
    overflow-x: auto;
}

table {
    background-color: white;
    width: 100%;
    border-collapse: collapse;
    border: 0.5px solid lightgray;
    border-bottom: 0.7px solid lightgray;
    table-layout: fixed;
}

thead {
    text-transform: uppercase;
    font-size: 1em;
    text-align: left;
}

th {
    padding: 1% 1%;
    font-weight: 200;
}

td {
    border-bottom: 0.5px solid lightgray;
    padding: 0.5% 1%;
}

.one {
    width: 40%;
    padding-left: 1%;
}

.two {
    width: 45%;
    padding-left: 1%;
}

.three {
    width: 15%;
    padding-left: 1%;
    text-align: right;
}

@media (max-width: 950px) {

  img {
    width: 100%;
    max-width: 180px;
    height: 150px;
  }
}

@media (max-width: 600px) {
  .project-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr 1fr;
    width: 90%;
    margin: auto;
    align-items: center;
  }

  .project-cards {
    width: 100%;
  }

  img {
    height: 200px;
  }
}


</style>
