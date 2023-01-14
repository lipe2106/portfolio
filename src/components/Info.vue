<!--Created by Lina Petersson 2023-->
<template>
    <section class="container">
        <h2>Information i portfolion</h2>
        <div class="table-container">
            <table>
                <tr>
                    <td class="one">Mitt namn: </td>
                    <td class="two"><input v-model="myName" type="text" id="my-name" class="input" /></td>
                    <td class="three"><input type="submit" value="Uppdatera" @click="updateUserInfo()" class="updateBtn btn" style="display:block" /></td>
                </tr>
                <tr>
                    <td class="one">Om mig: </td>
                    <td class="two"><input v-model="myDesc" type="text" id="my-desc" class="input" /></td>
                    <td class="three"><input type="submit" value="Uppdatera" @click="updateUserInfo()" class="btn" style="display:block" /></td>
                </tr>
                <tr>
                    <td class="one">Citat: </td>
                    <td class="two"><input v-model="myQuote" type="text" id="my-quote" class="input" /></td>
                    <td class="three"><input type="submit" value="Uppdatera" @click="updateUserInfo()" class="btn" style="display:block" /></td>
                </tr>
                <tr>
                    <td class="one">Titel [portfolio]: </td>
                    <td class="two"><input v-model="myTitle" type="text" id="my-title" class="input" /></td>
                    <td class="three"><input type="submit" value="Uppdatera" @click="updateUserInfo()" class="btn" style="display:block" /></td>
                </tr>
            </table>
        </div>
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
            updated: false
        }
    },
    emits: [ 'infoUpdated'],
    methods: {
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

            //Show response in input
            this.myName = data['name'],
            this.myDesc = data['description'],
            this.myQuote = data['quote'],
            this.myTitle = data['title'],
            this.id = data['_id']
        },
        async updateUserInfo() {

            let id = this.id;

            //Control if input is correct. If correct save input in body to post
            if(this.myName.length != "" && this.myDesc.length != "" && this.myQuote.length != "" && this.myTitle.length != "") {
                
                let userBody = {
                    name: this.myName,
                    description: this.myDesc,
                    quote: this.myQuote,
                    title: this.myTitle
                };

                //Add info to API
                const resp = await fetch("http://127.0.0.1:3000/user/" + id, {
                    method: "PUT",
                    headers: {
                        "Accept": "application/json",
                        "Content-type": "application/json"
                    },
                    body: JSON.stringify(userBody)
                });

                const data = await resp.json();

                // Set default values to input fields after posting
                this.updated = true,
                this.saved = false,
                this.message = false,
                this.getUserById();
                this.$emit('infoUpdated', userBody);
            } 
        }
    }, mounted() {
        this.getUserById();
    }
}
</script>

<style scoped>
  
    .container {
        margin-top: 1%;
        padding-bottom: 1%;
    }

    h2 {
        font-family: 'Cinzel', serif;
        font-size: 1.2em;
        margin-bottom: 0%;
    }
    .btn {
        background-color: rgb(235, 235, 235);
        border: 1px solid gray;
        padding: 1.5%;
        border-radius: 0%;
        height: 22px;
        margin-right: 0%;
        width: 95%;
        font-size: 0.6em;
        cursor: pointer;
    }

    .btn:hover {
        background-color: rgb(198, 198, 198);
    }

    .updateBtn {
        color: black;
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
    }

    td {
        padding: 0.5%;
        border-bottom: 0.5px solid lightgray;
    }

    .one {
        width: 20%;
        text-transform: uppercase;
        font-size: 0.8em;
        padding-left: 1.5%;
    }

    .two {
        width: 70%;
    }

    .input {
        width: 90%;
        border-radius: 0%;
        border: 0.5px solid gray;
        height: 20px;
        padding-left: 2%;
        font-family: 'Source Sans Pro', sans-serif;
        font-weight: 100;
        color: rgb(68, 68, 68);
        font-size: 0.8em;
        overflow: hidden;
        text-overflow: ellipsis;
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