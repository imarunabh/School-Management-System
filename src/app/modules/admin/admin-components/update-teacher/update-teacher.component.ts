import { Component } from '@angular/core';
import { AdminService } from '../../admin-service/admin.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-update-teacher',
  templateUrl: './update-teacher.component.html',
  styleUrl: './update-teacher.component.scss'
})
export class UpdateTeacherComponent {

  teacherId:number = this.activatedRoute.snapshot.params['teacherId']

  validateForm: FormGroup;
  isSpinning: boolean=false;

  GENDER:string[] = [
    "Male",
    "Female",
    "Other"
  ]

  constructor(
    private service:AdminService,
    private activatedRoute: ActivatedRoute,
    private fb:FormBuilder,
    private snackBar:MatSnackBar
  ) {}

  ngOnInit(){
    this.getTeacherById();
    this.validateForm = this.fb.group({
    name:[null,Validators.required],
    gender:[null,Validators.required],
    department:[null,Validators.required],
    qualification:[null,Validators.required],
    address:[null,Validators.required],
    dob:[null,Validators.required]
          })
  }

  getTeacherById(){
    this.service.getTeacherById(this.teacherId).subscribe((res)=>{
      console.log(res);
      this.validateForm.patchValue(res.teacherDto);
    })
  }

  updateTeacher(){
    this.service.updateTeacher(this.teacherId,this.validateForm.value).subscribe((res)=>{
      console.log(res)
      if(res != null){
        this.snackBar.open('Record updated Successfully','Close',{
          duration: 5000
        });
        this.getTeacherById();
      }
      else{
        this.snackBar.open("Student not found",'Close',{
          duration: 5000
        });
      }
    })
  }

}
