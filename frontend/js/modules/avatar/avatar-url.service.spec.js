'use strict';

/* global chai: false */

var expect = chai.expect;

describe('The esnAvatarUrlService service', function() {
  var esnAvatarUrlService, email, username, userId;

  beforeEach(angular.mock.module('esn.avatar'));

  beforeEach(function() {
    email = 'me@open-paas.org';
    username = 'John Doe';
    userId = '123456789';
  });

  beforeEach(inject(function(_esnAvatarUrlService_) {
    esnAvatarUrlService = _esnAvatarUrlService_;
  }));

  describe('The generateUrl function', function() {
    it('should return an URL with no displayName when none given', function() {
      expect(esnAvatarUrlService.generateUrl(email)).to.equal('/api/avatars?email=' + email + '&objectType=email');
    });

    it('should return an URL with no displayName when an empty one is given', function() {
      expect(esnAvatarUrlService.generateUrl(email, '')).to.equal('/api/avatars?email=' + email + '&objectType=email');
    });

    it('should return an URL with displayName when one is given', function() {
      expect(esnAvatarUrlService.generateUrl(email, username)).to.equal('/api/avatars?email=' + email + '&objectType=email&displayName=' + username);
    });
  });

  describe('The generateUrlByUserEmail function', function() {
    it('should return an URL with valid query paramater', function() {
      expect(esnAvatarUrlService.generateUrlByUserEmail(email)).to.equal('/api/avatars?email=' + email);
    });
  });

  describe('The generateUrlByUserId function', function() {
    it('should return an URL with the userId', function() {
      expect(esnAvatarUrlService.generateUrlByUserId(userId)).to.equal('/api/users/' + userId + '/profile/avatar');
    });
  });
});
