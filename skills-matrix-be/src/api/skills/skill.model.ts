import * as mongoose from "mongoose";

export interface Skill extends mongoose.Document {
  name: string;
  display_name: string;
  scope: string;
  category: string;
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
    },
    scope: {
      type: String,
      required: true
    },
    category: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true,
    useNestedStrict: true
  }
);

export default mongoose.model<Skill>("Skill", SkillSchema);
