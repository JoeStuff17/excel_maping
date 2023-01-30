import { Component } from '@angular/core';
import { ApiService } from '../apiservice';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  constructor(private api:ApiService){}

}
