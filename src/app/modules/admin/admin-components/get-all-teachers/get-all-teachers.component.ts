import { Component } from '@angular/core';
import { AdminService } from '../../admin-service/admin.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-get-all-teachers',
  templateUrl: './get-all-teachers.component.html',
  styleUrl: './get-all-teachers.component.scss'
})
export class GetAllTeachersComponent {

  teachers = [];

  constructor(
    private service:AdminService,
    private snackBar:MatSnackBar){}

  ngOnInit(){
    this.getAllTeachers();
  }

  getAllTeachers(){
    this.service.getAllTeachers().subscribe((res)=>{
      console.log(res);
      this.teachers = res;
    })
  }

  deleteTeacher(teacherId:number){
    console.log(teacherId)
    this.service.deleteTeacher(teacherId).subscribe((res)=>{
      console.log(res)
      this.getAllTeachers();
      this.snackBar.open("Teacher deleted successfully","Close",{duration:5000  })
    })
  }

}
