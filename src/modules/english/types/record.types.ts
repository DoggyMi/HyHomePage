// 定义英语模块的类型
export interface StudyRecord {
  id: string
  // 学习时长 单位：分钟
  duration: number
  // 学习内容
  studyContent: string
  // 学习类型 1：听力 2：口语 3：阅读 4：写作
  studyType: number
  // 记录时间
  timestamp: number
}

// export interface StudyRecord {
//   id: string
//   word: string
//   translation: string
//   timestamp: number
//   reviewCount: number
//   nextReviewDate?: Date
//   mastered: boolean
// }

export interface StudySession {
  id: string
  startTime: number
  endTime: number
  wordsStudied: string[]
}
