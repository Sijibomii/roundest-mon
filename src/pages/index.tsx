import { getOptionsForVote } from '@/utils/getRandomPokemon'
import { trpc } from '@/utils/trpc'
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import styles from '../styles/Home.module.css'
import { inferQueryResponse } from './api/trpc/[trpc]'

const btn =
  "inline-flex mt-2 mb-2 items-center px-3 py-1.5 border border-gray-300 shadow-sm font-medium rounded-full text-gray-700 bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500";

const Home: NextPage = () => {
  const [ids , updateIds] = useState(getOptionsForVote());

  const [first, second] =ids
  const voteMutation = trpc.useMutation(["cast-vote"]);
  const firstPokemon = trpc.useQuery(["get-pokemon-by-id", {
    id: first
  }])
  const secondPokemon = trpc.useQuery(["get-pokemon-by-id", {
    id: second
  }])

  if ( firstPokemon.isLoading || secondPokemon.isLoading || !firstPokemon.data?.sprites.front_default
    || !secondPokemon.data?.sprites.front_default ) return null

    const voteForRoundest  = (selected: number) => {
      if (selected === first) {
        // If voted for 1st pokemon, fire voteFor with first ID
        voteMutation.mutate({
          votedFor: first,
          votedAgainst: second,
        });
      } else {
        // else fire voteFor with second ID
        voteMutation.mutate({
          votedFor: second,
          votedAgainst: first,
        });
      }
      updateIds(getOptionsForVote())
    }
  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center">
      <div className=' text-2xl text-center'>Which Pokemon is rounder</div>
      <div className='p-2' />
      <div className='border rounded p-12 flex justify-between items-center max-w-2xl'>
        { !firstPokemon.isLoading  && firstPokemon.data && !secondPokemon.isLoading && (
        <>
        <div className='w-64 h-64 flex flex-col items-center'>
          <Image src={firstPokemon.data?.sprites.front_default} 
          width={256} 
          height={256}
          layout="fixed"
          className="animate-fade-in"
          />
          <div className='text-xl text-center capitalize mt-[-2rem]'>{firstPokemon.data.name}</div>
          <button className={btn} onClick={()=> voteForRoundest(first)}>Rounder</button>
        </div>
        <div className='p-8'> VS</div>
        <div className='w-64 h-64 flex flex-col items-center'>
          <Image src={secondPokemon.data.sprites.front_default} 
          width={256} 
          height={256}
          layout="fixed"
          className="animate-fade-in"
          />
          <div className='text-xl text-center capitalize mt-[-2rem]'>{secondPokemon.data.name}</div>
          <button className={btn} onClick={()=> voteForRoundest(second)}>Rounder</button>
        </div>
        </>
        )}
        <div className="w-full text-xl text-center pb-2">
        <a href="https://twitter.com/sijibomi_">Twitter</a>
        <span className="p-4">{"-"}</span>
        <Link href="/results">
          <a>Results</a>
        </Link>
        <span className="p-4">{"-"}</span>
        <Link href="/about">
          <a>About</a>
        </Link>
      </div>

        <div className='p-2' />
      </div>
    </div>
  )
}

type pokemonFromServer = inferQueryResponse<"get-pokemon-by-id">
export default Home
