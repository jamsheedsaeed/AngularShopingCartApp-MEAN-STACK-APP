angular.module("cartdetailCtrl", ['cartService'])

.controller('myCartdetails', function($scope ,Cart) {

    var copiedObject = angular.copy(Cart.getCartDetails());
    $scope.cartDetails = copiedObject;

    console.log($scope.cartDetails);

    

});