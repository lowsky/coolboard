import React, { Component, useState } from 'react';
import {
  Button,
  Form,
  Message,
  Modal,
  Icon,
} from 'semantic-ui-react';

export const CreateBoardModal = (props) => {
  const [state, setState] = useState({ name: '' });

  const handleChange = (e, { name, value }) =>
    setState({ [name]: value });

  const { name } = state;

  const {
    open,
    onOpen,
    onHide,
    createBoard,
    loading,
    error = false,
  } = props;

  return (
    <Modal
      onClose={onHide}
      onOpen={onOpen}
      open={open}
      trigger={<Button>Create a new Board</Button>}>
      <Modal.Header>Create Board</Modal.Header>
      <Modal.Content>
        <Form loading={loading} error={error}>
          <Form.Input
            fluid
            label="Board Name"
            placeholder="Enter a title"
            value={name}
            name="name"
            autoFocus
            onChange={handleChange}
            required
          />
          <Message error>{`${error}`}</Message>
        </Form>
      </Modal.Content>
      <Modal.Actions>
        <Button
          color="green"
          onClick={() => {
            createBoard({
              name,
            }).then(() => onHide());
          }}
          inverted>
          <Icon name="save" /> Create
        </Button>
        <Button color="red" onClick={onHide} inverted>
          <Icon name="cancel" /> cancel
        </Button>
      </Modal.Actions>
    </Modal>
  );
};
