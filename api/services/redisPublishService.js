

//var redis_ip='192.168.1.111',
  var redis_ip='127.0.0.1',
  redis_port ='6379';

var publish = require('redis').createClient(redis_port, redis_ip);



function  pubEditProfile(req, res){

  var data = {};
  data.personInfo = req.param('personInfo');
  data.jobPreferences = req.param('jobPreferences');
  data.education = req.param('education');
  data.workHistory = req.param('workHistory');
  data.summary = req.param('summary');
  data.profile = req.param('profile');

  publish.publish('pub.node2java.editProfile', data);
  res.json({"successful": "true"});
}

function  pubgetProfileById(req, res){
  var data = {};
  data.personInfo = req.param('personInfo');
  data.jobPreferences = req.param('jobPreferences');
  data.education = req.param('education');
  data.workHistory = req.param('workHistory');
  data.summary = req.param('summary');
  data.profile = req.param('profile');

  publish.publish('pub.node2java.editProfile', data);
  res.json({"successful": "true"});
}


exports.redisPublis = pubEditProfile;
exports.pubgetProfileById = pubgetProfileById;

