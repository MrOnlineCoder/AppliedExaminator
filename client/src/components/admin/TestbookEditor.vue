<template>
  <div>
    <br />
    <h2>Testbook "{{testbook.title}}"</h2>
    <hr />
    <p>
      <b>Hint:</b> you can use
      <a
        href="https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet"
      >Markdown</a> in questions.
    </p>
    <div
      class="testbook-question"
      v-for="(question,index) in testbook.questions"
      :key="question._id"
    >
      <b-card :title="`Question #${index+1}`">
        <b-card-text>
          <div v-if="!preview">
            <b-form-group label="Task">
              <b-form-textarea v-model="question.task" placeholder="Question content" rows="5"></b-form-textarea>
            </b-form-group>

            <b-form-group label="Answers">
              <table class="table table-hover">
                <thead>
                  <th>No.</th>
                  <th>Answer</th>
                  <th>Is correct?</th>
                  <th>Remove</th>
                </thead>
                <tbody>
                    <tr v-for="(answer,ans_index) in question.answers" :key="ans_index">
                        <td>{{ans_index+1}}</td>
                        <td>
                            <b-form-input v-model="question.answers[ans_index]" placeholder="Answer Text">

                            </b-form-input>
                        </td>
                        <td>
                            <b-form-radio v-model="question.correct" :value="answer">
                                {{ question.correct == answer ? 'Yes' : 'No'}}
                            </b-form-radio>
                        </td>
                        <td>
                            <b-button variant="danger">
                                <b-icon icon="x"/>
                            </b-button>
                        </td>
                    </tr>
                    <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td>
                            <b-button variant="success" @click="onAddAnswer(index)">
                                <b-icon icon="plus"></b-icon>
                            </b-button>
                        </td>
                    </tr>
                </tbody>
              </table>
            </b-form-group>
          </div>

            <div class="question-preview" v-if="preview">
                <div v-html="renderMarkdown(question.task)" ></div>
                <small>Choose one answer:</small>
                <b-form-radio-group :options="question.answers" stacked/>
            </div>
          
        </b-card-text>

        <div class="row">
          <div class="col-6">
            <b-button variant="danger" @click="onRemoveQuestion(index)">
              <b-icon icon="trash-fill"></b-icon>Delete question
            </b-button>
          </div>
          <div class="col-6 text-right">
            <b-form-checkbox v-model="preview">Preview</b-form-checkbox>
          </div>
        </div>
      </b-card>
    </div>
    <br />
    <div>
      <b-button variant="success" @click="onAddQuestion">
        <b-icon icon="plus" />Add question
      </b-button>
      <br>
      <br>
      <b-button variant="primary" @click="onSave">
          <b-icon icon="cloud-upload"/> Save changes to testbook and return
      </b-button>
      <br>
      <br>
      <b-button variant="warning" @click="onDiscardChanges">
          <b-icon icon="arrow-counterclockwise"/> Discard changes and return
      </b-button>
    </div>
  </div>
</template>

<script>
import marked from "marked";

export default {
  data() {
    return {
      preview: false
    };
  },
  methods: {
    onAddQuestion() {
      this.$store.commit("testbooks/addQuestion");
    },

    onAddAnswer(index) {
        this.$store.commit('testbooks/addAnswer', index);
    },

    onRemoveQuestion(index) {
      this.$store.commit("testbooks/removeQuestion", index);
    },

    onSave() {
        this.$store.dispatch("testbooks/saveTestbook").then(() => {
            this.$emit('return');
        }).catch(error => {
            alert(`Error: couldn't save testbook :( (${error})`);
        });
    },

    onDiscardChanges() {
        this.$emit('return');
    },

    renderMarkdown(raw) {
      if (!raw) return "";
      return marked(raw);
    }
  },
  computed: {
    testbook() {
      return this.$store.state.testbooks.current;
    }
  }
};
</script>

<style scoped>
.testbook-question {
  margin-top: 15px;
}
</style>