<template>
  <div>
    <h3 v-if="loading">
      <b-icon icon="clock" />Loading...
    </h3>

    <div v-if="!loading">
      <h3>Public Exams</h3>
      <hr>
      <b-alert variant="primary" :show="!exams.length">
        Currently, there are no running public exams ;)
      </b-alert>
      <div class="public-exam-block" v-for="exam in exams" :key="exam._id">
        <b-card :title="exam.title">
          <b-card-text>
            <b-icon icon="play"></b-icon>Start time:
            <b>{{exam.started_at | formatDatetime }}</b>
            <hr />
            <router-link :to="`/exam/${exam._id}`">
              <b-button variant="primary">
                <b-icon icon="box-arrow-right"></b-icon>Enter
              </b-button>
            </router-link>
          </b-card-text>
        </b-card>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: true
    };
  },
  methods: {},
  mounted() {
    this.$store.dispatch("exams/getPublicExams").then(() => {
      this.loading = false;
    });
  },
  computed: {
    exams() {
      return this.$store.state.exams.exams;
    }
  }
};
</script>

<style>
</style>