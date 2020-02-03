import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';

let showAlertFn;

export default class AlertModal extends React.Component {
  constructor(props) {
    super(props);

    this.interval = null;
    this.state = {
      visible: false,
      countdown: 0,
      message: ''
    };

    this.handleTimeChange = this.handleTimeChange.bind(this);
    this.clearInterval = this.clearInterval.bind(this);
  }

  componentDidMount() {
    showAlertFn = this.showAlert;
  }

  showAlert = ({ message, timeUntilDismissed }) => {
    this.clearInterval();
    this.setState({ visible: true, countdown: 0, timeUntilDismissed: timeUntilDismissed || 2, message: message });
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
    return (
      <div>
        <Snackbar
          open={this.state.visible}
          message={<span id="alert-message-id">{this.state.message}</span>}
          action={[
            <IconButton
              key="close"
              aria-label="close"
              color="inherit"
            >
              <CloseIcon />
            </IconButton>
          ]}
        />
      </div>
    );
  }
}

export function showAlert({ message, timeUntilDismissed }) {
  showAlertFn({ message, timeUntilDismissed });
}