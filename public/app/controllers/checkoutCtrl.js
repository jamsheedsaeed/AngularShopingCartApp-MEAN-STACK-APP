var mymodel = angular.module("checkoutCtrl", ['cartService'])

.controller('myCheckout', function($scope,$location ,Cart) {
    $scope.showModal = false;
    var copiedObject = angular.copy(Cart.getCartProducts());
    $scope.products = copiedObject;
    $scope.qty = Cart.getQuantity();
    $scope.price = Cart.getTotalPricebyquantity();
    


    $scope.ProceedClick = function(){
        Cart.clearData();
        $scope.products = angular.copy(Cart.getCartProducts());
        $location.path('/proceed');
    }


    $scope.cleardata = function(){
        
        Cart.clearData();
        $scope.products = angular.copy(Cart.getCartProducts());
    }

    $scope.clearItem = function(index){
        Cart.clearSpecificItem(index);
        $scope.products = angular.copy(Cart.getCartProducts());
        $scope.price = Cart.getTotalPrice();
        $scope.price = Cart.getTotalPricebyquantity();
        $scope.qty = Cart.getQuantity();
    }


    $scope.AddNewItem = function(index){   
        Cart.addQuantity(index);
        $scope.products = angular.copy(Cart.getCartProducts());
        $scope.price = Cart.getTotalPricebyquantity();
        $scope.qty = Cart.getQuantity();
    }

});