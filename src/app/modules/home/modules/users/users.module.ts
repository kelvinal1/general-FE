import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UsersManagementComponent } from './components/users-management/users-management.component';
import { NgZorroAntdModule } from 'src/app/ng-zorro.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeModule } from '../../home.module';


@NgModule({
  declarations: [
    UsersManagementComponent
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgZorroAntdModule,
    HomeModule 
  ]
})
export class UsersModule { }
