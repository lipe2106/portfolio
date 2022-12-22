<template>
    <tbody>
        <!--Show projects name, description and link in table row-->
        <tr>
            <td class="name">{{project.name}}</td>
            <td class="desc">{{project.description}}</td>
            <td class="link">{{project.link}}</td>
            <td class="del"><input type="button" @click="deleteProject(project._id)" value="Radera" /></td>
        </tr>
    </tbody>
</template>

<script>
import { RouterLink } from 'vue-router';

    export default {
        //Declare recieving project object from AdminView
        props: {
            project: Object
        },
        emits: ["projectDeleted"], //Declare emits used
        methods: {
            async deleteProject(id) {

            //Get saved token
            //const token = localStorage.getItem('token'); 

            //Delete product in database
            const resp = await fetch("http://127.0.0.1:5000/projects/" + id, {
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