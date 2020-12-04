import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  public allEmployee=[];
  public employeeId;
 
  public task: any;
 
  public taskDeadline: number;

  public allTask=[];


  constructor(private appService:AppService) { }

  ngOnInit(): void {
    this.appService.getAllEmployees().subscribe(
      data => {
        console.log(data)
        this.allEmployee = data["data"];
      },
      error => {
        console.log("Some error occured");
        console.log(error.errorMessage);
      }

    );

    }

    public getemployeeId(receivedEmployeeId){
      this.employeeId=receivedEmployeeId;
      
    }

    public assignTask=()=>{
      let data={
        employeeId:this.employeeId,
        task:this.task,
        taskDeadline:this.taskDeadline
      }
      this.appService.assignTask(data).subscribe((apiResponse)=>{
        if(apiResponse.status==200){
          alert("Task Assigned...!!!")
        }else{
          alert("Some Error Occured")
        }
      },(err)=>{
        alert("Some Error Occured(err)");
      })
    
    }

    public viewTask=(employeeId)=>{
      this.appService.viewTask(employeeId).subscribe((apiResponse)=> {
          this.allTask= apiResponse["data"];
        },(err) => {
          console.log("Some error occured while loading all task");
          console.log(err.errorMessage);
        }
      )
    }
  
}
