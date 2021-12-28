import * as trpc from '@trpc/server';

export const appRouter = trpc.router().query('getUser', {
  input: (val: unknown) => {
    if (typeof val === 'string') return val;
    throw new Error(`Invalid input: ${typeof val}`);
  },
  async resolve(req) {
    req.input; // string
    return { id: req.input, name: 'Bilbo' };
  },
});

export type AppRouter = typeof appRouter;