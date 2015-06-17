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
var MainApp = require('./views/provider/providerApp2.jsx');

var ProviderStore = require('./stores/ProviderStore');
var EmployeeStore = require('./stores/EmployeeStore');
var FormCreateProvider = require('./components/FormCreateProvider.jsx');
var FormUpdateProvider = require('./components/FormUpdateProvider.jsx');


var ProviderBoot = React.createClass({

    componentDidMount() {
        console.log('did mount');
        attachAnimation();
    },

    render() {
        return (
            <section>
                <section id="container">
                    <MainApp pageStatus={status} />
                </section>
                <div id="pop-contract" className="white-popup mfp-hide form-set">
                    <FormCreateProvider />
                </div>
                <div id="pop-contract-update" className="white-popup mfp-hide form-set">
                    <FormUpdateProvider />
                </div>
            </section>
        );
    }
});

function attachAnimation(){

    $('.open-popup-link').magnificPopup({
        type: 'inline',
        midClick: true
    });

    $('.btn-export-excel').magnificPopup({
        type: 'inline',
        midClick: true
    });

    $('#btn-sort').click(function(e){
        e.stopPropagation();
        var height = $('.sort-position').css('height');

        if(height == '0px'){
            $('.sort-position').css('display','block').css('height','120px').css('padding','20px').css('overflow','visible');
        }else{
            hideSort();
        }
    });

    $('html').click(function(){
        hideSort();
    });

    function hideSort(){
        $('.sort-position').css('display','none').css('height','0px').css('overflow','hidden');
    }

    $('.nav-ls-first').click(function(){

        var second = $(this).find('.nav-ls-second'),
            arrow = $(this).find('#nav-ls-arrow')
            ;

        if($(second).css('max-height') == '0px'){
            $(second).css('max-height','999px');
            $(arrow).attr('class','fa fa-chevron-down');
        }else{
            $(second).css('max-height','0px');
            $(arrow).attr('class','fa fa-chevron-right');
        }

    });

    $('.pure-form').submit(function(e){
        e.preventDefault();
        $( ".nav-search-botton" ).trigger( "click" );
    });

}


module.exports = ProviderBoot;
