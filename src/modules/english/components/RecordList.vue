<script lang="ts" setup>
import type { StudyRecord } from '../types/record.types'
import { useEnglishStore } from '../stores/english.store'
import { formatStudyType } from '../utils/study-type-formatter'

defineProps<{
  records: StudyRecord[]
}>()

const { deleteStudyRecord } = useEnglishStore()

function handleDelete(_index: number, row: StudyRecord) {
  deleteStudyRecord(row.id)
}
</script>

<template>
  <el-table :data="records" style="width: 100%" :default-sort="{ prop: 'timestamp', order: 'descending' }" stripe>
    <el-table-column prop="timestamp" label="时间" width="180" sortable>
      <template #default="scope">
        <div style="display: flex; align-items: center">
          <span>{{ new Date(scope.row.timestamp).toLocaleDateString() }}</span>
        </div>
      </template>
    </el-table-column>
    <el-table-column prop="content" label="内容" width="180" />
    <el-table-column prop="duration" label="学习时长" width="180" />
    <el-table-column label="学习类型" width="180">
      <template #default="scope">
        <span>{{ formatStudyType(scope.row.type) }}</span>
      </template>
    </el-table-column>
    <el-table-column label="操作">
      <template #default="scope">
        <el-button
          size="small"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)"
        >
          Delete
        </el-button>
      </template>
    </el-table-column>
  </el-table>
</template>
