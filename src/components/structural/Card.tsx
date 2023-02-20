import React from "react";
import "./Card.scss";

class Card extends React.Component<any> {
    render() {
        return (
            <div className="card">
                {this.props.children}
            </div>
        );
    }
}

export {Card};