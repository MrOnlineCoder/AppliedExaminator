<template>
  <div class="submissions-wrapper">
      <table class="table table-hover">
          <thead>
              <th>Exam</th>
              <th>Participant</th>
              <th>Date</th>
              <th>Score</th>
              <th>Result</th>
          </thead>
          <tbody>
              <tr v-for="item in list" :key="item._id">
                  <td>{{ item.exam_id }}</td>
                  <td>{{ item.participant }}</td>
                  <td>{{ item.created_at | formatDatetime }}</td>
                  <td>{{ item.score }} / {{item.max_score}}</td>
                  <td>
                      <b :class="getColorClass(item.score, item.max_score)">
                          {{toPercent(item.score, item.max_score)}}%
                      </b>
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
            list: []
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
        }
    },
    mounted() {
        this.fetchData();
    }
}
</script>

<style scoped>

</style>