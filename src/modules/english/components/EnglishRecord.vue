<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { onMounted, ref } from 'vue'
import { StudyType } from '../constants/study-types'
import { useEnglishStore } from '../stores/english.store'
import { formatStudyType } from '../utils/study-type-formatter'
import RecordList from './RecordList.vue'

const { loadStudyRecords, addStudyRecord, addStudyRecords, clearStudyRecords } = useEnglishStore()
const { currentRecords } = storeToRefs(useEnglishStore())
const duration = ref('')
const content = ref('')
const type = ref('')
const dateValue = ref<Date>(new Date())

onMounted(() => {
  loadStudyRecords()
})

function saveRecord() {
  // 检查入参不为空
  if (!duration.value || !content.value || !type.value || !dateValue.value) {
    ElMessage.error('Please enter complete information')
    return
  }
  addStudyRecord({
    duration: Number(duration.value),
    content: content.value,
    type: Number(type.value),
    timestamp: dateValue.value.getTime(),
    id: crypto.randomUUID(),
  })
}

function clearRecords() {
  // 二次确认
  ElMessageBox.confirm('Are you sure you want to clear the records?', 'Confirm', {
    confirmButtonText: 'Confirm',
    cancelButtonText: 'Cancel',
  }).then(() => {
    clearStudyRecords()
  })
}

// 导入
function importRecords() {
  // 选择文件，读取文件，解析成recordList
  const file = document.createElement('input')
  file.type = 'file'
  file.accept = '.json'
  file.click()
  file.onchange = () => {
    const fileItem = file.files?.[0]
    if (!fileItem) {
      return
    }
    const reader = new FileReader()
    reader.readAsText(fileItem)
    reader.onload = () => {
      const recordList = JSON.parse(reader.result as string)
      if (!Array.isArray(recordList)) {
        ElMessage.error('The file is not a valid record list')
      }
      else {
        addStudyRecords(recordList)
      }
    }
  }
}

// 导出
function exportRecords() {
  // 导出recordList成文件，并下载
  const recordList = currentRecords.value
  const blob = new Blob([JSON.stringify(recordList)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'recordList.json'
  a.click()
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
        <el-button type="primary" @click="importRecords">
          导入
        </el-button>
        <el-button type="primary" @click="exportRecords">
          导出
        </el-button>
      </div>
    </el-col>
  </el-row>
  <RecordList :records="currentRecords" />
</template>
