'use strict';

/* global chai, sinon: false */

var expect = chai.expect;

describe('The EsnUserNotificationTogglerController controller', function() {
  var $controller, $scope, $state, matchmedia, $rootScope, popover, SM_XS_MEDIA_QUERY;

  function initController() {
    var controller = $controller('EsnUserNotificationTogglerController', {$scope: $scope});

    $scope.$digest();

    return controller;
  }

  beforeEach(function() {
    popover = {
      toggle: sinon.spy()
    };

    matchmedia = {
      is: sinon.spy()
    };

    $state = {
      go: sinon.spy()
    };
  });

  beforeEach(function() {
    angular.mock.module('esn.user-notification', function($provide) {
      $provide.constant('matchmedia', matchmedia);
      $provide.constant('$state', $state);
    });
  });

  beforeEach(inject(function(_$controller_, _$q_, _$rootScope_, _$state_, _SM_XS_MEDIA_QUERY_) {
    $controller = _$controller_;
    $rootScope = _$rootScope_;
    $state = _$state_;
    SM_XS_MEDIA_QUERY = _SM_XS_MEDIA_QUERY_;
    $scope = $rootScope.$new();
    $scope.popover = popover;
  }));

  describe('The open function', function() {
    beforeEach(function() {
      initController();
    });

    it('should toggle the popover on desktop', function() {
      matchmedia.is = sinon.spy(function() {
        return false;
      });

      $scope.open();

      expect(matchmedia.is).to.have.been.calledWith(SM_XS_MEDIA_QUERY);
      expect(popover.toggle).to.have.been.calledOnce;
      expect($state.go).to.not.have.been.called;
    });

    it('should open the notification page on mobile', function() {
      matchmedia.is = sinon.spy(function() {
        return true;
      });

      $scope.open();

      expect(matchmedia.is).to.have.been.calledWith(SM_XS_MEDIA_QUERY);
      expect(popover.toggle).to.not.have.been.called;
      expect($state.go).to.have.been.calledWith('user-notification.list');
    });
  });
});
