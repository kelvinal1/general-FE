import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HeaderHomeComponent } from './components/header-home/header-home.component';
import { FooterHomeComponent } from './components/footer-home/footer-home.component';
import { HomeGeneralComponent } from './components/home-general/home-general.component';
import { NgZorroAntdModule } from 'src/app/ng-zorro.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FilterByAttributePipe } from './pipes/filter-by-attribute.pipe';


@NgModule({
  declarations: [
    HeaderHomeComponent,
    FooterHomeComponent,
    HomeGeneralComponent,
    FilterByAttributePipe
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HomeRoutingModule,
    NgZorroAntdModule
  ],
  exports: [
    FilterByAttributePipe 
  ]
})
export class HomeModule { }
