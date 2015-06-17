// v0.12 開始要用 factory 包一次才能直接呼叫
var React = require('react');
var MainApp = require('./views/asset/assetApp.jsx');
var FormCreateContract = require('./components/FormCreateContract.jsx');
var FormUpdateAsset = require('./components/FormUpdateAsset.jsx');
var FileListInput = require('./components/FileListInput.jsx');
var FormPreference = require('./views/asset/FormPreference.jsx');
var ContractStore = require('./stores/ContractStore.js');
var AssetStore = require('./stores/AssetStore');
var EmployeeStore = require('./stores/EmployeeStore.js');
var LanguageStore = require('./stores/LanguageStore');
var TerritoryStore = require('./stores/TerritoryStore');
var ContentProviderStore = require('./stores/ContentProviderStore');
var FileListStore = require('./stores/FileListStore');

var ExpireSetting = require('./views/asset/ExpireSetting.jsx');

var QueryStingConstants = require('./constants/QueryStringConstants');
var PortalConf = require('./constants/PortalConf');
var displayVal = 'block';

$(function() {

    var queryString = getParameterByName('s'),
        searchParam = {};

    initSearchStatus(queryString);

    AssetStore.initAsset().then(EmployeeStore.initial).then(iniStores).then(function(){

        React.render(<MainApp />, document.getElementById('container'));
        //React.render(FormCreateContract(), document.getElementById('pop-contract'));
        React.render(<FormUpdateAsset folderInputDisplay={displayVal}/> , document.getElementById('pop-asset-update'));
        //React.render(FormPreference(), document.getElementById('pop-preference'));

        // setTimeout(function(){
        //     React.render(FileListInput(), document.getElementById('file-select-box'));
        // }, 3000);



        if( getParameterByName('s') == QueryStingConstants.EXPIRE){
            //React.render(ExpireSetting(), document.getElementById('expire-set'));
        }

        $(function() {
            attachAnimation();
            initNav(queryString);
        });

    });

})

function iniStores() {
    return ContentProviderStore.initial()
        .then(function(){return LanguageStore.initial()})
        .then(function(){return TerritoryStore.initial()})
        .then(function(){return FileListStore.initial()})
        .then(function(){return EmployeeStore.initial()});
}

function initSearchStatus(queryString){

    switch(queryString) {

        case QueryStingConstants.ASSET_ALL:
            AssetStore.setContractStatus(null);
            return {};
            break;

        case QueryStingConstants.ASSET_NEW:
            AssetStore.setAssetStatus(PortalConf.ASSET_STATUS[0]);
            return {};
            break;

        case QueryStingConstants.ASSET_INPROGRESS:
            AssetStore.setAssetStatus(PortalConf.ASSET_STATUS[1]);
            displayVal = 'none';
            return {};
            break;

        case QueryStingConstants.ASSET_FAILED:
            AssetStore.setAssetStatus(PortalConf.ASSET_STATUS[2]);
            return {};
            break;

        case QueryStingConstants.ASSET_DONE:
            AssetStore.setAssetStatus(PortalConf.ASSET_STATUS[3]);
            displayVal = 'none';

            return {};
            break;

        default:

            return {};
    }

}


function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

function initNav(queryString){

    var path = location.pathname;
    var filename = path.replace(/^.*[\\\/]/, '');

    switch(filename){
        case "asset.html":

            var node = $('.nav-ls-first').eq(2);
            $(node).find('.nav-ls-second').css('max-height', '999px');
            $(node).find('.nav-ls-arrow').attr('class', 'fa fa-chevron-down nav-ls-arrow');

            switch(queryString){

                case QueryStingConstants.ASSET_NEW:

                    $(node).find('.nav-ls-second li').eq(0).attr('class','nav-ls-second-current');

                    return {};
                    break;

                case QueryStingConstants.ASSET_INPROGRESS:

                    $(node).find('.nav-ls-second li').eq(1).attr('class','nav-ls-second-current');

                    return {};
                    break;

                case QueryStingConstants.ASSET_FAILED:

                    $(node).find('.nav-ls-second li').eq(3).attr('class','nav-ls-second-current');

                    return {};
                    break;

                case QueryStingConstants.ASSET_DONE:

                    $(node).find('.nav-ls-second li').eq(2).attr('class','nav-ls-second-current');

                    return {};
                    break;

                default:

                    return {};

            }

            return {};
            break;

    }

}


