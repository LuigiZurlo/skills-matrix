import * as mongoose from "mongoose";
import { Skill } from "../skills/skill.model";

export interface Competency extends mongoose.Document {
  skill: Skill['_id'],
  level: number
}

const CompetencySchema: mongoose.Schema = new mongoose.Schema(
  {
    skill: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Skill',
      required: true
    },
    level: {
      type: Number,
      required: true
    }
  },
  {
    timestamps: true,
    useNestedStrict: true
  }
);

CompetencySchema.index({skill: 1, levell:1}, {unique: true});

export default mongoose.model<Competency>("Competency", CompetencySchema);
