/**
 * ProfileController
 *
 * @description :: Server-side logic for managing profiles
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
//var redisPublishServer = require('../services/redisPublishService');
var async = require('async');


var createProfileHandler = function (personInfo, jobPreferences, education, workHistory, summary, profile) {
  Profile.create({
          personInfo: personInfo,
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
              console.log('Created personInfo with name ' + personInfo.name);

              return res.json({
                success: true,
                profile: profileCB
              });
          }
    });
}

var createSummaryHandler = function (personInfo, jobPreferences, education, workHistory, summary, profile, creatcreateProfileHandlerCallback) {

  Summary.create(summary).exec(function createCB(err,summaryCB){
    if(err){
      return res.json({
        success: false
      });
    }else{
      creatcreateProfileHandlerCallback(personInfo, jobPreferences, education, workHistory, summaryCB, profile, creatcreateProfileHandler);
    }
  });
}

var createWorkHistoryHandler = function (personInfo, jobPreferences, education, workHistory, summary, profile, createSummaryHandlerCallback ) {

  WorkHistory.create(workHistory).exec(function createCB(err,workHistoryCB){
    if(err){
      return res.json({
        success: false
      });
    }else{
      createSummaryHandlerCallback(personInfo, jobPreferences, education, workHistoryCB, summary, profile, createSummaryHandler);
    }
  });
}

var createEducationHandler = function (personInfo, jobPreferences, education, workHistory, summary, profile, createWorkHistoryHandlerCallback ) {

  Education.create(education).exec(function createCB(err,educationCB){
      if(err){
            return res.json({
              success: false
            });
        }else{
        createWorkHistoryHandlerCallback(personInfo, jobPreferences, educationCB, workHistory, summary, profile, createWorkHistoryHandler);
        }
    });
}


var createJobPreHandler = function (personInfo, jobPreferences, education, workHistory, summary, profile, createEducationHandlerCallback ) {

    JobPreferences.create(jobPreferences).exec(function createCB(err,jobPreferencesCB){
      if(err){
            return res.json({
              success: false
            });
        }else{

        createEducationHandlerCallback(personInfo, jobPreferencesCB, education, workHistory, summary, profile, createEducationHandler );
        }
    });
}


var createPersonInfoHandler = function (personInfo, jobPreferences, education, workHistory, summary, profile, createJobPreHandlerCallback) {
    PersonalInfo.create(personInfo).exec(function createCB(err,personInfoCB){
      if(err){
          return res.json({
            success: false
          });
      }else{
        createJobPreHandlerCallback(personInfoCB, jobPreferences, education, workHistory, summary, profile, createJobPreHandler);
      }
    });
}


module.exports = {

  /**
   * `ProfileController.create()`
   */
  edit: function (req, res) {
    //var personInfo = req.param('personInfo');
    //var jobPreferences = req.param('jobPreferences');
    //var education = req.param('education');
    //var workHistory = req.param('workHistory');
    //var summary = req.param('summary');

    var profile = req.param('profile');
    //createPersonInfoHandler(personInfo, jobPreferences, education, workHistory, summary, profile);

    Profile.findOne({'userid': profile.uid}).exec(function (err, theProfile) {
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
            PersonalInfo.create(profile.personInfo).exec(function createCB(err, personInfoCB){
              cb(err, personInfoCB);
            });
            console.log('1');
          },
          function(personInfoCB,  cb){
            JobPreferences.create(profile.jobPreferences).exec(function createCB(err,jobPreferencesCB){
              cb(err, personInfoCB, jobPreferencesCB);
            });
            console.log('2');
            console.log(personInfoCB);
          },
          function(personInfoCB, jobPreferencesCB, cb){
            Education.create(profile.education).exec(function createCB(err,educationCB){
              cb(err, personInfoCB, jobPreferencesCB, educationCB);
            });
            console.log('3');
          },
          function(personInfoCB, jobPreferencesCB, educationCB, cb){
            WorkHistory.create(profile.workHistory).exec(function createCB(err,workHistoryCB){
              cb(err, personInfoCB, jobPreferencesCB, educationCB, workHistoryCB);
            });
            console.log('4');
          },
          function(personInfoCB, jobPreferencesCB, educationCB, workHistoryCB, cb){
            Summary.create(profile.summary).exec(function createCB(err,summaryCB){
              cb(err, personInfoCB, jobPreferencesCB, educationCB, workHistoryCB, summaryCB);
            });
            console.log('5');
          },
          function(personInfoCB, jobPreferencesCB, educationCB, workHistoryCB, summaryCB, cb){
            Profile.create({
              personInfo: personInfoCB,
              jobPreferences: jobPreferencesCB,
              education: educationCB,
              workHistory: workHistoryCB,
              summary: summaryCB
            }).exec(function createCB(err,profileCB){
              cb(err,  profileCB);
            });
            console.log('6');
          }
        ], function (err, profileCB) {
          // result now equals 'done'
          console.log('done');

          if(err){
            return res.json({
              success: false
            });
          }else {
            console.log('Created Profile with id ' + profileCB.userid);
            console.log('Created personInfo with name ' + profileCB.personInfo.name);

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

