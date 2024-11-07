import type { StudyRecord, StudySession } from '../types/record.types'
import localforage from 'localforage'
import { STORAGE_KEYS } from '../constants/storage-keys'

// 初始化 localforage
localforage.config({
  name: 'EnglishLearning',
  storeName: 'english_records',
})

export class EnglishStorageService {
  // 保存学习记录
  async saveStudyRecord(record: StudyRecord): Promise<void> {
    const records = await this.getAllStudyRecords()
    records.push(record)
    await localforage.setItem(STORAGE_KEYS.STUDY_RECORDS, records)
  }

  // 获取所有学习记录
  async getAllStudyRecords(): Promise<StudyRecord[]> {
    const records = await localforage.getItem<StudyRecord[]>(STORAGE_KEYS.STUDY_RECORDS)
    return records || []
  }

  // 更新学习记录
  async updateStudyRecord(updatedRecord: StudyRecord): Promise<void> {
    const records = await this.getAllStudyRecords()
    const index = records.findIndex(record => record.id === updatedRecord.id)
    if (index !== -1) {
      records[index] = updatedRecord
      await localforage.setItem(STORAGE_KEYS.STUDY_RECORDS, records)
    }
  }

  // 保存学习会话
  async saveStudySession(session: StudySession): Promise<void> {
    const sessions = await this.getStudySessions()
    sessions.push(session)
    await localforage.setItem(STORAGE_KEYS.STUDY_SESSIONS, sessions)
  }

  // 获取学习会话
  async getStudySessions(): Promise<StudySession[]> {
    const sessions = await localforage.getItem<StudySession[]>(STORAGE_KEYS.STUDY_SESSIONS)
    return sessions || []
  }
}

export const englishStorageService = new EnglishStorageService()