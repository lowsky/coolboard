/* eslint-disable @typescript-eslint/no-unused-vars */
import type { Board, List, User } from '@prisma/client';

import builder from './schemaBuilder';
import resolvers from './resolvers/resolvers';

export { prisma } from './schemaBuilder';

builder.prismaObject('User', {
  name: 'User',
  fields: (t) => ({
    id: t.exposeID('id'),
    email: t.exposeString('email'),
    name: t.exposeString('name'),
    avatarUrl: t.string({
      nullable: true,
      resolve: (parent) => parent.avatarUrl ?? undefined,
    }),
    boards: t.relation('boards', {
      query: {
        orderBy: { name: 'asc' },
      },
    }),
  }),
});

builder.prismaObject('Board', {
  name: 'Board',
  fields: (t) => ({
    id: t.exposeID('id'),
    name: t.exposeString('name'),
    lists: t.relation('lists', {
      query: {
        orderBy: { createdAt: 'asc' },
      },
    }),
    createdAt: t.expose('createdAt', { type: 'DateTime' }),
    updatedAt: t.expose('updatedAt', { type: 'DateTime' }),
    createdBy: t.relation('createdBy'),
  }),
});

builder.prismaObject('List', {
  name: 'List',
  fields: (t) => ({
    id: t.exposeID('id'),
    name: t.exposeString('name'),
    cards: t.relation('cards', {
      query: {
        orderBy: { createdAt: 'asc' },
      },
    }),
    createdAt: t.expose('createdAt', { type: 'DateTime' }),
    updatedAt: t.expose('updatedAt', { type: 'DateTime' }),
    createdBy: t.relation('createdBy'),
  }),
});

builder.prismaObject('Card', {
  name: 'Card',
  fields: (t) => {
    return {
      id: t.exposeID('id'),
      name: t.exposeString('name'),
      description: t.string({
        nullable: true,
        resolve: async (parent, _args, _ctx, _info) => parent.description,
      }),
      createdAt: t.expose('createdAt', { type: 'DateTime' }),
      updatedAt: t.expose('updatedAt', { type: 'DateTime' }),
      createdBy: t.relation('createdBy'),
      updatedBy: t.relation('updatedBy'),
    };
  },
});

const BoardWhereUniqueInput = builder.inputType('BoardWhereUniqueInput', {
  fields: (t) => ({
    id: t.id({ required: true }),
  }),
});
const ListCreateInput = builder.inputType('ListCreateInput', {
  fields: (t) => ({ name: t.string({ required: true }) }),
});
const ListScalarWhereInput = builder.inputType('ListScalarWhereInput', {
  fields: (t) => ({ id_in: t.idList({ required: true }) }),
});
const ListWhereUniqueInput = builder.inputType('ListWhereUniqueInput', {
  fields: (t) => ({ id: t.id({ required: true }) }),
});
const ListUpdateManyInput = builder.inputType('ListUpdateManyInput', {
  fields: (t) => ({
    create: t.field({ type: [ListCreateInput], required: false }),
    deleteMany: t.field({ type: [ListScalarWhereInput], required: false }),
    delete: t.field({ type: [ListWhereUniqueInput], required: false }),
  }),
});

const BoardUpdateInput = builder.inputType('BoardUpdateInput', {
  fields: (t) => ({
    lists: t.field({ type: ListUpdateManyInput, required: true }),
  }),
});

const CardCreateInput = builder.inputType('CardCreateInput', {
  fields: (t) => ({
    name: t.string({ required: true }),
    description: t.string({ required: false }),
  }),
});
const CardWhereUniqueInput = builder.inputType('CardWhereUniqueInput', {
  fields: (t) => ({
    id: t.id({ required: true }),
  }),
});
const CardUpdateManyInput = builder.inputType('CardUpdateManyInput', {
  fields: (t) => ({
    create: t.field({ type: [CardCreateInput] }),
    connect: t.field({
      type: [CardWhereUniqueInput],
      deprecationReason: 'better use moveCard instead',
    }),
    disconnect: t.field({
      type: [CardWhereUniqueInput],
      deprecationReason: 'better use moveCard instead',
    }),
  }),
});
const ListUpdateInput = builder.inputType('ListUpdateInput', {
  fields: (t) => ({
    cards: t.field({ type: CardUpdateManyInput }),
  }),
});

const CardUpdateInput = builder.inputType('CardUpdateInput', {
  fields: (t) => ({
    name: t.string({ required: true }),
    description: t.string({ required: false }),
  }),
});

builder.queryField('me', (t) =>
  t.prismaField({
    description: 'authenticated current user',
    type: 'User',
    nullable: true,
    resolve: async (_query, _root, _args, ctx) =>
      resolvers.Query.me(_root, _args, ctx),
  })
);

builder.queryField('board', (t) =>
  t.prismaField({
    type: 'Board',
    nullable: true,
    args: {
      where: t.arg({ type: BoardWhereUniqueInput, required: true }),
    },
    resolve: async (_query, _root, args, ctx, _info) =>
      resolvers.Query.board(_root, args, ctx),
  })
);

builder.queryField('list', (t) =>
  t.prismaFieldWithInput({
    type: 'List',
    argOptions: {
      name: 'where',
    },
    nullable: true,
    typeOptions: {
      name: 'ListWhereIdInput',
    },
    input: {
      id: t.input.id({ required: true }),
    },
    resolve: async (_query, _root, args, ctx) =>
      resolvers.Query.list(_root, args, ctx),
  })
);

builder.mutationField('createBoard', (t) =>
  t.prismaField({
    nullable: false,
    type: 'User',
    args: {
      name: t.arg.string({ required: true }),
    },
    resolve: async (_parent, _root, args, ctx, _info): Promise<User> => {
      const user = await resolvers.Mutation.createBoard(_parent, args, ctx);
      if (!user) throw 'Sorry, board was not created';
      return user;
    },
  })
);

builder.mutationField('deleteBoard', (t) =>
  t.prismaField({
    nullable: false,
    type: 'Board',
    args: {
      id: t.arg.id({ required: true }),
    },
    resolve: async (_parent, _root, args, ctx, _info): Promise<Board> =>
      resolvers.Mutation.deleteBoard(_parent, args, ctx),
  })
);

builder.mutationField('deleteList', (t) =>
  t.prismaField({
    type: 'List',
    args: {
      id: t.arg.id({ required: true }),
    },
    resolve: async (_parent, _root, args, ctx, _info): Promise<List> =>
      resolvers.Mutation.deleteList(_parent, args, ctx),
  })
);

builder.mutationField('updateBoard', (t) =>
  t.prismaField({
    nullable: false,
    type: 'Board',
    args: {
      where: t.arg({ type: BoardWhereUniqueInput, required: true }),
      data: t.arg({ type: BoardUpdateInput, required: true }),
    },
    resolve: async (_parent, _root, args, ctx, _info) =>
      resolvers.Mutation.updateBoard(_parent, args, ctx),
  })
);

builder.mutationField('updateList', (t) =>
  t.prismaField({
    nullable: false,
    type: 'List',
    args: {
      where: t.arg({ type: ListWhereUniqueInput, required: true }),
      data: t.arg({ type: ListUpdateInput, required: true }),
    },
    resolve: async (_parent, _root, { where, data }, ctx, _info) => {
      return resolvers.Mutation.updateList(_parent, { where, data }, ctx);
    },
  })
);

builder.mutationField('renameList', (t) =>
  t.prismaField({
    nullable: false,
    type: 'List',
    args: {
      where: t.arg({ type: ListWhereUniqueInput, required: true }),
      newName: t.arg.string({ required: true }),
    },
    resolve: async (_parent, _root, { where, newName }, { prisma }, _info) =>
      prisma.list.update({
        where,
        data: {
          name: newName,
        },
      }),
  })
);

builder.mutationField('updateCard', (t) =>
  t.prismaField({
    nullable: false,
    type: 'Card',
    args: {
      where: t.arg({ type: CardWhereUniqueInput, required: true }),
      data: t.arg({ type: CardUpdateInput, required: true }),
    },
    resolve: async (_parent, _root, { where, data }, ctx, _info) => {
      const { name, description = null } = data;
      const { id } = where;
      return resolvers.Mutation.updateCard(
        _parent,
        {
          where: { id },
          data: {
            name,
            description,
          },
        },
        ctx
      );
    },
  })
);
builder.mutationField('moveCard', (t) =>
  t.prismaField({
    nullable: true,
    type: 'Card',
    args: {
      id: t.arg.id({ required: true }),
      fromListId: t.arg.id({ required: true }),
      toListId: t.arg.id({ required: true }),
    },
    resolve: async (_parent, _root, args, ctx, _info) => {
      const { id, fromListId, toListId } = args;
      return resolvers.Mutation.moveCard(
        _parent,
        {
          id,
          fromListId,
          toListId,
        },
        ctx
      );
    },
  })
);

builder.queryField('ping', (t) =>
  t.field({
    nullable: false,
    type: 'String',
    resolve: () => {
      return 'pong';
    },
  })
);

export const buildSchema = () => builder.toSchema();
