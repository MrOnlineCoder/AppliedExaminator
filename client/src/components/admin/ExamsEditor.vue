<template>
  <div class="exams-editor-wrapper">
    <br />
    <div class="text-center">
      <b-button variant="success" size="lg" @click="showCreateUI" v-if="!create_exam.active">
        <b-icon icon="plus" />Create new
      </b-button>
      <div v-if="create_exam.active">
        <h3>Create new exam</h3>
        <b-form @submit.prevent="onExamCreate">
          <b-form-group label="Exam title">
            <b-form-input
              v-model="create_exam.title"
              placeholder="Alpha University, First Term, Programming, 2019-2020"
              required
            />
          </b-form-group>
          <b-button variant="success" type="submit">
            <b-icon icon="plus" />Save
          </b-button>
        </b-form>
      </div>
    </div>
    <div class="exams-editor-current" v-if="currentExam">
      <br />
      <b-card>
        <h3>Exam "{{currentExam.title}}"</h3>
        <small>ID {{ currentExam._id }}</small>
        <br />
        <br />
        <h4>
          Status:
          <b-badge :variant="getExamStatusClass(currentExam.status)">{{currentExam.status}}</b-badge>
          <br />
          <small>
            <span
              v-if="currentExam.status === 'preparing'"
            >Exam in preparation is not visible to participants. You may take any actions required to prepare the exam.</span>
            <span
              v-if="currentExam.status === 'running'"
            >Examination is in process, participants can pass tests and send their submissions.</span>
   
          </small>
        </h4>
        <br />
        <div class="preparing-exam" v-if="currentExam.status === 'preparing'">
          <b-form-group label="Exam testbook:" description="Choose main testbook for this exam.">
            <b-form-select v-model="currentExam.testbook_id">
              <option
                v-for="tb in testbooks"
                :key="tb._id"
                :value="tb._id"
              >{{ tb.title }} ({{tb.category}})</option>
            </b-form-select>
          </b-form-group>
          <b-form-group
            label="Access settings"
            description="Public exams can be viewed from main page. Private exams can be access by exam link."
          >
            <b-form-checkbox v-model="currentExam.public">Is public?</b-form-checkbox>
          </b-form-group>
        </div>

        <div class="running-exam" v-if="currentExam.status === 'running'">
            <p>
                <b-icon icon="reply-fill"/>
                Exam link (for participants):
                 <a :href="examLink">{{examLink}}</a> 
            </p>
           
        </div>

        <hr />
        <b-button-group v-if="currentExam.status === 'preparing'">
          <b-button variant="success" @click="saveChanges">
            <b-icon icon="cloud-upload" />Save changes to exam
          </b-button>
          <b-button variant="primary" @click="runExam">
            <b-icon icon="play-fill" />Save changes and start exam
          </b-button>
        </b-button-group>
      </b-card>
    </div>
    <div class="exams-editor-other">
      <br />
      <table class="table table-hover">
        <thead>
          <th>Exam ID</th>
          <th>Title</th>
          <th>Created at</th>
          <th>Status</th>
          <th>Edit</th>
          <th>Remove</th>
        </thead>
        <tbody>
          <tr v-for="(exam,index) in exams" :key="exam._id">
            <td>
              <small>{{ exam._id }}</small>
            </td>
            <td>{{ exam.title }}</td>
            <td>{{ exam.create_at | formatDatetime }}</td>
            <td>
              <b-badge :variant="getExamStatusClass(exam.status)">{{ exam.status }}</b-badge>
            </td>
            <td>
              <b-button variant="warning" @click="showEditUI(index)">
                <b-icon icon="pencil" />
              </b-button>
            </td>
            <td>
              <b-button variant="danger">
                <b-icon icon="trash-fill" />
              </b-button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      create_exam: {
        active: false,
        title: null
      }
    };
  },
  methods: {
    showCreateUI() {
      this.create_exam.title = null;
      this.create_exam.active = true;
    },
    onExamCreate() {
      this.create_exam.active = false;
      this.$store.dispatch("exams/createExam", this.create_exam.title);
    },

    saveChanges() {
      this.$store.dispatch("exams/saveExam").then(() => {
        this.$store.commit("exams/resetCurrent");
      });
    },

    runExam() {
      if (!this.currentExam.testbook_id) {
        alert("You must set testbook to run an exam!");
        return;
      }

      const yes = confirm(
        "Are you sure? Running exam testbook and settings cannot be modified."
      );

      if (!yes) return;

      this.$store.dispatch("exams/saveExam").then(() => {
        this.$store.dispatch("exams/runExam").then(() => {
          this.$store.commit("exams/resetCurrent");
        });
      });
    },

    getExamStatusClass(status) {
      if (status === "preparing") return "warning";
      if (status === "running") return "primary";
      if (status === "finished") return "success";
    },

    showEditUI(index) {
      this.$store.commit("exams/setCurrent", index);
    }
  },
  mounted() {
    this.$store.dispatch("exams/getAllExams");
  },
  computed: {
    exams() {
      return this.$store.state.exams.exams;
    },
    currentExam() {
      return this.$store.state.exams.current;
    },
    testbooks() {
      return this.$store.state.testbooks.testbooks;
    },

    examLink() {
        if (!this.currentExam) return '';

        const protcol = window.location.protocol;
        const hostname = window.location.hostname;
        const origin = window.location.origin;

        return `${origin}/exam/${this.currentExam._id}`;
    }
  }
};
</script>

<style>
</style>