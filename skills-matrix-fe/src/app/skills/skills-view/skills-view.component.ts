import { Component, OnInit } from '@angular/core';
import {GetSkillsServiceResponse, Skill} from '../../models/skill/skill.model';
import {SkillService} from '../../services/skill/skill.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-skills-view',
  templateUrl: './skills-view.component.html',
  styleUrls: ['./skills-view.component.css']
})
export class SkillsViewComponent implements OnInit {

  skillId: string;
  skill: Skill;

  constructor(private skillService: SkillService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.skillId = this.route.snapshot.paramMap.get('id');
    this.fetchSkill(this.skillId);
  }

  fetchSkill(id) {
    this.skillService
      .getSkillById(id)
      .subscribe( (getSkillByIdServiceResponse: GetSkillsServiceResponse) => {
        this.skill = getSkillByIdServiceResponse.data;
        console.log('Data requested ...');
        console.log(this.skill);
      });
  }

  editSkill(id) {
    this.router.navigate([`/skills/${id}/edit`]);
  }

  deleteSkill(id) {
    this.skillService
      .deleteSkill(id)
      .subscribe(() => {
        this.router.navigate([`/skills`]);
      });
  }

}
