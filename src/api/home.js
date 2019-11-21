import request from '@/utils/request'

// 获取进步最快的科目列表
export function getMostProgressSubject(data) {
  return request({
    url: '/api/score/getMostProgressSubject',
    method: 'get',
    params: data
  })
}

// 需要提高科目列表
export function getMostBackSubject(data) {
  return request({
    url: '/api/score/getMostBackSubject',
    method: 'get',
    params: data
  })
}

// 获取成绩排名
export function ScoreRank(data) {
  return request({
    url: '/api/score/score_rank',
    method: 'get',
    params: data
  })
}

// 获取历次成绩
export function ExamsScore(data) {
  return request({
    url: '/api/score/exams_score',
    method: 'get',
    params: data
  })
}

// 获取上次考试信息
export function ScoreInfo(data) {
  return request({
    url: '/api/index/score_info',
    method: 'get',
    params: data
  })
}

// 最近一次考试的班级超越率查询
export function ClassByondRate(data) {
  return request({
    url: '/api/byondrate/class_byond_rate',
    method: 'get',
    params: data
  })
}

// 最近一次考试的学校超越率查询
export function SchoolByondRate(data) {
  return request({
    url: '/api/byondrate/school_byond_rate',
    method: 'get',
    params: data
  })
}

// 用户考试信息查询
export function ExamInfo(data) {
  return request({
    url: '/api/index/exam_info',
    method: 'get',
    params: data
  })
}
