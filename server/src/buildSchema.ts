import { isLocalDev } from './helpers/logging';
import builder, { prisma } from './schemaBuilder';
export { prisma } from './schemaBuilder';
import {
  verifyAndRetrieveAuthSubject,
  verifyUserIsAuthenticatedAndRetrieveUserToken,
} from './helpers/auth';
import { injectUserIdByAuth0id } from './helpers/userIdByAuth0id';
import { createNewUser } from './helpers/registerNewUser';
import resolvers from './resolvers/resolvers';

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
        orderBy: { createdAt: 'asc' },
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
  }),
});

builder.prismaObject('Card', {
  name: 'Card',
  fields: (t) => ({
    id: t.exposeID('id'),
    name: t.exposeString('name'),
    description: t.string({
      nullable: true,
      resolve: async (parent, _args, _ctx, _info) => {
        return parent.description ?? '';
      },
    }),
    createdAt: t.expose('createdAt', { type: 'DateTime' }),
    updatedAt: t.expose('updatedAt', { type: 'DateTime' }),
    updatedBy: t.relation('updatedBy'),
  }),
});

const BoardWhereUniqueInput = builder.inputType('BoardWhereUniqueInput', {
  fields: (t) => ({
    id: t.id({ required: false }),
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
    connect: t.field({ type: [CardWhereUniqueInput] }),
    disconnect: t.field({ type: [CardWhereUniqueInput] }),
  }),
});
const ListUpdateInput = builder.inputType('ListUpdateInput', {
  fields: (t) => ({
    cards: t.field({ type: CardUpdateManyInput }),
  }),
});

const CardUpdateInput = builder.inputType('CardUpdateInput', {
  fields: (t) => ({
    name: t.string({ required: false }),
    description: t.string({ required: false }),
  }),
});

builder.queryField('me', (t) =>
  t.prismaField({
    description: 'authenticated current user',
    type: 'User',
    nullable: true,
    resolve: async (_query, _root, _args, ctx) => {
      const auth0id = await verifyAndRetrieveAuthSubject(ctx);
      const user = await prisma.user.findFirst({
        ..._query,
        where: { auth0id },
      });
      if (user) {
        if (user!.id) injectUserIdByAuth0id(user!.id, auth0id);
        return user;
      }
      const userToken = await verifyUserIsAuthenticatedAndRetrieveUserToken(
        ctx
      );

      // user signed in, but not created in DB yet:
      const newUser = await createNewUser(userToken, (data) =>
        prisma.user.create(data)
      );

      if (isLocalDev) console.log('created prisma user:', newUser);

      if (newUser?.id) injectUserIdByAuth0id(newUser.id, auth0id);

      return newUser;
    },
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
      name: 'ListWhereUniqueInput2',
    },
    input: {
      id: t.input.id({ required: false }),
    },
    resolve: async (_query, _root, args, ctx) =>
      resolvers.Query.list(_root, args, ctx),
  })
);

builder.mutationField('createBoard', (t) => {
  return t.field({
    nullable: false,
    type: 'User',
    args: {
      name: t.arg.string({ required: true }),
    },
    // @ts-expect-error resolver return type was never correct
    resolve: async (_parent, args, ctx, _info) => {
      const board = await resolvers.Mutation.createBoard(_parent, args, ctx);
      if (!board) throw 'Sorry, board was not created';
      return board;
    },
  });
});

builder.mutationField('deleteBoard', (t) => {
  return t.field({
    nullable: false,
    type: 'Board',
    args: {
      id: t.arg.id({ required: true }),
    },
    // @ts-expect-error resolver return type was never correct
    resolve: async (_parent, args, ctx, _info) => {
      return resolvers.Mutation.deleteBoard(_parent, args, ctx);
    },
  });
});

builder.mutationField('deleteList', (t) => {
  return t.field({
    type: 'List',
    args: {
      id: t.arg.id({ required: true }),
    },
    // @ts-expect-error resolver return type was never correct
    resolve: async (_parent, args, ctx, _info) => {
    },
  });
});

builder.mutationField('updateBoard', (t) => {
  return t.field({
    nullable: false,
    type: 'Board',
    args: {
      where: t.arg({ type: BoardWhereUniqueInput, required: true }),
      data: t.arg({ type: BoardUpdateInput, required: true }),
    },
    // @ts-expect-error resolver return type was never correct
    resolve: async (_parent, args, ctx, _info) => {
      return resolvers.Mutation.updateBoard(_parent, args, ctx);
    },
  });
});

builder.mutationField('updateList', (t) => {
  return t.field({
    nullable: false,
    type: 'List',
    args: {
      where: t.arg({ type: ListWhereUniqueInput, required: true }),
      data: t.arg({ type: ListUpdateInput, required: true }),
    },
    resolve: async (_parent, { where, data }, ctx, _info) =>
      // @ts-expect-error resolver return type was never correct
      resolvers.Mutation.updateList(_parent, { where, data }, ctx)
  });
});

builder.mutationField('updateCard', (t) => {
  return t.field({
    nullable: false,
    type: 'Card',
    args: {
      where: t.arg({ type: CardWhereUniqueInput, required: true }),
      data: t.arg({ type: CardUpdateInput, required: true }),
    },
    resolve: async (_parent, { where, data }, ctx, _info) =>
      // @ts-expect-error resolver return type was never correct
      resolvers.Mutation.updateCard(_parent, { where, data }, ctx)
  });
});

export const buildSchema = () => builder.toSchema();
