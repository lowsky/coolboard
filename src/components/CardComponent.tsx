import React, { CSSProperties, useState } from 'react';
import {
  Alert,
  AlertDescription,
  AlertTitle,
  Avatar,
  Box,
  Button,
  ButtonGroup,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Textarea,
  useDisclosure,
} from '@chakra-ui/react';
import TimeAgo from 'react-timeago';
import styled from '@emotion/styled';
import { FaSave, FaTimes } from 'react-icons/fa';

import { Segment } from '../common/Segment';

type State = {
  conflict: boolean;
  loading?: boolean;
  error: boolean | string;
  old_name: string;
  old_description: string;
  name: string;
  description: string;
};

type StoreCardParams = {
  id: string;
  name: string;
  description: string;
  old_name: string;
  old_description: string;
};

export const CardComponent = (props) => {
  const initialState: State = {
    conflict: false,
    loading: false,
    error: false,
    old_name: props.name,
    old_description: props.description,
    name: props.name,
    description: props.description,
  };
  const [state, setState] = useState<State>(initialState);
  const { isOpen, onOpen, onClose } = useDisclosure();
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
      conflict: false,
      loading: false,
      error: false,
      name: props.name,
      description: props.description,
      old_name: props.name,
      old_description: props.description,
    });
  };

  const saveAndHide = (ev) => {
    ev.preventDefault();
    const {
      id,
      storeCard = (_params: StoreCardParams) =>
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
        onClose();
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

  const handleChange = (data) => {
    setState((previousState) => ({
      ...previousState,
      ...data,
    }));
  };

  const { loading = false, error = false, conflict, name, description } = state;

  const whenDraggingStyle: CSSProperties = {
    color: 'black',
    fontWeight: 'bold',
    fontStyle: 'italic',
  };
  const { isDragging, createdAt, updatedAt, updatedBy = {} } = props;

  return (
    <CardDiv
      data-cy="card"
      onClick={() => {
        showAndReset();
        onOpen();
      }}>
      <Modal isOpen={isOpen} onClose={onClose} id="cardEditModal">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Card</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <form onSubmit={(ev) => saveAndHide(ev)}>
              <FormControl isInvalid={conflict}>
                <FormErrorMessage>
                  <Alert status="warning">
                    <AlertTitle>
                      Warning! Card was concurrently modified on server.
                    </AlertTitle>
                  </Alert>
                </FormErrorMessage>
              </FormControl>
              <FormControl isReadOnly={loading} isInvalid={conflict}>
                <FormLabel htmlFor="title">Task Name</FormLabel>
                <Input
                  placeholder="Enter title"
                  value={name}
                  id="title"
                  autoFocus
                  onChange={(ev) => handleChange({ name: ev.target.value })}
                  required
                />
                <FormErrorMessage>
                  <ShowDiffWarning newValue={props.name} currentValue={name} />
                </FormErrorMessage>
              </FormControl>
              <FormControl isReadOnly={loading} isInvalid={conflict}>
                <FormLabel htmlFor="description">Task Description</FormLabel>
                <Textarea
                  placeholder="Add some more details about this task ..."
                  value={description}
                  id="description"
                  onChange={(ev) =>
                    handleChange({ description: ev.target.value })
                  }
                />
                <FormErrorMessage>
                  <ShowDiffWarning
                    newValue={props.description}
                    currentValue={description}
                  />
                </FormErrorMessage>
              </FormControl>
            </form>
            <Segment>
              <Alert status="info">
                <AlertDescription>
                  <Box>
                    <strong>created: </strong>
                    <TimeAgo date={createdAt} />
                  </Box>
                  <Box>
                    <strong>updated: </strong>
                    <TimeAgo date={updatedAt} />
                    {updatedBy && (
                      <>
                        <strong> by: </strong>
                        <Avatar src={updatedBy.avatarUrl} />
                        <span>
                          {updatedBy.name
                            ? updatedBy.name
                            : updatedBy.email
                            ? updatedBy.email
                            : '?'}
                        </span>
                      </>
                    )}
                  </Box>
                </AlertDescription>
              </Alert>
            </Segment>
            <FormControl>
              <FormControl isInvalid={Boolean(error)}>
                <FormErrorMessage>
                  <Alert status="error">
                    <AlertTitle>Saving Card failed</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                </FormErrorMessage>
              </FormControl>
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <ButtonGroup>
              {conflict && (
                <Button
                  isLoading={loading}
                  disabled={loading}
                  type="submit"
                  color="green"
                  onClick={(ev) => {
                    saveAndHide(ev);
                  }}
                  leftIcon={<FaSave />}>
                  Overwrite
                </Button>
              )}
              {!conflict && (
                <Button
                  isLoading={loading ?? false}
                  type="submit"
                  color="green"
                  onClick={(ev) => {
                    saveAndHide(ev);
                  }}
                  leftIcon={<FaSave />}>
                  Save
                </Button>
              )}
              <Button
                color="red"
                onClick={() => {
                  onClose();
                }}
                leftIcon={<FaTimes />}>
                Close/cancel
              </Button>
            </ButtonGroup>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <span style={isDragging ? whenDraggingStyle : undefined}>
        {props.name}
      </span>
    </CardDiv>
  );
};

const CardDiv = styled.div`
  border-radius: 3px;
  margin: 0.1em 0 0 0;
  border-bottom: 1px solid #ccc;
  background-color: #fff;
  padding: 10px;
`;

const ShowDiffWarning = ({ newValue, currentValue }) => {
  if (newValue === currentValue) {
    return null;
  }

  return (
    <Alert status="warning" size="mini">
      <AlertTitle>New:</AlertTitle>
      <AlertDescription>{newValue}</AlertDescription>
    </Alert>
  );
};
