var React = require('react');
var MainApp = require('./views/contract/contractAppForm.jsx');

var ContractBoot = React.createClass({

    componentDidMount() {
        //attachAnimation();
    },

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


module.exports = ContractBoot;