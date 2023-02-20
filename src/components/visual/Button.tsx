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
    element: HTMLAnchorElement | null = null;

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

    registerClick = (element: HTMLAnchorElement) => {
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
                    let tgt = $(toggleId);
                    if(tgt.length === 0) {
                        console.error('Element does not exist');
                        return;
                    }
                    $(toggleId).toggleClass("active");
                });
            }
        }
    };

    render() {
        const dataToggle = this.props.toggle ? { "data-toggle": this.props.toggle } : {};
        const href = this.props.href ? { href: this.props.href, target: '_blank' } : {};
        return (
            <a className={this.getClassNames()} {...dataToggle} {...href} ref={this.registerClick}>
                {this.props.children}
            </a>
        );
    }
}

export default Button;