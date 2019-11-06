import {Component, OnInit} from '@angular/core';
import {MissionService} from '../../../../core/services/mission/mission.service';
import {Router} from '@angular/router';
import {GetMissionsServiceResponse} from '../../../../core/models/mission/mission.model';


@Component({
  selector: 'app-missions-list',
  templateUrl: './missions-list.component.html',
  styleUrls: ['./missions-list.component.css']
})
export class MissionsListComponent implements OnInit {

  missions: any[];
  displayedColumns = ['id', 'resource_id', 'project_id', 'position_id', 'start_date', 'end_date', 'is_active'];

  constructor(private missionService: MissionService, private router: Router) {
  }

  ngOnInit() {
    this.fetchMissions();
  }

  fetchMissions() {
    this.missionService
      .getMissions()
      .subscribe((getMissionsServiceResponse: GetMissionsServiceResponse) => {
        this.missions = getMissionsServiceResponse.data;
      });
  }

  async viewMission(id) {
    await this.router.navigate([`/missions/${id}`]);
  }
}
