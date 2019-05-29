import * as mongoose from "mongoose";
import { Competency } from "../competencies/competency.model";

export interface Resource extends mongoose.Document {
  name: {
    first: string,
    last: string
  },
  employee_id: string,
  competencies: Array<Competency['_id']>
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

export default mongoose.model<Resource>("Resource", ResourceSchema);
