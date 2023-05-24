import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ItemShowComponent } from './item-show/item-show.component';

const routes: Routes = [
  {
    path:'' , component:ItemShowComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ItemRoutingModule { }
