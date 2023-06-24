import {TeacherProfitNote} from './IteacherProfitNotes';
export interface TeacherProfitResponse {
  clientId:number
  name:string
  totalEarning:number
  paidToTeacher:number
  ordersRest: number;
  rest:number
  notes: TeacherProfitNote[]
}
