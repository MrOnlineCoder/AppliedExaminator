<template>
  <div>
      <br>
      <div class="text-center">
          <b-button variant="success" size="lg" @click="showCreateUI" v-if="!create_testbook.active">
              <b-icon icon="plus"></b-icon>
              Create new
          </b-button>

          <div v-if="create_testbook.active">
              <b-form @submit.prevent="onCreateTestbook">
                  <h3>Create new testbook</h3>
                  <b-form-group label="Testbook title:">
                      <b-form-input placeholder="Python, Class basics" v-model="create_testbook.title" required/>
                  </b-form-group>
                  <b-form-group label="Testbook category:">
                      <b-form-input placeholder="Programming, Course 1" v-model="create_testbook.category" required/>
                  </b-form-group>
                  <b-button variant="success" size="lg" type="submit">
                      <b-icon icon="plus"></b-icon>
                     Save
                  </b-button>
              </b-form>
          </div>
      </div>
      <hr>
      <table class="table table-hover">
          <thead>
              <th>Title</th>
              <th>Category</th>
              <th>Questions</th>
              <th>Edit</th>
              <th>Delete</th>
          </thead>
          <tbody>
              <tr v-for="(testbook,index) in testbooks" :key="testbook._id">
                  <td>{{testbook.title}}</td>
                  <td>{{testbook.category}}</td>
                  <td>{{testbook.questions.length}}</td>
                  <td>
                      <b-button variant="warning" @click="showEditUI(index)">
                          <b-icon icon="pencil"></b-icon>
                      </b-button>
                  </td>
                  <td>
                      <b-button variant="danger">
                          <b-icon icon="trash"></b-icon>
                      </b-button>
                  </td>
              </tr>
          </tbody>
      </table>
  </div>
</template>

<script>
export default {
    data() {
        return {
            create_testbook: {
                active: false,
                title: null,
                category: null
            }
        }
    },
    methods: {
        showCreateUI() {
            this.create_testbook.active = true;
            this.create_testbook.title = null;
            this.create_testbook.category = null;
        },
        showEditUI(index) {
            this.$store.commit('testbooks/setCurrent', index);
            this.$emit('editor')
        },
        onCreateTestbook() {
            this.create_testbook.active = false;

            this.$store.dispatch('testbooks/createTestbook', this.create_testbook);
        }
    },
    computed: {
        testbooks() {
            return this.$store.state.testbooks.testbooks;
        }
    },
    mounted() {
        this.$store.dispatch('testbooks/getAllTestbooks');
    }
}
</script>

<style>

</style>