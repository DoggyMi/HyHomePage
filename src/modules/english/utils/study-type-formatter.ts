import { StudyType } from '../constants/study-types'

export function formatStudyType(type: StudyType): string {
  const typeMap: Record<StudyType, string> = {
    [StudyType.Listening]: '听力',
    [StudyType.Speaking]: '口语',
    [StudyType.Reading]: '阅读',
    [StudyType.Writing]: '写作',
    [StudyType.Other]: '其他',
  }

  return typeMap[type] || '未知'
}
