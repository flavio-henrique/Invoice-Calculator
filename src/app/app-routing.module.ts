import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FormComponent } from './form/form.component';
import { ProcessOrderComponent } from './process-order/process-order.component';

const routes: Routes = [
  {
    path: 'form',
    component: FormComponent,
    children: [
      { path: 'process-order', component: ProcessOrderComponent }
    ]
  },
  {
    path: '',
    redirectTo: '/form',
    pathMatch: 'full'
  },
  { path: '**', redirectTo: '/form' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
