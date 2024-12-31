import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-jersey',
  templateUrl: './jersey.component.html',
  styleUrls: ['./jersey.component.css']
})
export class JerseyComponent implements OnInit {


  @Input()
  jerseyNum!: number;

  constructor() { }

  ngOnInit(): void {
  }

}
