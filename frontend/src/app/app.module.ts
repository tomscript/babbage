import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';

import {
  MatSidenavModule,
  MatChipsModule,
  MatIconModule,
  MatButtonModule,
  MatCheckboxModule,
  MatListModule,
  MatFormFieldModule,
  MatInputModule,
  MatToolbarModule,
} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [AppComponent],
  imports: [
    MatSidenavModule,
    MatChipsModule,
    MatIconModule,
    MatCheckboxModule,
    BrowserAnimationsModule,
    MatButtonModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    MatListModule,
    MatFormFieldModule,
    MatInputModule,
    MatToolbarModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
