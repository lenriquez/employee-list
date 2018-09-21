import { Component, OnInit } from '@angular/core';
import { Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Input } from '@angular/core';
import { Validators } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-job-title',
  templateUrl: './job-title.component.html',
  styleUrls: ['./job-title.component.scss']
})
export class JobTitleComponent implements OnInit {
  @Input('area')
  set area(value: string) {
    this._area = value;
    this.titles = this.area === 'services' ? this.serviceTitle : this.kitchenTitle;
    if (this.form) { this.form.get('jobTitle').setValue(''); }
  }
  @Input() jobTitle: string;
  @Output() selectedTitle = new EventEmitter<string>();

  serviceTitle = ['Manager', 'Host', 'TuttoFare', 'Waitress', 'Dining Room Manager'];
  kitchenTitle = ['Chef', 'Sous Chef', 'Dishwasher', 'Cook'];
  titles: string[];
  form: FormGroup;
  _area: string;

  constructor() {}

  ngOnInit() {
    this.form = new FormGroup({
      jobTitle: new FormControl(this.jobTitle, Validators.required)
    });
  }

  selected(title) {
    this.selectedTitle.emit(title);
  }

  get area() {
    return this._area;
  }

  getError(fc: FormControl) {
    return fc.hasError('required') ? 'You must enter a value' :
    fc.hasError('pattern') ? 'Invalid characters' :
    fc.hasError('validateAge') ? 'Employee needs to be 18 years old or older' :
    '';
  }
}
