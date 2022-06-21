"use strict";

var mongoose = require("mongoose");
var Schema = mongoose.Schema;

module.exports = function () {
  var db = mongoose.connect("mongodb://localhost:27017/social-auth-example");

  var UserSchema = new Schema({
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
    },
    facebookProvider: {
      id: {
        type: String,
        default: "",
      },
      token: {
        type: String,
        default: "",
      },
    },
    googleProvider: {
      id: {
        type: String,
        default: "",
      },
      token: {
        type: String,
        default: "",
      },
    },
  });

  UserSchema.set("toJSON", { getters: true, virtuals: true });

  UserSchema.statics.upsertFbUser = async function (
    accessToken,
    refreshToken,
    profile,
    cb
  ) {
    var that = this;
    const emailExist = await this.findOne({ email: profile.emails[0].value })
      .lean()
      .exec();

    if (!emailExist?.email) {
      var newUser = new that({
        fullName: profile.displayName,
        email: profile.emails[0].value,
        facebookProvider: {
          id: profile.id,
          token: accessToken,
        },
      });
      await newUser.save;
      await newUser.save(function (error, savedUser) {
        if (error) {
          console.log(error);
        }
        return cb(error, savedUser);
      });
    } else {
      if (emailExist?.email && profile.provider === "facebook") {
        const obj = {
          id: profile.id,
          token: accessToken,
        };
        this.updateOne(
          { email: profile.emails[0].value },
          { $set: { facebookProvider: obj } },
          (error, doc) => {
            if (error) {
              console.log(error);
            }
            return cb(error, { email: emailExist?.email, name: profile.displayName, id: profile.id, provider: 'facebook' });
          }
        );
      }
    }
  };

  UserSchema.statics.upsertGoogleUser = async function (
    accessToken,
    refreshToken,
    profile,
    cb
  ) {
    var that = this;
    const emailExist = await this.findOne({ email: profile.emails[0].value })
      .lean()
      .exec();
    if (!emailExist?.email) {
      var newUser = new that({
        fullName: profile.displayName,
        email: profile.emails[0].value,
        googleProvider: {
          id: profile.id,
          token: accessToken,
        },
      });
      await newUser.save(function (error, savedUser) {
        if (error) {
          console.log(error);
        }
        return cb(error, savedUser);
      });
    } else {
      if (emailExist?.email && profile.provider === "google") {
        const obj = {
          id: profile.id,
          token: accessToken,
        };
        this.updateOne(
          { email: profile.emails[0].value },
          { $set: { googleProvider: obj } },
          (error, doc) => {
            if (error) {
              console.log(error);
            }
            return cb(error, { email: emailExist?.email, name: profile.displayName, id: profile.id, provider: 'google' });
          }
        );
      }
    }
  };

  mongoose.model("User", UserSchema);

  return db;
};
