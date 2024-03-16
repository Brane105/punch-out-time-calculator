import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TimeCalculatorComponent } from './time-calculator/time-calculator.component';

const routes: Routes = [
  {path:"",component : TimeCalculatorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
