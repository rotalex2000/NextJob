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
import { DescriptionDialog } from './jobs/jobs.component';
import { NotificationsBottomSheet } from './nav-menu/nav-menu.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import { MatDividerModule } from '@angular/material/divider';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatSnackBarModule} from '@angular/material/snack-bar';


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
    ApplicantsDialog,
    DescriptionDialog,
    NotificationsBottomSheet
  ],
  entryComponents: [
    ApplicationDialog,
    AdminDialog,
    AddEditJobDialog,
    DeleteJobDialog,
    ApplicantsDialog,
    DescriptionDialog,
    NotificationsBottomSheet,
  ],
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
    MatExpansionModule,
    MatBottomSheetModule,
    MatIconModule,
    MatBadgeModule,
    MatDividerModule,
    MatToolbarModule,
    MatSnackBarModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
