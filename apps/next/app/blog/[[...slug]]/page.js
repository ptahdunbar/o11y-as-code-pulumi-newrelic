import { use } from 'react'
import { notFound } from 'next/navigation'
import Link from 'next/link'

import styles from '../../page.module.css'

import { Inter } from '@next/font/google'
const inter = Inter({ subsets: ['latin'] })

const DELAY = 1000

function truncateString(str, limit = 160) {
  return str.length > limit ? str.slice(0, limit) + '...' : str;
}

async function getPosts() {
  let posts = await fetch('https://dummyjson.com/posts?limit=10')

  await new Promise((resolve) => {
    setTimeout(resolve, DELAY)
  })

  return posts.json()
}

async function getAuthorById(id) {
  let user = await fetch(`https://dummyjson.com/users/${id}`)

  await new Promise((resolve) => {
    setTimeout(resolve, DELAY)
  })

  return user.json()
}

async function getPostById(id) {
  let post = await fetch(`https://dummyjson.com/posts/${id}`)

  await new Promise((resolve) => {
    setTimeout(resolve, DELAY)
  })

  return post.json()
}

function Archive({posts}) {
  return (
    <div className={inter.className}>
      <h1 className={styles.page_title}>Blog</h1>
      <div className={styles.content}>
        <ul>
          {posts.map(p => (<li key={p.id}>
            <Link href={`/blog/${p.id}`}>{p.title}</Link>
          </li>))}
        </ul>
      </div>
    </div>
  )
}

function SinglePost({title, body, author, tags, reactions, id}) {
  return (
    <div className={inter.className}>
      <h1 className={styles.page_title}>{title}</h1>
      <div className={styles.content}>{body}</div>
      <hr />
      <p>username: {author.username}</p>
      <p>tags: {tags.toString()}</p>
      <p>reactions: {reactions}</p>
    </div>
  )
}

export async function generateMetadata({params: {slug}}) {
  if ( ! slug ) {
    return {
      title: 'Archive',
      description: 'Archive list of recent blog posts'
    };
  }

  let post = await getPostById(slug[0])
  if ( ! post.id ) {
    return {
      title: 'Errr',
      description: 'errr'
    };
  }
  
  return {
    title: post.title,
    description: truncateString(post.body, 160)
  };
}

export default function page({params: { slug }}) {
  if ( ! slug ) {
    let { posts } = use(getPosts())
    return <Archive posts={posts} />
  }

  let post = use(getPostById(slug[0]))

  if ( ! post.id ) {
    notFound()
  }

  let author = use(getAuthorById(post.userId))
  post.author = author
  
  return <SinglePost {...post} />
}