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
      <div class="project-card" v-for="project in projects" :project="project" :key="project._id">
        <img :src="`/img/${ project.image }`"  alt="Bild på projektet" />
        <h3>{{ project.name }}</h3>
        <p>{{ project.description }}</p>
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
          <!--Loop through and show work -->
          <tr v-for="courses in courses" :course="courses" :key="courses._id">
            <td class="one">{{courses.name}}</td>
            <td class="two">{{courses.knowledge}}</td>
            <td class="three"><a :href=" courses.syllabus "><img src="../assets/link.png" alt="Länkikon" class="link" /></a></td>
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
    },
    async getCourses() {

      //Get saved token
      //const token = localStorage.getItem('token'); 

      //Fetch, turn response into json and save in data variable
      const resp = await fetch("http://127.0.0.1:3000/courses/", {
          method: "GET",
          headers: {
              "Accept": "application/json",
              "Content-type": "application/json",
              //'Authorization': "Bearer " + token
          }
      });

      const data = await resp.json();

      //Save response in course array
      this.courses = data;  
    },
    async getUserById() {

      let id = "63a582a8732d6aaaa3550873";
      //Get saved token
      //const token = localStorage.getItem('token'); 
      //Fetch, turn response into json and save in data variable
      const resp = await fetch("http://127.0.0.1:3000/user/" + id, {
          method: "GET",
          headers: {
              "Accept": "application/json",
              "Content-type": "application/json"
              //'Authorization': "Bearer " + token
          }
      });

      const data = await resp.json();

      //Save description and quote
      this.myDesc = data['description'],
      this.myQuote = data['quote']
    },
    async getWork() {

      //Get saved token
      //const token = localStorage.getItem('token'); 

      //Fetch, turn response into json and save in data variable
      const resp = await fetch("http://127.0.0.1:3000/work", {
          method: "GET",
          headers: {
              "Accept": "application/json",
              "Content-type": "application/json",
              //'Authorization': "Bearer " + token
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
  grid-template-columns: auto auto auto auto auto;
}

.project-card {
  background-color: white;
  width: 94%;
  width: 180px;
  margin: 3%;
  text-align: center;
  border: 0.5px solid lightgray;
}

img {
  width: 180px;
  height: 210px;
}

h2, h3 {
  font-family: 'Cinzel', serif;
  font-weight: lighter;
  color: gray;
  font-size: 1em;

}

p, li, blockquote, table {
  font-family: 'Source Sans Pro', sans-serif;
  font-weight: 100;
  color: gray;
  font-size: 0.8em;
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
  padding: 1% 1.5%;
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




</style>
