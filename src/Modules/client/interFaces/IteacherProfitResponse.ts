import {TeacherProfitNote} from './IteacherProfitNotes';
export interface TeacherProfitResponse {
  id:number
  name:string
  teacherearning:number
  rest:number
  notes: TeacherProfitNote[]
}