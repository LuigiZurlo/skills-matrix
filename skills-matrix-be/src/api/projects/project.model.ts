import * as mongoose from "mongoose";

export interface IProject extends mongoose.Document {
  name: string,
  display_name: string,
  start_date: Date,
  end_date: Date
}

const ProjectSchema: mongoose.Schema = new mongoose.Schema(
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
    start_date: {
      type: Date,
      required: true
    },
    end_date: {
      type: Date,
      required: true
    }
  },
  {
    timestamps: true,
    useNestedStrict: true
  }
);

export default mongoose.model<IProject>("Project", ProjectSchema);
