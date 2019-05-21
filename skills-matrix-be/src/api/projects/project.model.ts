import * as mongoose from "mongoose";

export interface IProject extends mongoose.Document {
  name: string
}

const ProjectSchema: mongoose.Schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true,
    useNestedStrict: true
  }
);

export default mongoose.model<IProject>("Project", ProjectSchema);
