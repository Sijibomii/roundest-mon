import * as trpc from '@trpc/server';
import { PokemonClient } from 'pokenode-ts';
import { prisma } from "@/backend/utils/prisma";
import { z } from 'zod';
export const appRouter = trpc.router().query("get-pokemon-by-id",{
  input: z.object({ id: z.number() }),
  async resolve({ input }) {
    const api = new PokemonClient()

    const pokemon = await api.getPokemonById(input.id)

    return { id: pokemon.id, name: pokemon.name, sprites: pokemon.sprites, spriteUrl: pokemon.sprites, }
  }
}).mutation("cast-vote", {
  input: z.object({
    votedFor: z.number(),
    votedAgainst: z.number(),
  }),
  async resolve({ input }) {
    const voteInDb = await prisma.vote.create({
      data: {
        votedAgainstId: input.votedAgainst,
        votedForId: input.votedFor,
      },
    });
    return { success: true, vote: voteInDb };
  },
});

export type AppRouter = typeof appRouter;