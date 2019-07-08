import { Alert } from "shards-react";
import React from "react";

let showAlertFn;

export default class AlertModal extends React.Component {
  constructor(props) {
    super(props);

    this.interval = null;
    this.state = {
      visible: false,
      countdown: 0,
      timeUntilDismissed: 3,
      message: ''
    };

    this.handleTimeChange = this.handleTimeChange.bind(this);
    this.clearInterval = this.clearInterval.bind(this);
  }

  componentDidMount() {
    showAlertFn = this.showAlert;
  }

  showAlert = ({ message }) => {
    this.clearInterval();
    this.setState({ visible: true, countdown: 0, timeUntilDismissed: 5, message: message });
    this.interval = setInterval(this.handleTimeChange, 1000);
  };

  handleTimeChange() {
    if (this.state.countdown < this.state.timeUntilDismissed - 1) {
      this.setState({
        ...this.state,
        ...{ countdown: this.state.countdown + 1 }
      });
      return;
    }

    this.setState({ ...this.state, ...{ visible: false } });
    this.clearInterval();
  }

  clearInterval() {
    clearInterval(this.interval);
    this.interval = null;
  }

  render() {
    const message = (
      <span
        id="alert-message-id"
        dangerouslySetInnerHTML={{ __html: this.state.message }}
      />
    );

    return (
      <div>
        <Alert className="mb-3" open={this.state.visible}>
          {message}
        </Alert>
      </div>
    );
  }
}

export function showAlert( {message} ) {
  showAlertFn( {message} );
}