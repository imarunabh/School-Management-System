import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StorageService } from '../../../auth/services/storage/storage.service';

const BASIC_URL = ["http://localhost:8080/"]

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private http: HttpClient) { }

  createAuthorizationHeader(): HttpHeaders{
    let authHeader : HttpHeaders = new HttpHeaders();
    return authHeader.set(
     'Authorization',"Bearer "+StorageService.getToken()
    );
 }

  getStudentById():Observable<any>{
    return this.http.get<[]>(BASIC_URL + `api/student/${StorageService.getUserId()}`,
      {headers:this.createAuthorizationHeader()})

  }

  applyLeave(studentLeaveDto): Observable<any>{
    console.log(StorageService.getUserId());
    studentLeaveDto.userid = StorageService.getUserId();
    return this.http.post<[]>(BASIC_URL + `api/student/leave`,studentLeaveDto,
      {headers:this.createAuthorizationHeader()})

  }

  getAllAppliedLeavesByStudentId():Observable<any>{
    return this.http.get<[]>(BASIC_URL + `api/student/leave/${StorageService.getUserId()}`,
      {headers:this.createAuthorizationHeader()})

  }

  updateStudent(studentLeaveDto): Observable<any>{
    return this.http.put<[]>(BASIC_URL + `api/student/${StorageService.getUserId()}`,studentLeaveDto,
      {headers:this.createAuthorizationHeader()})
  }


}
