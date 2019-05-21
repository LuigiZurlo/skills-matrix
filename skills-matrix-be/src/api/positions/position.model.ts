import * as mongoose from "mongoose";
import { IProject } from "../projects/project.model";
import { ICompetency } from "../competencies/competency.model";

export interface IPosition extends mongoose.Document {
  name: string,
  display_name: string,
  project: IProject['_id'],
  competencies: Array<ICompetency['_id']>
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

PositionSchema.index({name: 1, project: 1}, {unique: true});

export default mongoose.model<IPosition>("Position", PositionSchema);
