<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { onMounted, ref } from 'vue'
import { StudyType } from '../constants/study-types'
import { useEnglishStore } from '../stores/english.store'
import { formatStudyType } from '../utils/study-type-formatter'
import RecordList from './RecordList.vue'

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
    content: content.value,
    type: Number(type.value),
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
  <el-row :gutter="8">
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
      <el-select v-model="type" placeholder="请选择学习类型">
        <el-option
          v-for="studyType in Object.values(StudyType).filter(v => !isNaN(Number(v))) as StudyType[]"
          :key="studyType"
          :value="studyType"
          :label="formatStudyType(studyType)"
        />
      </el-select>
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
      <div class="flex justify-right">
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
      </div>
    </el-col>
  </el-row>
  <RecordList :records="currentRecords" />
</template>
