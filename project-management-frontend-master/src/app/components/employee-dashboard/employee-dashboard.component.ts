import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cookie } from 'ng2-cookies';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.css']
})
export class EmployeeDashboardComponent implements OnInit {

  public employeeId;
  public allTask=[];
  public taskId;
  public status;

  constructor(public appService: AppService, public router: Router) { }

  ngOnInit() {
    this.employeeId=Cookie.get('employeeId')
    this.appService.viewTask(this.employeeId).subscribe((apiResponse)=> {
      this.allTask= apiResponse["data"];
      console.log(this.allTask.length)
    },(err) => {
      console.log("Some error occured while loading all task");
      console.log(err.errorMessage);
    }
  )
  }

  public currentTaskId(taskId){
    this.taskId=taskId;
    
  }

  public updateStatus=()=>{
  this.appService.updateStatus(this.taskId,this.status).subscribe(
    data=>{
      alert("status updated")
    },err=>{
      alert("some Error occured")
    }
  )
  }

}
