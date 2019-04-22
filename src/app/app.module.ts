import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '../environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NumericComponent } from './numeric.component';
import { FormattedNumberComponent } from './formattedNumber.component';

import { ConvertorEventsService } from './convertor-events.service';

@NgModule({
  declarations: [
    AppComponent,
    NumericComponent,
    FormattedNumberComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
 	  AngularFirestoreModule
  ],
  providers: [ConvertorEventsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
