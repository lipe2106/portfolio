<template>
    <h2>Mina projekt</h2>
    <section class="container">
        <table>
            <thead>
                <th>Namn:</th>
                <th>Beskrivning:</th>
                <th>Länk:</th>
            </thead>
            <tbody>
                <tr class="menu-item">
                    <td><input v-model="name" type="text" id="input-name" /></td>
                    <td><input v-model="desc" type="text" id="input-desc" /></td>
                    <td><input v-model="link" type="text" id="input-link" /></td>
                    <td id="project-btn"><input type="submit" value="Lägg till" @click="addProject()" class="add-btn" id="add-project" style="display:block" /></td>
                    <td></td>
                </tr>
                <!--Loop through and show projects -->
                <Project @projectDeleted="getProjects()" @updateProject="getProjectById" v-for="project in projects" :project="project" :key="project._id" /> 
            </tbody>
        </table>
        <p v-if="message == true" class="text-danger">Du måste fylla i alla * obligatoriska fält</p>
        <p v-if="confirm == true" class="text-success">Produkten är lagrad</p>
    </section>
</template>

<script>
import Project from '../components/Project.vue'

export default {
    data() {
        return {
            projects: [],
            name: "",
            desc: "",
            link: "",
            message: false,
            confirm: false
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
        },
        async addProject() {
            //Get saved token
            //const token = localStorage.getItem('token'); 

            //Control if input is correct else show error message. If correct save input in body to post
            if(this.name.length != "" && this.desc.length != "" && this.link.length != "") {
                
                let projectBody = {
                    name: this.name,
                    description: this.desc,
                    link: this.link
                };

                //Add product to API
                const resp = await fetch("http://127.0.0.1:5000/projects", {
                    method: "POST",
                    headers: {
                        "Accept": "application/json",
                        "Content-type": "application/json",
                        //'Authorization': "Bearer " + token
                    },
                    body: JSON.stringify(projectBody)
                });

                const data = await resp.json();

                // Set default values to input fields after posting
                this.name = "",
                this.desc = "",
                this.link = "", 
                this.confirm = true,
                this.message = false
                this.getProjects();
            } else {
                this.message = true;
            }
        },
        async getProjectById(id) {
            //Get saved token
            //const token = localStorage.getItem('token'); 
            //Fetch, turn response into json and save in data variable
            const resp = await fetch("http://127.0.0.1:5000/projects/" + id, {
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
            this.link = data['link']
        },
        async updateProject(id) {
            //Get saved token
            //const token = localStorage.getItem('token'); 

            //Control if input is correct else show error message. If correct save input in body to post
            if(this.name.length != "" && this.desc.length != "" && this.link.length != "") {
                
                let projectBody = {
                    name: this.name,
                    description: this.desc,
                    link: this.link
                };

                //Add project to API
                const resp = await fetch("http://127.0.0.1:5000/projects/" + id, {
                    method: "PUT",
                    headers: {
                        "Accept": "application/json",
                        "Content-type": "application/json"
                        //'Authorization': "Bearer " + token
                    },
                    body: JSON.stringify(projectBody)
                });

                const data = await resp.json();

                // Set default values to input fields after posting
                this.confirm = true;
                this.message = false
                this.$emit('projectUpdated');

            } 
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