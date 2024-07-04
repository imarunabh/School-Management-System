import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StorageService } from '../../../auth/services/storage/storage.service';
import { Observable } from 'rxjs';

const BASIC_URL = ["http://localhost:8080/"];


@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }

  addStudent(studentDto: any):Observable<any>{
    return  this.http.post<[]>(BASIC_URL + "api/admin/student", studentDto,{
      headers: this.createAuthorizationHeader()
    });
  }

  createAuthorizationHeader(): HttpHeaders{
     let authHeader : HttpHeaders = new HttpHeaders();
     return authHeader.set(
      'Authorization',"Bearer "+StorageService.getToken()
     );
  }

  getAllStudents():Observable<any>{
    return this.http.get<[]>(BASIC_URL + "api/admin/students",
      {headers:this.createAuthorizationHeader()})

  }
  deleteStudent(studentId:any):Observable<any>{
    return this.http.delete<[]>(BASIC_URL + `api/admin/student/${studentId}`,
      {headers:this.createAuthorizationHeader()})

  }

  getStudentById(studentId:number):Observable<any>{
    return this.http.get<[]>(BASIC_URL + `api/admin/student/${studentId}`,
      {headers:this.createAuthorizationHeader()})

  }

  updateStudent(studentId:number,studentDto: any){
    return  this.http.put<[]>(BASIC_URL + `api/admin/student/${studentId}`, studentDto,{
      headers: this.createAuthorizationHeader()
    });
  }

  payFee(studentId:number,feeDto: any):Observable<any>{
    return  this.http.post<[]>(BASIC_URL + `api/admin/fee/${studentId}`, feeDto,{
      headers: this.createAuthorizationHeader()
    });
  }

  getAllAppliedLeaves():Observable<any>{
    return this.http.get<[]>(BASIC_URL + `api/admin/leaves`,
      {headers:this.createAuthorizationHeader()})

  }

  changeLeaveStatus(leaveId: number,status: string):Observable<any>{
    return this.http.get<[]>(BASIC_URL + `api/admin/leave/${leaveId}/${status}`,
      {headers:this.createAuthorizationHeader()})

  }

  //Teacher Operations
  postTeacher(teacherDto: any):Observable<any>{
    return  this.http.post<[]>(BASIC_URL + "api/admin/teacher", teacherDto,{
      headers: this.createAuthorizationHeader()
    });
  }

  getAllTeachers():Observable<any>{
    return this.http.get<[]>(BASIC_URL+"api/admin/teachers",
      {
        headers:this.createAuthorizationHeader()
      }
    )
  }

  deleteTeacher(teacherId:any):Observable<any>{
    return this.http.delete<[]>(BASIC_URL + `api/admin/teacher/${teacherId}`,
      {headers:this.createAuthorizationHeader()})

  }

  getTeacherById(teacherId:number):Observable<any>{
    return this.http.get<[]>(BASIC_URL + `api/admin/teacher/${teacherId}`,
      {headers:this.createAuthorizationHeader()})

  }


  updateTeacher(teacherId:number,teacherDto: any){
    return  this.http.put<[]>(BASIC_URL + `api/admin/teacher/${teacherId}`, teacherDto,{
      headers: this.createAuthorizationHeader()
    });
  }

}
