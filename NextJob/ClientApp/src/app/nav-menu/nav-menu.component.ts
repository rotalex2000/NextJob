import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { MatBottomSheet, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { Router } from '@angular/router';
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
  newNotificationsCount = 0;

  constructor(
    private http: HttpClient,
    @Inject('BASE_URL') private baseUrl: string,
    private _bottomSheet: MatBottomSheet
  ) {
    http.get<Admin>(baseUrl + 'api/admins/' + this.adminId).subscribe(result => {
      this.authStatus = result.isAuthenticated;
      console.log(this.authStatus)
      if (this.authStatus) {
        this.loadNotificationsCount()
      }
    }, error => console.error(error));
    
  }

  loadNotificationsCount() {
    this.http.get<number>(this.baseUrl + 'api/notifications/count').subscribe(result => {
      this.newNotificationsCount = result;
      console.log(this.newNotificationsCount)
    }, error => console.error(error));
  }

  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }

  openNotificationsBottomSheet() {
    const bottomSheetRef = this._bottomSheet.open(NotificationsBottomSheet);

    bottomSheetRef.afterDismissed().subscribe(() => {
      console.log('Bottom sheet dismissed.');
      this.loadNotificationsCount()
    });
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
    private router: Router,
    @Inject('BASE_URL') private baseUrl: string,) {
    this.http.get<Notification[]>(this.baseUrl + 'api/notifications').subscribe(result => {
      this.notifications = result;
      let i;
      for (i = 0; i < this.notifications.length; i++) {
        if (!this.notifications[i].seen) {
          let seenNotification = <Notification>{
            id: this.notifications[i].id,
            text: this.notifications[i].text,
            seen: true
          }
          this.http.put(this.baseUrl + 'api/notifications/' + this.notifications[i].id, seenNotification).subscribe(result => {
            console.log(`notification seen`)
          }, error => console.error(error))
        }
      }
    }, error => console.error(error));
  }

  onClearClicked() {
    this.http.delete(this.baseUrl + 'api/notifications').subscribe(result => {
      console.log('deleted all notifications')
      this._bottomSheetRef.dismiss()
    }, error => console.error(error))
  }
}

const reload = (router) => {
  let currentUrl = router.url;
  router.routeReuseStrategy.shouldReuseRoute = () => false;
  router.onSameUrlNavigation = 'reload';
  router.navigate([currentUrl]);
}
