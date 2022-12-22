<template>
    <h2>Mina projekt</h2>
    <section class="container">
        <table>
            <thead>
                <th>Namn:</th>
                <th>Beskrivning:</th>
                <th>Länk:</th>
            </thead>
                <!--Loop through and show projects -->
                <Project @projectDeleted="getProjects()" v-for="project in projects" :project="project" :key="project._id" /> 
            </table>
    </section>
</template>

<script>
import Project from '../components/Project.vue'

export default {
    data() {
        return {
            projects: [],
        }
    },
    components: {
        Project
    },    
    methods: {
        async getProjects() {

            //Get saved token
            //const token = localStorage.getItem('token'); 

            //Fetch, turn response into json and save in data variable
            const resp = await fetch("http://127.0.0.1:5000/projects/", {
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
    }, mounted() {
        this.getProjects();
    }
}
</script>

<style scoped>
    
    h2 {
        text-align: center;
        position: absolute;
        top: 60px;
        left: 180px;
    }
    .container {
        margin-top: 10%;
        padding-bottom: 15%;
    }
    .btn {
        background-color: #EFEEEE;
        border: 0.5px solid #C4C4C4;
    }

    table {
        background-color: #EFEEEE;
        width: 100%;
        margin-top: 5%;
        margin-bottom: 20%;
    }

    thead {
        background-color: #E5E5E5;
    }

    th {
        padding: 0.5% 1%;
        font-weight: 600;
    }

    @media (min-width: 750px) and (max-width: 991px) {
        .container {
            width: 70%;
            margin-top: 7%;
        }
    }

    @media (min-width: 992px) {
        .container {
            margin-top: 0%;
            width: 80%;
            max-width: 992px;
        }

        h2 {
            text-align: center;
            position: absolute;
            top: 80px;
            left: 400px;
        }
    }
</style>