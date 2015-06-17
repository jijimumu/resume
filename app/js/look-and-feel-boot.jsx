var React = require('react');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;

var MainApp = require('./views/lookAndFeel/app.jsx');


var LookFeelBoot = React.createClass({
    render() {
        return (
            <section>
                <section id="container">
                    <MainApp />
                </section>
            </section>
        );
    }
});


module.exports = LookFeelBoot;