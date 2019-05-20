import * as mongoose from "mongoose";
const Schema = mongoose.Schema;

const PositionSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    project: {
      type: Schema.Types.ObjectId,
      ref: 'Project',
      required: true
    },
    competencies: [{
      type: Schema.Types.ObjectId,
      ref: 'Competency0'
    }]
  },
  {
    timestamps: true,
    useNestedStrict: true
  }
);

export default mongoose.model("Position", PositionSchema);
