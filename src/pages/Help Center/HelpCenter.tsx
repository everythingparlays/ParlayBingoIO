import { useState } from 'react'
import styles from './styles.module.css'
import AccordionItem from 'components/AccordionItem/AccordionItem'
import { Link } from 'react-router-dom'
import Profile from 'components/svg/Profile'
import Question from 'components/svg/Question'
import Rules from 'components/svg/Rules'
import Mail from 'components/svg/Mail'
import React from 'react'

export default function HelpCenter() {
  return (
    <main id='main'>
      <section id={styles['hero']}>
        <div id={styles['hero-inner']} className='container'>
          <h1>Welcome to the Parlay Bingo Help Center</h1>
          <p>
            At Parlay Bingo, we're committed to providing you with a seamless
            and enjoyable fantasy betting experience. Our Help Center is
            designed to assist you in navigating the app, understanding the
            rules, and addressing any queries you may have. Whether you're a
            seasoned player or new to Parlay Bingo, this resource is here to
            guide you every step of the way.
          </p>
          <SearchInput />
        </div>
      </section>
      <section className='container'>
        <div id={styles['large-buttons']}>
          <Link to="#">
            <Profile
              color='var(--gray800)'
              colorBg='var(--transparent-contrast200)'
            />
            My account
          </Link>
          <Link to="#">
            <Question
              color='var(--gray800)'
            />
            How to play
          </Link>
          <Link to="#">
            <Rules
              color='var(--gray800)'
            />
            State rules & locations
          </Link>
        </div>
      </section>
      <section className='container'>
        <div id={styles['faq']}>
          <h2 className={styles['section-heading']}>Frequently Asked Questions</h2>
          <AccordionItem
            title='What is Parlay Bingo, and how does it work?'>
            <p>Parlay Bingo is a unique fantasy betting app that combines the excitement of fantasy sports with the thrill of bingo. Users can create their fantasy teams, enter leagues, and watch as their selected players' performances translate into bingo outcomes. It's a dynamic and engaging way to enjoy both fantasy sports and bingo.</p>
          </AccordionItem>
          <AccordionItem
            title='How do I start playing Parlay Bingo?'>
            <p>Insert Text Here</p>
          </AccordionItem>
          <AccordionItem
            title='Is Parlay Bingo legal?'>
            <p>Insert Text Here</p>
          </AccordionItem>
          <AccordionItem
            title='How are bingo outcomes determined in Parlay Bingo?'>
            <p>Insert Text Here</p>
          </AccordionItem>
          <AccordionItem
            title='Can I play Parlay Bingo for free?'>
            <p>Insert Text Here</p>
          </AccordionItem>
          <AccordionItem
            title='Is my personal information secure on Parlay Bingo?'>
            <p>Insert Text Here</p>
          </AccordionItem>
          <AccordionItem
            title='What makes Parlay Bingo different from other fantasy sports apps?'>
            <p>Insert Text Here</p>
          </AccordionItem>
          <AccordionItem
            title='Can I change my fantasy team lineup after the games have started?'>
            <p>Insert Text Here</p>
          </AccordionItem>
          <AccordionItem
            title='What happens in the case of a tie or draw in a Parlay Bingo league?'>
            <p>Insert Text Here</p>
          </AccordionItem>
          <AccordionItem
            title='Are there different types of bingo patterns in Parlay Bingo?'>
            <p>Insert Text Here</p>
          </AccordionItem>
        </div>
      </section>
      <section className='container'>
        <div id={styles['questions']}>
          <h2 className={styles['section-heading']}>Still have questions?</h2>
          <a
            href='mailto:support@everythingparlays.com'
            id={styles['send-email']}>
            <Mail
              color='var(--primary)'
            />
            <h3>Send us an Email</h3>
            <a
              >
              support@everythingparlays.com
            </a>
          </a>
        </div>
      </section>
    </main>
  )
}

const SearchInput = () => {
  const [search, setSearch] = useState('')

  const handleSearch = (e : React.FormEvent) => {
    e.preventDefault()
    console.log(e)
    // handle searching here
  }

  return (
    <form
      id={styles['search-wrapper']}
      onSubmit={e => handleSearch(e)}
      className={`${search === '' ? '' : styles['has-text']}`}>
      <img
        src='assets/svg/search.svg'
        alt='Search Icon'
        id={styles['search-icon']}
      />
      <input 
        value={search}
        onChange={e => setSearch(e.target.value)}
        type='search'
        placeholder='How can we help?'
        id={styles['search']}
      />
      <button
        type='submit'
        title='Search'
        id={styles['search-submit']}
        disabled={search === ''}>
        <img
          src='assets/svg/arrow-right.svg'
          alt='Right arrow'
        />
      </button>
    </form>
  )
}
