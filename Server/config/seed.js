import { Document, Profile, User } from "../models/index.js";
import dotenv from "dotenv";
import mongoose from "mongoose";
import process from "process";

dotenv.config();

function seedProfile({ userId }) {
  const profilePicDoc = new Document({
    S3Bucket: "bgp-zichan",
    S3Name: "profile-pic-1234567890",
    owner: userId,
  });
  const driversLicenseDoc = new Document({
    S3Bucket: "bgp-zichan",
    S3Name: "drivers-license-1234567890",
    owner: userId,
  });
  const optReceiptDoc = new Document({
    S3Bucket: "bgp-zichan",
    S3Name: "opt-receipt-1234567890",
    owner: userId,
  });
  const optEADDoc = new Document({
    S3Bucket: "bgp-zichan",
    S3Name: "opt-ead-1234567890",
    owner: userId,
  });
  const i983Doc = new Document({
    S3Bucket: "bgp-zichan",
    S3Name: "i983-1234567890",
    owner: userId,
  });
  const i20Doc = new Document({
    S3Bucket: "bgp-zichan",
    S3Name: "i20-1234567890",
    owner: userId,
  });

  const profile = new Profile({
    firstName: "Alice",
    lastName: "Cooper",
    middleName: "B",
    preferredName: "Alice",
    gender: "FEMALE",
    profilePic: profilePicDoc._id,
    cellPhone: "123-456-7890",
    workPhone: "123-456-7890",
    address: {
      street: "123 Main St",
      building: "Apt 101",
      city: "Anytown",
      state: "NY",
      zip: "12345",
    },
    car: {
      make: "Toyota",
      model: "Camry",
      color: "Black",
    },
    SSN: "123-45-6789",
    DOB: new Date("1990-01-01"),
    immigrationStatus: "VISA",
    workAuth: {
      title: "OPT",
      startDate: new Date("2021-01-01"),
      endDate: new Date("2023-01-01"),
    },
    driversLicense: {
      number: "1234567890",
      state: "NY",
      expiration: new Date("2025-01-01"),
      document: driversLicenseDoc._id,
    },
    reference: {
      firstName: "Bob",
      lastName: "Smith",
      relationship: "Friend",
      phone: "113-456-7890",
      email: "bobsmith@bgptest.com",
    },
    emergencyContacts: [
      {
        firstName: "Charlie",
        lastName: "Brown",
        relationship: "Friend",
        phone: "123-456-7890",
        email: "charlieb@bgptest.com",
      },
      {
        firstName: "David",
        lastName: "Johnson",
        relationship: "Friend",
        phone: "123-456-7890",
        email: "davidJohnson@bgptest.com",
      },
    ],
    OPTReceipt: {
      document: optReceiptDoc._id,
      status: "APPROVED",
    },
    OPTEAD: {
      document: optEADDoc._id,
      status: "REJECTED",
      feedback: "Incorrect date of birth",
    },
    I983: {
      document: i983Doc._id,
      status: "PENDING",
    },
    I20: {
      document: i20Doc._id,
      status: "APPROVED",
    },
    applicationStatus: "APPROVED",
  });

  return {
    profilePicDoc,
    driversLicenseDoc,
    optReceiptDoc,
    optEADDoc,
    i983Doc,
    i20Doc,
    profile,
  };
}

const seed = async () => {
  try {
    mongoose.connect(process.env.MONGO_URL);
    console.log("Connected to MongoDB");

    await User.deleteMany({});
    await Profile.deleteMany({});

    const user = new User({
      username: "user1",
      email: "user1@mail.com",
      password: "pswd1", // hashed in UserSchema.pre
    });

    const _profiles = seedProfile({ userId: user._id });
    const { profile } = _profiles;
    await Promise.all(Object.values(_profiles).map((doc) => doc.save()));

    user.profile = profile._id;
    await user.save();

    console.log("Succeeded");
  } catch (err) {
    console.error(err);
  } finally {
    mongoose.disconnect();
  }
};

seed();
