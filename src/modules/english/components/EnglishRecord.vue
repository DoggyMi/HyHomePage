<script setup lang="ts">
import type { StudyRecord } from '../types/record.types'
import { storeToRefs } from 'pinia'
import { onMounted, ref } from 'vue'
import { useEnglishStore } from '../stores/english.store'
import RecordList from './RecordList.vue'

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

const { loadStudyRecords, addStudyRecord, clearStudyRecords } = useEnglishStore()
const { currentRecords } = storeToRefs(useEnglishStore())
const duration = ref('')
const content = ref('')
const type = ref('')
const dateValue = ref<Date>(new Date())

onMounted(() => {
  loadStudyRecords()
})

function saveRecord() {
  addStudyRecord({
    duration: Number(duration.value),
    studyContent: content.value,
    studyType: Number(type.value),
    timestamp: dateValue.value.getTime(),
    id: crypto.randomUUID(),
  })
  // eslint-disable-next-line no-console
  console.log(currentRecords)
}

function clearRecords() {
  clearStudyRecords ()
  // eslint-disable-next-line no-console
  console.log(currentRecords)
}
</script>

<template>
  <el-row :gutter="20">
    <el-col :span="4">
      <el-input
        v-model="duration"
        placeholder="Please input duration"
      />
    </el-col>
    <el-col :span="4">
      <el-input
        v-model="content"
        placeholder="Please input content"
      />
    </el-col>
    <el-col :span="4">
      <el-input
        v-model="type"
        placeholder="Please input type"
      />
    </el-col>
    <el-col :span="4">
      <div class="block">
        <el-date-picker
          v-model="dateValue"
          type="date"
          placeholder="Pick a day"
        />
      </div>
    </el-col>
    <el-col :span="8">
      <el-button type="success" @click="saveRecord">
        保存
      </el-button>
      <el-button type="danger" @click="clearRecords">
        清空
      </el-button>
      <el-button type="primary" @click="clearRecords">
        导入
      </el-button>
      <el-button type="primary" @click="clearRecords">
        导出
      </el-button>
    </el-col>
  </el-row>

  <div>{{ duration }}</div>
  <div>{{ content }}</div>
  <div>{{ type }}</div>
  <div>{{ dateValue }}</div>
  <div>
    {{ currentRecords }}
  </div>
  <RecordList :records="currentRecords" />
</template>
