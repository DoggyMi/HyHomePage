import type { StudyRecord } from '../types/record.types'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { englishStorageService } from '../services/storage.service'

export const useEnglishStore = defineStore('english', () => {
  const currentRecords = ref<StudyRecord[]>([])

  async function loadStudyRecords() {
    currentRecords.value = await englishStorageService.getAllStudyRecords()
  }

  async function addStudyRecord(record: StudyRecord) {
    await englishStorageService.saveStudyRecord(record)
    await loadStudyRecords()
  }

  async function addStudyRecords(records: StudyRecord[]) {
    await englishStorageService.saveStudyRecords(records)
    await loadStudyRecords()
  }

  async function deleteStudyRecord(recordId: string) {
    await englishStorageService.deleteStudyRecord(recordId)
    await loadStudyRecords()
  }

  async function clearStudyRecords() {
    await englishStorageService.clearStudyRecords()
    await loadStudyRecords()
  }

  return {
    currentRecords,
    clearStudyRecords,
    loadStudyRecords,
    deleteStudyRecord,
    addStudyRecord,
    addStudyRecords,
  }
})
