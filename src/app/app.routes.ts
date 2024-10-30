import { Routes } from '@angular/router';
import { LayoutComponent } from './presentation/components/layouts/layout/layout.component';
import { AuthComponent } from './presentation/components/shared/auth/auth.component';
import { HomeComponent } from './presentation/components/shared/home/home.component';
import { StudentComponent } from './presentation/components/page/students/student/student.component';
import {FormStudentComponent} from './presentation/components/page/students/form-student/form-student.component';
import {ReportComponent} from './presentation/components/page/report/report.component';
import {SchollComponent} from './presentation/components/page/scholl/scholl.component';
import {AppSettingComponent} from './presentation/components/page/app-setting/app-setting.component';
import {FormTeacherComponent} from './presentation/components/page/teachers/form-teacher/form-teacher.component';
import {TeacherComponent} from './presentation/components/page/teachers/teacher/teacher.component';
import {UserComponent} from './presentation/components/page/users/user/user.component';
import {FormUserComponent} from './presentation/components/page/users/form-user/form-user.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: AuthComponent },
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'student', component: StudentComponent },
      { path: 'student/add', component: FormStudentComponent },
      { path: 'report', component: ReportComponent },
      { path: 'school', component: SchollComponent },
      { path: 'appSettings', component: AppSettingComponent },

      { path: 'teacher', component: TeacherComponent },
      { path: 'teacher/add', component: FormTeacherComponent },

      { path: 'user', component: UserComponent },
      { path: 'user/add', component: FormUserComponent },
    ],
  },
];
