import { Component } from '@angular/core';
import { GradesService } from '../grades.service';
import { Router } from '@angular/router';
import { error } from 'node:console';
import { style } from '@angular/animations';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  public username:string ="";
  public password:string="";
  public pHTML:any;
  constructor(private _gradesService:GradesService,private _router: Router){}
  onSubmit(){
    
    this._gradesService.login(this.username,this.password).subscribe(
      data => {this.redirectionate(data)},
      error =>{console.log(error)}        )
     
  }
  onKeyUsername(event:any) 
  {this.username = 
    event.target.value;
    
  }
  onKeyPassword(event:any) 
  {this.password = 
    event.target.value;
  }
   redirectionate(data:any){


    var type=data["type"]

   if(type=="noUser"){
    this.pHTML = document.querySelector('.welcome') as HTMLElement;
    this.pHTML.innerHTML="Wrong username/password";
    return
   }

    var id=data["id"]

    console.log("TYPE: ", type);
    console.log("ID: ", id);


    if(type=="student"){
      
      this._router.navigate(['/student-page'], { queryParams: { id: id, username: this.username } });
      
    }
    else if(type=="professor"){
      console.log(10000);
      this._router.navigate(['/professor-page'], { queryParams: { id: id, username: this.username } });
      

    }
   

}



  

}