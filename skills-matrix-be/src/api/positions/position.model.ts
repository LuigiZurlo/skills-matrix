import * as mongoose from "mongoose";
const Schema = mongoose.Schema;

// ToDo: Add Index based on (name, project)
const PositionSchema = new Schema(
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
      type: Schema.Types.ObjectId,
      ref: 'Project',
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

export default mongoose.model("Position", PositionSchema);
