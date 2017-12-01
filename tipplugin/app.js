console.log('initializing fio extension');
chrome.extension.sendRequest("show_page_action");

$(document).ready(function () {
    if ($("#product-detail-description").length)         // use this if you are using id to check
    {
        $("<p>You are on product</p>").prependTo(document.body);
    }

});
