/**
 * Created by Administrator on 2015/1/6.
 */

//var redis_ip = '192.168.1.111',
  var redis_ip = '127.0.0.1',
  redis_port = '6379';

var subscribe = require('redis').createClient(redis_port, redis_ip);

subscribe.on('pmessage', function(pat,ch,data) {

  console.log('pmessage receive from redis with pubsub pat='+ pat + ' ch = ' + ch + ' data' + data);
  if(pat == 'java2node.*') {
    if(ch == 'java2node.editProfile.res') {
      sio.sockets.emit('node2html.editProfile.res', data);
    }
    else if(ch == 'node.historyalarm.gethistorypage') {

    }

  }
});
