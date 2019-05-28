import {Component, OnInit} from '@angular/core';

import {FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-positions-create',
  templateUrl: './positions-create.component.html',
  styleUrls: ['./positions-create.component.css']
})
export class PositionsCreateComponent implements OnInit {

  myData = [
    {
      skill: "skill_1",
      level: 1
    },
    {
      skill: "skill_2",
      level: 2
    },
    {
      skill: "skill_3",
      level: 3
    },
    {
      skill: "skill_4",
      level: 4
    }
  ];

  skillLevels = [
    { value: 0, viewValue: 0 },
    { value: 1, viewValue: 1 },
    { value: 2, viewValue: 2 },
    { value: 3, viewValue: 3 }
  ];

  displayedColumns = ['skill', 'level'];

  constructor(private _formBuilder: FormBuilder) {
  }

  ngOnInit() {
  }

}
