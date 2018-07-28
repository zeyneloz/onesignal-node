'use strict';

/**
 *
 * @param initialBody  The body must include either one of these: contents, content_available, template_id
 * @constructor
 */
var Notification = function (initialBody) {
	if (typeof initialBody !== 'object') {
		throw 'Body must be a JSON object';
  }

	this.postBody = JSON.parse(JSON.stringify(initialBody));
};

/**
 * set a parameter of notification body
 * @param name { String }
 * @param value
 */
// TODO Deprecate
Notification.prototype.setParameter = function (name, value) {
  console.warn("[onesignal-node] setParameter function will be removed in next release, please check documentation.");
	this.postBody[name] = value;
};

/**
 *
 * @param contents
 */
// TODO Deprecate
Notification.prototype.setContent = function (contents) {
  console.warn("[onesignal-node] setContent function will be removed in next release, please check documentation.");
	this.postBody.contents = contents;
};

/**
 *
 * @param included_segments  The segment names you want to target
 */
// TODO Deprecate
Notification.prototype.setIncludedSegments = function (included_segments) {
  console.warn("[onesignal-node] setIncludedSegments function will be removed in next release, please check documentation.");
  this.postBody.included_segments = included_segments;
};

/**
 *
 * @param excluded_segments	 Segment that will be excluded when sending
 */
// TODO Deprecate
Notification.prototype.setExcludedSegments = function (excluded_segments) {
  console.warn("[onesignal-node] setExcludedSegments function will be removed in next release, please check documentation.");
  this.postBody.excluded_segments = excluded_segments;
};

/**
 *
 * @param filters
 */
// TODO Deprecate
Notification.prototype.setFilters  = function (filters) {
  console.warn("[onesignal-node] setFilters function will be removed in next release, please check documentation.");
  this.postBody.filters = filters;
};

/**
 *
 * @param include_player_ids  Specific players to send your notification to
 */
// TODO Deprecate
Notification.prototype.setTargetDevices = function (include_player_ids) {
  console.warn("[onesignal-node] setTargetDevices function will be removed in next release, please check documentation.");
  this.postBody.include_player_ids = include_player_ids;
};

module.exports = Notification;
