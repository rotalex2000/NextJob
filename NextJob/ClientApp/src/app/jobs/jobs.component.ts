import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Job } from './Job'
import { Application } from './Application';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface ApplicationDialogData {
  jobId: string
  firstName: string
  lastName: string
  email: string
  phone: string
  message: string
}

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html'
})
export class JobsComponent {
  public jobs: Job[];

  // public application: Application = <Application>{}

  constructor(
    private http: HttpClient,
    @Inject('BASE_URL') private baseUrl: string,
    private router: Router,
    public dialog: MatDialog
  ) {
    http.get<Job[]>(baseUrl + 'api/jobs').subscribe(result => {
      this.jobs = result;
    }, error => console.error(error));
  }

  public openApplicationDialog(jobId): void {
    console.log(jobId);
    const dialogRef = this.dialog.open(ApplicationDialog, {
      width: '250px',
      data: {
        jobId: jobId,
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        message: ""
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      let application = <Application>{
        jobId: result.jobId,
        candidateFirstName: result.firstName,
        candidateLastName: result.lastName,
        candidateEmail: result.email,
        candidatePhone: result.phone,
        message: result.message
      }
      this.sendApplication(application)
    });
  }

  public sendApplication(application) {
    this.http.post(this.baseUrl + 'api/applications', application).subscribe(result => {
      this.router.navigateByUrl("/jobs");
    }, error => console.error(error))
  }
}

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'application-dialog.component.html',
})
export class ApplicationDialog {

  constructor(
    public dialogRef: MatDialogRef<ApplicationDialog>,
    @Inject(MAT_DIALOG_DATA) public data: ApplicationDialogData) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
