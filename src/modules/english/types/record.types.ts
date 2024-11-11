// 定义英语模块的类型
export interface StudyRecord {
  id: string
  // 学习时长 单位：分钟
  duration: number
  // 学习内容
  content: string
  // 学习类型 1：听力 2：口语 3：阅读 4：写作
  type: number
  // 记录时间
  timestamp: number
}
