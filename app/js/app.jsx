var ContractStore = require('./stores/ContractStore.js');
var ProviderStore = require('./stores/ProviderStore');
var EmployeeStore = require('./stores/EmployeeStore.js');
var LanguageStore = require('./stores/LanguageStore');
var TerritoryStore = require('./stores/TerritoryStore');
var AssetStore = require('./stores/AssetStore');
var ContentProviderStore = require('./stores/ContentProviderStore');

function initStores() {

    return $.when(
        ContentProviderStore.initial(),
        ContractStore.initContract(),
        ProviderStore.initProvider(),
        AssetStore.initAsset(),
        EmployeeStore.initial(),
        LanguageStore.initial(),
        TerritoryStore.initial()
    ).done(function(){
            var deferred = $.Deferred();
            deferred.resolve();
            return deferred.promise();
        });
}

function attachAnimation() {

    $('#open-popup-link').magnificPopup({
        type: 'inline',
        midClick: true
    });


    $('#btn-export-excel').click(function(){

        $.magnificPopup.open({
            items: {
                src: '#pop-loading',
                type: 'inline'
            }
        });

    });


    $('#btn-preference').magnificPopup({
        type: 'inline',
        midClick: true
    });

    $('#open-popup-link-excel').magnificPopup({
        type: 'iframe',
        midClick: true,
        iframe: {
            markup: '<div class="mfp-iframe-scaler white-popup form-set">' +
            '<div class="mfp-close"></div>' +
            '<iframe class="mfp-iframe" frameborder="0" allowfullscreen></iframe>' +
            '</div>', // HTML markup of popup, `mfp-close` will be replaced by the close button

            patterns: {

                uploadFile: {
                    index: '//localhost:8080',
                    src: 'uploadFile.html'
                }
                // you may add here more sources

            },

            srcAction: 'iframe_src' // Templating object key. First part defines CSS selector, second attribute. "iframe_src" means: find "iframe" and set attribute "src".
        }

    });

    $('#btn-sort').click(function(e) {
        e.stopPropagation();
        var height = $('.sort-position').css('height');

        if (height == '0px') {
            $('.sort-position').css('display', 'block').css('max-height', '9999px');
        } else {
            hideSort();
        }
    });

    $('html').click(function() {
        hideSort();
    });

    function hideSort() {
        $('.sort-position').css('display', 'none').css('max-height', '0px');
    }

    $('.nav-ls-first').click(function() {

        $('.nav-ls-first .nav-ls-second').css('max-height', '0px');
        $('.nav-ls-first .nav-ls-arrow').attr('class', 'fa fa-chevron-right nav-ls-arrow');

        var second = $(this).find('.nav-ls-second'),
            arrow = $(this).find('.nav-ls-arrow');


        if ($(second).css('max-height') == '0px') {
            $(second).css('max-height', '999px');
            $(arrow).attr('class', 'fa fa-chevron-down nav-ls-arrow');
        } else {
            $(second).css('max-height', '0px');
            $(arrow).attr('class', 'fa fa-chevron-right nav-ls-arrow');
        }

    });

    $('.nav-ls-second li').click(function(e){
        e.stopPropagation();
    });

    $('.pure-form').submit(function(e) {
        e.preventDefault();
        $(".nav-search-botton").trigger("click");
    });

    $('#btn-preference-parent').click(function(e){
        e.stopPropagation();
    });
}

(function () {
    initStores().then(function() {
        var React = require('react'),
            Router = require('react-router'),
            AppRoutes = require('./app-routes.jsx');

        //Needed for React Developer Tools
        window.React = React;

        /** Render the main app component. You can read more about the react-router here:
         *  https://github.com/rackt/react-router/blob/master/docs/guides/overview.md
         */
        Router.run(AppRoutes,function (Handler) {
            React.render(<Handler/>, document.body);
        });

    })
})();