import { trpc } from '@/utils/trpc'
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'


const Home: NextPage = () => {
  const { data  } = trpc.useQuery(["getUser", 'john' ])
  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center">
      <div className=' text-2xl text-center'>Which Pokemon is rounder</div>
      <div className='p-2' />
      <div className='border rounded p-8 flex justify-between items-center max-w-2xl'>
        <div className='w-16 h-16 bg-red-200'/>
        <div className='p-8'> VS</div>
        <div className='w-16 h-16 bg-red-200'/>
      </div>
    </div>
  )
}

export default Home
