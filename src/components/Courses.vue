<template>
    <h2>Mina lästa kurser</h2>
    <section class="container">
        <table>
            <thead>
                <th>Kursnamn:</th>
                <th>Kompetens:</th>
                <th>Kursplan:</th>
            </thead>
            <tbody>
                <tr class="menu-item">
                    <td><input v-model="course" type="text" id="input-course" /></td>
                    <td><input v-model="knowledge" type="text" id="input-knowledge" /></td>
                    <td><input v-model="syllabus" type="text" id="input-syllabus" /></td>
                    <td v-if="addCourseBtn == true" id="btn-addCourse"><input type="submit" value="Lägg till" @click="addCourse()" class="addCourse-btn" id="add-course" style="display:block" /></td>
                    <td v-if="updateCourseBtn == true" id="btn-updateCourse"><input type="submit" value="Uppdatera" @click="updateCourse()" class="updateCourse-btn" id="update-course" style="display:block" /></td>
                    <td></td>
                </tr>
                <!--Loop through and show courses -->
                <tr v-for="course in courses" :course="course" :key="course._id">
                    <td class="course">{{course.name}}</td>
                    <td class="knowledge">{{course.knowledge}}</td>
                    <td class="syllabus">{{course.syllabus}}</td>
                    <td class="update"><input type="button" @click="getCourseById(course._id)" value="Ändra" /></td>
                    <td class="del"><input type="button" @click="deleteCourse(course._id)" value="Radera" /></td>
                </tr>
            </tbody>
        </table>
        <p v-if="message == true" class="text-danger">Du måste fylla i alla * obligatoriska fält</p>
        <p v-if="saved == true" class="text-success">Kursen är sparad</p>
        <p v-if="updated == true" class="text-success">Kursen är uppdaterad</p>
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
            addCourseBtn: true,
            updateCourseBtn: false
        }
    },
    methods: {
        async getCourses() {

            //Get saved token
            //const token = localStorage.getItem('token'); 

            //Fetch, turn response into json and save in data variable
            const resp = await fetch("http://127.0.0.1:3000/courses/", {
                method: "GET",
                headers: {
                    "Accept": "application/json",
                    "Content-type": "application/json",
                    //'Authorization': "Bearer " + token
                }
            });

            const data = await resp.json();

            //Save response in products array
            this.courses = data;  
        },
        async addCourse() {
            //Get saved token
            //const token = localStorage.getItem('token'); 

            //Control if input is correct else show error message. If correct save input in body to post
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
                        "Content-type": "application/json",
                        //'Authorization': "Bearer " + token
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
                this.message = false
                this.getCourses();
            } else {
                this.message = true;
            }
        },
        async getCourseById(id) {
            //Get saved token
            //const token = localStorage.getItem('token'); 
            //Fetch, turn response into json and save in data variable
            const resp = await fetch("http://127.0.0.1:3000/courses/" + id, {
                method: "GET",
                headers: {
                    "Accept": "application/json",
                    "Content-type": "application/json"
                    //'Authorization': "Bearer " + token
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
            //Get saved token
            //const token = localStorage.getItem('token'); 

            let id = this.id;

            //Control if input is correct else show error message. If correct save input in body to post
            if(this.course.length != "" && this.knowledge.length != "" && this.syllabus.length != "") {
                
                let courseBody = {
                    name: this.course,
                    knowledge: this.knowledge,
                    syllabus: this.syllabus
                };

                //Add project to API
                const resp = await fetch("http://127.0.0.1:3000/courses/" + id, {
                    method: "PUT",
                    headers: {
                        "Accept": "application/json",
                        "Content-type": "application/json"
                        //'Authorization': "Bearer " + token
                    },
                    body: JSON.stringify(courseBody)
                });

                const data = await resp.json();

                // Set default values to input fields after posting
                this.course = "",
                this.knowledge = "",
                this.syllabus = "",
                this.updated = true,
                this.saved = false,
                this.message = false,
                this.updateCourseBtn = false,
                this.addCourseBtn = true,
                this.getCourses();
            } 
        },
        async deleteCourse(id) {

            //Get saved token
            //const token = localStorage.getItem('token'); 

            //Delete course in database
            const resp = await fetch("http://127.0.0.1:3000/courses/" + id, {
            method: "DELETE",
            headers: {
                "Accept": "application/json",
                "Content-type": "application/json"
                //'Authorization': "Bearer " + token
            }
            });
            this.getCourses();
        }
    }, mounted() {
        this.getCourses();
    }
}
</script>

<style scoped>
  
    .container {
        margin-top: 10%;
        padding-bottom: 15%;
        width: 100%;
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
        background-color: rgb(255, 217, 1);
    }

</style>