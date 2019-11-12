import { Component, OnInit } from '@angular/core';
import {GetResourcesServiceResponse, Resource} from '../../../../core/models/resource/resource.model';
import {ResourceService} from '../../../../core/services/resource/resource.service';
import {ActivatedRoute, Router} from '@angular/router';

import { Chart } from 'chart.js';
import {resource_competencies} from "../../../../../../../skills-matrix-be/src/db/models/ALL";

@Component({
  selector: 'app-resources-view',
  templateUrl: './resources-view.component.html',
  styleUrls: ['./resources-view.component.css']
})
export class ResourcesViewComponent implements OnInit {

  resourceId: string;
  resource: any;
  lineChart: any;
  competencies: resource_competencies[];

  constructor(private resourceService: ResourceService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.resourceId = this.route.snapshot.paramMap.get('id');
    this.fetchResource(this.resourceId);

    this.lineChart = new Chart('lineChart', {
      type: 'bar',
      data: {
        labels: ['Programming Languages & DB', 'Technologies', 'Amadeus Tools', 'Software & Tools', 'Methodologies & Processes', 'TNT Topics'],
        datasets: [{
          label: 'actual',
          backgroundColor: "rgba(200,0,0,0.2)",
          lineTension: 0,
          data: [2, 4, 3, 2, 3.5, 1]
        }]
      },
      options: {
        responsive: true,
        legend: {
          display: true,
          position: 'bottom'
        },
        tooltips: {
          enabled: true,
          callbacks: {
            label: function(tooltipItem, data) {
              return data.datasets[tooltipItem.datasetIndex].label + ' : ' + data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
            }
          }
        }
      }
    });

  }

  fetchResource(id) {
    this.resourceService
      .getResourceById(id)
      .subscribe( (getResourceByIdServiceResponse: GetResourcesServiceResponse) => {
        this.resource = getResourceByIdServiceResponse.data;
        console.log('Data requested ...');
        console.log(this.resource);
      });
  }

  editResource(id) {
    this.router.navigate([`/resources/${id}/edit`]);
  }

  deleteResource(id) {
    this.resourceService
      .deleteResource(id)
      .subscribe(() => {
        this.router.navigate([`/resources`]);
      });
  }

}
