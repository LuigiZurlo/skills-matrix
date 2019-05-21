import * as mongoose from "mongoose";
import { ISkill } from "../skills/skill.model";

export interface ICompetency extends mongoose.Document {
  skill: ISkill['_id'],
  level: number
}

const CompetencySchema: mongoose.Schema = new mongoose.Schema(
  {
    skill: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Skill'
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

CompetencySchema.index({ skill: 1, level: 1}, {unique: true});

export default mongoose.model<ICompetency>("Competency", CompetencySchema);
