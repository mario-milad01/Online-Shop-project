const updateOrderFormElements = document.querySelectorAll(
  '.order-actions form'
);

async function updateOrder(event) {
  event.preventDefault();
  const formItem = event.target;

  const formData = new FormData(formItem);
  const newStatus = formData.get('status');
  const orderId = formData.get('orderid');


  let response;

  try {
    response = await fetch(`/admins/orders/${orderId}`, {
      method: 'PATCH',
      body: JSON.stringify({
        newStatus: newStatus
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    alert('Something went wrong - could not update order status.');
    return;
  }

  if (!response.ok) {
    alert('Something went wrong - could not update order status.');
    return;
  }

  const responseData = await response.json();

  formItem.parentElement.parentElement.querySelector('.badge').textContent =
    responseData.newStatus.toUpperCase();
}

for (const updateOrderFormElement of updateOrderFormElements) {
  updateOrderFormElement.addEventListener('submit', updateOrder);
}