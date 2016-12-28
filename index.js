var HumixSense = require('humix-sense');

var config = {
    "moduleName" : "sample",
    "commands" : ["command1", "command2"],
    "events" : ["event1", "event2"],
    "log" : [
      {
        file : './humix-sample-module.log',
        level : 'info'
      }
    ],
    "localEvents": ['localEvent1','localEvent2'],
    "natsIP": '',   // default 127.0.0.1
    "natsPort": "", // default 4222
    "debug" : true
};

var humix = new HumixSense(config);
var hsm;

humix.on('connection', function(humixSensorModule){
    hsm = humixSensorModule;
    var log = hsm.getLogger();

    log.info('Communication with humix-sense is now ready.');

    hsm.on("command1", function (data) {
        log.info('do something with command1. data:'+data);
    })

    hsm.on("command2", function (data) {
        log.info('do something with command2. data:'+data);
    })

    /**
     *  Local Event provides a way for humix modules to communicate directly
     *  without going through humix think, which would be more efficient for
     *  scenarios where two modules need to work closely.
     *
     *  To send a local event called 'localEvent1', the sending module invokes
     *
     *     hsm.localEventBroadcast('localEvent1', data)
     *
     *  To receive a local event, the receiving module registers
     *
     *     hsm.onLocalEvent('localEvent1', data).
     *
     *  The receiving module also needs to register this event name in its module definition
     */

    hsm.onLocalEvent('localEvent1', function(data){

         log.info('do something with localEvent1.');
    })

    hsm.onLocalEvent('localEvent2', function(data){

         log.info('do something with localEvent2. Data:'+data);
    })



});

// publish a dummy data in every 5 seconds.
setInterval(function () {

    if (hsm) {
        var data = {'a':'b'}
        hsm.event('event1', data);
    }

}, 5000);
