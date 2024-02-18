import React, { useState } from 'react';
import { DropTargetMonitor, useDrop } from 'react-dnd';
import {
  Button,
  ButtonGroup,
  Editable,
  EditableInput,
  EditablePreview,
  Flex,
  Heading,
  IconButton,
  Input,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Skeleton,
  useEditableControls,
} from '@chakra-ui/react';
import { AddIcon, HamburgerIcon } from '@chakra-ui/icons';
import { FaTrash } from 'react-icons/fa';

import Card, { dndItemType } from 'components/Card/Card';
import {
  List as ListType,
  Card as CardType,
  useAddCardMutationMutation,
  useCardListQuery,
  useDeleteListOfBoardMutation,
  useMoveCard2Mutation,
  useRenameListMutation,
} from 'generated/graphql';

import { updateCachedListsAfterMovingCard } from 'components/List/overrideCacheListsAfterMovingCard';

import styles from './CardList.module.css';

interface CardListWithoutDndProps {
  id: string;
  name: string;
  list: UIListData;
  loading: boolean;
  deleteList: () => void;
  readonly?: boolean;
}

const CardListWithoutDnd = (
  props: CardListWithoutDndProps & CollectedProps
) => {
  const {
    list,
    id,
    deleteList,
    isOver,
    loading,
    name,
    readonly = false,
  } = props;

  const initialNewCardName = 'New Card';
  const [newCardNameInputValue, setNewCardNameInputValue] =
    useState(initialNewCardName);
  const [isStoring, setIsStoring] = useState(false);

  const [addCardWithName] = useAddCardMutationMutation({
    variables: {
      cardListId: id,
      name: 'new card',
    },
  });

  const cards = list?.cards;

  return (
    <div data-cy="card-list">
      <div
        className={styles.list}
        style={{
          backgroundColor: isOver ? 'yellow' : 'lightgrey',
        }}>
        <Skeleton minHeight="2rem" isLoaded={!loading}>
          <CardListHeader name={name} listId={id} readonly={readonly}>
            <CardListButton
              leftIcon={<FaTrash color="red" />}
              onButtonClick={() => deleteList()}>
              delete list
            </CardListButton>
          </CardListHeader>
        </Skeleton>

        <div className={styles.inner}>
          <Flex flexDirection="column" gap="0.1em">
            <Flex flexDirection="column" gap="0.1em">
              {cards?.map((card) => (
                <Card
                  key={card.id}
                  {...card}
                  cardListId={id}
                  readonly={readonly}
                />
              ))}
            </Flex>

            {!readonly && (
              <Editable
                data-cy="edit-and-add-card"
                isDisabled={loading || isStoring}
                onChange={setNewCardNameInputValue}
                value={newCardNameInputValue}
                onSubmit={async (newName) => {
                  try {
                    setIsStoring(true);
                    await addCardWithName?.({
                      variables: {
                        cardListId: id,
                        name: newName,
                      },
                    });
                    setNewCardNameInputValue(initialNewCardName);
                  } finally {
                    setIsStoring(false);
                  }
                }}>
                <Flex
                  pt="4px"
                  ml="0.5rem"
                  my={0}
                  flexDirection="row"
                  justifyContent="flex-start"
                  flexGrow={0}
                  gap={1}
                  style={{ color: loading ? 'grey' : undefined }}
                  alignItems="center">
                  <AddIcon height="0.75em" />
                  <EditablePreview flexGrow={0} py={'8px'} />
                  <Input as={EditableInput} placeholder="card name" />
                </Flex>
                <EditableControls />
              </Editable>
            )}
          </Flex>
        </div>
      </div>
    </div>
  );
};

function EditableControls() {
  const { isEditing, getSubmitButtonProps, getCancelButtonProps } =
    useEditableControls();
  return isEditing ? (
    <ButtonGroup variant="outline" spacing="6">
      <Button
        background="green"
        color="white"
        _hover={{ background: 'darkgreen' }}
        {...getSubmitButtonProps()}>
        Create
      </Button>
      <Button {...getCancelButtonProps()}>Cancel</Button>
    </ButtonGroup>
  ) : null;
}

type CardListWithDndProps = CardListWithoutDndProps & {
  moveCardToList: (cardId: string, fromListId: string, toList: string) => void;
};

type DraggableCardItem = CardType & {
  cardListId: string;
};

const drop = (
  props: CardListWithDndProps,
  cardItem: DraggableCardItem
): undefined => {
  const cardId = cardItem.id;
  const cardListId = props.id;
  const oldCardListId = cardItem.cardListId;
  props.moveCardToList(cardId, oldCardListId, cardListId);
};

interface CollectedProps {
  isOver: boolean;
}

const CardListWithDnd = (props: CardListWithDndProps) => {
  const [dndProps, ref] = useDrop<
    DraggableCardItem,
    CardListWithDndProps,
    CollectedProps
  >({
    accept: dndItemType,
    drop: (item: DraggableCardItem) => drop(props, item),
    canDrop: (item: DraggableCardItem) => props.id !== item.cardListId,
    collect: (monitor: DropTargetMonitor) => ({
      // hovered?
      isOver: monitor.isOver(),
    }),
  });

  return (
    <div ref={ref}>
      <CardListWithoutDnd {...props} {...dndProps} />
    </div>
  );
};

interface CardListProps {
  id: string;
  boardId: string;
  name: string;
  readonly: boolean | undefined;
}

type UICardsData = Omit<CardType, 'createdBy' | 'updatedBy'>;
type ListTypeWithoutCards = Omit<
  ListType,
  'createdAt' | 'createdBy' | 'updatedAt' | 'cards'
>;
type UIListData =
  | (ListTypeWithoutCards & {
      cards: UICardsData[];
    })
  | null
  | undefined;

export const CardList = ({
  id,
  name,
  boardId,
  readonly = false,
}: CardListProps) => {
  const { loading, error, data } = useCardListQuery({
    variables: { cardListId: id },
  });

  const [deleteListOfBoard] = useDeleteListOfBoardMutation();

  const deleteList = () =>
    deleteListOfBoard({
      variables: {
        boardId,
        listId: id,
      },
    });

  const [moveCard] = useMoveCard2Mutation();

  if (error) {
    return <span>Load error!</span>;
  }

  const list: UIListData = data?.list;

  const moveCardToList: (
    cardId: string,
    fromListId: string,
    toList: string
  ) => void = (cardId: string, fromListId: string, toList: string) => {
    moveCard({
      variables: {
        fromListId,
        toList,
        cardId,
      },
      update: updateCachedListsAfterMovingCard(cardId, toList, fromListId),
    });
  };

  return (
    <CardListWithDnd
      moveCardToList={moveCardToList}
      deleteList={deleteList}
      list={list}
      name={name}
      loading={loading}
      id={id}
      readonly={readonly}
    />
  );
};

interface CardListHeaderProps {
  name: string;
  listId: string;
  children: React.ReactNode;
  readonly?: boolean;
}

function CardListHeader({
  name,
  listId,
  children,
  readonly = false,
}: CardListHeaderProps) {
  const [renameList, mutationResult] = useRenameListMutation();
  const { loading } = mutationResult;

  return (
    <Flex
      data-cy="card-list-header"
      flexDir="row"
      alignItems="center"
      px={0}
      py="0.4em">
      <Heading size="md" my={0} flexGrow={1}>
        <Editable
          isDisabled={Boolean(loading || readonly)}
          onSubmit={async (newName) =>
            await renameList({ variables: { listId, newName } })
          }
          defaultValue={name}
          fontSize="2xl">
          <Flex
            flexDirection="row"
            justifyContent="flex-start"
            flexGrow={0}
            alignItems="center">
            <EditablePreview flexGrow={0} />
          </Flex>
          <Input as={EditableInput} />
        </Editable>
      </Heading>
      {!readonly && (
        <Popover isLazy>
          <PopoverTrigger>
            <IconButton
              data-cy="card-list-header-menu"
              icon={<HamburgerIcon />}
              size="sm"
              aria-label="delete list"
            />
          </PopoverTrigger>
          <PopoverContent
            rootProps={{
              bg: 'transparent',
              boxShadow: 'xl',
            }}
            w="min-content"
            boxShadow="xl">
            <PopoverBody>{children}</PopoverBody>
          </PopoverContent>
        </Popover>
      )}
    </Flex>
  );
}

function CardListButton({ onButtonClick, leftIcon, children }) {
  return (
    <Button m="0.1em" onClick={onButtonClick} leftIcon={leftIcon}>
      {children}
    </Button>
  );
}
