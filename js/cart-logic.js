// ************************************************
// Shopping Cart Services
// ************************************************

var shoppingCart = (function() {
    // =============================
    // Private methods and propeties
    // =============================
    cart = [];
    


    // Constructor
    function Item(name,price, count) {
      this.name = name;
      this.price = price;
      this.count = count;
    }
    
    // Save cart
    function saveCart() {
      sessionStorage.setItem('shoppingCart', JSON.stringify(cart));
    }
    
      // Load cart
    function loadCart() {
      cart = JSON.parse(sessionStorage.getItem('shoppingCart'));
    }
    if (sessionStorage.getItem("shoppingCart") != null) {
      loadCart();
    }
    

  
    // =============================
    // Public methods and propeties
    // =============================
    var obj = {};
    
    // Add to cart
    obj.addItemToCart = function(name, price, count) {
      for(var item in cart) {
        if(cart[item].name === name) {
          cart[item].count ++;
          saveCart();
          return;
        }
      }
      var item = new Item(name, price, count);
      cart.push(item);
      saveCart();
    }
    // Set count from item
    obj.setCountForItem = function(name, count) {
      for(var i in cart) {
        if (cart[i].name === name) {
          cart[i].count = count;
          break;
        }
      }
    };
    // Remove item from cart
    obj.removeItemFromCart = function(name) {
        for(var item in cart) {
          if(cart[item].name === name) {
            cart[item].count --;
            if(cart[item].count === 0) {
              cart.splice(item, 1);
            }
            break;
          }
      }
      saveCart();
    }
  
    // Remove all items from cart
    obj.removeItemFromCartAll = function(name) {
      for(var item in cart) {
        if(cart[item].name === name) {
          cart.splice(item, 1);
          break;
        }
      }
      saveCart();
    }
  
    // Clear cart
    obj.clearCart = function() {
      cart = [];
      saveCart();
    }
  
    // Count cart 
    obj.totalCount = function() {
      var totalCount = 0;
      for(var item in cart) {
        totalCount += cart[item].count;
      }
      return totalCount;
    }
  
    // Total cart
    obj.totalCart = function() {
      var totalCart = 0;
      for(var item in cart) {
        totalCart += cart[item].price * cart[item].count;
      }
      return Number(totalCart.toFixed(2));
    }
  
    // List cart
    obj.listCart = function() {
      var cartCopy = [];
      for(i in cart) {
        item = cart[i];
        itemCopy = {};
        for(p in item) {
          itemCopy[p] = item[p];
  
        }
        itemCopy.total = Number(item.price * item.count).toFixed(2);
        cartCopy.push(itemCopy)
      }
      return cartCopy;
    }
  
    // cart : Array
    // Item : Object/Class
    // addItemToCart : Function
    // removeItemFromCart : Function
    // removeItemFromCartAll : Function
    // clearCart : Function
    // countCart : Function
    // totalCart : Function
    // listCart : Function
    // saveCart : Function
    // loadCart : Function
    return obj;
  })();





// *****************************************
  // Triggers / Events
  // ***************************************** 
  // Add item
  $('.add-to-cart-btn').click(function(e) {
    e.preventDefault()
    var name = $(this).parents('.product').find($('[data-name]')).attr('data-name');
    var price = Number($(this).parents('.product').find($('[data-price]')).attr('data-price'));
    shoppingCart.addItemToCart(name, price, 1);
    displayCart();
  });
  
  
  $('.clear-cart-btn').click(function(e) {
    e.preventDefault()
    shoppingCart.clearCart()
    displayCart()
  })

  //Display cart
  function displayCart() {
    var cartArray = shoppingCart.listCart();
    if(cartArray.length < 1){
        $('.added-items').hide()
    }else{
        $('.added-items').show()
    }
    $('.added-items table tbody').html("")
    for(var i=0;i <cartArray.length;i++) {
        $('.added-items table tbody').append(`

        <tr>
            <td>${cartArray[i].name}</td>
            <td>${cartArray[i].price}</td>
            <td>
                <div class="count-div">
                    <button class="btn btn-outline-primary plus-btn" data-name="${cartArray[i].name}">+</button>
                    <input type="number" disabled class="form-control count" data-name="${cartArray[i].name}" value="${cartArray[i].count}" min="0" id="">
                    <button class="btn btn-outline-primary minus-btn" data-name="${cartArray[i].name}">-</button>
                </div>
            </td>
            <td>${cartArray[i].price * cartArray[i].count}</td>
            <td><button class="btn btn-outline-danger delete"><i class="fa fa-trash fa-fw"></i></button></td>
        </tr>
        `)
    }

    $('.total').text(shoppingCart.totalCart().toFixed(2));
  }
  
  // Delete item button
  $('.added-items').on("click", ".delete", function(event) {
    var name = $(this).parents('tr').find($('[data-name]')).attr('data-name')
    shoppingCart.removeItemFromCartAll(name);
    displayCart();
  })
  
  
  // -1
  $('.added-items').on("click", ".minus-btn", function(event) {
    var name = $(this).data('name')
    shoppingCart.removeItemFromCart(name);
    displayCart();
  })
  // +1
  $('.added-items').on("click", ".plus-btn", function(event) {
    var name = $(this).data('name')
    shoppingCart.addItemToCart(name);
    displayCart();
  })
  
  // Item count input
  $('.added-items').on("change", ".count", function(event) {
     var name = $(this).data('name');
     var count = Number($(this).val());
    shoppingCart.setCountForItem(name, count);
    displayCart();
  });
 

displayCart();
