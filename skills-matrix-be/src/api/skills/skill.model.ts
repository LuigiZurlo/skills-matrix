import * as mongoose from "mongoose";
const Schema = mongoose.Schema;

const SkillSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      lowercase: true,
      index: true
    },
    display_name: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true,
    useNestedStrict: true
  }
);

export default mongoose.model("Skill", SkillSchema);
