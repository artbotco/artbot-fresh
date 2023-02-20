import $     from "jquery";
import React from "react";
import "./Button.scss";

/***
 * Button
 * @param [color] {"primary","secondary","danger","warning","success","info","light","dark","link"} Color of the button
 * @param [className] {string} Class name to add on top of the default class names
 * @param [size] {"xs","sm","md","lg","xl"} Size of the button
 */
class Button extends React.Component<any> {
    element: HTMLButtonElement | null = null;

    getClassNames() {
        let classNames = ["btn"];
        if (this.props.color) {
            classNames.push(`btn-${this.props.color}`);
        }
        if (this.props.size) {
            classNames.push(`btn-${this.props.size}`);
        }
        if (this.props.className) {
            classNames.push(this.props.className);
        }
        return classNames.join(" ");
    }

    registerClick = (element: HTMLButtonElement) => {
        this.element = element;
        if(!this.element) {
            return;
        }
        if (this.props.onClick) {
            this.element.addEventListener("click", this.props.onClick);
        }
        if (this.props.toggle) {
            let toggleId = this.props.toggle;
            if(this.element) {
                this.element.addEventListener("click", () => {
                    $(toggleId).toggleClass("active");
                });
            }
        }
    };

    render() {
        return (
            <button className={this.getClassNames()} ref={this.registerClick}>
                {this.props.children}
            </button>
        );
    }
}

export default Button;