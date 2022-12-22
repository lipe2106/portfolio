<template>
        <!--Show projects name, description and link in table row-->
        <tr>
            <td class="name">{{project.name}}</td>
            <td class="desc">{{project.description}}</td>
            <td class="link">{{project.link}}</td>
            <td class="update"><input type="button" @click="updateProject(project._id)" value="Ändra" /></td>
            <td class="del"><input type="button" @click="deleteProject(project._id)" value="Radera" /></td>
        </tr>
</template>

<script>
import { RouterLink } from 'vue-router';

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

            //Delete product in database
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

    .name {
        width: 37%;
    }

    .desc {
        width: 20%;
    }

    .link {
        width: 15%;
    }

    tr {
        border: 0.5px solid #C4C4C4;
        border-collapse: collapse;
    }

    td {
        padding: 0.5% 1%;
    }

</style>