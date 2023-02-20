import {faCaretLeft, faCaretRight} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon}           from "@fortawesome/react-fontawesome";
import $                           from "jquery";
import React                       from "react";
import Helpers                     from "../Helpers";
import Button                      from "./Button";
import "./Slider.scss";

class Slider extends React.Component<any> {
    prevSlide = () => {
        let slide = $(".slider .slide.active").prev(".slide");
        if (slide.length === 0) {
            slide = $(".slider .slide:last");
        }
        $(".slider .slide.active").removeClass("active");
        slide.addClass("active");
        Helpers.ratioResize(slide.find('.video'));
    };

    nextSlide = () => {
        let slide = $(".slider .slide.active").next(".slide");
        if (slide.length === 0) {
            slide = $(".slider .slide:first");
        }
        $(".slider .slide.active").removeClass("active");
        slide.addClass("active");
        Helpers.ratioResize(slide.find('.video'));
    };

    render() {
        return (
            <div className={Helpers.getClasses("slider", this.props.className)}>
                <Button className="slider-arrow slider-arrow-left" onClick={this.prevSlide}><FontAwesomeIcon icon={faCaretLeft} /></Button>
                {this.props.children}
                <Button className="slider-arrow slider-arrow-right" onClick={this.nextSlide}><FontAwesomeIcon icon={faCaretRight} /></Button>
            </div>
        );
    }
}

export default Slider;