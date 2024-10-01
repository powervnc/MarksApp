import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { GradesService } from './grades.service';
import { HttpClientModule } from '@angular/common/http';
import { StudentPageComponent } from './student-page/student-page.component';
import { ProfessorPageComponent } from './professor-page/professor-page.component';
import { NoPageComponent } from './no-page/no-page.component';
import { FormsModule } from '@angular/forms';
import { MarksStudentComponent } from './marks-student/marks-student.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    StudentPageComponent,
    ProfessorPageComponent,
    NoPageComponent,
    MarksStudentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    provideClientHydration(),
    GradesService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
