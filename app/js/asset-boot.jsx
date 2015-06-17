var React = require('react');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;

var MainApp = require('./views/asset/assetApp2.jsx');
var FormUpdateAsset = require('./components/FormUpdateAsset.jsx');
var ContractStore = require('./stores/ContractStore.js');
var PortalConf = require('./constants/PortalConf');

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

        var second = $(this).find('.nav-ls-second'),
            arrow = $(this).find('#nav-ls-arrow');

        if ($(second).css('max-height') == '0px') {
            $(second).css('max-height', '999px');
            $(arrow).attr('class', 'fa fa-chevron-down');
        } else {
            $(second).css('max-height', '0px');
            $(arrow).attr('class', 'fa fa-chevron-right');
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

    //$('.file-browse-button').click(function(){
    //    $('#file-select-box').css('display','block').delay( 5000 ).css('top','0px');
    //});

    $('body').on('click','.file-browse-button', function(){
        $('#file-select-box').css('display','block').delay( 5000 ).css('top','0px');
    });

    $('#file-select-box .group-add-remove').click(function(){
        $('#file-select-box').css('display','none').delay( 5000 ).css('top','-325px');
    });

}

var ContractBoot = React.createClass({

    componentDidMount() {
        attachAnimation();
    },

    render() {

        return (
            <section>
                <section id="container">
                    <MainApp pageStatus={status} />
                </section>
                <div id="pop-asset-update" className="white-popup mfp-hide form-set">
                    <FormUpdateAsset />
                </div>
            </section>
        );
    }
});

module.exports = ContractBoot;