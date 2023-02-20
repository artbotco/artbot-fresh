import React   from "react";
import Helpers from "../Helpers";

class Aside extends React.Component<any> {

    getClasses() {
        let classes = [];
        if (this.props.className) {
            classes.push(this.props.className);
        }
        return classes;
    }
    render() {
        return (
            <aside className={Helpers.getClasses("aside", this.getClasses())}>
                <h1>Aside</h1>
            </aside>
        );
    }
}

export default Aside;