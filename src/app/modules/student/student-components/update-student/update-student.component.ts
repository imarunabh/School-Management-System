import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StudentService } from '../../student-service/student.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-update-student',
  templateUrl: './update-student.component.html',
  styleUrl: './update-student.component.scss'
})
export class UpdateStudentComponent {

  CLASS:string[] = [
    "Play" , "1st", "2nd", "3rd","4th","5th","6th","7th","8th","9th","10th"
  ];

  GENDER:string[] = [
    "Male","Female","Other"
  ];

  student:any;
  isSpinning=false;
  validateForm! : FormGroup;

  constructor(
    private fb:FormBuilder,
    private studentService: StudentService,
    private snackBar: MatSnackBar,
    private activateroute: ActivatedRoute
  ){}

  ngOnInit():void{
    this.validateForm= this.fb.group({
      email:[null,[Validators.email,Validators.required]],
      name:[null,[Validators.required]],
      fatherName:[null,[Validators.required]],
      motherName:[null,[Validators.required]],
      studentClass:[null,[Validators.required]],
      birthDate:[null,[Validators.required]],
      address:[null,[Validators.required]],
      gender:[null,[Validators.required]]
    });
    this.getStudentById();
  }

  getStudentById(){
    this.studentService.getStudentById().subscribe((res)=>{
      console.log(res)
      const student = res.studentDto;
      this.validateForm.patchValue(student);
    })
  }


  updateStudent(){
    this.isSpinning=true;
    this.studentService.updateStudent(this.validateForm.value).subscribe(
      (res)=>{
        console.log(res);
        this.isSpinning= false;

        if(res.id != null){
          this.snackBar.open('Record updated Successfully','Close',{
            duration: 5000
          });
          this.getStudentById();
        }
        else{
          this.snackBar.open("Student not found",'Close',{
            duration: 5000
          });
        }
      }
    )
  }

}
