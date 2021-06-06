import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { MatBottomSheet, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { Admin } from '../models/Admin';
import { Job } from '../models/Job';
import { Notification } from '../models/Notification';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent {
  isExpanded = false;
  authStatus = false;
  private adminId: string = "EFB5B29C-ED6A-434E-8444-86F7A1297128";

  constructor(
    private http: HttpClient,
    @Inject('BASE_URL') private baseUrl: string,
    private _bottomSheet: MatBottomSheet
  ) {
    http.get<Admin>(baseUrl + 'api/admins/' + this.adminId).subscribe(result => {
      this.authStatus = result.isAuthenticated;
      console.log(this.authStatus)
    }, error => console.error(error));
  }

  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }

  openNotificationsBottomSheet() {
    this._bottomSheet.open(NotificationsBottomSheet);
  }
}

@Component({
  selector: 'notifications-bottom-sheet',
  templateUrl: 'notifications-bottom-sheet.component.html',
})
export class NotificationsBottomSheet {
  public notifications: Notification[];

  constructor(
    private _bottomSheetRef: MatBottomSheetRef<NotificationsBottomSheet>,
    private http: HttpClient,
    @Inject('BASE_URL') private baseUrl: string,) {
    this.http.get<Notification[]>(this.baseUrl + 'api/notifications').subscribe(result => {
      this.notifications = result;
    }, error => console.error(error));
  }
}
