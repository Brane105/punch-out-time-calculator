import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-time-calculator',
  templateUrl: './time-calculator.component.html',
  styleUrls: ['./time-calculator.component.scss']
})
export class TimeCalculatorComponent implements OnInit {
  errorMessage: string = '';
  punchInTime: string = '';
  extraHours: number = 0;
  punchOutTime: string = '';

  constructor() { }

  ngOnInit(): void {
    
  }

  calculatePunchOutTime(): void {
    if (this.punchInTime == '' || this.extraHours == 0) {
      this.errorMessage = 'Please provide valid input';
      return;
    }
    
    const [hours, minutes] = this.punchInTime.split(':').map(Number);
    const date = new Date();
    date.setHours(hours, minutes + (9 - this.extraHours) * 60, 0);

    this.punchOutTime = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  resetForm(): void {
    this.punchInTime = '';
    this.extraHours = 0;
    this.punchOutTime = '';
    this.errorMessage = '';
  }

  resetErrorMessage(): void {
    this.errorMessage = '';
  }
}
