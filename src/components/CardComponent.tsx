import React, { CSSProperties, useState } from 'react';
import {
  Button,
  Form,
  Icon,
  Image,
  Message,
  Modal,
  Segment,
} from 'semantic-ui-react';
import TimeAgo from 'react-timeago';
import PropTypes from 'prop-types';
import { gql } from '@apollo/client';
import styled from 'styled-components';

type State = {
  conflict: boolean;
  loading?: boolean;
  error: boolean | string;
  old_name: string;
  old_description: string;
  name: string;
  description: string;
  showModal?: boolean;
};

export const CardComponent = (props) => {
  const initialState = {
    conflict: false,
    loading: false,
    error: false,
    old_name: props.name,
    old_description: props.description,
    name: props.name,
    description: props.description,
    showModal: false,
  };
  const [state, setState] = useState<State>(initialState);

  /*
  // LATER: reactivate when conflict handling will be needed again
  // (when syncing and subscriptions are actually available again)
  useEffect(() => {
    if (!state.showModal) {
      setState({
        ...state,
        name: props.name,
        old_name: props.name,
        description: props.description,
        old_description: props.description,
      });
      return;
    }

    if (
      props.name !== state.old_name ||
      props.description !== state.old_description
    ) {
      setState({
        ...state,
        conflict: { props },
      });
    }

  }, [props, state]);

  */

  const showAndReset = () => {
    setState({
      showModal: true,
      conflict: false,
      error: false,
      name: props.name,
      description: props.description,
      old_name: props.name,
      old_description: props.description,
    });
  };

  const saveAndHide = () => {
    const {
      id,
      storeCard = () =>
        Promise.reject({
          message: 'Sorry, not implemented yet.',
        }),
    } = props;

    const { name, description, old_name, old_description } = state;

    setLoading();

    storeCard({
      id,
      name,
      description,
      old_name,
      old_description,
    })
      .then(() => {
        setLoading(false);
        hide();
      })
      .catch((e) => {
        setLoading(false);
        setState((prevState) => ({
          ...prevState,
          error: e.message,
        }));
      });
  };

  function setLoading(loading = true) {
    setState((prevState) => ({
      ...prevState,
      loading,
    }));
  }

  const hide = () => {
    setState((prevState) => ({
      ...prevState,
      showModal: false,
    }));
  };

  //        onChange?: (event: React.ChangeEvent<HTMLInputElement>, data: InputOnChangeData) => void
  // @ts-ignore
  const handleChange = (event, data) => {
    setState((previousState) => ({
      ...previousState,
      [data.name]: data.value,
    }));
  };

  const {
    loading = false,
    error = false,
    conflict = false,
    name,
    description,
    showModal = false,
  } = state;

  const whenDraggingStyle: CSSProperties = {
    color: 'black',
    fontWeight: 'bold',
    fontStyle: 'italic',
  };
  const { isDragging, createdAt, updatedAt, updatedBy = {} } = props;

  return (
    <CardDiv data-cy="card" onClick={() => !showModal && showAndReset()}>
      <Modal open={showModal} onClose={hide}>
        <Modal.Header>Edit Card</Modal.Header>
        <Modal.Content>
          <Form
            onSubmit={() => saveAndHide()}
            error={Boolean(error)}
            loading={loading}
            warning={conflict}>
            <Message
              warning
              header="Warning! Card was concurrently modified on server."
            />
            <Message error header="Saving Card failed" content={error} />
            <Form.Input
              fluid
              label="Task Name"
              placeholder="Enter title"
              value={name}
              name="name"
              autoFocus
              onChange={handleChange}
              required
            />
            <ShowDiffWarning newValue={props.name} currentValue={name} />
            <Form.TextArea
              label="Task Description"
              placeholder="Add some more details about this task ..."
              value={description}
              name="description"
              onChange={handleChange}
            />
            <ShowDiffWarning
              newValue={props.description}
              currentValue={description}
            />
          </Form>
          <Segment>
            <Message>
              <p>
                <strong>created: </strong>
                <TimeAgo date={createdAt} />
              </p>
              <p>
                <strong>updated: </strong>
                <TimeAgo date={updatedAt} />
                {updatedBy && (
                  <>
                    <strong> by: </strong>
                    <Image
                      avatar
                      alt="user-avatar-icon"
                      src={updatedBy.avatarUrl}
                    />
                    <span>
                      {updatedBy.name
                        ? updatedBy.name
                        : updatedBy.email
                        ? updatedBy.email
                        : '?'}
                    </span>
                  </>
                )}
              </p>
            </Message>
          </Segment>
        </Modal.Content>
        <Modal.Actions>
          {conflict && (
            <Button
              color="green"
              negative
              onClick={() => {
                saveAndHide();
              }}
              inverted>
              <Icon name="save" /> Overwrite
            </Button>
          )}
          {!conflict && (
            <Button
              color="green"
              onClick={() => {
                saveAndHide();
              }}
              inverted>
              <Icon name="save" /> Save
            </Button>
          )}
          <Button color="red" onClick={hide} inverted>
            <Icon name="cancel" /> Close/cancel
          </Button>
        </Modal.Actions>
      </Modal>
      <span style={isDragging ? whenDraggingStyle : undefined}>
        {props.name}
      </span>
    </CardDiv>
  );
};

CardComponent.propTypes = {
  id: PropTypes.string.isRequired,
  cardListId: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string,
  storeCard: PropTypes.func,
  isDragging: PropTypes.bool,
  createdAt: PropTypes.string,
  updatedAt: PropTypes.string,
  updatedBy: PropTypes.object,
};

CardComponent.fragments = {
  card: gql`
    fragment Card_card on Card {
      id
      name
      description
      createdAt
      updatedAt
      updatedBy {
        avatarUrl
        email
        name
        id
      }
    }
  `,
};

const CardDiv = styled.div`
  border-radius: 3px;
  margin: 0.1em 0 0 0;
  border-bottom: 1px solid #ccc;
  background-color: #fff;
  padding: 10px;
`;

const ShowDiffWarning = ({ newValue, currentValue }) => (
  <Message warning size="mini" hidden={newValue === currentValue}>
    <b>New:</b> {newValue}
  </Message>
);

ShowDiffWarning.propTypes = {
  newValue: PropTypes.string,
  currentValue: PropTypes.string,
};
