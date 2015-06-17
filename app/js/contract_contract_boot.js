/*
 * 這支是程式進入點，它負責建立 root view (controller view)，
 * 也就是 TodoApp 這個元件
 *
 * boot.js 存在的目地，是因為通常 app 啟動時有許多先期工作要完成，
 * 例如預載資料到 store 內、檢查本地端 db 狀態、切換不同語系字串、
 * 這些工作都先在 boot.js 內做完，再啟動 TodoApp view 建立畫面是比較好的
 * 
 */

// v0.12 開始要用 factory 包一次才能直接呼叫
var React = require('react');
var MainApp = require('./views/contract/contractApp.jsx');
var FormCreateContract = require('./components/FormCreateContractMulti.jsx');
var FormUpdateContract = require('./components/FormUpdateContract.jsx');
var FormPreference = require('./views/contract/FormPreference.jsx');
var ContractStore = require('./stores/ContractStore.js');
var EmployeeStore = require('./stores/EmployeeStore.js');
var LanguageStore = require('./stores/LanguageStore');
var TerritoryStore = require('./stores/TerritoryStore');
var ContentProviderStore = require('./stores/ContentProviderStore');

var ExpireSetting =require('./views/contract/ExpireSetting.jsx');

var QueryStingConstants = require('./constants/QueryStringConstants');
var PortalConf = require('./constants/PortalConf');


$(function() {

    var queryString = getParameterByName('s'),
        searchParam = {};
    var status = queryString;
    initSearchStatus(queryString);    

    ContractStore.initContract().then(EmployeeStore.initial).then(iniStores).then(function(){
        //var contractApp = React.createElement(MainApp,{pageStatus:status});
        React.render(<MainApp pageStatus={status} />, document.getElementById('container'));
        React.render(<FormCreateContract />, document.getElementById('pop-contract'));
        React.render(<FormUpdateContract />, document.getElementById('pop-contract-update'));
        React.render(<FormPreference />, document.getElementById('pop-preference'));

        if( getParameterByName('s') == QueryStingConstants.EXPIRE){
            React.render(<ExpireSetting />, document.getElementById('expire-set'));
        }

        $(function() {
            attachAnimation();
            initNav(queryString)
        });

    });

})

function iniStores() {
    return ContentProviderStore.initial().then(LanguageStore.initial()).then(TerritoryStore.initial());
}

function initNav(queryString){

    var path = location.pathname;
    var filename = path.replace(/^.*[\\\/]/, '');

    switch(filename){
        case "contract_contract.html":

            var node = $('.nav-ls-first').eq(0);
            $(node).find('.nav-ls-second').css('max-height', '999px');
            $(node).find('.nav-ls-arrow').attr('class', 'fa fa-chevron-down nav-ls-arrow');

            switch(queryString){

                case QueryStingConstants.ALL:

                    $(node).find('.nav-ls-second li').eq(0).attr('class','nav-ls-second-current');

                    return {};
                    break;

                case QueryStingConstants.SIGNED:

                    $(node).find('.nav-ls-second li').eq(1).attr('class','nav-ls-second-current');

                    return {};
                    break;

                case QueryStingConstants.PENDING:

                    $(node).find('.nav-ls-second li').eq(2).attr('class','nav-ls-second-current');

                    return {};
                    break;

                case QueryStingConstants.APPROACHING:

                    $(node).find('.nav-ls-second li').eq(3).attr('class','nav-ls-second-current');

                    return {};
                    break;

                case QueryStingConstants.EXPIRE:

                    $(node).find('.nav-ls-second li').eq(4).attr('class','nav-ls-second-current');

                    return {};
                    break;

                default:

                    return {};

            }

            return {};
            break;

    }

}


function initSearchStatus(queryString){

    switch(queryString) {

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


function getParameterByName(name) {
  name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
  var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
      results = regex.exec(location.search);
  return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
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
