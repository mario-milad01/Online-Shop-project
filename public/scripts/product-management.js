const deleteButtonElements = document.querySelectorAll('.product-item-buttons button');


async function deleteProduct(event){
   const buttonClicked =  event.target;
   const productId = buttonClicked.dataset.productid;

   const response = await fetch('/admins/products/' + productId,{
    method:'DELETE'
   });

   if(!response.ok){
    alert('Something went wrong');
    return;
   }

   buttonClicked.parentElement.parentElement.parentElement.parentElement.remove();
}

for(const deleteButtonElement of deleteButtonElements){
    deleteButtonElement.addEventListener('click',deleteProduct);
}
