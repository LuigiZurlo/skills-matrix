import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from "../../material.module";
import { PositionEditorComponent } from "./pages/position-editor/position-editor.component";
import { ReactiveFormsModule } from "@angular/forms";


@NgModule({
  declarations: [PositionEditorComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule
  ]
})
export class FormsModule { }
