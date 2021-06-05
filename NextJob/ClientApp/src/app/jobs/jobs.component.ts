import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Job } from './Job'

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html'
})
export class JobsComponent {
  public jobs: Job[];

  constructor(
    private http: HttpClient,
    @Inject('BASE_URL') private baseUrl: string,
    private router: Router
  ) {
    http.get<Job[]>(baseUrl + 'api/jobs').subscribe(result => {
      this.jobs = result;
    }, error => console.error(error));
  }
}
