console.log('initializing fio extension');
chrome.extension.sendRequest("show_page_action");

$(document).ready(function () {
    if ($("#product-detail-description").length)         // use this if you are using id to check
    {
        loadStyle("https://code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css");
        var productID = $('[data-sel~="catalog-number"]').text();

        (function () {
            var apiUrl = "https://api.logoman.cz/api/product/" + productID;

            $.getJSON(apiUrl, {
                //format: "json"
            })
                .done(function (data) {
                    addSmallBox(data.url, data.image, data.motivationText, data.price);
                });
        })();

        (function () {
            var apiUrl = "https://api.logoman.cz/api/chatbot/" + productID;

            $.getJSON(apiUrl, {
                //format: "json"
            })
                .done(function (data) {
                    createChat(data.text);
                });
        })();


    }

});

function createChat(text) {
    $("<a id='menu' class=\"float-button biAEAb\"><svg height=\"24\" viewBox=\"0 0 24 24\" width=\"24\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z\"></path><path d=\"M0 0h24v24H0z\" fill=\"none\"></path></svg></a>" +
        "    <div class=\"chat-container sc-iwsKbI chat\" style=\"width: 280px;\" width=\"350px\">" +
        "<div class=\"rsc-header sc-gqjmRU glfuN\"><h2 class=\"rsc-header-title sc-VigVT dYUxQs\">Nákupní asistent</h2></div>" +
        "        <div class=\"chat-content sc-gZMcBi bxslzG\" style=\"overflow: hidden;\">" +
        "            <div class=\"chat-ts sc-dnqmqq efROPc\">" +
        "                <div class=\"chat-ts-image-container sc-htoDjs vmYlS\"><img class=\"chat-ts-image sc-gzVnrw hLGSaN\"" +
        "                                                                         src=\"data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pg0KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPg0KPHN2ZyB2ZXJzaW9uPSIxLjEiIGlkPSJMYXllcl8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCINCgkgdmlld0JveD0iMCAwIDUxMiA1MTIiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDUxMiA1MTI7IiB4bWw6c3BhY2U9InByZXNlcnZlIj4NCjxwYXRoIHN0eWxlPSJmaWxsOiM5M0M3RUY7IiBkPSJNMzAyLjU0NSw2OS44MThjMC0yNS43MDctMjAuODQtNDYuNTQ1LTQ2LjU0NS00Ni41NDVzLTQ2LjU0NSwyMC44MzgtNDYuNTQ1LDQ2LjU0NQ0KCWMwLDE3LjIyNSw5LjM2NSwzMi4yNTQsMjMuMjczLDQwLjMwNHY4My44MThoNDYuNTQ1di04My44MThDMjkzLjE4MSwxMDIuMDczLDMwMi41NDUsODcuMDQzLDMwMi41NDUsNjkuODE4eiIvPg0KPHBhdGggc3R5bGU9ImZpbGw6IzVBOEJCMDsiIGQ9Ik0yNTYsMjMuMjczdjE3MC42NjdoMjMuMjczdi04My44MThjMTMuOTA4LTguMDQ5LDIzLjI3My0yMy4wNzcsMjMuMjczLTQwLjMwNA0KCUMzMDIuNTQ1LDQ0LjExMSwyODEuNzA1LDIzLjI3MywyNTYsMjMuMjczeiIvPg0KPHJlY3QgeT0iMjQwLjQ4NSIgc3R5bGU9ImZpbGw6IzkzQzdFRjsiIHdpZHRoPSIyNDguMjQyIiBoZWlnaHQ9IjEyNC4xMjEiLz4NCjxyZWN0IHg9IjI2My43NTgiIHk9IjI0MC40ODUiIHN0eWxlPSJmaWxsOiM1QThCQjA7IiB3aWR0aD0iMjQ4LjI0MiIgaGVpZ2h0PSIxMjQuMTIxIi8+DQo8cmVjdCB4PSIxODYuMTgyIiB5PSIzNjQuNjA2IiBzdHlsZT0iZmlsbDojOTNDN0VGOyIgd2lkdGg9IjEzOS42MzYiIGhlaWdodD0iMTI0LjEyMSIvPg0KPHJlY3QgeD0iMjU2IiB5PSIzNjQuNjA2IiBzdHlsZT0iZmlsbDojNUE4QkIwOyIgd2lkdGg9IjY5LjgxOCIgaGVpZ2h0PSIxMjQuMTIxIi8+DQo8cmVjdCB4PSI0Ni41NDUiIHk9IjE2Mi45MDkiIHN0eWxlPSJmaWxsOiNDQ0U5Rjk7IiB3aWR0aD0iNDE4LjkwOSIgaGVpZ2h0PSIyNzkuMjczIi8+DQo8cmVjdCB4PSIyNTYiIHk9IjE2Mi45MDkiIHN0eWxlPSJmaWxsOiM5M0M3RUY7IiB3aWR0aD0iMjA5LjQ1NSIgaGVpZ2h0PSIyNzkuMjczIi8+DQo8cGF0aCBzdHlsZT0iZmlsbDojM0M1RDc2OyIgZD0iTTE5My45MzksMjcxLjUxNWMwLDE3LjEzOC0xMy44OTQsMzEuMDMtMzEuMDMsMzEuMDNsMCwwYy0xNy4xMzYsMC0zMS4wMy0xMy44OTItMzEuMDMtMzEuMDNsMCwwDQoJYzAtMTcuMTM4LDEzLjg5NC0zMS4wMywzMS4wMy0zMS4wM2wwLDBDMTgwLjA0NiwyNDAuNDg1LDE5My45MzksMjU0LjM3NywxOTMuOTM5LDI3MS41MTVMMTkzLjkzOSwyNzEuNTE1eiIvPg0KPHBhdGggc3R5bGU9ImZpbGw6IzFFMkUzQjsiIGQ9Ik0zODAuMTIxLDI3MS41MTVjMCwxNy4xMzgtMTMuODk0LDMxLjAzLTMxLjAzLDMxLjAzbDAsMGMtMTcuMTM3LDAtMzEuMDMtMTMuODkyLTMxLjAzLTMxLjAzbDAsMA0KCWMwLTE3LjEzOCwxMy44OTQtMzEuMDMsMzEuMDMtMzEuMDNsMCwwQzM2Ni4yMjcsMjQwLjQ4NSwzODAuMTIxLDI1NC4zNzcsMzgwLjEyMSwyNzEuNTE1TDM4MC4xMjEsMjcxLjUxNXoiLz4NCjxwYXRoIHN0eWxlPSJmaWxsOiMzQzVENzY7IiBkPSJNMTg2LjE4MiwzNDkuMDkxYzAsMzguNTU4LDMxLjI1OCw2OS44MTgsNjkuODE4LDY5LjgxOGwwLDBjMzguNTU4LDAsNjkuODE4LTMxLjI2LDY5LjgxOC02OS44MTgNCglIMTg2LjE4MnoiLz4NCjxwYXRoIHN0eWxlPSJmaWxsOiMxRTJFM0I7IiBkPSJNMjU2LDM0OS4wOTFjMCwzOC41NTgsMCw0Ni41NDUsMCw2OS44MThsMCwwYzM4LjU1OCwwLDY5LjgxOC0zMS4yNiw2OS44MTgtNjkuODE4SDI1NnoiLz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjwvc3ZnPg0K\"" +
        "                                                                         alt=\"avatar\"></div>" +
        "                <div id='message' class=\"chat-ts-bubble sc-bZQynM message\">" + text + "</div>" +
        "            </div>" +
        "            <div class=\"chat-os sc-EHOje edRFCv\">" +
        "                <ul class=\"chat-os-options sc-ifAKCX gkhNlr\">" +
        "                    <li class=\"chat-os-option sc-htpNat message-button\"><a id='yes' class=\"chat-os-option-element sc-bxivhb fMcZCH\">Ano</a></li>    " +
        "                    <li class=\"chat-os-option sc-htpNat message-button\"><a id='no' class=\"chat-os-option-element sc-bxivhb fMcZCH\">Ne</a></li></ul>" +
        "            </div>" +
        "           </div>" +
        "        <div class=\"chat-footer sc-jzJRlG byHcWR\" style=\"display: none;\"><input class=\"chat-input sc-cSHVUG kCSgO\"" +
        "                                                                               placeholder=\"Type the message ...\"" +
        "                                                                               value=\"\" disabled=\"\" type=\"textarea\">" +
        "            <button class=\"chat-submit-button sc-kAzzGY kZiwDc\" disabled=\"\">" +
        "                <svg version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" width=\"20\" height=\"20\" viewBox=\"0 0 500 500\">" +
        "                    <g>" +
        "                        <g>" +
        "                            <polygon points=\"0,497.25 535.5,267.75 0,38.25 0,216.75 382.5,267.75 0,318.75\"></polygon>" +
        "                        </g>" +
        "                    </g>" +
        "                </svg>" +
        "            </button>" +
        "        </div>" +
        "    </div>" +
        "</div>").appendTo(document.body);
    $('.chat').hide();

    $("#menu").click(function () {
        $('.chat').show();
        $('#menu').hide();
    });

    $("#no").click(function () {
        $('.chat').hide();
        $('#menu').show();
    });

    $("#yes").click(function () {
        var productID = $('[data-sel~="catalog-number"]').text();
        (function () {
            var apiUrl = "https://api.logoman.cz/api/chatbot/" + productID;

            $.getJSON(apiUrl, {
                //format: "json"
            })
                .done(function (data) {
                    $("#message").hide();
                    $("#message").text(data.text);
                    $("#message").show();
                });
        })();
    });
}

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

function loadStyle(href) {
    // avoid duplicates
    for (var i = 0; i < document.styleSheets.length; i++) {
        if (document.styleSheets[i].href == href) {
            return;
        }
    }
    var head = document.getElementsByTagName('head')[0];
    var link = document.createElement('link');
    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.href = href;
    head.appendChild(link);
}