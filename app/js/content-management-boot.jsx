var React = require('react');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;

var MainApp = require('./views/management/managementApp2.jsx');
var FormCreateContract = require('./components/FormCreateContractMulti.jsx');
var FormUpdateContract = require('./components/FormUpdateContract.jsx');
var FormPreference = require('./views/contract/FormPreference.jsx');
var ContractStore = require('./stores/ContractStore.js');
var EmployeeStore = require('./stores/EmployeeStore.js');
var LanguageStore = require('./stores/LanguageStore');
var TerritoryStore = require('./stores/TerritoryStore');
var ContentProviderStore = require('./stores/ContentProviderStore');

var ExpireSetting = require('./views/contract/ExpireSetting.jsx');

var QueryStingConstants = require('./constants/QueryStringConstants');
var PortalConf = require('./constants/PortalConf');

function attachAnimation() {

    $('#open-popup-link').magnificPopup({
        type: 'inline',
        midClick: true
    });

    $('#btn-export-excel').click(function () {

        $.notify('System will start download Excel after few second,Please wait a moment');

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
            },
            srcAction: 'iframe_src' // Templating object key. First part defines CSS selector, second attribute. "iframe_src" means: find "iframe" and set attribute "src".
        }
    });

    $('#btn-sort').click(function (e) {
        e.stopPropagation();
        var height = $('.sort-position').css('height');

        if (height == '0px') {
            $('.sort-position').css('display', 'block').css('max-height', '9999px');
        } else {
            hideSort();
        }
    });

    $('html').click(function () {
        hideSort();
    });

    function hideSort() {
        $('.sort-position').css('display', 'none').css('max-height', '0px');
    }

    $('.nav-ls-first').click(function () {

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

    $('.nav-ls-second li').click(function (e) {
        e.stopPropagation();
    });

    $('.pure-form').submit(function (e) {
        e.preventDefault();
        $(".nav-search-botton").trigger("click");
    });

    $('#btn-preference-parent').click(function (e) {
        e.stopPropagation();
    });
}

function initSearchStatus(queryString) {

    switch (queryString) {

        case QueryStingConstants.ALL:
            ContractStore.setContractStatus(null);
            return {};
            break;

        case QueryStingConstants.SIGNED:
            ContractStore.setContractStatus(PortalConf.CONTRACT_STATUS[1]);
            return {};
            break;

        case QueryStingConstants.PENDING:
            ContractStore.setContractStatus(PortalConf.CONTRACT_STATUS[2]);
            return {};
            break;

        case QueryStingConstants.APPROACHING:
            ContractStore.setContractStatus(PortalConf.CONTRACT_STATUS[0]);
            return {};
            break;

        case QueryStingConstants.EXPIRE:
            ContractStore.setExpiredDateCount(7);
            return {};
            break;

        default:
            ContractStore.setKeyword(queryString);
            return {};
    }

}

function getParameterByName() {
    console.log(window.location.hash);
    var param = window.location.hash.split('/');
    return param[2];
}

var ContractBoot = React.createClass({

    componentDidMount() {
        attachAnimation();
    },

    render() {

        return (
            <section>
                <section id="container">
                    <MainApp pageStatus={status}/>
                </section>
                <div id="pop-contract" className="white-popup mfp-hide form-set">
                    <FormCreateContract />
                </div>
                <div id="pop-contract-update" className="white-popup mfp-hide form-set">
                    <FormUpdateContract />
                </div>
                <div id="pop-preference" className="white-popup mfp-hide form-set">
                    <FormPreference />
                </div>
                <div id="expire-set" className="expire-set"></div>
            </section>
        );
    }
});


module.exports = ContractBoot;