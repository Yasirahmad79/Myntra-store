let bagItems = [];
onLoad();
function onLoad() {
    let bagItemStr = localStorage.getItem('bagItems');
    bagItems = bagItemStr ? JSON.parse(bagItemStr) : [];
    addToBag();
    displayItemsOnHomePage();
    displayBagIcon();
    showMenu();
}
function showMenu() {
    let menu = document.querySelector(".sideBar-menu");
    if (!menu) {
        return;
    }
    if (menu.style.display == 'none') {
        menu.style.display = 'block'
    } else {
        menu.style.display = 'none'
    }
}
function addToBag(itemID) {
    if (!itemID) {
        return 
    }
    bagItems.push(itemID);
    localStorage.setItem('bagItems', JSON.stringify(bagItems))
    displayBagIcon();
}
function displayBagIcon() {
    let itemsinbag = document.querySelector(".bag-items");
    if (bagItems.length > 0) {
        itemsinbag.style.visibility = "visible"
        itemsinbag.innerText = bagItems.length;
    }else{
        itemsinbag.style.visibility = "hidden"
    }
}
function displayItemsOnHomePage() {
    let containerElement = document.querySelector(".category-items");
    if (!containerElement) {
        return;
    }        
    let innerHtml = "";
    items.forEach(item => {
        innerHtml += `
        <div class="item-container">
            <img src="${item.image}" alt="item Image">
            <div class="rating">
            ${item.rating.stars} | ${item.rating.count}
            </div>
            <div class="company-name">${item.company}</div>
            <div class="item-name">${item.item_name}</div>
            <div class="price">
            <span class="current-price">${item.current_price}</span>
            <span class="original-price">${item.original_price}</span>
            <span class="discount">${item.discount_percentage}</span>
            </div>
            <button class="btn-add-bag" onclick="addToBag(${item.id})">Add to Bag</button>
        </div>`;
    })
    containerElement.innerHTML = innerHtml;

}