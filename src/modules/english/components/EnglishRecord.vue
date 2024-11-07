<script setup lang="ts">
import type { StudyRecord } from '../types/record.types'
import { ref } from 'vue'
import { useEnglishStore } from '../stores/english.store'

// const props = defineProps<{
//   record: StudyRecord
// }>()

// const store = useEnglishStore()

// async function markAsMastered() {
//   const updatedRecord = {
//     ...props.record,
//     mastered: true,
//   }
//   await store.updateStudyRecord(updatedRecord)
// }

const store = useEnglishStore()

const duration = ref('')
const content = ref('')
const type = ref('')

function saveRecord() {
  store.addStudyRecord({
    duration: Number(duration.value),
    studyContent: content.value,
    studyType: Number(type.value),
    timestamp: new Date().getTime(),
    id: crypto.randomUUID(),
  })
}
</script>

<template>
  <div>
    <input v-model="duration" type="text" placeholder="请输入学习时长">
    <input v-model="content" type="text" placeholder="请输入学习内容">
    <input v-model="type" type="text" placeholder="请输入学习类型">
    <button @click="saveRecord">
      保存
    </button>
  </div>
  <div>
    {{ store.currentRecords }}
  </div>
</template>
