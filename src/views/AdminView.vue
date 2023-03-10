<!--Created by Lina Petersson 2023-->
<template>
    <AdminHeader :headerChange="headerChange" />
    <Info @infoUpdated="updateHeader"  />
    <section class="container">
        <h2>Mina projekt</h2>
        <div class="table-container">
            <table>
                <thead>
                    <th class="one">Namn:</th>
                    <th class="two">Beskrivning:</th>
                    <th class="three">Länk:</th>
                    <th class="four"></th>
                    <th class="five"></th>
                </thead>
                <tbody>
                    <tr class="add-item">
                        <td class="one"><input v-model="name" type="text" id="input-name" class="input" /></td>
                        <td class="two"><input v-model="desc" type="text" id="input-desc" class="input" /></td>
                        <td class="three"><input v-model="link" type="text" id="input-link" class="input" /></td>
                        <td v-if="addBtn == true" id="btn-add" class="four"><input type="submit" value="Lägg till" @click="addProject()" class="add-btn btn" id="add-project" style="display:block" /></td>
                        <td v-if="updateBtn == true" id="btn-update" class="five"><input type="submit" value="Uppdatera" @click="updateProject()" class="update-btn btn" id="update-project" style="display:block" /></td>
                        <td></td>
                    </tr>
                    <!--Loop through and show projects -->
                    <Project @projectDeleted="getProjects()" @updateProject="getProjectById" v-for="project in projects" :project="project" :key="project._id" /> 
                </tbody>
            </table>
        </div>
        <p v-if="message == true" class="text-danger">Du måste fylla i alla * obligatoriska fält</p>
        <p v-if="saved == true" class="text-success">Projektet är sparat</p>
        <p v-if="updated == true" class="text-success">Projektet är uppdaterat</p>
    </section>
    <Courses />
    <Work />
</template>

<script>
import Project from '../components/Project.vue'
import Info from '../components/Info.vue'
import Courses from '../components/Courses.vue'
import AdminHeader from '../components/AdminHeader.vue'
import Work from '../components/Work.vue'

export default {
    data() {
        return {
            projects: [],
            name: "",
            desc: "",
            link: "",
            id: "",
            headerChange: {},
            message: false,
            saved: false,
            updated: false,
            addBtn: true,
            updateBtn: false
        }
    },
    components: {
        Project,
        Info,
        Courses,
        AdminHeader,
        Work
    },    
    methods: {
        async getProjects() {

            this.name = "",
            this.desc = "",
            this.link = "",
            this.addBtn = true,
            this.updateBtn = false

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
        async addProject() {

            //Control if input is correct. If correct save input in body to post
            if(this.name.length != "" && this.desc.length != "" && this.link.length != "") {
                
                let projectBody = {
                    name: this.name,
                    description: this.desc,
                    link: this.link
                };

                //Add product to API
                const resp = await fetch("http://127.0.0.1:3000/projects", {
                    method: "POST",
                    headers: {
                        "Accept": "application/json",
                        "Content-type": "application/json"
                    },
                    body: JSON.stringify(projectBody)
                });

                const data = await resp.json();

                // Set default values to input fields after posting
                this.name = "",
                this.desc = "",
                this.link = "", 
                this.saved = true,
                this.updated = false,
                this.message = false
                this.getProjects();
            } else {
                this.message = true;
            }
        },
        async getProjectById(id) {

            //Fetch, turn response into json and save in data variable
            const resp = await fetch("http://127.0.0.1:3000/projects/" + id, {
                method: "GET",
                headers: {
                    "Accept": "application/json",
                    "Content-type": "application/json"
                }
            });

            const data = await resp.json();

            //Show response in input
            this.name = data['name'],
            this.desc = data['description'],
            this.link = data['link'],
            this.id = data['_id'],
            this.updateBtn = true,
            this.addBtn = false
        },
        async updateProject() {

            let id = this.id;

            //Control if input is correct. If correct save input in body to post
            if(this.name.length != "" && this.desc.length != "" && this.link.length != "") {
                
                let projectBody = {
                    name: this.name,
                    description: this.desc,
                    link: this.link
                };

                //Add project to API
                const resp = await fetch("http://127.0.0.1:3000/projects/" + id, {
                    method: "PUT",
                    headers: {
                        "Accept": "application/json",
                        "Content-type": "application/json"
                    },
                    body: JSON.stringify(projectBody)
                });

                const data = await resp.json();

                // Set default values to input fields after posting
                this.name = "",
                this.desc = "",
                this.link = "",
                this.updated = true,
                this.saved = false,
                this.message = false,
                this.updateBtn = false,
                this.addBtn = true,
                this.getProjects();
            } 
        },
        updateHeader(userBody) {
            this.headerChange = userBody ;
        }
    }, mounted() {
        this.getProjects();
    }
}
</script>

<style scoped>
  
    .container {
        margin-top: 3%;
        margin-bottom: 5%;
    }

    h2 {
        font-family: 'Cinzel', serif;
        font-size: 1.2em;
        margin-bottom: 0%;
    }

    .btn {
        background-color: rgb(235, 235, 235);
        border: 1px solid gray;
        padding: 1.5% 3%;
        border-radius: 0%;
        height: 22px;
        margin-left: 20%;
        width: 190%;
        font-size: 0.8em;
        cursor: pointer;
    }

    .btn:hover {
        background-color: rgb(198, 198, 198);
    }

    .table-container {
        overflow-x: auto;
    }

    table {
        background-color: white;
        width: 100%;
        border-collapse: collapse;
        border: 0.5px solid gray;
        border-bottom: 0.7px solid gray;
        table-layout: fixed;
    }

    thead {
        text-transform: uppercase;
        font-size: 0.8em;
        text-align: left;
    }

    th {
        padding: 1% 1%;
        font-weight: 200;
    }

    td {
        border-bottom: 0.5px solid lightgray;
        padding: 0.5%;
    }

    .input {
        width: 95%;
        border-radius: 0%;
        border: 0.5px solid gray;
        height: 20px;
        padding-left: 2%;
        color: black;
        font-family: 'Source Sans Pro', sans-serif;
    }

    .one {
        width: 10%;
        padding-left: 1%;
    }

    .two {
        width: 25%;
    }

    .three {
        width: 18%;
        padding-left: 1%;
    }

    .four {
        width: 5%;
    }

    .five {
        width: 5%;
    }

    tr {
        font-family: 'Source Sans Pro', sans-serif;
        font-weight: 100;
        color: rgb(68, 68, 68);
        font-size: 0.8em;
    }


    @media (max-width: 850px)
    {
        .btn {
            font-size: 0.6em;
        }
    } 

    @media (max-width: 750px)
    {
        table {
            width: 700px;
        }
    } 
</style>