import { Component,OnInit } from '@angular/core';
import { GradesService } from '../grades.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-student-page',
  templateUrl: './student-page.component.html',
  styleUrl: './student-page.component.css'
})
export class StudentPageComponent implements OnInit {
  public id:any=0;
  public username:string="";
  public marks :any[]=[];
  public isTableVisible = false;
  public isErrorVisible = false;
  public errorMessage = '';
  public noMarks = 'No marks given';
  public show:boolean=false;

  constructor(private _gradesService:GradesService,private _router:ActivatedRoute,private _routing:Router){
  
  }
  
  ngOnInit(): void {
    this._router.queryParams.subscribe(params => {
      console.log("navigated")
      this.id = parseInt(params['id']);
      this.username = params['username'];
      this.receiveMarks();
      const welcome=document.querySelector('#heading') as HTMLElement;
      welcome.innerHTML="Hello "+this.username+"!";
      
    });
  }
  resetVisibility(){
    this.isTableVisible = false;
    this.isErrorVisible = false;
  }

  receiveMarks(){
    //this.resetVisibility();
    this._gradesService.viewAllMarksOfStudent(this.id)
    .subscribe(
      data => {
        console.log(data);
        this.marks = data;
        this.renderTable();
      },
      error =>{
        this.isErrorVisible = true;
        this.errorMessage = error;
      }
    )
  } 

  renderTable(){
    if(this.marks.length == 0){
      this.isErrorVisible = true;
      this.errorMessage = this.noMarks;
      this.isTableVisible=false;
      return;
    }
    this.isTableVisible = true;
  
  }

  // goTo(index: number,id_student:number){
  //    this._routing.navigate(['/marks-student'], { queryParams: { id_student: id_student, username: this.username } }); 
  // }

  


}
