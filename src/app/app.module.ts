import { StloginGuard } from './guards/stlogin.guard';
import { StarsService } from './services/stars.service';
import { TeacherComponent } from './components/teacher/teacher.component';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { environment } from './../environments/environment';
import { FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, forwardRef, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireModule } from 'angularfire2';
// import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';
import { Routes, RouterModule, CanActivate } from '@angular/router';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { RatingComponent } from './components/rating/rating.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SigninComponent } from './components/signin/signin.component';
import { AdminComponent } from './components/admin/admin.component';
import { TeachersService } from './services/teachers.service';
import { AddTeacherComponent } from './components/add-teacher/add-teacher.component';
import { DropZoneDirective } from './drop-zone.directive';
import { FileSizePipe } from './file-size.pipe';
import { EvaluationProComponent } from './components/evaluation-pro/evaluation-pro.component';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { RatingModule } from 'ngx-bootstrap/rating';
import { AddquestionComponent } from './components/addquestion/addquestion.component';
import { QuestionsComponent } from './components/questions/questions.component';
import { QuestionService } from './services/question.service';
import { CommentModule } from 'ng2-comment';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { CommentService } from './services/comment.service';
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './guards/auth.guard';
import { RegisterGuard } from './guards/register.guard';
import { AddstudentComponent } from './components/addstudent/addstudent.component';
import { StudentService } from './services/student.service';
import { StudentsComponent } from './components/students/students.component';
import { PopoverModule } from 'ngx-bootstrap/popover';
import { StorageServiceModule} from 'angular-webstorage-service';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
// , canActivate: [AuthGuard]
const appRoute: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'rating', component: RatingComponent  , canActivate: [StloginGuard]},
  { path: 'login', component: SigninComponent },
  { path: 'admin', component: AdminComponent , canActivate: [AuthGuard]},
  { path: 'teachers', component: TeacherComponent , canActivate: [AuthGuard] },
  { path: 'question', component: QuestionsComponent , canActivate: [AuthGuard]},
  { path: 'addquestion', component: AddquestionComponent, canActivate: [AuthGuard]  },
  { path: 'addteacher', component: AddTeacherComponent , canActivate: [AuthGuard]} ,
  { path: 'evaluation/:id', component: EvaluationProComponent  , canActivate: [StloginGuard] },
  { path: 'addStudent', component: AddstudentComponent , canActivate: [AuthGuard] },
  { path: 'students', component: StudentsComponent , canActivate: [AuthGuard] },
  {path: '**', component: PageNotFoundComponent },
  {path: 'error', component: PageNotFoundComponent },



];

@NgModule({
  declarations: [
    AppComponent,
    RatingComponent,
    DashboardComponent,
    NavbarComponent,
    SigninComponent,
    AdminComponent,
    TeacherComponent,
    AddTeacherComponent,
    DropZoneDirective,
    FileSizePipe,
    EvaluationProComponent,
    AddquestionComponent,
    QuestionsComponent,
    AddstudentComponent,
    StudentsComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoute),
    AngularFireModule.initializeApp(environment.firebase, 'Evaluation'),
    AngularFirestoreModule,
    AngularFireStorageModule,
    FormsModule,
    FlashMessagesModule.forRoot(),
    BrowserAnimationsModule,
    Ng2SmartTableModule,
    TooltipModule.forRoot(),
    RatingModule.forRoot(),
    CommentModule,
    HttpModule,
    PopoverModule.forRoot(),
    BrowserModule,
    StorageServiceModule
  ],
  providers: [TeachersService,
    StarsService,
    QuestionService,
    CommentService,
    AuthService,
    AngularFireAuth,
    StudentService,
    StloginGuard,
    AuthGuard,
    RegisterGuard
  ],
  bootstrap: [AppComponent],
  schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {}
