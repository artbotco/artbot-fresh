import Helpers            from "Helpers";
import React, {Component} from "react";
import "swiper/css";
import {SwiperSlide}      from "swiper/react";
import "./Section.scss";

class Section extends Component<any> {
    render() {
        return (
            <div
                className={Helpers.getClasses("section", this.props.className)}
                data-section={this.props.index}
                id={this.props.id}
            >
                {this.props.children}
            </div>
        );
    }
}

export default Section;
