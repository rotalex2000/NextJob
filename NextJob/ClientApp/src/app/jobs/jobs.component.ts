import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Job } from './Job'
import { Application } from './Application';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Admin } from './Admin';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html'
})
export class JobsComponent {
  public authStatus: boolean = false;
  private adminId: string = "EFB5B29C-ED6A-434E-8444-86F7A1297128";
  public jobs: Job[];

  // public application: Application = <Application>{}

  constructor(
    private http: HttpClient,
    @Inject('BASE_URL') private baseUrl: string,
    private router: Router,
    public dialog: MatDialog
  ) {
    http.get<Admin>(baseUrl + 'api/admins/' + this.adminId).subscribe(result => {
      this.authStatus = result.isAuthenticated;
      console.log(this.authStatus)
    }, error => console.error(error));
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
      this.reload()
    });
  }

  public handleAuthentication(): void {
    if (this.authStatus == true) {
      this.logout()
    } else {
      this.openLoginDialog()
    }
  }

  public openLoginDialog(): void {
    const dialogRef = this.dialog.open(AdminDialog, {
      width: '250px',
      data: {
        adminId: this.adminId,
        password: ""
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.reload()
    });
  }

  public logout() {
    this.http.get<Admin>(`${this.baseUrl}api/admins/${this.adminId}`).subscribe(result => {
      if (result != null) {
        this.http.put(this.baseUrl + 'api/admins/' + this.adminId, <Admin>{
          id: this.adminId,
          username: result.username,
          password: result.password,
          isAuthenticated: false
        }).subscribe(result => {
          this.reload()
        }, error => console.error(error))
      }
    })
  }

  public openAddEditJobDialog(job = null): void {
    const dialogRef = this.dialog.open(AddEditJobDialog, {
      width: '250px',
      data: job == null ? {
        edit: false,
        id: "",
        title: "",
        field: "",
        description: "",
        workplace: "",
        careerLevel: "",
        type: ""
      } : {
          edit: true,
          id: job.id,
          title: job.title,
          field: job.field,
          description: job.description,
          workplace: job.workplace,
          careerLevel: job.careerLevel,
          type: job.type
        }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.reload();
    });
  }

  public openDeleteJobDialog(job): void {
    const dialogRef = this.dialog.open(DeleteJobDialog, {
      width: '250px',
      data: {
        id: job.id,
        title: job.title
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.reload()
    });
  }

  public openApplicantsDialog(jobId): void {
    const dialogRef = this.dialog.open(ApplicantsDialog, {
      width: '500px',
      data: {
        id: jobId
      }
    });
  }

  public reload() {
    let currentUrl = this.router.url;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate([currentUrl]);
  }
}

// DIALOGS

@Component({
  selector: 'application-dialog',
  templateUrl: 'application-dialog.component.html',
})
export class ApplicationDialog {

  constructor(
    public dialogRef: MatDialogRef<ApplicationDialog>,
    @Inject(MAT_DIALOG_DATA) public data: ApplicationDialogData,
    private http: HttpClient,
    @Inject('BASE_URL') private baseUrl: string,) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onApplyClicked(): void {
    this.sendApplication(this.data)
  }

  public sendApplication(application) {
    this.http.post(this.baseUrl + 'api/applications', application).subscribe(result => {
      this.dialogRef.close()
    }, error => console.error(error))
  }

}

@Component({
  selector: 'admin-dialog',
  templateUrl: 'admin-dialog.component.html',
})
export class AdminDialog {

  constructor(
    public dialogRef: MatDialogRef<AdminDialog>,
    @Inject(MAT_DIALOG_DATA) public data: AdminDialogData,
    private http: HttpClient,
    @Inject('BASE_URL') private baseUrl: string,) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onLogInClicked(): void {
    this.login({ password: this.data.password })
  }

  public login(credentials) {
    this.http.get<Admin>(`${this.baseUrl}api/admins/login/${credentials.password}`).subscribe(result => {
      if (result != null) {
        this.http.put(this.baseUrl + 'api/admins/' + this.data.adminId, <Admin>{
          id: this.data.adminId,
          username: result.username,
          password: result.password,
          isAuthenticated: true
        }).subscribe(result => {
          this.dialogRef.close()
        }, error => console.error(error))
      }
    }, error => console.error(error))
  }

}

@Component({
  selector: 'add-edit-job-dialog',
  templateUrl: 'add-edit-job-dialog.component.html',
})
export class AddEditJobDialog {

  constructor(
    public dialogRef: MatDialogRef<AddEditJobDialog>,
    @Inject(MAT_DIALOG_DATA) public data: AddEditJobDialogData,
    private http: HttpClient,
    @Inject('BASE_URL') private baseUrl: string,) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSaveClicked(): void {
    let newJob = this.data.edit ? <Job>{
      id: this.data.id,
      title: this.data.title,
      field: this.data.field,
      description: this.data.description,
      workplace: this.data.workplace,
      careerLevel: this.data.careerLevel,
      type: this.data.type
    } : <Job>{
      title: this.data.title,
      field: this.data.field,
      description: this.data.description,
      workplace: this.data.workplace,
      careerLevel: this.data.careerLevel,
      type: this.data.type
    }
    this.data.edit ? this.updateJob(newJob) : this.addJob(newJob)
  }

  public addJob(job) {
    this.http.post(this.baseUrl + 'api/jobs', job).subscribe(result => {
      this.dialogRef.close();
    }, error => console.error(error))
  }

  public updateJob(job) {
    this.http.put(this.baseUrl + 'api/jobs/' + job.id, job).subscribe(result => {
      this.dialogRef.close();
    }, error => console.error(error))
  }

}

@Component({
  selector: 'delete-job-dialog',
  templateUrl: 'delete-job-dialog.component.html',
})
export class DeleteJobDialog {

  constructor(
    public dialogRef: MatDialogRef<DeleteJobDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DeleteJobDialogData,
    private http: HttpClient,
    @Inject('BASE_URL') private baseUrl: string,) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onDeleteClicked(): void {
    this.deleteJob(this.data.id)
  }

  public deleteJob(id: string) {
    this.http.delete(this.baseUrl + 'api/jobs/' + id).subscribe(result => {
      this.dialogRef.close();
    }, error => console.error(error))
  }

}

@Component({
  selector: 'applicants-dialog',
  templateUrl: 'applicants-dialog.component.html',
})
export class ApplicantsDialog {

  public applications: Application[]
  public panelOpenState = false

  constructor(
    public dialogRef: MatDialogRef<ApplicantsDialog>,
    @Inject(MAT_DIALOG_DATA) public data: ApplicantsDialogData,
    private http: HttpClient,
    @Inject('BASE_URL') private baseUrl: string,
  ) {
    http.get<Application[]>(baseUrl + 'api/applications/job/' + this.data.id).subscribe(result => {
      this.applications = result;
    }, error => console.error(error));
  }

  onDismissClick(): void {
    this.dialogRef.close();
  }

}

export interface ApplicationDialogData {
  jobId: string
  firstName: string
  lastName: string
  email: string
  phone: string
  message: string
}

export interface AdminDialogData {
  adminId: string
  password: string
}

export interface AddEditJobDialogData {
  edit: boolean
  id: string
  title: string
  field: string
  description: string
  workplace: string
  careerLevel: string
  type: string
}

export interface DeleteJobDialogData {
  id: string
  title: string
}

export interface ApplicantsDialogData {
  id: string
}
