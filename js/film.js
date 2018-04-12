
$(function () {
    //Länka Form
    $("#search-form").submit(function (e) {
        $(".movie-search-section").html("");
        e.preventDefault();
        var selected = [];
            $.each($("input[name='search-option']:checked"), function(){            
                selected.push($(this).val());
            });
            if ($.inArray(filmType,selected)!=-1){

        var searchTerm = $("#search-input").val();
        getRequest(searchTerm);
            }
 });
    //Hämta Data
    function getRequest(input) {
        var url = `https://www.omdbapi.com/?`;
        var rules = {
            apiKey : `e4cbae2`,
            s : input,
            r : `json`
        };
    $.getJSON(url,  rules, function(data) {
        console.log(data);
        films = data.Search;
        showResults(data.Search);
    });
    }    
    
    
    // Visa data
    function showResults(data) {
        $(".movie-search-section").html(`
        <ul id="movie-search-results">`);

        $.each(data, function (i, value){ 
        $("#movie-search-results").append(
            `<li>
            <div class="item">
                <div class="item_images">
                    <img src="${value.Poster}" alt="Det Finns Ingen Bild">
                </div>
                <div class="item_description">
                    <h5>${value.Title}</h5>
                    <p>Porttitor rhoncus dolor purus non enim praesent elementum. Mauris pharetra et ultrices neque ornare aenean euismod elementum nisi.</p>
                </div>
                <div class="price_item">
                <p>${value.Year} Kr</p>
            </div>
                <div class="item_button">
                    <div class="row">
                    <div >
                        <button class="add_item" id="${i}"  productType="${filmType}" >Lägg i Varukorg</button>
                    </div>
                </div>
                </div>
            </div>
         </li>`
            
            );
        });
        $(".movie-search-section").append(`    </ul>
`);
    
    }
});


