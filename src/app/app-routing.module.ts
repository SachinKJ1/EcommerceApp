import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('./admin/admin.module').then((m) => m.AdminModule),
  },
  {
    path: 'cart',
    loadChildren: () =>
      import('./shopping/shopping.module').then((m) => m.ShoppingModule),
  },
  {
    path: ':id',
    loadChildren: () => import('./item/item.module').then((m) => m.ItemModule),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'enabled', // To scroll to top on Route changes
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
