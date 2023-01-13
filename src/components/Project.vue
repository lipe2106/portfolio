<template>
        <!--Show projects name, description and link in table row-->
        <tr>
            <td class="name">{{project.name}}</td>
            <td class="desc">{{project.description}}</td>
            <td class="link">{{project.link}}</td>
            <td class="update"><input type="button" @click="updateProject(project._id)" value="Ändra" class="btn" /></td>
            <td class="del"><input type="button" @click="deleteProject(project._id)" value="Radera" class="btn delete" /></td>
        </tr>
</template>

<script>
    export default {
        data() {
            return {
                id: ""
            }
        },
        //Declare recieving project object from AdminView
        props: {
            project: Object
        },
        emits: [ //Declare emits used
            "updateProject",
            "projectDeleted"
        ], 
        methods: {
            updateProject(id) {
                this.id = id;
                this.$emit('updateProject', this.id);
            },
            async deleteProject(id) {

            //Get saved token
            //const token = localStorage.getItem('token'); 

            //Delete project in database
            const resp = await fetch("http://127.0.0.1:3000/projects/" + id, {
            method: "DELETE",
            headers: {
                "Accept": "application/json",
                "Content-type": "application/json"
                //'Authorization': "Bearer " + token
            }
            });
            this.$emit('projectDeleted');
            }
        }
    }
</script>

<style scoped>

    td {
        border-bottom: 0.5px solid lightgray;
        padding: 0.5% 1%;
    }

    .name {
        width: 10%;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .desc {
        width: 25%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    .link {
        width: 18%;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .update {
        width: 5%;
    }

    .del {
        width: 5%;
        padding-left: 0%;
    }

    .btn {
        background-color: rgb(235, 235, 235);
        border: 1px solid gray;
        padding: 1.5% 2%;
        border-radius: 0%;
        height: 22px;
        width: 85%;
        margin-left: 15%;
        font-size: 0.8em;
        cursor: pointer;
    }

    .btn:hover {
        background-color: rgb(198, 198, 198);
    }

    @media (max-width: 850px)
    {
        .btn {
            font-size: 0.6em;
        }
    } 

</style>