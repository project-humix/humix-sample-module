# Humix Sample Module

This is a sample humix module that demonstrate how to build new modules that can run on humix sense. 


## How to use

You can use this module to build a new `humix sense` module for Humix. 

Here are the steps you needs:

1. config your module
2. register your module
3. send events, if any
4. receive commands, if any



### Provide module information

The following code shows how to config your module and register it with Humix. 

```javascript

 // provide default config. If not provided, the module will lookup module.js in current dir to load the config
 
 var config = {

 
    // define the namespace of this module
    "moduleName":"test",

    // specify the commands to monitor
    "commands" : [ "command1", "command2"],

    // (optional)
    // specify the events that will be gneerated by this module.
    // If not specified, all events generated with event() function will be emitted
    "events" : ["event1","event2"],

    // (optional)
    // if the module is implemented using other language, specify the process to lunch here
    "childProcess" : {
        "name" : "./test/test.sh",
        "params" : "7",
        "respawn" : true,
        "restart" : 3
    },
    "debug": true
 }
 
 
var humix = require('humix-sense')(config);,

```

Basically you pass the config to the humix-sense module. The module will then register the current sensor with local humix-sense-controller. 

The next step is to wait for the confirmation from humix-sense-controller

```javascript

 humix.on('connection', function(humixSensorModule){
       hsm = humixSensorModule;
 }
```

### Generate events

Once you get the `HumixSensorModule` object, you can then generate events with simple syntax like:

```javascript
 hsm.event('event1', 'Hello World');
```

### Listen for commands

and now you can receive command by monitoring the registered commands:

```javascript

hsm.on('command1', function(data){
    console.log('receive data');
});
```

## Execute Sync Command

Sync Command is different than general async command in that it could provide command result to original calling node ( via call back). Here shows an example :
```javascript

  hsm.on("command1", function (data, done) { 
     
        console.log('do something with command1. data:'+data);
        done('i am done');
               
    })
    );
```

### Life cycle management

When the humix-sense-controller wants to terminate a process, it publishes a 'stop' command. This allow each module process to terminate gracefully. 

```javascript
  humix.on('stop', function(){
      // do your cleanup tasks here 
  });
```

## License

This module is released under Apache 2.0 license

