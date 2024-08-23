import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeGeneralComponent } from './components/home-general/home-general.component';

const routes: Routes = [
  { path: '', component: HomeGeneralComponent,
    children: [
      { path: 'users', loadChildren: () => import('./modules/users/users.module').then(m => m.UsersModule), canActivate:[] },
    ]
  },
 

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
