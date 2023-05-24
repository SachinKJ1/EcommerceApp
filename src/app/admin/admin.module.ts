import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { MatIconModule } from '@angular/material/icon';
import { EditComponent } from './edit/edit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddComponent } from './add/add.component';
import { FilterPipe } from '../pipes/filter.pipe';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [AdminHomeComponent, EditComponent, AddComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MatIconModule,
    ReactiveFormsModule,
    SharedModule,
  ],
})
export class AdminModule {}
