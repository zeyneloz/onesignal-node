'use strict';

var expect = require('chai').expect;
var OneSignal = require('../lib');
var NotificationMock = require('./mocks/notification');
var Constants = require('../lib/constants');

describe('Notification Tests', function () {
  describe('Create Notification', function () {
    it('Expect to throw an error with non object data when creating a notification', function () {
      var notification = NotificationMock.emptyNotification;
      try {
        var response = new OneSignal.Notification(notification);
        expect(response).to.equal(undefined);
      } catch (err) {
        expect(err).to.be.an('string');
        expect(err).to.equal('Body must be a JSON object');
      }
    })

    it('Expect to valid notification with contents', function () {
      var notification = NotificationMock.validWithContents;
      var response = new OneSignal.Notification(notification);
      expect(response).to.be.an('object');
      expect(response.postBody).to.be.an('object');
      expect(response.postBody.contents).to.be.an('object');
      expect(response.postBody.contents).to.have.property('en');
      expect(response.postBody.contents).to.have.property('pt');
    })

    it('Expect to valid notification with content available', function () {
      var notification = NotificationMock.validWithContentAvailable;
      var response = new OneSignal.Notification(notification);
      expect(response).to.be.an('object');
      expect(response.postBody).to.be.an('object');
      expect(response.postBody.content_available).to.be.an('boolean');
      expect(response.postBody.content_available)
        .to.equal(notification.content_available);
    })

    it('Expect to valid notification with template ID', function () {
      var notification = NotificationMock.validWithTemplateId;
      var response = new OneSignal.Notification(notification);
      expect(response).to.be.an('object');
      expect(response.postBody).to.be.an('object');
      expect(response.postBody.template_id).to.be.an('string');
      expect(response.postBody.template_id).to.equal(notification.template_id);
    })
  })

  describe('Setting OneSignal Properties', function () {
    it('Expect to valid data when setting parameter', function () {
      var notification = NotificationMock.validWithContents;
      var notificationObject = new OneSignal.Notification(notification);
      var parameter = NotificationMock.validParameter;
      notificationObject.setParameter(parameter.name, parameter.value);
      var response = notificationObject;
      expect(response).to.be.an('object');
      expect(response.postBody).to.be.an('object');
      expect(response.postBody.filters).to.be.an('string');
      expect(response.postBody.filters).to.equal(parameter.value);
    })
  })
})
