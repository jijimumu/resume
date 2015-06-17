var React = require('react');
var Router = require('react-router');
//var RouteHandler = React.createFactory(Router.RouteHandler);
var RouteHandler = Router.RouteHandler;
var SideNavigation = require('./views/SideNavigationSlide.jsx');
var ContractStore = require('./stores/ContractStore');
var ProviderStore = require('./stores/ProviderStore');
var PagingStore = require('./stores/PagingStore');


var Master = React.createClass ({
    getInitialState: function(){
        return {
            navState: "hide"
        }
    },
    navHandler: function(){
        var state = (this.state.navState == "hide")? "show":"hide";
        this.setNavState(state);
    },
    setNavState: function(a){
        this.setState({
            navState: a
        });
    },
    render() {
        return(
            <section>
                <header>
                    <div className="header">
                        <div className="header-wrapper">
                            <a href="javascript:;" className="nav-list-button" onClick={this.navHandler} >
                                <svg className="nav-icon-list" viewBox="0 0 24 24">
                                    <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"></path>
                                </svg>
                            </a>
                            {/*<ContractSearch />*/}
                        </div>
                    </div>
                </header>
                <SideNavigation state={this.state.navState} onclick={this.setNavState} />
                <RouteHandler />
            </section>
        );
    }
});


module.exports = Master;