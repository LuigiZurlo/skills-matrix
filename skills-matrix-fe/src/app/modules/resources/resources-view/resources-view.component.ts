import { Component, OnInit } from '@angular/core';
import {GetResourcesServiceResponse, Resource} from '../../../models/resource/resource.model';
import {ResourceService} from '../../../services/resource/resource.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-resources-view',
  templateUrl: './resources-view.component.html',
  styleUrls: ['./resources-view.component.css']
})
export class ResourcesViewComponent implements OnInit {

  resourceId: string;
  resource: Resource;

  constructor(private resourceService: ResourceService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.resourceId = this.route.snapshot.paramMap.get('id');
    this.fetchResource(this.resourceId);
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
