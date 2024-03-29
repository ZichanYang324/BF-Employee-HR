import constants from "../config/constants.js";
import mongoose from "mongoose";

const Schema = mongoose.Schema;
const refType = Schema.Types.ObjectId;

const ProfileSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  middleName: {
    type: String,
  },
  preferredName: {
    type: String,
  },
  gender: {
    type: String,
    enum: constants.gender,
    required: true,
  },
  profilePic: {
    type: refType,
    ref: "Document",
  },
  cellPhone: {
    type: String,
    required: true,
  },
  workPhone: {
    type: String,
  },
  email: {
    type: String,
    // required: true,
  },
  address: {
    street: {
      type: String,
      required: true,
    },
    building: {
      type: String,
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      enum: constants.state,
      required: true,
    },
    zip: {
      type: String,
      required: true,
    },
  },
  car: {
    make: {
      type: String,
      default: "",
    },
    model: {
      type: String,
      default: "",
    },
    color: {
      type: String,
      default: "",
    },
  },
  SSN: {
    type: String,
    required: true,
  },
  DOB: {
    type: Date,
    required: true,
  },
  immigrationStatus: {
    type: String,
    enum: constants.immigrationStatus,
    required: true,
  },
  workAuth: {
    title: {
      type: String,
      default: "",
    },
    startDate: {
      type: Date,
    },
    endDate: {
      type: Date,
    },
  },
  driversLicense: {
    number: {
      type: String,
      default: "",
    },
    expiration: {
      type: Date,
    },
    document: {
      type: refType,
      ref: "Document",
    },
  },
  reference: {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    middleName: {
      type: String,
    },
    relationship: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
  },
  emergencyContacts: [
    {
      firstName: {
        type: String,
        required: true,
      },
      lastName: {
        type: String,
        required: true,
      },
      middleName: {
        type: String,
      },
      relationship: {
        type: String,
        required: true,
      },
      phone: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
    },
  ],
  OPTReceipt: {
    document: {
      type: refType,
      ref: "Document",
    },
    status: {
      type: String,
      enum: constants.documentStatus,
      default: "PENDING",
    },
    feedback: {
      type: String,
    },
  },
  OPTEAD: {
    document: {
      type: refType,
      ref: "Document",
    },
    status: {
      type: String,
      enum: constants.documentStatus,
      default: "PENDING",
    },
    feedback: {
      type: String,
    },
  },
  I983: {
    document: {
      type: refType,
      ref: "Document",
    },
    status: {
      type: String,
      enum: constants.documentStatus,
      default: "PENDING",
    },
    feedback: {
      type: String,
    },
  },
  I20: {
    document: {
      type: refType,
      ref: "Document",
    },
    status: {
      type: String,
      enum: constants.documentStatus,
      default: "PENDING",
    },
    feedback: {
      type: String,
    },
  },
  applicationStatus: {
    type: String,
    enum: constants.applicationStatus,
    default: "NOT_STARTED",
    required: true,
  },
  feedback: {
    type: String,
  },
});

export default mongoose.model("Profile", ProfileSchema);
