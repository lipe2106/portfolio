<template>
    <section class="container">
        <h2>Mina tidigare arbetsplatser</h2>
        <div class="table-container">
            <table>
                <thead>
                    <th class="one">Företag:</th>
                    <th class="two">Jobbtitel:</th>
                    <th class="three">Period:</th>
                    <th class="four"></th>
                    <th class="five"></th>
                </thead>
                <tbody>
                    <tr class="menu-item">
                        <td><input v-model="company" type="text" id="input-company" class="input" /></td>
                        <td><input v-model="jobtitle" type="text" id="input-jobtitle" class="input" /></td>
                        <td><input v-model="period" type="text" id="input-period" class="input" /></td>
                        <td v-if="addWorkBtn == true" id="btn-addWork"><input type="submit" value="Lägg till" @click="addWork()" class="addWork-btn btn" id="add-work" style="display:block" /></td>
                        <td v-if="updateWorkBtn == true" id="btn-updateWork"><input type="submit" value="Uppdatera" @click="updateWork()" class="updateWork-btn btn" id="update-work" style="display:block" /></td>
                        <td></td>
                    </tr>
                    <!--Loop through and show work -->
                    <tr v-for="work in work" :work="work" :key="work._id">
                        <td class="company">{{work.company}}</td>
                        <td class="jobtitle">{{work.title}}</td>
                        <td class="period">{{work.period}}</td>
                        <td class="update"><input type="button" @click="getWorkById(work._id)" value="Ändra" class="btn" /></td>
                        <td class="del"><input type="button" @click="deleteWork(work._id)" value="Radera" class="btn" /></td>
                    </tr>
                </tbody>
            </table>
        </div>
        <p v-if="message == true" class="text-danger">Du måste fylla i alla * obligatoriska fält</p>
        <p v-if="saved == true" class="text-success">Jobbet är sparat</p>
        <p v-if="updated == true" class="text-success">Jobbet är uppdaterat</p>
        <p v-if="deleted == true" class="text-success">Jobbet är raderat</p>
    </section>
</template>

<script>

export default {
    data() {
        return {
            work: [],
            company: "",
            jobtitle: "",
            period: "",
            id: "",
            message: false,
            saved: false,
            updated: false,
            deleted: false,
            addWorkBtn: true,
            updateWorkBtn: false
        }
    },
    methods: {
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
        },
        async addWork() {
            //Get saved token
            //const token = localStorage.getItem('token'); 

            //Control if input is correct else show error message. If correct save input in body to post
            if(this.company.length != "" && this.jobtitle.length != "" && this.period.length != "") {
                
                let workBody = {
                    company: this.company,
                    title: this.jobtitle,
                    period: this.period
                };

                //Add work to API
                const resp = await fetch("http://127.0.0.1:3000/work", {
                    method: "POST",
                    headers: {
                        "Accept": "application/json",
                        "Content-type": "application/json",
                        //'Authorization': "Bearer " + token
                    },
                    body: JSON.stringify(workBody)
                });

                const data = await resp.json();

                // Set default values to input fields after posting
                this.company = "",
                this.jobtitle = "",
                this.period = "", 
                this.saved = true,
                this.deleted = false,
                this.updated = false,
                this.message = false
                this.getWork();
            } else {
                this.message = true;
            }
        },
        async getWorkById(id) {
            //Get saved token
            //const token = localStorage.getItem('token'); 
            //Fetch, turn response into json and save in data variable
            const resp = await fetch("http://127.0.0.1:3000/work/" + id, {
                method: "GET",
                headers: {
                    "Accept": "application/json",
                    "Content-type": "application/json"
                    //'Authorization': "Bearer " + token
                }
            });

            const data = await resp.json();

            //Show response in input
            this.company = data['company'],
            this.jobtitle = data['title'],
            this.period = data['period'],
            this.id = data['_id'],
            this.updateWorkBtn = true,
            this.addWorkBtn = false
        },
        async updateWork() {
            //Get saved token
            //const token = localStorage.getItem('token'); 

            let id = this.id;

            //Control if input is correct else show error message. If correct save input in body to post
            if(this.company.length != "" && this.jobtitle.length != "" && this.period.length != "") {
                
                let workBody = {
                    company: this.company,
                    title: this.jobtitle,
                    period: this.period
                };

                //Add work to API
                const resp = await fetch("http://127.0.0.1:3000/work/" + id, {
                    method: "PUT",
                    headers: {
                        "Accept": "application/json",
                        "Content-type": "application/json"
                        //'Authorization': "Bearer " + token
                    },
                    body: JSON.stringify(workBody)
                });

                const data = await resp.json();

                // Set default values to input fields after posting
                this.company = "",
                this.jobtitle = "",
                this.period = "",
                this.updated = true,
                this.saved = false,
                this.deleted = false,
                this.message = false,
                this.updateWorkBtn = false,
                this.addWorkBtn = true,
                this.getWork();
            } 
        },
        async deleteWork(id) {

            //Get saved token
            //const token = localStorage.getItem('token'); 

            //Delete work in database
            const resp = await fetch("http://127.0.0.1:3000/work/" + id, {
            method: "DELETE",
            headers: {
                "Accept": "application/json",
                "Content-type": "application/json"
                //'Authorization': "Bearer " + token
            }
            });
            this.updated = false,
            this.saved = false,
            this.deleted = true,
            this.message = false,
            this.getWork();
        }
    }, mounted() {
        this.getWork();
    }
}
</script>

<style scoped>
  
    .container {
        padding-bottom: 3%;
        width: 100%;
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
        width: 100%;
        font-size: 0.8em;
        cursor: pointer;
    }

    .btn:hover {
        background-color: rgb(198, 198, 198);
    }

    .addWork-btn, .updateWork-btn {
        width: 235%;
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
        padding: 0.5% 1%;
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

    .company {
        width: 15%;
        padding-left: 1%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    .jobtitle {
        width: 20%;
        padding-left: 1%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    .period {
        width: 18%;
        padding-left: 1%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    .update {
        width: 5%;
    }

    .del {
        width: 5%;
    }

    .one {
        width: 15%;
    }

    .two {
        width: 20%;
    }

    .three {
        width: 18%;
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