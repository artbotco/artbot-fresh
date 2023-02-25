import React  from "react";
import Footer from "./components/structural/Footer";
import Header from "./components/structural/Header";
import "./Page.scss";
import GitCommit from './_git_commit';

class Page extends React.Component {
    name = "page";

    renderPage() {
        return (
            <div className={this.name}>
                <p>Page</p>
            </div>
        );
    }

    componentDidMount() {
        // Get meta tag with [name="git"] and set its content to GitCommit.logMessage
        const meta = document.querySelector('meta[name="git"]');
        if (meta) {
            meta.setAttribute("content", GitCommit.logMessage);
        }
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
