import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit{

  constructor (private router : Router) {}

  ngOnInit(): void {
      //nothing
  }
  menuList = [
    { id: 1, name: 'Subscription', isSelect: true, icon: 'icofont-badge', route: '/subscription'},
    { id: 2, name: 'Workshop', isSelect: false, icon: 'icofont-tools-bag', route: '/workshop'},
    { id: 3, name: 'Batches', isSelect: false, icon: 'icofont-list', route: '/batch'}    
  ]
  selectMenu(i: number, route: string) {
    
    this.router.navigate([`${route}`]);
    for (const m of this.menuList) {
      Object.assign(m, { isSelect: false });
    }
    this.menuList[i].isSelect = true;
  }
}
