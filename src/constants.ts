export const API_ROOT = 'https://onesignal.com/api/v1';
export const NOTIFICATIONS_PATH = 'notifications';
export const NOTIFICATIONS_HISTORY = 'history';
export const APPS_PATH = 'apps';
export const APPS_SEGMENTS = 'segments';
export const DEVICES_PATH = 'players';
export const DEVICES_ONSESSION = 'on_session';
export const DEVICES_ONPURCHASE = 'on_purchase';
export const DEVICES_ONFOCUS = 'on_focus';
export const DEVICES_CSVEXPORT = 'csv_export';

// Name to be used in query string for url for app_id field.
export const APP_ID_QUERY_NAME = 'app_id';

// Name to be used in request body for app_id field.
export const APP_ID_FIELD_NAME = 'app_id';

export const defaultClientOptions = {
  apiRoot: API_ROOT,
};
