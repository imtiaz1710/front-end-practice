import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-data-binding',
  templateUrl: './data-binding.component.html',
  styleUrls: ['./data-binding.component.scss']
})
export class DataBindingComponent implements OnInit {
  public answer = 0;
  public numbers = [2, 1, 3, 1, 3]

  constructor() {
    setInterval(()=> this.answer++,
      1000
    );
  }

  onClick(value: number)
  {
    this.answer = value;
  }
  ngOnInit(): void {
  }

}
