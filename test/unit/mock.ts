import * as sinon from 'sinon';

import * as utils from '../../src/utils';

export const mockUtilsRequest = (sandbox: sinon.SinonSandbox): sinon.SinonSpy => {
  const successResponse = {
    statusCode: 200,
    body: {},
  };
  const basicAuthRequestSpy = sinon.fake.resolves(successResponse);

  sandbox.replace(utils, 'basicAuthRequest', basicAuthRequestSpy);

  return basicAuthRequestSpy;
};
