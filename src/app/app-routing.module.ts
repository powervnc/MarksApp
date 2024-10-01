import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentPageComponent } from './student-page/student-page.component';
import { ProfessorPageComponent } from './professor-page/professor-page.component';
import { LoginComponent } from './login/login.component';
import { NoPageComponent } from './no-page/no-page.component';
import { MarksStudentComponent } from './marks-student/marks-student.component';
const routes: Routes = [
  { path: 'student-page', component: StudentPageComponent },
  { path: 'professor-page', component: ProfessorPageComponent },
  { path: 'login', component: LoginComponent },
  {path:'no-page',component:NoPageComponent},
  {path:'marks-student',component:MarksStudentComponent},
  { path: '', redirectTo: '/login', pathMatch: 'full' }, // Default route
  { path: '**', redirectTo: '/no-page', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
