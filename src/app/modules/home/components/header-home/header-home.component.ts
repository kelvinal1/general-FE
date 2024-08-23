import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header-home',
  templateUrl: './header-home.component.html',
  styleUrls: ['./header-home.component.css']
})
export class HeaderHomeComponent {


  constructor(private router: Router){

  }

  goSpace(index: any){
    if (index== 1) this.router.navigateByUrl("users")
  }

}
