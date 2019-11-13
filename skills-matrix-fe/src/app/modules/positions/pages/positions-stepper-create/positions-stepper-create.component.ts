import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {PositionService} from '../../../../core/services/position/position.service';

@Component({
  selector: 'app-positions-stepper-create',
  templateUrl: './positions-stepper-create.component.html',
  styleUrls: ['./positions-stepper-create.component.css']
})
export class PositionsStepperCreateComponent implements OnInit {

  positionCreateForm: FormGroup;
  @Input() projectId: string;

  @Output() notify: EventEmitter<string> = new EventEmitter<string>();

  constructor(private formBuilder: FormBuilder,
              private positionService: PositionService) {
    this.positionCreateForm = this.formBuilder.group({
        name: ['', Validators.required],
        description: ['']
      }
    );
  }

  ngOnInit() {
  }

  addPosition(name, description) {
    this.positionService.createPosition(this.projectId, name, description).subscribe(pid=> {
      this.notify.emit(JSON.parse(JSON.stringify(pid)));
    });
  }

}
