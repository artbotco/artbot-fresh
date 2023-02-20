import React   from "react";
import Helpers from "Helpers";

class Slide extends React.Component<any> {
    render() {
        return (
            <div className={Helpers.getClasses("slide", this.props.className)}>
                {this.props.children}
            </div>
        );
    }
}

export default Slide;