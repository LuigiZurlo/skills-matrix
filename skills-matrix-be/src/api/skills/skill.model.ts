import * as mongoose from "mongoose";

export interface ISkill extends mongoose.Document {
  name: string;
  display_name: string;
}

const SkillSchema: mongoose.Schema = new mongoose.Schema(
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

export default mongoose.model<ISkill>("Skill", SkillSchema);
