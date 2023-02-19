import React from "react";
import "./Card.scss";

class LearnMore extends React.Component<any> {
    render() {
        return (
            <div className="learn-more">
                {this.props.children}
            </div>
        );
    }
}

class Card extends React.Component<any> {
    render() {
        return (
            <div className="card">
                {this.props.children}
            </div>
        );
    }
}

export {Card, LearnMore};