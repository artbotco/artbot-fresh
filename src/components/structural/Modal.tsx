import {faTimes}         from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Aside             from "components/structural/Aside";
import $                 from "jquery";
import React             from "react";
import Helpers           from "../../Helpers";
import Button            from "../visual/Button";

class Modal extends Aside {
    name = "modal";
    element = "modal";

    registerCloseHandler = (element: any) => {
        document.addEventListener("click", (event) => {
            // Check if document contains element with active class
            let el = $(this.element + `#${this.props.id}`);
            let target = $(event.target as Node);
            if (target && target.attr("data-toggle") === `#${this.props.id}`) {
                return;
            }
            let parentToggle = target.closest("[data-toggle]");
            if (parentToggle.length && parentToggle.attr("data-toggle") === `#${this.props.id}`) {
                return;
            }
            if (target.is(".modal.active")) {
                target.removeClass("active");
                return;
            }
            if (el.hasClass("active")) {
                // Check if clicked element is not inside the aside
                if (!el[0].contains(event.target as Node)) {
                    el.removeClass("active");
                }
            }
        });
    };

    render() {
        return (
            <div id={this.props.id} ref={this.registerCloseHandler} className={Helpers.getClasses(this.name, this.getClasses())}>
                <div className={Helpers.getClasses(this.name + "-content")}>
                    <Button color="light" size="xl" toggle={`#${this.props.id}`} className={Helpers.getClasses("btn-content-only", this.name + "-close")}><FontAwesomeIcon icon={faTimes} /></Button>
                    {this.props.children}
                </div>
            </div>
        );
    }
}

export default Modal;