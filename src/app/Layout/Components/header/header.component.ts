import {Component, HostBinding} from '@angular/core';
import {select} from '@angular-redux/store';
import {Observable} from 'rxjs';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import {ThemeOptions} from '../../../theme-options';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent {

  faEllipsisV = faEllipsisV;

  constructor(public globals: ThemeOptions, private httpClient: HttpClient) {
    this.getData();
  }
  data: any = {};
  getData(){
    this.httpClient.get('http://localhost:8080/api/getData').subscribe(res => {
      this.data = res;
      console.log(res);
    });
  }

  @HostBinding('class.isActive')
  get isActiveAsGetter() {
    return this.isActive;
  }

  isActive: boolean;

  @select('config') public config$: Observable<any>;

  toggleSidebarMobile() {
    this.globals.toggleSidebarMobile = !this.globals.toggleSidebarMobile;
  }

  toggleHeaderMobile() {
    this.globals.toggleHeaderMobile = !this.globals.toggleHeaderMobile;
  }

}
