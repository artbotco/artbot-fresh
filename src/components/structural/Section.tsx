import {getClasses}       from "Helpers";
import React, {Component} from "react";
import "swiper/css";
import "./Section.scss";

class Section extends Component<any> {
    render() {
        return (
            <div
                className={getClasses("section", this.props.className)}
                data-section={this.props.index}
                id={this.props.id}
            >
                {this.props.children}
            </div>
        );
    }
}

export default Section;
