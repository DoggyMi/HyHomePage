import type { StudyRecord, StudySession } from '../types/record.types'
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

  //   async function startNewSession() {
  //     const session: StudySession = {
  //       id: crypto.randomUUID(),
  //       startTime: Date.now(),
  //       endTime: 0,
  //       wordsStudied: [],
  //     }
  //     currentSession.value = session
  //   }

  //   async function endCurrentSession() {
  //     if (currentSession.value) {
  //       currentSession.value.endTime = Date.now()
  //       await englishStorageService.saveStudySession(currentSession.value)
  //       currentSession.value = null
  //     }
  //   }

  return {
    currentRecords,
    // currentSession,
    loadStudyRecords,
    addStudyRecord,
    // startNewSession,
    // endCurrentSession,
  }
})
