// import constants from "../config/constants.js";
import mongoose from "mongoose";

const Schema = mongoose.Schema;
const refType = Schema.Types.ObjectId;

const DocumentSchema = new Schema({
  // Existing fields
  URL: { type: String },
  S3Bucket: { type: String, required: true },
  S3Name: { type: String, required: true },
  // New fields
  owner: {
    type: refType,
    ref: "User",
    // required: true,
  },
});

export default mongoose.model("Document", DocumentSchema);
