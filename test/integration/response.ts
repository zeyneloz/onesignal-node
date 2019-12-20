export const createNotificationResponse = {
  // 200 Ok response
  '200OK': {
    status: 200,
    response: {
      id: '458dcec4-cf53-11e3-add2-000c2940e62c',
      recipients: 3,
    },
  },
  '400BAD': {
    status: 400,
    response: {
      errors: ['Notification content must not be null for any languages.'],
    },
  },
};

export const cancelNotificationResponse = {
  '200OK': {
    status: 200,
    response: {
      success: true,
    },
  },
};

export const viewNotificationResponse = {
  '200OK': {
    status: 200,
    response: {
      id: '481a2734-6b7d-11e4-a6ea-4b53294fa671',
      successful: 15,
      failed: 1,
      converted: 3,
      remaining: 0,
      queued_at: 1415914655,
      send_after: 1415914655,
      completed_at: 1415914656,
      url: 'https://yourWebsiteToOpen.com',
      data: {
        foo: 'bar',
        your: 'custom metadata',
      },
      canceled: false,
      headings: {
        en: 'English and default language heading',
        es: 'Spanish language heading',
      },
      contents: {
        en: 'English language content',
        es: 'Hola',
      },
      platform_delivery_stats: {
        ios: {
          success: 5,
          failed: 1,
          errored: 0,
        },
        android: {
          success: 10,
          failed: 0,
          errored: 0,
        },
      },
    },
  },
};

export const viewNotificationsResponse = {
  '200OK': {
    status: 200,
    response: {
      total_count: 553,
      offset: 0,
      limit: 1,
      notifications: [
        {
          id: 'e664a747-324c-406a-bafb-ab51db71c960',
          app_id: '3beb3078-e0f1-4629-af17-fde833b9f716',
          chrome_web_icon: 'https://img.onesignal.com/t/73b9b966-f19e-4410-8b5d-51ebdef4652e.png',
          contents: {
            en: "Come by and check out our new Jordan's!!! (Shoes)",
          },
          converted: 0,
          data: {
            your_data_key: 'your_data_value',
          },
          errored: 1,
          excluded_segments: ['3 Days Inactive'],
          failed: 0,
          headings: {
            en: "Thomas' Greatest Site in the World!! 😜😁",
          },
          included_segments: ['all'],
          queued_at: 1557946677,
          remaining: 0,
          send_after: 1557946620,
          completed_at: 1557946677,
          successful: 386,
          url: 'https://mysite.com',
          platform_delivery_stats: {
            chrome_web_push: {
              successful: 14,
              failed: 0,
              errored: 0,
            },
            android: {
              errored: 1,
              successful: 368,
              failed: 0,
            },
            safari_web_push: {
              successful: 2,
              failed: 0,
              errored: 0,
            },
            ios: {
              successful: 1,
              failed: 0,
              errored: 0,
            },
            firefox_web_push: {
              successful: 1,
              failed: 0,
              errored: 0,
            },
          },
          ios_attachments: {
            id: 'https://img.onesignal.com/n/44843933-68d4-450c-af5c-5e5c1a9d946e.jpg',
          },
        },
      ],
    },
  },
};

export const notificationHistoryResponse = {
  '200OK': {
    status: 200,
    response: {
      success: true,
      destination_url: 'https://onesignal-aws-link.com',
    },
  },
};

export const viewDevicesResponse = {
  '200OK': {
    status: 200,
    response: {
      total_count: 3,
      offset: 2,
      limit: 2,
      players: [
        {
          identifier: 'ce777617da7f548fe7a9ab6febb56cf39fba6d382000c0395666288d961ee566',
          session_count: 1,
          language: 'en',
          timezone: -28800,
          game_version: '1.0',
          device_os: '7.0.4',
          device_type: 0,
          device_model: 'iPhone',
          ad_id: null,
          tags: { a: '1', foo: 'bar' },
          last_active: 1395096859,
          amount_spent: 0.0,
          created_at: 1395096859,
          invalid_identifier: false,
          badge_count: 0,
          external_user_id: null,
        },
      ],
    },
  },
};

export const viewDeviceResponse = {
  '200OK': {
    status: 200,
    response: {
      identifier: 'ce777617da7f548fe7a9ab6febb56cf39fba6d382000c0395666288d961ee566',
      session_count: 1,
      language: 'en',
      timezone: -28800,
      game_version: '1.0',
      device_os: '7.0.4',
      device_type: 0,
      device_model: 'iPhone',
      ad_id: null,
      tags: { a: '1', foo: 'bar' },
      last_active: 1395096859,
      amount_spent: 0.0,
      created_at: 1395096859,
      invalid_identifier: false,
      badge_count: 0,
      external_user_id: null,
    },
  },
};

export const addDeviceResponse = {
  '200OK': {
    status: 200,
    response: { success: true, id: 'ffffb794-ba37-11e3-8077-031d62f86ebf' },
  },
};

export const editDeviceResponse = {
  '200OK': {
    status: 200,
    response: { success: true },
  },
};

export const newSessionResponse = {
  '200OK': {
    status: 200,
    response: { success: true },
  },
};

export const newPurchaseResponse = {
  '200OK': {
    status: 200,
    response: { success: true },
  },
};

export const incrementSessionLengthResponse = {
  '200OK': {
    status: 200,
    response: { success: true },
  },
};

export const exportCSVResponse = {
  '200OK': {
    status: 200,
    response: {
      csv_file_url:
        'https://onesignal.com/csv_exports/b2f7f966-d8cc-11e4-bed1-df8f05be55ba/users_184948440ec0e334728e87228011ff41_2015-11-10.csv.gz',
    },
  },
};

export const createSegmentResponse = {
  '200OK': {
    status: 200,
    response: { success: true, id: '7ed2887d-bd24-4a81-8220-4b256a08ab19' },
  },
};

export const deleteSegmentResponse = {
  '200OK': {
    status: 200,
    response: { success: true, id: '7ed2887d-bd24-4a81-8220-4b256a08ab19' },
  },
};

export const viewAppsResponse = {
  '200OK': {
    status: 200,
    response: [
      {
        id: '92911750-242d-4260-9e00-9d9034f139ce',
        name: 'Your app 1',
        players: 150,
        messageable_players: 143,
        updated_at: '2014-04-01T04:20:02.003Z',
        created_at: '2014-04-01T04:20:02.003Z',
        gcm_key: 'a gcm push key',
        chrome_key: 'A Chrome Web Push GCM key',
        chrome_web_origin: 'Chrome Web Push Site URL',
        chrome_web_gcm_sender_id: 'Chrome Web Push GCM Sender ID',
        chrome_web_default_notification_icon: 'http://yoursite.com/chrome_notification_icon',
        chrome_web_sub_domain: 'your_site_name',
        apns_env: 'sandbox',
        apns_certificates: 'Your apns certificate',
        safari_apns_certificate: 'Your Safari APNS certificate',
        safari_site_origin: 'The homename for your website for Safari Push, including http or https',
        safari_push_id: 'The certificate bundle ID for Safari Web Push',
        safari_icon_16_16: 'http://onesignal.com/safari_packages/92911750-242d-4260-9e00-9d9034f139ce/16x16.png',
        safari_icon_32_32: 'http://onesignal.com/safari_packages/92911750-242d-4260-9e00-9d9034f139ce/16x16@2.png',
        safari_icon_64_64: 'http://onesignal.com/safari_packages/92911750-242d-4260-9e00-9d9034f139ce/32x32@2x.png',
        safari_icon_128_128: 'http://onesignal.com/safari_packages/92911750-242d-4260-9e00-9d9034f139ce/128x128.png',
        safari_icon_256_256: 'http://onesignal.com/safari_packages/92911750-242d-4260-9e00-9d9034f139ce/128x128@2x.png',
        site_name: 'The URL to your website for Web Push',
        basic_auth_key: 'NGEwMGZmMjItY2NkNy0xMWUzLTk5ZDUtMDAwYzI5NDBlNjJj',
      },
      {
        id: 'e4e87830-b954-11e3-811d-f3b376925f15',
        name: 'Your app 2',
        players: 100,
        messageable_players: 80,
        updated_at: '2014-04-01T04:20:02.003Z',
        created_at: '2014-04-01T04:20:02.003Z',
        gcm_key: 'a gcm push key',
        chrome_key: 'A Chrome Web Push GCM key',
        chrome_web_origin: 'Chrome Web Push Site URL',
        chrome_web_gcm_sender_id: 'Chrome Web Push GCM Sender ID',
        chrome_web_default_notification_icon: 'http://yoursite.com/chrome_notification_icon',
        chrome_web_sub_domain: 'your_site_name',
        apns_env: 'sandbox',
        apns_certificates: 'Your apns certificate',
        safari_apns_certificate: 'Your Safari APNS certificate',
        safari_site_origin: 'The homename for your website for Safari Push, including http or https',
        safari_push_id: 'The certificate bundle ID for Safari Web Push',
        safari_icon_16_16: 'http://onesignal.com/safari_packages/e4e87830-b954-11e3-811d-f3b376925f15/16x16.png',
        safari_icon_32_32: 'http://onesignal.com/safari_packages/e4e87830-b954-11e3-811d-f3b376925f15/16x16@2.png',
        safari_icon_64_64: 'http://onesignal.com/safari_packages/e4e87830-b954-11e3-811d-f3b376925f15/32x32@2x.png',
        safari_icon_128_128: 'http://onesignal.com/safari_packages/e4e87830-b954-11e3-811d-f3b376925f15/128x128.png',
        safari_icon_256_256: 'http://onesignal.com/safari_packages/e4e87830-b954-11e3-811d-f3b376925f15/128x128@2x.png',
        site_name: 'The URL to your website for Web Push',
        basic_auth_key: 'NGEwMGZmMjItY2NkNy0xMWUzLTk5ZDUtMDAwYzI5NDBlNjJj',
      },
    ],
  },
};

export const viewAppResponse = {
  '200OK': {
    status: 200,
    response: {
      id: '92911750-242d-4260-9e00-9d9034f139ce',
      name: 'Your app 1',
      players: 150,
      messageable_players: 143,
      updated_at: '2014-04-01T04:20:02.003Z',
      created_at: '2014-04-01T04:20:02.003Z',
      gcm_key: 'a gcm push key',
      chrome_key: 'A Chrome Web Push GCM key',
      chrome_web_origin: 'Chrome Web Push Site URL',
      chrome_web_gcm_sender_id: 'Chrome Web Push GCM Sender ID',
      chrome_web_default_notification_icon: 'http://yoursite.com/chrome_notification_icon',
      chrome_web_sub_domain: 'your_site_name',
      apns_env: 'production',
      apns_certificates: 'Your apns certificate',
      safari_apns_certificate: 'Your Safari APNS certificate',
      safari_site_origin: 'The homename for your website for Safari Push, including http or https',
      safari_push_id: 'The certificate bundle ID for Safari Web Push',
      safari_icon_16_16: 'http://onesignal.com/safari_packages/92911750-242d-4260-9e00-9d9034f139ce/16x16.png',
      safari_icon_32_32: 'http://onesignal.com/safari_packages/92911750-242d-4260-9e00-9d9034f139ce/16x16@2.png',
      safari_icon_64_64: 'http://onesignal.com/safari_packages/92911750-242d-4260-9e00-9d9034f139ce/32x32@2x.png',
      safari_icon_128_128: 'http://onesignal.com/safari_packages/92911750-242d-4260-9e00-9d9034f139ce/128x128.png',
      safari_icon_256_256: 'http://onesignal.com/safari_packages/92911750-242d-4260-9e00-9d9034f139ce/128x128@2x.png',
      site_name: 'The URL to your website for Web Push',
      basic_auth_key: 'NGEwMGZmMjItY2NkNy0xMWUzLTk5ZDUtMDAwYzI5NDBlNjJj',
    },
  },
};

export const createAppResponse = {
  '200OK': {
    status: 200,
    response: {
      id: 'e4e87830-b954-11e3-811d-f3b376925f15',
      name: 'Your app 1',
      players: 0,
      messageable_players: 0,
      updated_at: '2014-04-01T04:20:02.003Z',
      created_at: '2014-04-01T04:20:02.003Z',
      gcm_key: 'a gcm push key',
      chrome_web_origin: 'Chrome Web Push Site URL',
      chrome_web_default_notification_icon: 'http://yoursite.com/chrome_notification_icon',
      chrome_web_sub_domain: 'your_site_name',
      apns_env: 'production',
      apns_certificates: 'Your apns certificate',
      safari_apns_certificate: 'Your Safari APNS certificate',
      safari_site_origin: 'The homename for your website for Safari Push, including http or https',
      safari_push_id: 'The certificate bundle ID for Safari Web Push',
      safari_icon_16_16: 'http://onesignal.com/safari_packages/e4e87830-b954-11e3-811d-f3b376925f15/16x16.png',
      safari_icon_32_32: 'http://onesignal.com/safari_packages/e4e87830-b954-11e3-811d-f3b376925f15/16x16@2.png',
      safari_icon_64_64: 'http://onesignal.com/safari_packages/e4e87830-b954-11e3-811d-f3b376925f15/32x32@2x.png',
      safari_icon_128_128: 'http://onesignal.com/safari_packages/e4e87830-b954-11e3-811d-f3b376925f15/128x128.png',
      safari_icon_256_256: 'http://onesignal.com/safari_packages/e4e87830-b954-11e3-811d-f3b376925f15/128x128@2x.png',
      site_name: 'The URL to your website for Web Push',
      basic_auth_key: 'NGEwMGZmMjItY2NkNy0xMWUzLTk5ZDUtMDAwYzI5NDBlNjJj',
    },
  },
  '400BAD': {
    status: 400,
    response: {
      errors: ['some error'],
    },
  },
};

export const updateAppResponse = {
  '200OK': {
    status: 200,
    response: {
      id: 'e4e87830-b954-11e3-811d-f3b376925f15',
      name: 'Your app 1',
      players: 0,
      messageable_players: 0,
      updated_at: '2014-04-01T04:20:02.003Z',
      created_at: '2014-04-01T04:20:02.003Z',
      gcm_key: 'a gcm push key',
      chrome_key: 'A Chrome Web Push GCM key',
      chrome_web_origin: 'Chrome Web Push Site URL',
      chrome_web_default_notification_icon: 'http://yoursite.com/chrome_notification_icon',
      chrome_web_sub_domain: 'your_site_name',
      apns_env: 'production',
      apns_certificates: 'Your apns certificate',
      safari_apns_certificate: 'Your Safari APNS certificate',
      safari_site_origin: 'The homename for your website for Safari Push, including http or https',
      safari_push_id: 'The certificate bundle ID for Safari Web Push',
      safari_icon_16_16: 'http://onesignal.com/safari_packages/e4e87830-b954-11e3-811d-f3b376925f15/16x16.png',
      safari_icon_32_32: 'http://onesignal.com/safari_packages/e4e87830-b954-11e3-811d-f3b376925f15/16x16@2.png',
      safari_icon_64_64: 'http://onesignal.com/safari_packages/e4e87830-b954-11e3-811d-f3b376925f15/32x32@2x.png',
      safari_icon_128_128: 'http://onesignal.com/safari_packages/e4e87830-b954-11e3-811d-f3b376925f15/128x128.png',
      safari_icon_256_256: 'http://onesignal.com/safari_packages/e4e87830-b954-11e3-811d-f3b376925f15/128x128@2x.png',
      site_name: 'The URL to your website for Web Push',
      basic_auth_key: 'NGEwMGZmMjItY2NkNy0xMWUzLTk5ZDUtMDAwYzI5NDBlNjJj',
    },
  },
};
