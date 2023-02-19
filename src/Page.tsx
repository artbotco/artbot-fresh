import React from 'react';
import './Page.scss';
import Header from "./components/Header";
import Footer from "./components/Footer";

class Page extends React.Component {
    name = "page";

    renderPage() {
        return (
            <div className={this.name}>
                <p>Page</p>
            </div>
        );
    }

    renderLeft() {
        return (<> </>);
    }

    renderRight() {
        return (<> </>);
    }

    render() {
        return (
            <div className={"page page-" + this.name}>
                <Header />
                {this.renderPage()}
                <Footer />
            </div>
        );
    }
}

export default Page;
