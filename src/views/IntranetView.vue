<template>
    <Header />
    <section>
    <h2>{{ name }}</h2>
    <div class="project-info">
      <p>{{ desc }}</p>
      <blockquote><img src="../assets/link.png" alt="Länkikon" class="link" />Detta projekt är tyvärr inte publicerat</blockquote>
    </div>
    </section>
    <section>
        <h3>Projektbilder</h3>
        <div class="project-container">
            <div class="project-card">
                <a :href="`/img/${ image1 }`"><img :src="`/img/${ image1 }`"  alt="Bild på projektet" /></a>
                <p>Startsida desktop</p>
            </div>
            <div class="project-card">
                <a :href="`/img/${ image2 }`"><img :src="`/img/${ image2 }`"  alt="Bild på projektet" /></a>
                <p>Undersida för lagersaldo</p>
            </div>
            <div class="project-card">
                <a :href="`/img/${ image3 }`"><img :src="`/img/${ image3 }`"  alt="Bild på projektet" /></a>
                <p>Sökfunktion</p>
            </div>
            <div class="project-card">
                <a :href="`/img/${ image4 }`"><img :src="`/img/${ image4 }`"  alt="Bild på projektet" /></a>
                <p>Hantering av kategorier</p>
            </div>
            <div class="project-card">
                <a :href="`/img/${ image5 }`"><img :src="`/img/${ image5 }`"  alt="Bild på projektet" /></a>
                <p>Produktsida</p>
            </div>
        </div>
    </section>
</template>

<script>

import Header from '../components/Header.vue'
    export default {
        data() {
            return {
                id: "",
                name: "",
                desc: "",
                image1: "",
                image2: "",
                image3: "",
                image4: "",
                image5: "",
                link: ""
            }
        },
        components: {
            Header
        },
        methods: {
            async getProjectById(id) {

                //Get saved token
                //const token = localStorage.getItem('token'); 
                //Fetch, turn response into json and save in data variable
                const resp = await fetch("http://127.0.0.1:3000/projects/" + id, {
                    method: "GET",
                    headers: {
                        "Accept": "application/json",
                        "Content-type": "application/json"
                        //'Authorization': "Bearer " + token
                    }
                });

                const data = await resp.json();

                //Show response in input
                this.name = data['name'],
                this.desc = data['description'],
                this.image1 = data['image1'],
                this.image2 = data['image2'],
                this.image3 = data['image3'],
                this.image4 = data['image4'],
                this.image5 = data['image5'],
                this.link = data['link']
            },
        },
        mounted() {
            this.getProjectById(this.$route.params.id);
        }
    }
</script>

<style scoped>

h2, h3 {
  font-family: 'Cinzel', serif;
  font-weight: lighter;
  color: gray;
  font-size: 1em;
}

p, blockquote {
  font-family: 'Source Sans Pro', sans-serif;
  font-weight: 100;
  color: gray;
  font-size: 0.8em;
}

.link {
  width: 15px;
  height: 15px;
  margin-bottom: -0.4%;
  margin-right: 0.5%;
}

.project-info {
  background-color: white;
  padding: 2% 3%;
  border: 0.5px solid lightgray;
}

section {
  margin-bottom: 2%;
}

blockquote {
  background-color: lightgray;
  padding: 1%;
  color: rgb(64, 64, 64);
  text-align: center;
}
.project-container {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  width: 100%;
}

.project-card {
  width: 94%;
  max-width: 180px;
  height: 200px;
  margin: 3%;
  text-align: center;
}

img {
  width: 100%;
  max-width: 180px;
  height: 200px;
  margin-bottom: -5%;
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

  .project-card {
    width: 100%;
    padding-bottom: 20%;
  }

  img {
    height: 200px;
  }
}

</style>