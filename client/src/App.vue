<template>
  <div id="app" class="container">
    <TheNavbar />
    <div class="app-content">
      <br>
      <router-view/>
    </div>
    <TheFooter />
  </div>
</template>

<style scoped>
.app-content {
}
</style>

<script>
import TheNavbar from '@/components/TheNavbar.vue'
import TheFooter from '@/components/TheFooter.vue'

export default {
  components: {
    TheNavbar,
    TheFooter
  }
}
</script>
