import { Component } from '@angular/core';
import { AdminService } from '../../admin-service/admin.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-all-leaves',
  templateUrl: './all-leaves.component.html',
  styleUrl: './all-leaves.component.scss'
})
export class AllLeavesComponent {

  isSpinning = false;
  leaves: any;

  constructor(
    private adminService: AdminService,
    private snackBar : MatSnackBar
  ){}

  ngOnInit():void{
    this.getAllLeaves();
  }

  getAllLeaves(){
    this.isSpinning = true;
    this.adminService.getAllAppliedLeaves().subscribe((res)=>{
      console.log(res);
      this.isSpinning=false;
      this.leaves=res;
    })
  }

  changeLeaveStatus(leaveId: number,status: string){
    this.isSpinning= true;
    this.adminService.changeLeaveStatus(leaveId,status).subscribe(
      (res)=>{
        console.log(res);
        this.isSpinning = false;
         if(res != null){
          console.log(status)
          if(status=='Approve'){
          this.snackBar.open('Leave approved successfully','Close', {
            duration: 5000
          });
      }
      else{
        this.snackBar.open('Something went wrong','ERROR', {
          duration: 5000
        });

      }
          this.getAllLeaves();
        }
        //  else if(res.id!=null){
        //   this.snackBar.open("Something went wrong",'ERROR',{
        //     duration: 5000
        //   });

        // }
      });
  }

}
