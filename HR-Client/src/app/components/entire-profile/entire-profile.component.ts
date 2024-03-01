import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-entire-profile',
  templateUrl: './entire-profile.component.html',
  styleUrls: ['./entire-profile.component.css'],
})
export class EntireProfileComponent implements OnInit {
  @Input() profile: any;

  constructor() {}

  ngOnInit(): void {}
}
