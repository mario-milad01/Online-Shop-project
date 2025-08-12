const cartUpdateFormElement = document.querySelectorAll('.cart-item-management');
const cartTotalPriceElement = document.getElementById('cart-total-price');
const cartBadge = document.querySelectorAll('.badge');

async function updateCartItem(event){
    event.preventDefault();
    const formItem = event.target;
    const productId = formItem.dataset.productid;
    const quantity = formItem.firstElementChild.value;
    
    let response;
    try{
         response = await fetch('/cart/items',{
            method:'PATCH',
            body:JSON.stringify({
                productId:productId,
                newQuantity:quantity
            }),
            headers:{
                'Content-Type':'application/json'
            }
        });
        
    }catch(error){
        alert('Something went wrong!');
        return;
    }
    if(!response.ok){
        alert('Something went wrong!');
        return;
    }
    const responseData = await response.json();
    if(responseData.updatedCartData,responseData.updatedCartData.updatedPrice === 0 ){
        formItem.parentElement.parentElement.remove();
    }else{
        const cartItemTotalPrice = formItem.parentElement.querySelector('.cart-item-price');
        cartItemTotalPrice.textContent = responseData.updatedCartData.updatedPrice;
    }

    cartTotalPriceElement.textContent = responseData.updatedCartData.newTotalPrice;

    cartBadge.textContent = responseData.updatedCartData.newTotalQuantity;
}

for(const formElement of cartUpdateFormElement){
    formElement.addEventListener('submit',updateCartItem)
}