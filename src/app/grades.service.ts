import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ServerUrls } from './server-urls';

@Injectable({
  providedIn: 'root',
})
export class GradesService {
  constructor(private _http: HttpClient) {}

  login(username: string, password: string) {
    const data = { username: username, password: password };
    return this._http.post<any>(ServerUrls.login, data, {
      headers: { 'Content-Type': 'application/json' },
    });
  }

  viewAllMarksOfStudent(id_student:any){
   
    const data={StudentId:id_student}
    return this._http.post<any>(ServerUrls.viewAllMarksOfStudent,data, {
      headers: { 'Content-Type': 'application/json' },
    });
  }
  getStudents(name_group:string,page:any){
    const Offset=(page-1)*4
    const Limit=4
    const data={NameGroup:name_group,Limit:Limit, Offset:Offset}
    return this._http.post<any>(ServerUrls.getStudents,data, {
      headers: { 'Content-Type': 'application/json' },
    });
  }
  getGroupNames(){
    return this._http.post<any>(ServerUrls.getNameGroups, {
      headers: { 'Content-Type': 'application/json' },
    });
  }
  nrStudentsInGroup(name_group:string){
    const data={NameGroup:name_group}
    return this._http.post<any>(ServerUrls.nrStudentsInGroup,data, {
      headers: { 'Content-Type': 'application/json' },
    });
  }
  getCoursesNames(){
    return this._http.post<any>(ServerUrls.getNameCourses, {
      headers: { 'Content-Type': 'application/json' },
    });
  }
  addMark(id_student:any,note:any,name_course:string){
    const data={StudentId:id_student,Value:note,NameCourse:name_course}
    return this._http.post<any>(ServerUrls.addMark,data, {
      headers: { 'Content-Type': 'application/json' },
    });
  }
  getMarks(id_student:any,name_course:any){
    const data={StudentId:id_student,NameCourse:name_course}
    return this._http.post<any>(ServerUrls.getMarks,data, {
      headers: { 'Content-Type': 'application/json' },
    });
  }

  updateMark(id_mark:any,note:any){
    const data={MarkId:id_mark,Value:note}
    return this._http.post<any>(ServerUrls.updateMark,data, {
      headers: { 'Content-Type': 'application/json' },
    });
  }

  deleteMark(id_mark:any){
    const data={MarkId:id_mark}
    return this._http.post<any>(ServerUrls.deleteMark,data, {
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
