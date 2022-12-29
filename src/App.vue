<template>
  <div class="page-container">
      <div class="content-container">
      <main>
        <RouterView /> <!--Where "subpages" are shown-->
      </main>
    </div>
    <Footer />
  </div>
</template>

<script>
import { RouterView } from 'vue-router'
import Footer from './components/Footer.vue'

export default {
  //Components used
  components: {
    RouterView,
    Footer
  }
}
</script>

<style scoped>

  .page-container {
    position: relative;
    min-height: 100vh;
    background-color: #E5E5E5;
  }

  .content-container {
    width: 80%;
    max-width: 1000px;
    margin: auto;
    position: relative;
  }

  main {
      width: 100%;
      padding-bottom: 20%;
  }

 

</style>
