import React, {Component} from "react";

function ModalWrapper( WrappedComponent ) {
    return class extends Component {
        constructor(props) {
            super(props);
        }

        componentWillUnmount() {
            // Дико извиняюсь за эту строку, но когда я понял, что зря подключил Bootstrap как
            // внешнюю библиотеку, было уже поздно что-то менять, а мне осталось немного доделать.
            $("#myModal").modal("hide");
        }

        render() {
            return (
                <div>
                    <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#myModal">
                        Add
                    </button>

                    <div ref={( form ) => this.form = form } className="modal fade" id="myModal" tabIndex="-1" role="dialog"
                         aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    <WrappedComponent {...this.props} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
    }
}

export default ModalWrapper;