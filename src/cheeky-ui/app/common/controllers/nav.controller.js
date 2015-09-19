'use strict';

angular.module('app.common').controller('NavController', NavController);

function NavController() {
	var vm = this;

	vm.items =
	{
		title: 'All Categories',
		items: [
			{
				title: 'Devices',
				items: [
					{
						title: 'Magazines',
						items: [
							{
								title: 'Store'
							},
							{
								title: 'Credits'
							}
						]
					},
					{
						title: 'Store'
					},
					{
						title: 'Credits'
					}
				]
			},
			{
				title: 'Magazines',
				items: [
					{
						title: 'Store',
						items: [
							{
								title: 'Store'
							},
							{
								title: 'Credits'
							}
						]
					},
					{
						title: 'Credits'
					}
				]
			},
			{
				title: 'Store'
			},
			{
				title: 'Credits'
			}
		]
	};
}