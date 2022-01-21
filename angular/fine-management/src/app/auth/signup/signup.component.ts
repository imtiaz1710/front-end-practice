import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder } from '@angular/forms'

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  public signupForm !: FormGroup;
  constructor(private formbuilder : FormBuilder) { }

  ngOnInit(): void {
    this.signupForm = this.formbuilder.group({
      email:['']
    })
  }
}
