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
    ref: any = React.createRef();

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

    componentDidMount() {
        let element = this.ref.current;
        if (!element) {
            console.error("Element does not exist");
            return;
        }
        if (this.props.onClick) {
            element.addEventListener("click", this.props.onClick);
        }
        if (this.props.toggle && this.props.toggle.length > 0) {
            element.addEventListener("click", this.handleToggle);
        }
    }

    handleToggle = (event: any) => {
        let toggleId = this.props.toggle;
        let tgt = $(toggleId);
        if (tgt.length === 0) {
            console.error("Element does not exist", toggleId);
            return;
        }
        tgt.trigger("toggle");
    };

    componentWillUnmount() {
        let element = this.ref.current;
        if (!element) {
            console.error("Element does not exist");
            return;
        }
        element.removeEventListener("click", this.props.onClick);
        element.removeEventListener("click", this.handleToggle);
    }

    render() {
        const dataToggle = this.props.toggle ? {"data-toggle": this.props.toggle} : {};
        const dataNoToggle = this.props.notoggle ? {"data-notoggle": this.props.notoggle} : {};
        const href = this.props.href ? {href: this.props.href, target: "_blank"} : {};
        return (
            <a ref={this.ref} className={this.getClassNames()} {...dataToggle} {...dataNoToggle} {...href}>
                {this.props.children}
            </a>
        );
    }
}

export default Button;