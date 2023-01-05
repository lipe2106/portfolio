<template>
    <header>
        <RouterLink to="/portfolio">
            <div class="header-container">
                <div class="img-container">
                    <img src="../assets/jag.jpg" alt="Profilbild" />
                </div>
                <div class="h1-container">
                    <h1>{{ name }}</h1>
                    <h2>{{ title }}</h2>
                </div>
            </div>
        </RouterLink>
    </header>
</template>
<script>

import { RouterLink } from 'vue-router';

    export default {
        data() {
            return {
                title: "",
                name: ""
            }
        },
        components: {
            RouterLink
        },
        props: ['headerChange'], 
        watch: { 
            'headerChange'() { 
                    this.getUserById();
                    }
        },
        methods: {
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

                //Save title as title in input
                this.title = data['title'],
                this.name = data['name']

            },
        }, mounted() {
            this.getUserById();
    }
}
</script>
<style scoped>

@import url('https://fonts.googleapis.com/css2?family=Cinzel&family=Passions+Conflict&display=swap');

.header-container {
    max-width: 1000px;
    margin: auto;
    position: relative;
    padding-top: 2%;
}

header {
    background-color: #E5E5E5;
    height: 250px;
}

.img-container {
    display: block;
    margin-top: 50px;
    width: 100px;
    height: 100px;
    transform: rotate(45deg);
    overflow: hidden;
}

img {
    max-width: 100%;
    transform: rotate(-45deg) scale(1.42);
    width: 100px;
    height: 100px;
}

.h1-container {
    background-color: #E5E5E5;
    position: absolute;
    top: 70px;
    left: 150px;
    width: 61%;
}

h1 {
    font-family: 'Passions Conflict', cursive;
    font-size: 3.5em;
    font-weight: lighter;
    color: gray;
    margin: 0;
}

h2 {
    font-family: 'Cinzel', serif;
    font-size: 1.5em;
    font-weight: lighter;
    color: gray;
    margin: 0;
}

@media (max-width: 768px)
{
    .h1-container {
        top: 40px;
    }

    h2 {
        font-size: 3vw;
    }

    .img-container {
        margin-top: 30px;
    }

    header {
        height: 200px;
    }
} 


@media (max-width: 500px)
{
    .h1-container {
        top: 25px;
        left: 100px;
    }

    h1 {
        font-size: 7vw;
    }

    h2 {
        font-size: 3vw;
    }

    header {
        height: 120px;
    }

    .img-container {
        width: 70px;
        height: 70px;
        margin-top: 15px;
    }

    img {
        width: 70px;
        height: 70px;
    }
} 


</style>