import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  public signupForm !: FormGroup;
  constructor(private formBuilder : FormBuilder) { }

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      email:[''],
      password:[''],
      team:['']
    })
  }
}
