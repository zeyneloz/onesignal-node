'use strict';

var expect = require('chai').expect;
var OneSignal = require('../lib');

// first we need to create a client
var myClient = new OneSignal.Client({
    userAuthKey: 'XXXXXX',
    app: { appAuthKey: 'XXXXX', appId: 'XXXXX' }
});