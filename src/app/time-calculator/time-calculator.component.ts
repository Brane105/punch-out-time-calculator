import { Component, OnInit } from '@angular/core';
import * as moment from 'moment-timezone';

@Component({
  selector: 'app-time-calculator',
  templateUrl: './time-calculator.component.html',
  styleUrls: ['./time-calculator.component.scss']
})
export class TimeCalculatorComponent implements OnInit {
  errorMessage: string = '';
  punchInTime: string = '';
  extraHours: string = '';
  punchOutTime: string = '';
  actualoutTime: string = '';
  minPunchInTime: string = '08:00';
  maxPunchInTime: string = '11:30';
  constructor() { }

  ngOnInit(): void {

  }

  // calculatePunchOutTime(): void {
  //   if (this.punchInTime === '' || this.extraHours === '') {
  //     this.errorMessage = 'Please provide valid input';
  //     return;
  //   }
  //   console.log(this.extraHours)
  //   console.log(typeof this.extraHours)
  //   // this.extraHours = `${this.extraHours}`
  //   if(this.extraHours.indexOf(':') !== -1){
  //     this.extraHours=this.extraHours.replace(':','.');
  //   }
  //   console.log(typeof this.extraHours,this.extraHours)
  //   const [punchInHours, punchInMinutes] = this.punchInTime.split(':').map(Number);
  //   const [extraInHours , extraInMinutes] = this.extraHours.split('.').map(Number);
  //   console.log(punchInHours,punchInMinutes);
  //   console.log(this.extraHours);
  //   console.log(extraInHours,extraInMinutes);


  //   // this.punchOutTime = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  // }
  // import * as moment from 'moment-timezone';

  calculatePunchOutTime(): void {
    if (this.punchInTime === '' || this.extraHours === '' || !this.extraHours.includes('.') || this.extraHours.length > 5) {
      this.errorMessage = 'Please provide valid input';
      this.resetForm();
      return;
    }

    const punchInMoment = moment.tz(this.punchInTime, 'HH:mm', 'Asia/Kolkata');
    const pout = punchInMoment.clone().add(9,'hours');
    this.actualoutTime = pout.format('HH:mm');
    const workDuration = moment.duration(9, 'hours');
    // console.log('punchInMoment',punchInMoment);
    // console.log('workDuration',workDuration);
    // Splitting the extraHours string by '.' or ':' to extract hours and minutes
    let extraHours = this.extraHours;
    if (extraHours.includes(':')) {
      extraHours = extraHours.replace(':', '.');
    }
    // console.log('extrahours',extraHours);
    const [hoursPart, minutesPart] = extraHours.split('.');
    const extraInHours = parseInt(hoursPart);
    const extraInMinutes = parseInt(minutesPart || '0');
    // console.log(extraInHours,extraInMinutes,'extra extract')
    const extraDuration = moment.duration({ hours: extraInHours, minutes: extraInMinutes });
    // console.log(extraDuration,'extraduration')
    const punchOutMoment = punchInMoment.clone().add(workDuration).subtract(extraDuration);
    // console.log(punchOutMoment,'punchoutmoment')
    this.punchOutTime = punchOutMoment.format('HH:mm');
    this.errorMessage = '';
  }

  resetForm(): void {
    this.punchInTime = '';
    this.extraHours = '';
    this.punchOutTime = '';
    this.actualoutTime = '';
    // this.errorMessage = '';
  }

  resetErrorMessage(): void {
    this.errorMessage = '';
  }
}
