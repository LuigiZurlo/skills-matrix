import * as mongoose from "mongoose";
import {IProject} from "../projects/project.model";
import {IResource} from "../resources/resource.model";
import {IPosition} from "../positions/position.model";


export interface IMission extends mongoose.Document {
  project: IProject['_id'],
  resource: IResource['_id'],
  position: IPosition['_id'],
  start_date: Date,
  end_date: Date
}

const MissionSchema: mongoose.Schema = new mongoose.Schema(
  {
    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Project',
      required: true
    },
    resource: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Resource',
      required: true
    },
    position: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Position',
      required: true
    },
    start_date: {
      type: Date,
      required: true
    },
    end_date: {
      type: Date,
      required: true
    }
  },
  {
    timestamps: true,
    useNestedStrict: true
  }
);

MissionSchema.index({project: 1, resource: 1, position: 1, start_date: 1, end_date: 1}, {unique: true});

export default mongoose.model<IMission>("Mission", MissionSchema);
