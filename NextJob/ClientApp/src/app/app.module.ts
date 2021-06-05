import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { JobsComponent } from './jobs/jobs.component';
import { ApplicationDialog } from './jobs/jobs.component';
import { AdminDialog } from './jobs/jobs.component';
import { AddEditJobDialog } from './jobs/jobs.component';
import { DeleteJobDialog } from './jobs/jobs.component';
import { ApplicantsDialog } from './jobs/jobs.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatExpansionModule } from '@angular/material/expansion';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    JobsComponent,
    ApplicationDialog,
    AdminDialog,
    AddEditJobDialog,
    DeleteJobDialog,
    ApplicantsDialog
  ],
  entryComponents: [ApplicationDialog, AdminDialog, AddEditJobDialog, DeleteJobDialog, ApplicantsDialog],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', component: JobsComponent, pathMatch: 'full' },
      { path: 'jobs', component: JobsComponent },
    ]),
    BrowserAnimationsModule,
    MatCardModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatExpansionModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
