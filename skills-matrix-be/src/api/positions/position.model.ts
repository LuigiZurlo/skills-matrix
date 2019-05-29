import * as mongoose from "mongoose";
import { Project } from "../projects/project.model";
import { Competency } from "../competencies/competency.model";

export interface Position extends mongoose.Document {
  name: string,
  display_name: string,
  team: string,
  project: Project['_id'],
  competencies: Array<Competency['_id']>
}

const PositionSchema: mongoose.Schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      lowercase: true
    },
    display_name: {
      type: String,
      required: true
    },
    team: {
      type: String
    },
    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Project',
      required: true
    },
    competencies: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Competency'
    }]
  },
  {
    timestamps: true,
    useNestedStrict: true
  }
);

PositionSchema.index({name: 1, team: 1, project: 1}, {unique: true});

export default mongoose.model<Position>("Position", PositionSchema);
