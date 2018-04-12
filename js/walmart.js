$(function () {
    //Länka Form

  //  getRequest("Tolstoy", ".default-book-search-section", 4, "default-book-search-results" );


    $("#search-form").submit(function (e) {
        $(".game-search-section").html("");
        e.preventDefault();
        var selected = [];
        $.each($("input[name='search-option']:checked"), function(){            
            selected.push($(this).val());
        });
        if ($.inArray("game",selected)!=-1){
            var searchTerm = $("#search-input").val();
            getRequest(searchTerm, ".game-search-section",40, "bogameok-search-results" );
        }
    
    });
    //Hämta Data
   
    
    function getRequest (input, gameSearchSection, maxRes, gameSearchResults) {
        var url = 'http://api.walmartlabs.com/v1/search?callback=?';
        var rules = {
            apiKey : 'aqybkh8wx4zbppp7ww9vqwf9' ,
            query: input,
            format: 'json',
            categoryPath : 'Video Games/Shop by Video Game Franchise/Call of Duty Video Games for PC, Xbox and PlayStation'
        }
       
        $.getJSON(url, rules, function (data) {
            console.log(data);
            games = data.items;
            showResults(data, gameSearchSection, gameSearchResults);
        });
    } 

    
    // Visa data
    function showResults(data, gameSearchSection, gameSearchResults) {
        console.log(gameSearchSection);
        $(gameSearchSection).html(` 
        <div> <h5>${data.query}- Showing ${data.numItems} results</h5> </div>
        <ul class="${gameSearchResults}">`);

        $.each(data.items, function (i, value) {
           
        $(`.${gameSearchResults}`).append(`
                <li> 
                <div class="item">
                <div class="item_images">
                    <img src="${value.mediumImage}" alt="Det Finns Ingen Bild">
                </div>
                <div class="item_description">
                    <h5>${value.name}</h5>
                    <p>Eget nunc lobortis mattis aliquam. Lacus vestibulum sed arcu non odio. Nec sagittis aliquam malesuada bibendum arcu vitae elementum</p>
                </div>
                <div class="price_item">
                <p>${value.salePrice} kr</p>
            </div>
                <div class="item_button">
                    <div class="row">
                    <div">
                        <button class="add_item" id="${i}234"  productType="${gameType}"  >Lägg i Varukorg</button>
                    </div>
                </div>
                </div>
            </div>
                </li>
        `);

        });
        $(gameSearchSection).append(`    </ul>
        `);
    }
});
