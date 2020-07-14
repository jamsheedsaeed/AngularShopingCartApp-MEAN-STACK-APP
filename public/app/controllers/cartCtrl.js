angular.module("cartCtrl", ['cartService','authService','addtocartService'])

.controller('myShoppingCart', function($scope, $location ,Cart,Auth , AddCart) {

  var copiedObject = angular.copy(Cart.getProducts());
  $scope.Cartproducts = new Array();
  $scope.products = copiedObject;
  


  var newcopiedObject = angular.copy(Cart.getClothesData());
  $scope.cartproducts = newcopiedObject;

  


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
    console.log(index);

    if(Auth.isLoggedIn()){
      Cart.AddProductToCart(index);
    AddCart.AddCartData(index)
    .success(function(data){
      //console.log('Data:'+index);

      // prod = data.pname;
      // price = data.price;
      // url = data.url;
     // Cart.AddProductToCart(index);
    
  
      document.getElementById("btn-"+index[0].pid).innerHTML  = "Add More";
    
      //$scope.prod = angular.copy($scope.Cartproducts);
    
      //console.log(index);

    });
   
    }else{
      $location.path('/login');
    }

  

  
  }

$scope.addProduct= function () {
 
    console.log(copiedObject);

 }

});