angular.module("cartCtrl", ['cartService'])

.controller('myShoppingCart', function($scope, $location ,Cart) {

  var copiedObject = angular.copy(Cart.getProducts());
  $scope.Cartproducts = new Array();
  $scope.products = copiedObject;
  


  $scope.item = "Add To Cart";

  $scope.ViewDetails = function(details){
    Cart.ViewDetailsCart(details);
    console.log(details);
    $location.path('/cartdetail');
    

  }


  $scope.getCardDet = function(){
    
  }


  var prod = new Array();
  $scope.AddToCart = function(index){

    var id = index.pid;

    Cart.AddProductToCart(index);
    
  
    document.getElementById("btn-"+index.pid).disabled  = true;
  
    //$scope.prod = angular.copy($scope.Cartproducts);
  
    console.log(index);

  
  }

$scope.addProduct= function () {
 
    console.log(copiedObject);

 }

});