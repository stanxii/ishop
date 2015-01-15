/**
 * ProfileController
 *
 * @description :: Server-side logic for managing profiles
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
//var redisPublishServer = require('../services/redisPublishService');
var async = require('async');


var createProfileHandler = function (personalInfo, jobPreferences, education, workHistory, summary, profile) {
  Profile.create({
          personalInfo: personalInfo,
          jobPreferences: jobPreferences,
          education: education,
          workHistory: workHistory,
          summary: summary,
          profile: profile
    }).exec(function createCB(err,profileCB){
          if(err){
              return res.json({
                success: false
              });
            }else {
              console.log('Created Profile with id ' + profileCB.userid);
              console.log('Created personalInfo with name ' + personalInfo.name);

              return res.json({
                success: true,
                profile: profileCB
              });
          }
    });
}

var createSummaryHandler = function (personalInfo, jobPreferences, education, workHistory, summary, profile, creatcreateProfileHandlerCallback) {

  Summary.create(summary).exec(function createCB(err,summaryCB){
    if(err){
      return res.json({
        success: false
      });
    }else{
      creatcreateProfileHandlerCallback(personalInfo, jobPreferences, education, workHistory, summaryCB, profile, creatcreateProfileHandler);
    }
  });
}

var createWorkHistoryHandler = function (personalInfo, jobPreferences, education, workHistory, summary, profile, createSummaryHandlerCallback ) {

  WorkHistory.create(workHistory).exec(function createCB(err,workHistoryCB){
    if(err){
      return res.json({
        success: false
      });
    }else{
      createSummaryHandlerCallback(personalInfo, jobPreferences, education, workHistoryCB, summary, profile, createSummaryHandler);
    }
  });
}

var createEducationHandler = function (personalInfo, jobPreferences, education, workHistory, summary, profile, createWorkHistoryHandlerCallback ) {

  Education.create(education).exec(function createCB(err,educationCB){
      if(err){
            return res.json({
              success: false
            });
        }else{
        createWorkHistoryHandlerCallback(personalInfo, jobPreferences, educationCB, workHistory, summary, profile, createWorkHistoryHandler);
        }
    });
}


var createJobPreHandler = function (personalInfo, jobPreferences, education, workHistory, summary, profile, createEducationHandlerCallback ) {

    JobPreferences.create(jobPreferences).exec(function createCB(err,jobPreferencesCB){
      if(err){
            return res.json({
              success: false
            });
        }else{

        createEducationHandlerCallback(personalInfo, jobPreferencesCB, education, workHistory, summary, profile, createEducationHandler );
        }
    });
}


var createpersonalInfoHandler = function (personalInfo, jobPreferences, education, workHistory, summary, profile, createJobPreHandlerCallback) {
    PersonalInfo.create(personalInfo).exec(function createCB(err,personalInfoCB){
      if(err){
          return res.json({
            success: false
          });
      }else{
        createJobPreHandlerCallback(personalInfoCB, jobPreferences, education, workHistory, summary, profile, createJobPreHandler);
      }
    });
}


module.exports = {

  /**
   * `ProfileController.create()`
   */
  edit: function (req, res) {
    //var PersonalInfo = req.param('PersonalInfo');
    //var jobPreferences = req.param('jobPreferences');
    //var education = req.param('education');
    //var workHistory = req.param('workHistory');
    //var summary = req.param('summary');

    var profile = req.param('profile');
    console.log(profile);
    //createpersonalInfoHandler(personalInfo, jobPreferences, education, workHistory, summary, profile);

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
          function(cb){
            PersonalInfo.create(profile.personalInfo).exec(function createCB(err, personalInfoCB){
              cb(err, personalInfoCB);
            });
            console.log('1');
          },
          function(personalInfoCB,  cb){
            JobPreferences.create(profile.jobPreferences).exec(function createCB(err,jobPreferencesCB){
              cb(err, personalInfoCB, jobPreferencesCB);
            });
            console.log('2');
            console.log(personalInfoCB);
          },
          function(personalInfoCB, jobPreferencesCB, cb){
            Education.create(profile.education).exec(function createCB(err,educationCB){
              cb(err, personalInfoCB, jobPreferencesCB, educationCB);
            });
            console.log('3');
          },
          function(personalInfoCB, jobPreferencesCB, educationCB, cb){
            WorkHistory.create(profile.workHistory).exec(function createCB(err,workHistoryCB){
              cb(err, personalInfoCB, jobPreferencesCB, educationCB, workHistoryCB);
            });
            console.log('4');
          },
          function(personalInfoCB, jobPreferencesCB, educationCB, workHistoryCB, cb){
            Summary.create(profile.summary).exec(function createCB(err,summaryCB){
              cb(err, personalInfoCB, jobPreferencesCB, educationCB, workHistoryCB, summaryCB);
            });
            console.log('5');
          },
          function(personalInfoCB, jobPreferencesCB, educationCB, workHistoryCB, summaryCB, cb){
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
          // result now equals 'done'
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
        //exist
        return res.json({
          success: false,
          profile: theProfile
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

