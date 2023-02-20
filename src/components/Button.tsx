import React from "react";
import "./Button.scss";

/***
 * Button
 * @param [color] {"primary","secondary","danger","warning","success","info","light","dark","link"} Color of the button
 * @param [className] {string} Class name to add on top of the default class names
 * @param [size] {"xs","sm","md","lg","xl"} Size of the button
 */
class Button extends React.Component<any> {
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

    render() {
        return (
            <button className={this.getClassNames()} onClick={this.props.onClick}>
                {this.props.children}
            </button>
        );
    }
}

export default Button;