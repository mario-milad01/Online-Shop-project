const addButtonElement = document.getElementById('add-to-cart');
const badgeElement = document.querySelectorAll(' .badge');
async function addToCart(){
    let response;
    try{
        const productId = addButtonElement.dataset.productid;
         response = await fetch('/cart/items',{
            method:'POST',
            body:JSON.stringify({
                productId:productId 
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
    const newTotalQuantity = responseData.newTotalItems;

    for(const cartBadgeElement of badgeElement){
        cartBadgeElement.textContent = newTotalQuantity;
    }

}

addButtonElement.addEventListener('click',addToCart)