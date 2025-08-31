import React, { type CSSProperties, useState } from 'react';
import { Box } from '@chakra-ui/react';
import type { ApolloLink } from '@apollo/client';

import type {
  Card,
  UpdateCardMutation,
  UpdateCardMutationVariables,
} from 'generated/graphql';
import { CardEditModal } from '../CardEditModal';

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
  ) => Promise<ApolloLink.Result<UpdateCardMutation>>;
  isDragging?: boolean;
  readonly?: boolean;
};

export const CardComponent = (props: CardComponentProps) => {
  const initialState: State = {
    conflict: false,
    loading: false,
    error: undefined,
    old_name: props.name || '',
    old_description: props.description,
    name: props.name || '',
    description: props.description,
  };
  const [state, setState] = useState<State>(initialState);
  const [open, setOpen] = useState(false);
  const onOpen = () => setOpen(true);
  const onClose = () => setOpen(false);
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
      id: id || '',
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

  const handleChange = (data: { [key: string]: string }) => {
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

  const onClick = props.readonly
    ? undefined
    : () => {
        showAndReset();
        onOpen();
      };
  return (
    <CardEditModal
      {...{
        open,
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
      }}>
      <Box
        data-cy="card"
        onClick={onClick}
        css={{
          borderRadius: '3px',
          backgroundColor: '#fff',
          padding: '10px',
        }}>
        <span style={isDragging ? whenDraggingStyle : undefined}>
          {props.name ?? '-'}
        </span>
      </Box>
    </CardEditModal>
  );
};
