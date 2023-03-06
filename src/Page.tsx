import React  from "react";
import Footer from "./components/structural/Footer";
import Header from "./components/structural/Header";
import "./Page.scss";

class Page extends React.Component {
    name = "page";

    renderPage() {
        return (
            <div className={this.name}>
                <p>Page</p>
            </div>
        );
    }

    render() {
        return (
            <>
                <div className={"page page-" + this.name}>
                    <Header />
                    {this.renderPage()}
                    <Footer />
                </div>
            </>
        );
    }
}

export default Page;
