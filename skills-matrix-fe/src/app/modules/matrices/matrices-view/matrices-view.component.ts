import { Component, OnInit } from '@angular/core';

import { Chart } from 'chart.js';

@Component({
  selector: 'app-matrices-view',
  templateUrl: './matrices-view.component.html',
  styleUrls: ['./matrices-view.component.css']
})
export class MatricesViewComponent implements OnInit {

  lineChart: any;

  constructor() {
  }

  ngOnInit() {
    this.lineChart = new Chart('lineChart', {
      type: 'radar',
      data: {
        labels: ['Programming Languages & DB', 'Technologies', 'Amadeus Tools', 'Software & Tools', 'Methodologies & Processes', 'TNT Topics'],
        datasets: [{
          label: 'actual',
          backgroundColor: "rgba(200,0,0,0.2)",
          lineTension: 0,
          data: ["2", 4, 3, 2, 3.5, 1]
        },{
          label: 'expected',
          backgroundColor: "rgba(0,0,200,0.2)",
          data: [3, 3, 3, 3, 3, 3]
        }]
      },
      options: {
        legend: {
          display: true,
          position: 'bottom'
        },
        scale: {
          ticks: {
            beginAtZero: true,
            min: 0,
            max: 4,
            stepSize: .5,
          }
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

}
