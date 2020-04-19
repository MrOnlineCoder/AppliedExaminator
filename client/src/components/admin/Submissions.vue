<template>
  <div class="submissions-wrapper">
      <div>
          <div class="form-group">
              Filter by exam:
              <select class="form-control" v-model="filter">
                  <option :value="null">--- no filter ---</option>
                  <option :value="exam._id" v-for="exam in exams" :key="exam._id">
                      {{ exam.title }}
                  </option>
              </select>
          </div>
      </div>
      <table class="table table-hover">
          <thead>
              <th>Exam</th>
              <th>Participant</th>
              <th>Date</th>
              <th>Score</th>
              <th>Result</th>
              <th>View</th>
          </thead>
          <tbody>
              <tr v-for="item in filteredList" :key="item._id">
                  <td>{{ getExamTitle(item.exam_id) }}</td>
                  <td>{{ item.participant }}</td>
                  <td>{{ item.created_at | formatDatetime }}</td>
                  <td>{{ item.score }} / {{item.max_score}}</td>
                  <td>
                      <b :class="getColorClass(item.score, item.max_score)">
                          {{toPercent(item.score, item.max_score)}}%
                      </b>
                  </td>
                  <td>
                      <b-button variant="primary">
                        <b-icon icon="eye-fill"></b-icon>
                      </b-button>
                  </td>
              </tr>
          </tbody>
      </table>
  </div>
</template>

<script>
import SubmissionsAPI from '@/api/submissions'

export default {
    data() {
        return {
            list: [],

            filter: null
        }
    },
    methods: {
        fetchData() {
            SubmissionsAPI.getAll().then(data => {
                this.list = data.submissions;
            }).catch(error => {
                console.error(error);
            }); 
        },
        toPercent(value, max_value) {
            return Math.round(100 * value / max_value);
        },
        getColorClass(value, max_value) {
            const percent = this.toPercent(value, max_value);

            if (percent < 30) return 'text-danger';
            if (percent >= 30 && percent <= 75) return 'text-warning';
            if (percent > 75) return 'text-success';
        },
        getExamTitle(id) {
            return this.$store.getters['exams/getById'](id).title;
        }
    },
    computed: {
        exams() {
            return this.$store.state.exams.exams;
        },
        filteredList() {
            if (!this.filter) return this.list;

            return this.list.filter(e => e.exam_id == this.filter);
        }
    },
    mounted() {
        this.fetchData();
    }
}
</script>

<style scoped>

</style>