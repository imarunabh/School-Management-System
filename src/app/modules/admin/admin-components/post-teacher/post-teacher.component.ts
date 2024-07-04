import { Component } from '@angular/core';
import { AdminService } from '../../admin-service/admin.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-post-teacher',
  templateUrl: './post-teacher.component.html',
  styleUrl: './post-teacher.component.scss'
})
export class PostTeacherComponent {


  validateForm: FormGroup;
  isSpinning: boolean=false;

  GENDER:string[] = [
    "Male",
    "Female",
    "Other"
  ]

  constructor(
    private adminService: AdminService,
    private fb: FormBuilder,
    private snackBar:MatSnackBar
  ){}

  ngOnInit(){
    this.validateForm = this.fb.group({
      name:[null,Validators.required],
      gender:[null,Validators.required],
      department:[null,Validators.required],
      qualification:[null,Validators.required],
      address:[null,Validators.required],
      dob:[null,Validators.required]
    })
  }

  postTeacher(){
    console.log(this.validateForm.value);
    this.adminService.postTeacher(this.validateForm.value).subscribe((res)=>{
      console.log(res);
      if(res.id!=null){
        this.snackBar.open("Teacher Posted Successfully","Close",{duration:5000})
      }
      else{
        this.snackBar.open("Something went wrong","Close",{duration:5000})
      }
    })
  }

}
