import * as mongoose from "mongoose";
import Skill from '../skills/skill.model';

const Schema = mongoose.Schema;

const CompetencySchema = new Schema(
  {
    skill: {
      type: Schema.Types.ObjectId,
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

export default mongoose.model("Competency", CompetencySchema);
