$(document).ready(function(){
    var cart = [];
    $(document).on('click', '.add_item', function (e) {
        console.log($(".add_item"));
        console.log(this);
        console.log($(this));
        var id = $(this).attr("id");
        var productType = $(this).attr("productType");
    
        var product = {} ;
        if(productType == filmType){
           product.picture = films[id].Poster;
           product.name = films[id].Title;
           product.description = films[id].Year;
           product.price = films[id].price;

        }else if(productType == bookType)
        {
            product.picture = books[id].volumeInfo.imageLinks.smallThumbnail;
            product.name = books[id].volumeInfo.title;
            product.description = books[id].Year;
            product.price = id + "2"+id;
        } else if (productType == gameType) 
        {
           product.picture = games[id].mediumImage;
           product.name = games[id].name;
           product.description = games[id].Year;
           product.price = games[id].salePrice;
        }
        cart.push(product);
        displayCart();  
    });
    
function displayCart() {
    cartText = " " ;
    for(var i=0; i < cart.length; i++ ) {
    cartText += `
    <div>
        <table class="table">
                <thead>
                  <tr>
                    <th>Product</th>
                    <th></th>
                    <th>Lager Status</th>
                    <th>Antal</th>
                    <th>Pris</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody class="item">
                  <tr>
                    <td >
                        <img class="item_images_cart" src="${cart[i].picture}" alt="">
                    </td>
                    <td class="item_description">
                        <h5>${cart[i].name}</h5>
                        <p>${cart[i].description}</p>
                    </td>
                    <td>
                      <div>
                      I lager
                      </div>
                    </td>
                    <td>
                        <div class="dropdown">
                            <button class="btn btn-default dropdown-toggle" type="button" data-toggle="dropdown">1
                             <span class="caret"></span></button>
                            <ul class="dropdown-menu">
                                <li><a href="#">2</a></li>
                                <li><a href="#">3</a></li>
                                <li><a href="#">4</a></li>
                                <li><a href="#"4</a></li>
                            </ul> 
                        </div>
                    </td>
                    <td>
                         <p>${cart[i].price}</p>
                    </td>
                    <td class="delete_item">
                    <span class="glyphicon glyphicon-trash  id="${i}"></span>
                   </td>
                  </tr>
                </tbody>
              </table>
</div>` }
    $(".cart_list").html(cartText);
    //
    $('.cart-length').text(cart.length);
}
$('.shopping_list').on('click', '.delete_item', function (e) {
    var id = $(this).attr("id");
    cart.splice(id, 1);
    displayCart();
    
});

});