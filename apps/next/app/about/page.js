import { Inter } from '@next/font/google'
const inter = Inter({ subsets: ['latin'] })

import styles from '../page.module.css'

export default function About() {
  return (
    <div className={inter.className}>
      <h1 className={styles.page_title}>About</h1>
    </div>
  )
}
