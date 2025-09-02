let bagItems = []; // Array to store items in the bag

onLoad();

function onLoad() {
    let bagItemStr = localStorage.getItem('bagItem');
    bagItems = bagItemStr ? JSON.parse(bagItemStr) : []; // ✅ fixed: use bagItems
    displayItemsOnHomePage(); 
    displayBagIcon(); 
}

function addToBag(itemID) {
    bagItems.push(itemID);
    localStorage.setItem('bagItem', JSON.stringify(bagItems));
    displayBagIcon(); 
}

function displayBagIcon() {
    let bagIconCount = document.querySelector('.bag-item-count');
    if (bagItems.length > 0) {
        bagIconCount.style.visibility = 'visible'; // make sure it shows when items exist
        bagIconCount.innerText = bagItems.length;
    } else {
        bagIconCount.style.visibility = 'hidden';
    }
}

function displayItemsOnHomePage() {
    let itemsContainer = document.querySelector('.items-container');
    let innerHTML = '';
    if(!itemsContainer){
        return;
    }

    items.forEach((item) => {
        innerHTML += `<div class="item-container">
                <img src=${item.image} alt="item-image" class="item-img">
                <div class="ratings">
                   ${item.rating.stars}⭐ || ${item.rating.count}
                </div>
                <div class="company-name">
                    ${item.company}
                </div>
                <div class="product-name">
                    ${item.item_name}
                </div>
                <div class="pricing">
                    <span class="current-price">Rs ${item.current_price}</span>
                    <span class="original-price">Rs ${item.original_price}</span>
                    <span class="discount">(${item.discount_percentage}% off)</span>
                </div>
                <button class="btn-add-bag" onclick="addToBag(${item.id})">Add to Bag</button>
            </div>`;
    });

    itemsContainer.innerHTML = innerHTML;
}
