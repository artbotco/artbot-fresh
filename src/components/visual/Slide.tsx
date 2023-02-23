import React   from "react";
import {getClasses} from "Helpers";

class Slide extends React.Component<any> {
    render() {
        return (
            <div className={getClasses("slide", this.props.className)}>
                {this.props.children}
            </div>
        );
    }
}

export default Slide;