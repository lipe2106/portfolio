<template>
        <h2>Information</h2>
    <section class="container">
        <table>
            <tr>
                <td>Mitt namn: </td>
                <td><input v-model="myName" type="text" id="my-name" /></td>
                <td v-if="updateInfoBtn == true" id="btn-updateInfo"><input type="submit" value="Uppdatera" @click="updateUserInfo()" class="updateInfo-btn" id="update-info" style="display:block" /></td>
            </tr>
            <tr>
                <td>Beskrivning av mig: </td>
                <td><input v-model="myDesc" type="text" id="my-desc" /></td>
                <td v-if="updateInfoBtn == true" id="btn-updateInfo"><input type="submit" value="Uppdatera" @click="updateUserInfo()" class="updateInfo-btn" id="update-info" style="display:block" /></td>
            </tr>
            <tr>
                <td>Citat: </td>
                <td><input v-model="myQuote" type="text" id="my-quote" /></td>
                <td v-if="updateInfoBtn == true" id="btn-updateInfo"><input type="submit" value="Uppdatera" @click="updateUserInfo()" class="updateInfo-btn" id="update-info" style="display:block" /></td>
            </tr>
            <tr>
                <td>Titel på portfolio: </td>
                <td><input v-model="myTitle" type="text" id="my-title" /></td>
                <td v-if="updateInfoBtn == true" id="btn-updateInfo"><input type="submit" value="Uppdatera" @click="updateUserInfo()" class="updateInfo-btn" id="update-info" style="display:block" /></td>
            </tr>
        </table>
        <p v-if="message == true" class="text-danger">Du måste fylla i alla * obligatoriska fält</p>
        <p v-if="updated == true" class="text-success">Informationen är uppdaterat</p>
    </section>
</template>

<script>

export default {
    data() {
        return {
            users: [],
            myName: "",
            myDesc: "",
            myQuote: "",
            myTitle: "",
            message: false,
            updated: false,
            updateInfoBtn: false
        }
    },   
    methods: {
        async getUserInfo() {

            //Get saved token
            //const token = localStorage.getItem('token'); 

            //Fetch, turn response into json and save in data variable
            const resp = await fetch("http://127.0.0.1:3000/user/", {
                method: "GET",
                headers: {
                    "Accept": "application/json",
                    "Content-type": "application/json",
                    //'Authorization': "Bearer " + token
                }
            });

            const data = await resp.json();

            //Save response in users array
            this.users = data;  
        },
        async addUserInfo() {
            //Get saved token
            //const token = localStorage.getItem('token'); 

            //Control if input is correct else show error message. If correct save input in body to post
            if(this.myName.length != "" && this.myDesc.length != "" && this.myQuote.length != "" && this.myTitle.length != "") {
                
                let userBody = {
                    name: this.myName,
                    description: this.myDesc,
                    quote: this.myQuote,
                    title: this.myTitle
                };

                //Add user info to API
                const resp = await fetch("http://127.0.0.1:3000/user", {
                    method: "POST",
                    headers: {
                        "Accept": "application/json",
                        "Content-type": "application/json",
                        //'Authorization': "Bearer " + token
                    },
                    body: JSON.stringify(userBody)
                });

                const data = await resp.json();

                // Set default values to input fields after posting
                this.myName = "",
                this.myDesc = "",
                this.myQuote = "", 
                this.myTitle = "",
                this.saved = true,
                this.updated = false,
                this.message = false
                this.getUserInfo();
            } else {
                this.message = true;
            }
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

            //Show response in input
            this.myName = data['name'],
            this.myDesc = data['description'],
            this.myQuote = data['quote'],
            this.myTitle = data['title'],
            this.id = data['_id'],
            this.updateInfoBtn = true,
            this.addInfoBtn = false
        },
        async updateUserInfo() {
            //Get saved token
            //const token = localStorage.getItem('token'); 

            let id = this.id;

            //Control if input is correct else show error message. If correct save input in body to post
            if(this.myName.length != "" && this.myDesc.length != "" && this.myQuote.length != "" && this.myTitle.length != "") {
                
                let userBody = {
                    name: this.myName,
                    description: this.myDesc,
                    quote: this.myQuote,
                    title: this.myTitle
                };

                //Add project to API
                const resp = await fetch("http://127.0.0.1:3000/user/" + id, {
                    method: "PUT",
                    headers: {
                        "Accept": "application/json",
                        "Content-type": "application/json"
                        //'Authorization': "Bearer " + token
                    },
                    body: JSON.stringify(userBody)
                });

                const data = await resp.json();

                // Set default values to input fields after posting
                /*this.myName = data['name'],
                this.myDesc = data['description'],
                this.myQuote = data['quote'],
                this.myTitle = data['title'],*/
                this.updated = true,
                this.saved = false,
                this.message = false,
                this.updateInfoBtn = false,
                this.addInfoBtn = true
                this.getUserById();
            } 
        }
    }, mounted() {
        this.getUserById();
    }
}
</script>

<style scoped>
  
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
    }
</style>