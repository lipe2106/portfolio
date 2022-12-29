<template>
    <header>
        <div class="header-container">
            <div class="h1-container">
                <h1>ADMIN</h1>
                <h2>{{ name }}</h2>
                <h3>{{ title }}</h3>
            </div>
        </div>
    </header>
</template>
<script>
    export default {
        data() {
            return {
                title: "",
                name: ""
            }
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
    height: 300px;
}

img {
    width: 300px;
    height: 300px;
    border-radius: 30% 70% 70% 30% / 50% 50% 50% 50%;
    border: 1.8px solid gray;
}

.h1-container {
    background-color: #E5E5E5;
    position: absolute;
    top: 50px;
    left: 0;
}

h1 {
    font-family: 'Cinzel', serif;
}

h2 {
    font-family: 'Passions Conflict', cursive;
    font-size: 3.5em;
    font-weight: lighter;
    color: gray;
    margin: 0;
}

h3 {
    font-family: 'Cinzel', serif;
    font-size: 1.5em;
    font-weight: lighter;
    color: gray;
    margin: 0;
}

@media (max-width: 750px)
{
    .h1-container {
        top: 20px;
    }

    header {
        height: 220px;
    }
} 

@media (max-width: 500px)
{
    .h1-container {
        top: 10px;
    }

    h1, h3 {
        font-size: 5vw;
    }

    h2 {
        font-size: 10vw;
    }

    header {
        height: 150px;
    }
} 

</style>