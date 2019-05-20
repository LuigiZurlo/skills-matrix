import * as mongoose from "mongoose";
const Schema = mongoose.Schema;

const ResourceSchema = new Schema(
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
      type: Schema.Types.ObjectId,
      ref: 'Competency'
    }]
  },
  {
    timestamps: true,
    useNestedStrict: true
  }
);

export default mongoose.model("Resource", ResourceSchema);
