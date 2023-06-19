import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser'; 
import { DragModule } from "./drag.module";

import { AppComponent } from './app.component'; 

@NgModule({ 
  declarations:[AppComponent],
  imports: [
    BrowserModule,
    DragModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
