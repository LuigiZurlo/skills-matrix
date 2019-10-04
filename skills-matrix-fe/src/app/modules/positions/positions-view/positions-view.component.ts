import { Component, OnInit } from '@angular/core';
import {PositionService} from "../../../services/position/position.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-positions-view',
  templateUrl: './positions-view.component.html',
  styleUrls: ['./positions-view.component.css']
})
export class PositionsViewComponent implements OnInit {

  positionId: string;

  position: any;

  constructor(private positionService: PositionService,
              private router: Router,
              private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.positionId = this.activatedRoute.snapshot.paramMap.get('id');
    this.fetchPosition(this.positionId);
  }

  fetchPosition(id) {
    this.positionService
      .getPositionById(id)
      .subscribe( (response: any) => {
        this.position = response.data;
        console.log('Data requested: Position infos');
        console.log(this.position);
      });
  }

}
