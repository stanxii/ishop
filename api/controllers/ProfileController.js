/**
 * ProfileController
 *
 * @description :: Server-side logic for managing profiles
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var createProfileHandler = function (personInfo, jobPreferences, education, workHistory, summary, profile) {
    PersonalInfo.create({
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

  JobPreferences.create(summary).exec(function createCB(err,summaryCB){
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

  JobPreferences.create(workHistory).exec(function createCB(err,workHistoryCB){
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

    JobPreferences.create(education).exec(function createCB(err,educationCB){
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
  create: function (req, res) {
    var personInfo = req.param('personInfo');
    var jobPreferences = req.param('jobPreferences');
    var education = req.param('education');
    var workHistory = req.param('workHistory');
    var summary = req.param('summary');
    var profile = req.param('profile');
    createPersonInfoHandler(personInfo, jobPreferences, education, workHistory, summary, profile);
  },


  /**
   * `ProfileController.show()`
   */
  show: function (req, res) {
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

