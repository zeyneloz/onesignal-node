'use strict';

// TODO Deprecate
var ALLOWED_FIELDS = ['contents', 'included_segments', 'excluded_segments', 'filters', 'include_player_ids',
	'app_id', 'app_ids', 'headings', 'subtitle', 'template_id', 'content_available', 'mutable_content',
	'data', 'url', 'ios_attachments', 'big_picture', 'adm_big_picture', 'chrome_big_picture', 'buttons',
	'web_buttons', 'ios_category', 'android_background_layout', 'small_icon', 'large_icon', 'adm_small_icon',
	'adm_large_icon', 'chrome_web_icon', 'chrome_web_image', 'firefox_icon', 'chrome_icon', 'ios_sound',
	'android_sound', 'android_led_color', 'android_accent_color', 'android_visibility', 'adm_sound', 'ios_badgeType',
	'ios_badgeCount', 'collapse_id', 'send_after', 'delayed_option', 'delivery_time_of_day', 'ttl', 'priority',
	'android_group', 'android_group_message', 'adm_group', 'adm_group_message', 'isIos', 'isAndroid',
	'isAnyWeb', 'isChromeWeb', 'isFirefox', 'isSafari', 'isWP', 'isWP_WNS', 'isAdm', 'isChrome',
	'android_channel_id', 'existing_android_channel_id'];


/**
 *
 * @param initialBody  The body must include either one of these: contents, content_available, template_id
 * @constructor
 */
var Notification = function (initialBody) {
	if (typeof initialBody !== 'object') {
		throw 'Body must be a JSON object';
  }

	this.postBody = {};
	if ('contents' in initialBody) {
    this.postBody.contents = initialBody.contents;
    return;
  }

  if ('content_available' in initialBody) {
		this.postBody.content_available = initialBody.content_available;
    return;
  }

  if ('template_id' in initialBody) {
		this.postBody.template_id = initialBody.template_id;
    return;
  }
	throw 'Body must include one of the following fields: contents, content_available, template_id'
};

/**
 * set a parameter of notification body
 * @param name { String }
 * @param value
 */
Notification.prototype.setParameter = function (name, value) {
  // TODO Deprecate
	if (name && name[0] === '!') {
		name = name.substring(1);
	}
	this.postBody[name] = value;
};

/**
 *
 * @param contents
 */
Notification.prototype.setContent = function (contents) {
	this.postBody.contents = contents;
};

/**
 *
 * @param included_segments  The segment names you want to target
 */
Notification.prototype.setIncludedSegments = function (included_segments) {
	this.postBody.included_segments = included_segments;
};

/**
 *
 * @param excluded_segments	 Segment that will be excluded when sending
 */
Notification.prototype.setExcludedSegments = function (excluded_segments) {
	this.postBody.excluded_segments = excluded_segments;
};

/**
 *
 * @param filters
 */
Notification.prototype.setFilters  = function (filters) {
	this.postBody.filters = filters;
};

/**
 *
 * @param include_player_ids  Specific players to send your notification to
 */
Notification.prototype.setTargetDevices = function (include_player_ids) {
	this.postBody.include_player_ids = include_player_ids;
};

module.exports = Notification;
