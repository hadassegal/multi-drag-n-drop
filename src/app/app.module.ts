import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {ReorderListComponent} from './reorder-list/reorder-list.component'
import {CommonModule} from '@angular/common'

@NgModule({
  declarations: [
    AppComponent,
    ReorderListComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
