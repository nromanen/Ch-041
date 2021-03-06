(function () {
	'use strict';
	angular.module('rssreader').controller('DashboardController', ['$scope', '$state', 'dashboardService', 'feedsService', 'toasterService', function ($scope, $state, dashboardService, feedsService, toasterService) {
		$scope.sidebar = dashboardService.checkSidebar;
		$scope.headTitle = dashboardService.getTitle;
		$scope.feed = dashboardService.getFeedId;
		$scope.alertMsg = dashboardService.alertMsg;
		$scope.successMsg = dashboardService.successMsg;
		$scope.checkIfReading = function () {
			return dashboardService.isReadingArticle;
		};

		$scope.toggleSidebar = function () {
			dashboardService.sidebar = !dashboardService.sidebar;
		}
		$scope.hideSidebar = function () {
			dashboardService.sidebar = false;
		}
		$scope.showSidebar = function () {
			dashboardService.sidebar = true;
		}

		$scope.hideViewBtns = function () {
		    if ($scope.headTitle() === "Add Feed" || feedsService.feedsDictionary.length == 0) {
		        return true;
		    }
			return false;
			
		}
		$scope.checkIfToggled = function (mode) {
			return dashboardService.getViewMode() === mode;
		}
		
		$scope.checkSortType = function (type, order) {
			var sortType = dashboardService.getSortParam();
			if (type == sortType.type && order == sortType.order) {
				return true;
			}
			return false;
		}
		
		$scope.onViewChange = function (view) {
			switch (view) {
				case 'view-mode1':
					dashboardService.setViewMode(0);
					break;
				case 'view-mode2':
					dashboardService.setViewMode(1);
					break;
				case 'view-mode3':
					dashboardService.setViewMode(2);
					break;
			}
			$state.go('dashboard.' + dashboardService.getViewMode());
		}
		var timer;
		$scope.onFeedDelete = function () {
			toasterService.confirm({
				message: "Remove this feed?",
				confirm: "confirmFeedDelete"
			}, $scope);
		}
		$scope.confirmFeedDelete = function () {
		    dashboardService.loadingIcon = true;
			feedsService.removeFeed(dashboardService.getFeedId())
				.then(function (res) {
				    dashboardService.loadingIcon = false;
				    toasterService.info("Feed has been deleted");
					$state.reload("dashboard");
				}, function (err) {
				    dashboardService.loadingIcon = false;
					console.log(err);
				});
		}
		$scope.currentSortTitle = function () {
			var sortParam = dashboardService.getSortParam();
			switch (sortParam.type) {
				case 'date': {
					if (sortParam.order == 1){
						return "Newest";
					}
					return "Oldest";
				}
				case 'feed': {
					return "By Feed";            
				}
			}
		}
		var sortTypeElement;
		$scope.setSortParam = function (e, type, order) {
			if (sortTypeElement) {
				sortTypeElement.removeClass('selected');
			}
			sortTypeElement = angular.element(e.currentTarget);
			sortTypeElement.addClass('selected');
			dashboardService.setSortParam(type, order);
		}
	}]);
})();