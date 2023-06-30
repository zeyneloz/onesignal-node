export interface ClientResponse {
  statusCode: number;
  body: any;
  headers: { [key: string]: any };
}

export interface ClientOptions {
  apiRoot?: string;
}

export interface Options {
  apiRoot: string;
}

interface BaseLimitOffsetQuery {
  limit?: number;
  offset?: number;
}

export interface ViewNotificationsQuery extends BaseLimitOffsetQuery {
  kind?: number;
}

export interface LimitOffsetQuery extends BaseLimitOffsetQuery {}

export interface NotificationHistoryBody {
  events: string;
  email: string;
}

interface KeyAnyObject {
  [key: string]: any;
}

interface TagObject {
  [key: string]: boolean | number | string;
}

export interface CreateNotificationBody {
  // Content and Language
  contents?: KeyAnyObject;
  headings?: KeyAnyObject;
  subtitle?: KeyAnyObject;
  template_id?: string;
  content_available?: boolean;
  mutable_content?: boolean;
  custom_data?: KeyAnyObject;

  // Email content
  email_subject?: string;
  email_body?: string;
  email_from_name?: string;
  email_from_address?: string;

  // Segments to send
  included_segments?: string[];
  excluded_segments?: string[];
  filters?: KeyAnyObject[];
  include_player_ids?: string[];
  include_external_user_ids?: string[];
  include_email_tokens?: string[];
  include_ios_tokens?: string[];
  include_wp_wns_uris?: string[];
  include_amazon_reg_ids?: string[];
  include_chrome_reg_ids?: string[];
  include_chrome_web_reg_ids?: string[];
  include_android_reg_ids?: string[];
  external_id?: string;

  // Action buttons
  buttons?: KeyAnyObject[];
  web_buttons?: KeyAnyObject[];
  ios_category?: string;

  // Attachments
  data?: KeyAnyObject;
  url?: string;
  web_url?: string;
  app_url?: string;
  ios_attachments?: KeyAnyObject;
  big_picture?: string;
  adm_big_picture?: string;
  chrome_big_picture?: string;

  // Appearance
  android_channel_id?: string;
  existing_android_channel_id?: string;
  android_background_layout?: string;
  small_icon?: string;
  large_icon?: string;
  adm_small_icon?: string;
  adm_large_icon?: string;
  chrome_web_icon?: string;
  chrome_web_image?: string;
  chrome_web_badge?: string;
  firefox_icon?: string;
  chrome_icon?: string;
  ios_sound?: string;
  android_sound?: string;
  adm_sound?: string;
  wp_wns_sound?: string;
  android_led_color?: string;
  android_accent_color?: string;
  android_visibility?: number;
  ios_badgeType?: string;
  ios_badgeCount?: number;
  collapse_id?: string;
  apns_alert?: KeyAnyObject;

  // Delivery
  send_after?: string;
  delayed_option?: string;
  delivery_time_of_day?: string;
  ttl?: number;
  priority?: number;
  apns_push_type_override?: string;

  // Grouping & Collapsing
  android_group?: string;
  android_group_message?: KeyAnyObject;
  adm_group?: string;
  adm_group_message?: KeyAnyObject;
  thread_id?: string;
  summary_arg?: string;
  summary_arg_count?: number;

  // Platform to deliver to
  isIos?: boolean;
  isAndroid?: boolean;
  isAnyWeb?: boolean;
  isEmail?: boolean;
  isChromeWeb?: boolean;
  isFirefox?: boolean;
  isSafari?: boolean;
  isWP_WNS?: boolean;
  isAdm?: boolean;
  isChrome?: boolean;
  channel_for_external_user_ids?: string;
}

interface BaseAppBody {
  apns_env?: string;
  apns_p12?: string;
  apns_p12_password?: string;
  gcm_key?: string;
  android_gcm_sender_id?: string;
  chrome_web_origin?: string;
  chrome_web_default_notification_icon?: string;
  chrome_web_sub_domain?: string;
  safari_apns_p12?: string;
  safari_apns_p12_password?: string;
  site_name?: string;
  safari_site_origin?: string;
  safari_icon_256_256?: string;
  chrome_key?: string;
  additional_data_is_root_payload?: string;
  organization_id?: string;
}

export interface CreateAppBody extends BaseAppBody {
  name: string;
}

export interface UpdateAppBody extends BaseAppBody {
  name?: string;
}

interface BaseDeviceBody {
  email_auth_hash?: string;
  identifier?: string;
  language?: string;
  timezone?: number;
  game_version?: string;
  device_model?: string;
  device_os?: string;
  ad_id?: string;
  sdk?: string;
  session_count?: number;
  tags?: TagObject;
  amount_spent?: string;
  created_at?: number;
  playtime?: number;
  badge_count?: number;
  last_active?: number | string;
  notification_types?: number;
  test_type?: number;
  long?: number;
  lat?: number;
  country?: string;
  external_user_id?: string;
}

export interface AddDeviceBody extends BaseDeviceBody {
  device_type: number;
}

export interface EditDeviceBody extends BaseDeviceBody {}

export interface EditTagsBody {
  tags: TagObject;
}

export interface NewSessionBody {
  identifier?: string;
  language?: string;
  timezone?: number;
  game_version?: string;
  device_os?: string;
  ad_id?: string;
  sdk?: string;
  tags?: KeyAnyObject;
  device_type?: KeyAnyObject;
}

interface Purchase {
  sku: string;
  amount: number;
  iso: string;
}

export interface NewPurchaseBody {
  purchases: Purchase[];
  existing?: boolean;
}

export interface IncrementSessionLengthBody {
  state: string;
  active_time: number;
}

export interface ExportCSVBody {
  extra_fields?: string[];
  last_active_since?: number;
  segment_name?: string;
}

export interface CreateSegmentBody {
  id?: string;
  name: string;
  filters: KeyAnyObject[];
}
