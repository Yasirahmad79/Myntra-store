const CONVENIENCE_FEES = 99;
let bagitemsObject;
onLoad();
function onLoad() {
    loadBagitemsObject();
    displayBagItems();
    displayBagSummary()
}

function displayBagSummary() {
    let bagSummaryElement = document.querySelector('.bag-summary');
    let totalItem = bagitemsObject.length;
    let totalMRP = 0;
    let totalDiscount = 0;
  
    bagitemsObject.forEach(bagItem => {
      totalMRP += bagItem.original_price;
      totalDiscount += bagItem.original_price - bagItem.current_price;
    });
  
    let finalPayment = totalMRP - totalDiscount + CONVENIENCE_FEES;
    
    if (!bagSummaryElement) {
        return
    }
    bagSummaryElement.innerHTML = `
      <div class="bag-details-container">
      <div class="price-header">PRICE DETAILS (${totalItem} Items) </div>
      <div class="price-item">
        <span class="price-item-tag">Total MRP</span>
        <span class="price-item-value">₹${totalMRP}</span>
      </div>
      <div class="price-item">
        <span class="price-item-tag">Discount on MRP</span>
        <span class="price-item-value priceDetail-base-discount">-₹${totalDiscount}</span>
      </div>
      <div class="price-item">
        <span class="price-item-tag">Convenience Fee</span>
        <span class="price-item-value">₹99</span>
      </div>
      <hr>
      <div class="price-footer">
        <span class="price-item-tag">Total Amount</span>
        <span class="price-item-value">₹${finalPayment}</span>
      </div>
    </div>
    <button class="btn-place-order">
      <div class="css-xjhrni">PLACE ORDER</div>
    </button>
    `
  }

function loadBagitemsObject() {
    bagitemsObject = bagItems.map(itemId => {
        for (let i = 0; i < items.length; i++) {
            if (itemId == items[i].id) {
                return items[i]
            }
        }
    })
    console.log(bagitemsObject)
}
console.log(bagitemsObject)
function removeFromBag(itemId) {
  bagItems = bagItems.filter(bagItemId => bagItemId != itemId);
  localStorage.setItem('bagItems', JSON.stringify(bagItems));
  loadBagitemsObject();
  displayBagIcon();
  displayBagItems();
  displayBagSummary();
}

function displayBagItems() {
    let cartItems = document.querySelector('.bag-items-container');
    if (!cartItems) {
        return
    }
    let innerHtml = "";
    bagitemsObject.forEach(bagItem => {
        innerHtml += generateItemHtml(bagItem)
    });
    cartItems.innerHTML = innerHtml;
}
function generateItemHtml(item) {
    return `
    <div class="bag-item-container">
    <div class="item-left-part">
        <img class="bag-item-img" src="../${item.image}">
    </div>
    <div class="item-right-part">
          <div class="company">${item.company}</div>
          <div class="item-name">${item.item_name}</div>
          <div class="price-container">
            <span class="current-price">${item.current_price}</span>
            <span class="original-price">${item.original_price}</span>
            <span class="discount-percentage">${item.discount_percentage}</span>
          </div>
          <div class="return-period">
            <span class="return-period-days">14 days</span> return available
          </div>
          <div class="delivery-details">
               Delivery by
               <span class="delivery-details-days">10 Oct 2023</span>
          </div>
    </div>

    <div class="remove-from-cart" onclick="removeFromBag(${item.id})">X</div>
</div>`
}

