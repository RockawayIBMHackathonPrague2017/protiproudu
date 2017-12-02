console.log('initializing fio extension');
chrome.extension.sendRequest("show_page_action");

$(document).ready(function () {
    if ($("#product-detail-description").length)         // use this if you are using id to check
    {
        var productID = $('[data-sel~="catalog-number"]').text();
        //todo: post backend id product
        //todo: backend return ( image, url, motivationText )
        (function () {
            var apiUrl = "https://api.logoman.cz/api/product/" + productID;

            $.getJSON(apiUrl, {
                //format: "json"
            })
                .done(function (data) {
                    addSmallBox(data.url, data.image, data.motivationText, data.price);
                });
        })();

    }

});

function addSmallBox(url, image, motivationText, price) {

    var box = "<ul class=\"promo-boxes-wrapper\" style=\"margin-top: 10px\">" +
        "<li class=\"promo-box\">" +
        "<a style=\"background-image: url(" + image + ");\" class=\"promo-box-head\" href=\"" + url + "\"></a>" +
        "<a class=\"link--primary promo-box-title\" style=\"font-color:black;line-height: 1.4; letter-spacing: -0.01em; font-size: 1.1em;\" analytics-label=\"931819\" analytics-event=\"Box1\" analytics-category=\"TV - kampaň\" analytics-on=\"click\" href=\"" + url + "\">" +
        "<span class=\"link--secondary\" style=\"text-decoration:underline\">" + motivationText +
        "</span>" +
        price +
        "</a></li>";

    $('form .detail-buttons').after(box);
}

