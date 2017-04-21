'use strict';

const chai = require('chai');
const mockery = require('mockery');
const expect = chai.expect;
const sinon = require('sinon');

describe('The Github strategy', function() {
  let deps, passportMocks, configMocks, helpersMock;
  const logger = {
    debug: function() {},
    info: function() {}
  };
  const dependencies = function(name) {
    return deps[name];
  };
  const STRATEGY_NAME = 'github-authz';

  beforeEach(function() {
    configMocks = {
      get: function(callback) {
        return callback(null, {
          github: {
            client_id: '0123456789',
            client_secret: 'abcdefgh'
          }
        });
      }
    };

    passportMocks = {
      use: function() {}
    };

    helpersMock = {
      upsertUserAccount: function(user, account, callback) {
        return callback();
      }
    };

    deps = {
      oauth: {
        helpers: helpersMock
      },
      logger: logger,
      'esn-config': function() {
        return configMocks;
      }
    };

    mockery.registerMock('passport', passportMocks);
  });

  function getModule() {
    return require('../../../../../backend/lib/strategies/github')(dependencies);
  }

  describe('The configure function', function() {
    it('should register github-authz passort if github is configured', function(done) {
      passportMocks.use = function(name) {
        expect(name).to.equal(STRATEGY_NAME);
      };

      getModule().configure(done);
    });

    it('should unregister github-authz callback with error if github is not configured', function(done) {
      configMocks.get = function(callback) {
        return callback(null, {});
      };
      passportMocks.unuse = sinon.spy();

      getModule().configure(function(err) {
        expect(passportMocks.unuse).to.have.been.calledWith(STRATEGY_NAME);
        expect(err).to.deep.equal(new Error('Github OAuth is not configured'));

        done();
      });
    });
  });
});
