import type { StudyRecord } from '../types/record.types'
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

  // 删除学习记录
  async deleteStudyRecord(id: string): Promise<void> {
    const records = await this.getAllStudyRecords()
    const filteredRecords = records.filter(record => record.id !== id)
    await localforage.setItem(STORAGE_KEYS.STUDY_RECORDS, filteredRecords)
  }

  // 清空学习记录
  async clearStudyRecords(): Promise<void> {
    await localforage.removeItem(STORAGE_KEYS.STUDY_RECORDS)
  }
}

export const englishStorageService = new EnglishStorageService()
