import * as mongoose from "mongoose";
import { ICompetency } from "../competencies/competency.model";

export interface IResource extends mongoose.Document {
  name: {
    first: string,
    last: string
  },
  employee_id: string,
  competencies: Array<ICompetency['_id']>
}

const ResourceSchema: mongoose.Schema = new mongoose.Schema(
  {
    name: {
      first: {
        type: String,
        required: true
      },
      last : {
        type: String,
        required: true
      }
    },
    employee_id: {
      type: String,
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

export default mongoose.model<IResource>("Resource", ResourceSchema);
