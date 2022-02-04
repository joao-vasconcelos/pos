import React from 'react';
// import PropTypes from 'prop-types';
import { Container, Delete, Content } from './SwipeToDelete.module';

export default class SwipeToDelete extends React.Component {
  cursorPosition = (event) => (event.touches ? event.touches[0].clientX : event.clientX);

  state = {
    touching: null,
    translate: 0,
    deleting: false,
  };

  onMouseDown = (e) => {
    if (this.props.disabled) return;
    if (this.state.touching) return;
    this.startTouchPosition = this.cursorPosition(e);
    this.initTranslate = this.state.translate;
    this.setState({ touching: true }, () => {
      this.addEventListenerToMoveAndUp();
    });
  };

  addEventListenerToMoveAndUp = (remove = false) => {
    if (remove) {
      window.removeEventListener('mousemove', this.onMouseMove);
      window.removeEventListener('touchmove', this.onMouseMove);
      window.removeEventListener('mouseup', this.onMouseUp);
      window.removeEventListener('touchend', this.onMouseUp);
    } else {
      window.addEventListener('mousemove', this.onMouseMove);
      window.addEventListener('touchmove', this.onMouseMove);
      window.addEventListener('mouseup', this.onMouseUp);
      window.addEventListener('touchend', this.onMouseUp);
    }
  };

  onMouseMove = (e) => {
    const { rtl } = this.props;
    if (!this.state.touching) {
      return this.cursorPosition(e);
    }
    if (
      (!rtl && this.cursorPosition(e) > this.startTouchPosition - this.initTranslate) ||
      (rtl && this.cursorPosition(e) < this.startTouchPosition - this.initTranslate)
    ) {
      this.setState({ translate: 0 });
      return;
    }
    this.setState({ translate: this.cursorPosition(e) - this.startTouchPosition + this.initTranslate });
  };

  onMouseUp = () => {
    this.startTouchPosition = null;
    const { deleteWidth, rtl } = this.props;
    const newState = {
      touching: false,
    };
    const acceptableMove = -deleteWidth * 0.7;
    const showDelete = (rtl ? -1 : 1) * this.state.translate < acceptableMove;
    const notShowDelete = (rtl ? -1 : 1) * this.state.translate >= acceptableMove;
    const deleteWithoutConfirm = (rtl ? 1 : -1) * this.state.translate >= this.deleteWithoutConfirmThreshold;
    if (deleteWithoutConfirm) newState.translate = -this.containerWidth;
    if (notShowDelete) newState.translate = 0;
    if (showDelete && !deleteWithoutConfirm) newState.translate = (rtl ? 1 : -1) * deleteWidth;
    this.setState(newState, () => {
      if (deleteWithoutConfirm) this.onDeleteClick();
    });

    this.addEventListenerToMoveAndUp(true);
  };

  onDeleteClick = () => {
    const { onDelete } = this.props;
    onDelete();
  };

  componentWillUnmount() {
    this.addEventListenerToMoveAndUp(true);
  }

  render() {
    const { translate, touching, deleting } = this.state;
    const { deleteWidth, transitionDuration, deleteText, deleteComponent, deleteColor, height, rtl } = this.props;
    const cssParams = { deleteWidth, transitionDuration, deleteColor, heightProp: height, rtl };
    const shiftDelete = -translate >= this.deleteWithoutConfirmThreshold;
    return (
      <Container
        deleting={deleting}
        id='delete-container'
        {...cssParams}
        ref={(c) => {
          if (c) {
            this.container = c;
            this.containerWidth = c.getBoundingClientRect().width;
            this.deleteWithoutConfirmThreshold = this.containerWidth * 0.75;
          }
        }}
      >
        <Delete id='delete' buttonMargin={shiftDelete ? this.containerWidth + translate : this.containerWidth - deleteWidth} {...cssParams}>
          <button id='delete-button' onClick={this.onDeleteClick}>
            {deleteComponent ? deleteComponent : deleteText}
          </button>
        </Delete>
        <Content
          {...cssParams}
          id='delete-content'
          deleting={deleting}
          onMouseDown={this.onMouseDown}
          onTouchStart={this.onMouseDown}
          translate={translate}
          transition={!touching}
        >
          {this.props.children}
        </Content>
      </Container>
    );
  }
}

SwipeToDelete.defaultProps = {
  transitionDuration: 250,
  deleteWidth: 75,
  deleteColor: 'rgba(252, 58, 48, 1.00)',
  deleteText: 'Delete',
  disabled: false,
  rtl: false,
};
