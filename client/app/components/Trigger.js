/**
 * You will want to include this bit of css
 *
 * .modal-container {
 *   position: relative;
 * }
 * .modal-container .modal, .modal-container .modal-backdrop {
 *   position: absolute;
 * }
 */

import React from 'react';  
import { Button, Modal } from 'react-bootstrap';

class Trigger extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.handleHide = this.handleHide.bind(this);

    this.state = {
      show: false
    };
  }

  handleHide() {
    this.props.hide();
  }

  render() {
    return (
      <div>
        <Modal
          show={this.props.show}
          onHide={()=>this.props.hide()}
          aria-labelledby="contained-modal-title"
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title">
              Message Scheduled!
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Congrats! Your message was scheduled for {this.props.date.format('MMMM Do YYYY, h:mm a')}
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={()=>this.props.hide()}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default Trigger;