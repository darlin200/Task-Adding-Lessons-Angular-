import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AppComponent} from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {ModalComponent, DialogComponent} from './modal/modal.component';
import {MatCardModule, MatDialogModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatTableModule} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {DataService} from './user.service';


@NgModule( {
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    MatCardModule,
    MatDialogModule,
    MatButtonModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule
  ],
  entryComponents: [
    DialogComponent
  ],
  declarations: [
    AppComponent,
    ModalComponent,
    DialogComponent,
  ],
  bootstrap: [AppComponent],
  providers: [DataService]
} )
export class AppModule {}
