module.exports = {
  invalidClientWithNonObjectData: '',
  invalidUserAuthKey: {
    userAuthKey: 101010
  },
  invalidAppProperty: {
    userAuthKey: 'XXXX',
    other: {}
  },
  invalidAppWithouAuthProperty: {
    userAuthKey: 'XXXXX',
    app: {
      otherAuthKey: 'XXXX',
      appId: 'XXXX'
    }
  },
  invalidAppWithoutIdProperty: {
    userAuthKey: 'XXXXX',
    app: {
      appAuthKey: 'XXXX',
      otherID: 'XXXX'
    }
  },
  validEmptyClient: {},
  validUserAuth: 'XXXX',
  validSetApp: {
    appAuthKey: 'XXXX',
    appId: 'XXXX'
  },
  validClient: {
    userAuthKey: 'XXXXXX',
    app: {
      appAuthKey: 'XXXXX',
      appId: 'XXXXX'
    }
  }
}
