<template>
  <div>
    <h3>Admin Panel</h3>
    <hr />
    <b-tabs>
      <b-tab title="Testbooks">
        <TestbooksManager @editor="testbook_editor = true" v-if="!testbook_editor"/>
        <TestbookEditor @return="testbook_editor = false" v-if="testbook_editor"/>
      </b-tab>
      <b-tab title="Exams"></b-tab>
      <b-tab title="Submissions"></b-tab>
      <b-tab title="Users"></b-tab>
    </b-tabs>
  </div>
</template>

<script>
import TestbooksManager from '@/components/admin/TestbooksManager.vue'
import TestbookEditor from '@/components/admin/TestbookEditor.vue'

export default {
    data() {
      return {
        testbook_editor: false
      }
    },
    components: {
        TestbooksManager,
        TestbookEditor
    }
};
</script>

<style>
</style>