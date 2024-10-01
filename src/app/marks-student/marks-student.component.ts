import { Component, OnInit } from '@angular/core';
import { GradesService } from '../grades.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-marks-student',
  templateUrl: './marks-student.component.html',
  styleUrl: './marks-student.component.css',
})
export class MarksStudentComponent implements OnInit {
  public id_student: any = 0;
  public marks: any[] = [];
  public isTableVisible = false;
  public isErrorVisible = false;
  public errorMessage = '';
  public noMarks = 'No marks given';
  private myMark: number=0;
  public courseNames: any[] = [];
  public selectedCourse: string = '';
  public myMarkInput: string | null = 'f';

  ngOnInit(): void {
    this._router.queryParamMap.subscribe((params) => {
      this.id_student =params.get('id_student');
      this.id_student=parseInt(this.id_student);
      console.log('id student:', this.id_student);
      this.fetchCoursesNames();
    });
  }
  constructor(
    private _gradesService: GradesService,
    private _router: ActivatedRoute
  ) {}
  fetchCoursesNames() {
    this._gradesService.getCoursesNames().subscribe((names) => {
      console.log(names);
      this.courseNames = names;
    });
  }
  addMark() {
    console.log('cliked add button');
    console.log('selected course name:', this.selectedCourse);
    const myMarkInput = prompt(
      'Enter the mark for this course (between 1 and 10):'
    );
    if(!myMarkInput){
      alert('Failed to add mark: empty input');

    }
    else{
    this.myMark = parseInt(myMarkInput);
    console.log(this.myMark);
    if (
      this.myMark &&
      this.myMark > 0 &&
      this.myMark < 11 &&
      this.selectedCourse.trim() !== ''
    ) {
      console.log("My mark:",this.myMark);
      this._gradesService
        .addMark(this.id_student, this.myMark, this.selectedCourse)
        .subscribe(
          () => {
            alert('Mark added successfully!');
            this.getGrades(); // Call a method to fetch and render the updated marks
          },
          (error: any) => {
            alert('Failed to add mark: ' + error.message);
          }
        );
    } else {
      alert(
        'Please enter a valid mark between 1 and 10 and provide a non-empty course name.'
      );
    }
  }
  }

  getGrades() {
    console.log('cliked show button');
    console.log('selected course name:', this.selectedCourse);
    this._gradesService
      .getMarks(this.id_student, this.selectedCourse)
      .subscribe((data) => {
        this.marks = data;
        console.log(this.marks);
        if(data.length===0)
          this.isTableVisible=false;
        else this.isTableVisible=true;
      });
  }
  updateMark(index: any) {
    this.myMarkInput = prompt(
      'Enter the mark for this course (between 1 and 10):'
    );
    if (!this.myMarkInput)
      alert(
        'Please enter a valid mark between 1 and 10 and provide a non-empty course name.'
      );
    else  {
      try{
      this.myMark = parseInt(this.myMarkInput);
      }catch(error){
        alert("Error parsing fron string to int: "+error);
        return ;
      }
      console.log('cliked update button');
      console.log('update mark with: ', this.myMark);
      let markSelected = this.marks[index];
      console.log('mark selected', markSelected);
      if (
        this.myMark &&
        this.myMark > 0 &&
        this.myMark < 11 &&
        this.selectedCourse.trim() !== ''
      ) {
        this._gradesService
          .updateMark(markSelected.id_mark, this.myMark)
          .subscribe(
            () => {
              alert('Mark updates successfully!');
              this.getGrades(); // Call a method to fetch and render the updated marks
            },
            (error: any) => {
              alert('Failed to update mark: ' + error.message);
            }
          );
      }
    }
  }

  deleteMark(index: any) {
    const confirmation = confirm("Are you sure you want to delete this document?");

    if(confirmation) {
      const id = this.marks[index].id_mark;
      this.marks.splice(index, 1);
      console.log(id);
      this._gradesService.deleteMark(id).subscribe(
        data => console.log(data),
        error => console.log(error)
      );
    }

  }
}
