$(function () {
    //Länka Form

  //  getRequest("Tolstoy", ".default-book-search-section", 4, "default-book-search-results" );


    $("#search-form").submit(function (e) {
        $(".book-search-section").html("");

        e.preventDefault();
        var selected = [];
        $.each($("input[name='search-option']:checked"), function(){            
            selected.push($(this).val());
        });
        if ($.inArray(bookType,selected)!=-1){
            var searchTerm = $("#search-input").val();
            getRequest(searchTerm, ".book-search-section",20, "book-search-results" );
        }
    
    });
    //Hämta Data
   
    
    function getRequest (input, bookSearchSection, maxRes, bookSearchResults) {
        var url = 'https://www.googleapis.com/books/v1/volumes?';
        var rules = {
            apiKey : 'AIzaSyBEwF9vkQQ6vHEJay_Z7XmzxTdEVBnDiIs' ,
            q: input,
            maxResults: maxRes
        }
       
        $.getJSON(url, rules, function (data) {
            console.log(data);
            books = data.items;
            showResults(data.items, bookSearchSection, bookSearchResults);
        });
    } 

    
    // Visa data
    function showResults(data, bookSearchSection, bookSearchResults) {
        console.log(bookSearchSection);
        $(bookSearchSection).html(`
        <ul class="${bookSearchResults}">`);

        $.each(data, function (i, value) {
           
        $(`.${bookSearchResults}`).append(`
                <li> 
                <div class="item">
                <div class="item_images">
                    <img src="${value.volumeInfo.imageLinks.smallThumbnail}" alt="Det Finns Ingen Bild">
                </div>
                <div class="item_description">
                    <h5>${value.volumeInfo.title}</h5>
                    <p> Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                </div>
                <div class="item_button">
                    <div class="row">
                         <div class="price_item col-xs-12 col-md-5">
                            <p>${i}289</p>
                        </div>
                    <div  col-sm-7">
                        <button class="add_item" id="${i}"  productType="${bookType}"  >Lägg i Varukorg</button>
                    </div>
                </div>
                </div>
            </div>
                </li>
        `);

        });
        $(bookSearchSection).append(`    </ul>
        `);
    }
});