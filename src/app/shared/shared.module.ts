import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from './spinner/spinner.component';
import { FilterPipe } from '../pipes/filter.pipe';



@NgModule({
  declarations: [
    SpinnerComponent,FilterPipe
  ],
  imports: [
    CommonModule
  ],
  exports:[SpinnerComponent,FilterPipe]
})
export class SharedModule { }
