import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { Nav1Component } from './nav1/nav1.component';
import { Nav2Component } from './nav2/nav2.component';

const routes: Routes = [
  {
    path: '',
    component: AppComponent,
  },
  {
    path: 'nav1',
    component: Nav1Component,
  },
  {
    path: 'nav2',
    component: Nav2Component,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
