  1.   Data Structure

  2. Cart: An array of objects containing product details.

  Product Object Structure:


 Product {
    id: Integer,
    name: String,
    image: String,
    price: Float,
    quantity: Integer
}



 4.  Shopping Cart Operations
  
Function AddToCart(product)

    IF cart contains product.id THEN
    
        Increment product.quantity in cart
        
    ELSE
        IF Cart size < 100 THEN
        
            Add product to cart with quantity = 1
        ELSE
        
            Display "Cart is full, cannot add more products."
        ENDIF
        
    ENDIF
    
    RETURN cart
    
END Function 


 
6. Function RemoveFromCart(productId)
   
    FOR each item in cart
   
        IF item.id == productId THEN
            Remove item from cart
            BREAK
        ENDIF
   
    ENDFOR
   
    RETURN cart
   
END Function
 
 8. Function CalculateTotalPrice()

    totalPrice = 0
    
    FOR each item in cart
    
        totalPrice = totalPrice + (item.price * item.quantity)
    ENDFOR
    
    RETURN totalPrice
    
END Function

10. Function CalculateAveragePrice()

    totalPrice = CalculateTotalPrice()
    
    totalItems = 0
    
    FOR each item in cart
    
        totalItems = totalItems + item.quantity
    ENDFOR
    
    IF totalItems == 0 THEN
    
        RETURN 0
    ELSE
    
        RETURN totalPrice / totalItems
    ENDIF
    
END Function

12. Function FilterProducts(maxPrice)
    filteredProducts = []
    FOR each item in cart
        IF item.price <= maxPrice THEN
            Add item to filteredProducts
        ENDIF
    ENDFOR
    RETURN filteredProducts
END Function
 
13. Function FilterProductsByRange(minPrice, maxPrice)
    filteredProducts = []
    FOR each item in cart
        IF item.price >= minPrice AND item.price <= maxPrice THEN
            Add item to filteredProducts
        ENDIF
    ENDFOR
    RETURN filteredProducts
END Function

14. Function SortCart(order)
    IF order == "asc" THEN
        Sort cart by price in ascending order
    ELSE IF order == "desc" THEN
        Sort cart by price in descending order
    ENDIF
    RETURN cart
END Function

15. Function ClearCart()
    cart = []
    Display "Your cart is empty"
    RETURN cart
END Function

16. json 
  [
  {
    "id": 1,
    "title": "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
    "price": 109.95,
    "description": "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
    "category": "men's clothing",
    "image": "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
    "rating": {
      "rate": 3.9,
      "count": 120
    }
  },
  {
    "id": 2,
    "title": "Mens Casual Premium Slim Fit T-Shirts ",
    "price": 22.3,
    "description": "Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing. And Solid stitched shirts with round neck made for durability and a great fit for casual fashion wear and diehard baseball fans. The Henley style round neckline includes a three-button placket.",
    "category": "men's clothing",
    "image": "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg",
    "rating": {
      "rate": 4.1,
      "count": 259
    }
  },]
