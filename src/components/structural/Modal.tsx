import {faTimes}         from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Aside             from "components/structural/Aside";
import React             from "react";
import Helpers           from "../../Helpers";
import Button            from "../visual/Button";

class Modal extends Aside {
    name = "modal";
    element = "modal";

    public registerCloseHandler(element: any) {
        return super.registerCloseHandler(element as HTMLElement);
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