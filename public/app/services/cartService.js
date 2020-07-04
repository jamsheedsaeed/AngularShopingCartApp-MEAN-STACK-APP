angular.module('cartService',[])

.factory('Cart',function($http){

    
    var product = [];

    var CartFactory = {};

    var CartProducts = [];

    var total = 0;
    var CartDetails = [];

    var products = [{
        "pid": 1,
        "pname": "Jordan Mike1",
        "price": 3000,
        "url": "https://secure-images.nike.com/is/image/DotCom/CT8532_104_A_PREM?$SNKRS_COVER_WD$&align=0,1",
        "qty": 1
      }, {
        "pid": 2,
        "pname": "Jordan Max 200",
        "price": 4000,
        "url": "https://static.nike.com/a/images/c_limit,w_318,f_auto/t_product_v1/0c596b76-7207-41cc-8890-4e4f9c7e594d/jordan-max-200-shoe-sqSPsZ.jpg",
        "qty": 1
      }, {
         "pid": 3,
        "pname": "NikeCourt vintage Premium",
        "price": 3000,
        "url": "https://static.nike.com/a/images/c_limit,w_318,f_auto/t_product_v1/i1-7750a51f-31e6-4059-893f-a20ef852573a/nikecourt-vintage-shoe-3X1v0g.jpg",
        "qty": 1
      }, {
         "pid": 4,
        "pname": "Nike Court Vintage Premium",
        "price": 3000,
        "url": "https://static.nike.com/a/images/c_limit,w_318,f_auto/t_product_v1/9b120757-5a21-4fed-a93e-e144eb6eb9e4/court-vintage-shoe-PgwXmd.jpg",
        "qty": 1
        
    }, {
        "pid": 5,
       "pname": "Jordan Jumpman 2020",
       "price": 4500,
       "url": "https://static.nike.com/a/images/c_limit,w_318,f_auto/t_product_v1/5b009b76-1af1-435d-9a74-cc145324a6ab/jordan-jumpman-2020-basketball-shoe-QK68fT.jpg",
       "qty": 1
     }, {
        "pid": 6,
       "pname": "Jordon Aerospace 720",
       "price": 6000,
       "url": "https://static.nike.com/a/images/c_limit,w_318,f_auto/t_product_v1/i1-16fbb417-967b-410a-8e1e-450c11a86bc0/jordan-aerospace-720-shoe-zrrDq8.jpg",
       "qty": 1
     }
    
    ]


    CartFactory.addproductservice = function(val){
        product.push(val);
        return product;
    }

    CartFactory.AddProductToCart = function(index){
        CartProducts.push({pid:index.pid, pname:index.pname, price:index.price,url:index.url,qty:index.qty});
       // product.push(val);
        return CartProducts;
    }

    CartFactory.getCartProducts = function(val){
    
        return CartProducts;
    }


    CartFactory.getQuantity = function(){
        var total = 0;
        for(var i = 0; i < CartProducts.length; i++){
                total += CartProducts[i].qty;
        }
        return total;
    }

    CartFactory.ViewDetailsCart = function(index){
        CartDetails = [];
        CartDetails.push({pid:index.pid, pname:index.pname, price:index.price,url:index.url,qty:index.qty});

        console.log(CartDetails);
    }
    CartFactory.getCartDetails = function(){
        return CartDetails;
    }

    CartFactory.addQuantity = function(index){
        var total = 0;
        for(var i = 0; i < CartProducts.length; i++){
            //var product = CartProducts[i];
            if(CartProducts[i].pid == index){
                total += CartProducts[i].qty;
                CartProducts[i].qty++;
                break;
            }
           
        }
        return total;
    }

    CartFactory.getTotalQuantities = function(){
        var total = 0;
        for(var i = 0; i < CartProducts.length; i++){
            //var product = CartProducts[i];
                total += CartProducts[i].qty;
                CartProducts[i].qty++;     
        }
        return total;
    }


    CartFactory.clearData = function(){
        CartProducts.length = 0;
        return CartProducts.length;
    }


    CartFactory.clearSpecificItem = function(index){
        for(var i=0; i < CartProducts.length; i++){
            if(CartProducts[i].pid == index){
                index = i;
                break;
            }

        }
      // var index =  CartProducts.findIndex(index.pid);
        return CartProducts.splice(index,1);
    }


    CartFactory.getTotalPrice = function(){
    
        var total = 0;
        for(var i = 0; i < CartProducts.length; i++){
            var product = CartProducts[i];
            total += product.price;
        }
        return total;
    }


    CartFactory.getTotalPricebyquantity = function(){
    
        var total = 0;
        for(var i = 0; i < CartProducts.length; i++){
            var product = CartProducts[i];
            total += (product.price*product.qty);
        }
        return total;
    }




    CartFactory.getProducts = function(){
        angular.forEach(products, function(value, key) {
          //  console.log(key + ': ' + value);
            product.push(value);
          });
        return products;
    }
    CartFactory.getCountproduct = function(){
        return CartProducts.length;
    }

    return CartFactory;
});