import React   from "react";
import Helpers from "Helpers";
import "./Grid.scss";

class Column extends React.Component<any> {
    render() {
        return (
            <div className={Helpers.getClasses("col", this.props.className)}>
                {this.props.children}
            </div>
        );
    }
}

class Row extends React.Component<any> {
    render() {
        return (
            <div className={Helpers.getClasses("row", this.props.className)}>
                {this.props.children}
            </div>
        );
    }
}

export {Column, Row};