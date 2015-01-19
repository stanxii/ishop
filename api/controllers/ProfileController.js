/**
 * ProfileController
 *
 * @description :: Server-side logic for managing profiles
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
//var redisPublishServer = require('../services/redisPublishService');
var async = require('async');



module.exports = {

  /**
   * `ProfileController.create()`
   */
  edit: function (req, res) {

    var profile = req.param('profile');
    console.log(profile);

    Profile.findOne({'uid': profile.uid}).exec(function (err, theProfile) {
      if (err) {
        return res.json({
          success: false,
          uid: profile.uid
        });
      }
      if (!theProfile) {
         //did not fonu profile where uid indb then create it
        async.waterfall([
          //function(cb){
          //  PersonalInfo.create(profile.personalInfo).exec(function createCB(err, personalInfoCB){
          //    cb(err, personalInfoCB);
          //  });
          //  console.log('1');
          //},
          //function(personalInfoCB,  cb){
          //  JobPreferences.create(profile.jobPreferences).exec(function createCB(err,jobPreferencesCB){
          //    cb(err, personalInfoCB, jobPreferencesCB);
          //  });
          //  console.log('2');
          //  console.log(personalInfoCB);
          //},

          function(cb){
            Profile.create({
              uid: profile.uid,
              personalInfo: profile.personalInfo,
              jobPreferences: profile.jobPreferences,
              education: profile.education,
              workHistory: profile.workHistory,
              summary: profile.summary
            }).exec(function createCB(err,profileCB){
              cb(err,  profileCB);
            });
            console.log('6');
          }
        ], function (err, profileCB) {
          // result now equals 'done'  create a new profile.
          console.log('done');

          if(err){
            console.log('error '+ err);
            return res.json({
              success: false
            });
          }else {
            console.log('Created Profile with id ' + profileCB.uid);
            console.log('Created personalInfo with name ' + profileCB.personalInfo.name);

            return res.json({
              success: true,
              profile: profileCB
            });
          }

          console.log(profileCB);
        });

      }else{
        //exist update with http req give profile data to db
        Profile.update(profile).exec(function afterwards(err,updatedProfile){

          if (err) {
            // handle error here- e.g. `res.serverError(err);`
            console.log('udpate error '+ err);
            return res.json({
              success: false
            });
            return;
          }

          console.log('Updated user to have name '+updated[0].uid);
          return res.json({
            success: true,
            profileid: updatedProfile.id
          });

        });


      }

    });


  },


  /**
   * `ProfileController.show()`
   */
  show: function (req, res) {

    Profile.findOne({name:'Jessie'}).exec(function findOneCB(err,found){
      console.log('We found '+found.name);
    });

    return res.json({
      todo: 'show() is not implemented yet!'
    });
  },


  /**
   * `ProfileController.update()`
   */
  saveChanges: function (req, res) {
    return res.json({
      todo: 'update() is not implemented yet!'
    });
  },


  /**
   * `ProfileController.delete()`
   */
  delete: function (req, res) {
    return res.json({
      todo: 'delete() is not implemented yet!'
    });
  }
};

