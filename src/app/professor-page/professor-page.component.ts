import { Component, OnInit } from '@angular/core';
import { GradesService } from '../grades.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
@Component({
  selector: 'app-professor-page',
  templateUrl: './professor-page.component.html',
  styleUrl: './professor-page.component.css',
})
export class ProfessorPageComponent implements OnInit {
  public id: any = 0;
  public username: string = '';
  public students: any[] = [];
  public page: any = 1;
  public totalPages:any=1;
  public nrStudentsInGroup:any=0;
  public isTableVisible =false;
  public isErrorVisible = false;
  public errorMessage = '';
  public noMarks = 'No students given';
  public selectedGroup: string = '';
  public groupNames: any[]=[];
  constructor(
    private _gradesService: GradesService,
    private _router: ActivatedRoute,
    private _routing: Router,
  ) {}
  ngOnInit(): void {
    this._router.queryParams.subscribe((params) => {
      this.id = parseInt(params['id']);
      this.username = params['username'];
      this.fetchGroupNames()
      this._gradesService.getStudents(this.selectedGroup, this.page);
      
    });
  }
  fetchGroupNames() {
    this._gradesService.getGroupNames().subscribe((names) => {
      console.log(names);
      this.groupNames = names;
    });
  }
  showStudents(){
    console.log("1",this.selectedGroup)
    this._gradesService.getStudents(this.selectedGroup,this.page).subscribe((students) => {
      this.students = students;
      this.renderTable();
    },
    error =>{
      this.isErrorVisible = true;
      this.errorMessage = error;
      this.isTableVisible=false;
    }
  )
  console.log("2",this.selectedGroup)
  this._gradesService.nrStudentsInGroup(this.selectedGroup).subscribe((count)=>{
          this.nrStudentsInGroup=count; 
          console.log("nrStudentsInGroup",this.nrStudentsInGroup);  
          console.log("Total pages 1:",this.totalPages);
          this.totalPages=Math.ceil(this.nrStudentsInGroup / 4);
          console.log("Total pages 2:",this.totalPages);
          this.updateButtonVisibility();
    })
  
    
    
  }
  renderTable(){
    if(this.students.length === 0){
      this.isErrorVisible = true;
      this.errorMessage = this.noMarks;
      return;
    }
    this.isTableVisible = true;
  }
  resetVisibility(){
    this.isTableVisible = false;
    this.isErrorVisible = false;
  }
  next4Students(){
    console.log("next4")
    console.log("total pages:",this.totalPages);
    if (this.page <= this.totalPages - 1) {
      this.page++;
      console.log("next->page:",this.page)
      this.showStudents();
      this.updateButtonVisibility();
    }

  }
  previous4Students(){
    if (this.page > 1) {
      this.page--;
      console.log("previous->page:",this.page)
      this.showStudents();
      this.updateButtonVisibility();
    }

  }
  updateButtonVisibility() {
    const nextButton = document.querySelector('.next4-button') as HTMLElement;
    const prevButton = document.querySelector('.previous4-button') as HTMLElement;
    console.log("page visibility --> page:",this.page)
    if (this.page === 1) {
      prevButton.style.display = 'none';
    } else {
      prevButton.style.display = 'inline';
    }

    if (this.page === this.totalPages) {
      console.log("next not ok ");
      nextButton.style.display = 'none';
    } else {
      nextButton.style.display = 'inline';
    }
  }
  goTo(index: number,id_student:number){
    console.log(index)
    console.log(id_student)
    this._routing.navigate(['/marks-student'], { queryParams: { id_student: id_student }}); 
  }
  
}
