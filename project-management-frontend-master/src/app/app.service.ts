import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {
   private url='http://localhost:5000';
  // private url="https://projects-management-app.herokuapp.com"
  
  constructor(public http:HttpClient) { }

  public loginFunction(data): Observable<any>{
    
    const params=new HttpParams()
    .set('email',data.email)
    .set('password',data.password)
     let apiResponse= this.http.post(`${this.url}/route/login`,params);
    return (apiResponse);
  }

  public signUpFunction(data):Observable<any>{
    const params=new HttpParams()
  .set('name',data.Name)
  .set('email',data.email)
  .set('password',data.password)
   return this.http.post(`${this.url}/route/signup`,params)

}
public getAllEmployees=()=>{
  let response= this.http.get(`${this.url}/route/employee/all`);
  return(response);
  }

  public assignTask(data): Observable<any>{
    
    const params=new HttpParams()
    .set('employeeId',data.employeeId)
    .set('task',data.task)
    .set('deadline',data.taskDeadline)
    return this.http.post(this.url+'/route/assign/task',params);
  }
  public viewTask(employeeId):Observable<any>{
    console.log(employeeId)
    const params=new HttpParams()
    .set('employeeId',employeeId)
    return this.http.post(this.url+'/route/allTask',params);
  }

  public updateStatus(taskId,status):Observable<any>{
    console.log("status"+status)
    console.log("status"+taskId)

    const params=new HttpParams()
    .set('projectId',taskId)
    .set('status',status)
     return this.http.post(this.url+'/route/update/status',params);
  }
}
