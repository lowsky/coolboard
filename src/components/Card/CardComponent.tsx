import React, { CSSProperties, useState } from 'react';
import { useDisclosure } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { FetchResult } from '@apollo/client';

import {
  Card,
  UpdateCardMutation,
  UpdateCardMutationVariables,
} from 'generated/graphql';
import { CardEditModal } from './CardEditModal';

type State = {
  conflict: boolean;
  loading?: boolean;
  error: string | undefined;
  old_name: string;
  old_description?: string | null | undefined;
  name: string;
  description?: string | null | undefined;
};

type CardComponentProps = Card & {
  storeCard: (
    vars: UpdateCardMutationVariables
  ) => Promise<FetchResult<UpdateCardMutation>>;
  isDragging?: boolean;
  readonly?: boolean;
};

export const CardComponent = (props: CardComponentProps) => {
  const initialState: State = {
    conflict: false,
    loading: false,
    error: undefined,
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
    setState(initialState);
  };

  const saveAndHide = () => {
    const { id, storeCard } = props;
    const {
      name,
      description,
      // later, for conflict resolution
      //  old_name, old_description
    } = state;

    setLoading();

    storeCard({
      id,
      name,
      description: description ?? '',
      // for conflict resolution:      old_name,
      // for conflict resolution:      old_description,
    })
      .then(() => {
        setLoading(false);
        onClose();
      })
      .catch((e) => {
        setState((prevState) => ({
          ...prevState,
          loading: false,
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

  const { loading = false, error, conflict, name, description } = state;

  const whenDraggingStyle: CSSProperties = {
    color: 'black',
    fontWeight: 'bold',
    fontStyle: 'italic',
  };
  const { isDragging, createdAt, updatedAt, updatedBy } = props;

  return (
    <CardWrapper
      data-cy="card"
      onClick={() => {
        showAndReset();
        onOpen();
      }}>
      <CardEditModal
        {...{
          isOpen,
          onClose,
          saveAndHide,
          conflict,
          loading,
          name,
          handleChange,
          props,
          description,
          createdAt,
          updatedAt,
          updatedBy,
          error,
        }}
      />
      <span style={isDragging ? whenDraggingStyle : undefined}>
        {props.name}
      </span>
    </CardWrapper>
  );
};

const CardWrapper = styled.div`
  border-radius: 3px;
  background-color: #fff;
  padding: 10px;
`;
