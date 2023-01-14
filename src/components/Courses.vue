<!--Created by Lina Petersson 2023-->
<template>
    <section class="container">
        <h2>Mina lästa kurser</h2>
        <div class="table-container">
            <table>
                <thead>
                    <th class="one">Kursnamn:</th>
                    <th class="two">Kompetens:</th>
                    <th class="three">Kursplan:</th>
                    <th class="four"></th>
                    <th class="five"></th>
                </thead>
                <tbody>
                    <tr class="menu-item">
                        <td><input v-model="course" type="text" id="input-course" class="input" /></td>
                        <td><input v-model="knowledge" type="text" id="input-knowledge" class="input" /></td>
                        <td><input v-model="syllabus" type="text" id="input-syllabus" class="input" /></td>
                        <td v-if="addCourseBtn == true" id="btn-addCourse"><input type="submit" value="Lägg till" @click="addCourse()" class="addCourse-btn btn" id="add-course" style="display:block" /></td>
                        <td v-if="updateCourseBtn == true" id="btn-updateCourse"><input type="submit" value="Uppdatera" @click="updateCourse()" class="updateCourse-btn btn" id="update-course" style="display:block" /></td>
                        <td></td>
                    </tr>
                    <!--Loop through and show courses -->
                    <tr v-for="course in courses" :course="course" :key="course._id">
                        <td class="course">{{course.name}}</td>
                        <td class="knowledge">{{course.knowledge}}</td>
                        <td class="syllabus">{{course.syllabus}}</td>
                        <td class="update"><input type="button" @click="getCourseById(course._id)" value="Ändra" class="btn" /></td>
                        <td class="del"><input type="button" @click="deleteCourse(course._id)" value="Radera" class="btn" /></td>
                    </tr>
                </tbody>
            </table>
        </div>
        <p v-if="message == true" class="text-danger">Du måste fylla i alla * obligatoriska fält</p>
        <p v-if="saved == true" class="text-success">Kursen är sparad</p>
        <p v-if="updated == true" class="text-success">Kursen är uppdaterad</p>
        <p v-if="deleted == true" class="text-success">Kursen är raderad</p>
    </section>
</template>

<script>

export default {
    data() {
        return {
            courses: [],
            course: "",
            knowledge: "",
            syllabus: "",
            id: "",
            message: false,
            saved: false,
            updated: false,
            deleted: false,
            addCourseBtn: true,
            updateCourseBtn: false
        }
    },
    methods: {
        async getCourses() {

            //Fetch, turn response into json and save in data variable
            const resp = await fetch("http://127.0.0.1:3000/courses/", {
                method: "GET",
                headers: {
                    "Accept": "application/json",
                    "Content-type": "application/json"
                }
            });

            const data = await resp.json();

            //Save response in course array
            this.courses = data;  
        },
        async addCourse() {

            //Control if input is correct. If correct save input in body to post
            if(this.course.length != "" && this.knowledge.length != "" && this.syllabus.length != "") {
                
                let courseBody = {
                    name: this.course,
                    knowledge: this.knowledge,
                    syllabus: this.syllabus
                };

                //Add course to API
                const resp = await fetch("http://127.0.0.1:3000/courses", {
                    method: "POST",
                    headers: {
                        "Accept": "application/json",
                        "Content-type": "application/json"
                    },
                    body: JSON.stringify(courseBody)
                });

                const data = await resp.json();

                // Set default values to input fields after posting
                this.course = "",
                this.knowledge = "",
                this.syllabus = "", 
                this.saved = true,
                this.updated = false,
                this.message = false,
                this.deleted = false,
                this.getCourses();
            } else {
                this.message = true;
            }
        },
        async getCourseById(id) {

            //Fetch, turn response into json and save in data variable
            const resp = await fetch("http://127.0.0.1:3000/courses/" + id, {
                method: "GET",
                headers: {
                    "Accept": "application/json",
                    "Content-type": "application/json"
                }
            });

            const data = await resp.json();

            //Show response in input
            this.course = data['name'],
            this.knowledge = data['knowledge'],
            this.syllabus = data['syllabus'],
            this.id = data['_id'],
            this.updateCourseBtn = true,
            this.addCourseBtn = false
        },
        async updateCourse() {

            let id = this.id;

            //Control if input is correct. If correct save input in body to post
            if(this.course.length != "" && this.knowledge.length != "" && this.syllabus.length != "") {
                
                let courseBody = {
                    name: this.course,
                    knowledge: this.knowledge,
                    syllabus: this.syllabus
                };

                //Add course to API
                const resp = await fetch("http://127.0.0.1:3000/courses/" + id, {
                    method: "PUT",
                    headers: {
                        "Accept": "application/json",
                        "Content-type": "application/json"
                    },
                    body: JSON.stringify(courseBody)
                });

                const data = await resp.json();

                // Set default values to input fields after posting
                this.course = "",
                this.knowledge = "",
                this.syllabus = "",
                this.updated = true,
                this.deleted = false,
                this.saved = false,
                this.message = false,
                this.updateCourseBtn = false,
                this.addCourseBtn = true,
                this.getCourses();
            } 
        },
        async deleteCourse(id) {

            //Delete course in database
            const resp = await fetch("http://127.0.0.1:3000/courses/" + id, {
            method: "DELETE",
            headers: {
                "Accept": "application/json",
                "Content-type": "application/json"
            }
            });

            this.deleted = true,
            this.updated = false,
            this.saved = false,
            this.message = false,
            this.getCourses();
        }
    }, mounted() {
        this.getCourses();
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

    .addCourse-btn, .updateCourse-btn {
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

    .course {
        width: 15%;
        padding-left: 1%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    .knowledge {
        width: 20%;
        padding-left: 1%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    .syllabus {
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