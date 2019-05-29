import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-matrices-view',
  templateUrl: './matrices-view.component.html',
  styleUrls: ['./matrices-view.component.css']
})
export class MatricesViewComponent implements OnInit {

  data = {
    resource: 'AAN',
    position: 'DEV OBE',
    matrix: [
      {
        skill_id: 's1',
        skill: 'C++',
        required_level: 0,
        resource_level: 1
      },
      {
        skill_id: 's2',
        skill: 'Java',
        required_level: 3,
        resource_level: 1
      },
      {
        skill_id: 's3',
        skill: 'Confluence',
        required_level: 3,
        resource_level: 1
      },
      {
        skill_id: 's4',
        skill: 'Win@proach',
        required_level: 3,
        resource_level: 3
      }
      ]
  };

  constructor() { }

  ngOnInit() {
  }

}
