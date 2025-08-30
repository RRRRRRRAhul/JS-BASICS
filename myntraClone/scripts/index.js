let itemsContainer = document.querySelector('.items-container');
let item = {
    item_imag: 'images/1.jpg',
    rating: {
        stars: 4.5,
        noOfReviews: 1400,
    },
    comapny_name: 'Hello World',
    item_name: 'Hello Project',
    current_price: 500,
    original_price: 1000,
    discount_percentage: 50
}
itemsContainer.innerHTML = `<div class="item-container">
                <img src=${item.item_imag} alt="item-image" class="item-img">
                <div class="ratings">
                   ${item.rating.stars}⭐ || ${item.rating.noOfReviews}
                </div>
                <div class="company-name">
                    ${item.comapny_name}
                </div>
                <div class="product-name">
                    ${item.product_name}
                </div>
                <div class="pricing">
                    <span class="current-price">Rs ${item.current_price}</span>
                    <span class="original-price">Rs ${item.original_price}</span>
                    <span class="discount">(${item.discount_percentage}% off)</span>
                </div>
                <button class="btn-add-bag
                ">Add to Bag</button>
            </div>`