var React = require('react');
var Router = require('react-router');

var Route = Router.Route;
var Redirect =Router.Redirect;
var DefaultRoute = Router.DefaultRoute;
var Master = require('./master.jsx');
var ContractBoot = require('./contract-boot.jsx');
var ContractForm = require('./contract-form-boot.jsx');
var ProviderBoot = require('./provider-boot.jsx');
var AssetBoot = require('./asset-boot.jsx');
var LookAndFeel = require('./look-and-feel-boot.jsx');
var ContentManagement = require('./content-management-boot.jsx');
var UpdateContent = require('./views/management/updateContent.jsx');

var AppRoutes = (
    <Route name="root" path="/" handler={Master}>
        <DefaultRoute handler={ContractBoot} />
        <Route name="contract" path="/contract" handler={ContractBoot}>
            <Route name="contract_search" path="/contract/:searchId" handler={ContractBoot}/>
        </Route>
        <Route name="provider" handler={ProviderBoot}/>
        <Route name="contractForm" handler={ContractForm}/>
        <Route name="contentManagement" handler={ContentManagement}/>
        <Route name="updateContent" path="/contentManagement/updateContent" handler={UpdateContent}/>
        <Route name="lookAndFeel" handler={LookAndFeel}/>
        <Route name="asset" path="/asset" handler={AssetBoot}>
            <Route name="asset_search" path="/asset/:searchId" handler={AssetBoot}/>
        </Route>
    </Route>
);

module.exports = AppRoutes;