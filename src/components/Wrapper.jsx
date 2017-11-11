import React, {Component} from "react";
import Menu from "./Menu";

class Wrapper extends Component {
    render() {
        return (
            <div className="container-fluid">
                <div className="row">
                    <Menu />
                    {this.props.children}
                </div>
            </div>
        );
    }
}

export default Wrapper;