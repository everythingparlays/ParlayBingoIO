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
          <h1>Welcome to the OverBoard Sports Help Center</h1>
          <p>
            At OverBoard Sports, we're committed to providing you with a seamless
            and enjoyable fantasy betting experience. Our Help Center is
            designed to assist you in navigating the app, understanding the
            rules, and addressing any queries you may have. Whether you're a
            seasoned player or new to OverBoard Sports, this resource is here to
            guide you every step of the way.
          </p>
          {/*<SearchInput />*/}
        </div>
      </section>
      {/*
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
      */}
      <section className='container'>
        <div id={styles['faq']}>
          <h2 className={styles['section-heading']}>Frequently Asked Questions</h2>
          <AccordionItem
            title='What is OverBoard Sports, and how does it work?'>
            <p>OverBoard Sports, is a fantasy sports app that aims to create more entertainment & engagement around sports.  OverBoard Sports encourages competition and promotes social connection across a variety of sports.   OverBoard Sports offers both an in-venue entertainment service & a standalone fantasy sports app. 
            Here's how it works: You use our app to join a contest. To enter, you pay a fee and create a bingo board with different sports props. Then, you can compete with others within the contest. The leaderboard displays who is in the top three and where the following rank. You can see how well you're doing on the leaderboard, and with a great board, you might win some money!"
            </p>
          </AccordionItem>
          <AccordionItem
            title='How do I start playing OverBoard Sports?'>
            <p>You start by downloading our app, creating a profile, and joining a contest!</p>
          </AccordionItem>

          {/*<AccordionItem
            title='Is Parlay Bingo legal?'>
            <p>Yes. Parlay bingo is a skill based fantasy game. You are not allowed to deposit, win or withdraw any money through our app.</p>
          </AccordionItem>
          */}
          <AccordionItem
            title='How are bingo outcomes determined in OverBoard Sports?'>
            <p>The outcomes of OverBoard Sports are determined by which props you pick on your board.  After each individual prop square hits, you earn points.  Additional points are earned through each 3 in a row props are hit.  Whoever gets the highest amount of points wins first, second, third, etc. </p>
          </AccordionItem>
          <AccordionItem
            title='Can I play OverBoard Sports for free?'>
            <p>The cost of OverBoard Sports is dependent upon the entry fee. It is possible to play OverBoard Sports for free if the contest you create doesn’t  require an entry fee. Although if there is no fee the winner receives no pot prize.</p>
          </AccordionItem>
          <AccordionItem title='Is my personal information secure on OverBoard Sports?'>
            <p>
              Yes. Your personal information is not shared with anyone and secured in our app.  
              For more information on our privacy policy visit 
              <a href="https://www.everythingparlays.com/privacy-policy" target="_blank" rel="noopener noreferrer"> our privacy policy</a>.
            </p>
          </AccordionItem>
          <AccordionItem
            title='What makes OverBoard Sports different from other fantasy sports apps?'>
            <p>OverBoard Sports stands out from other fantasy sports apps because it offers cross-sport fantasy competitions, allowing fans from various sports backgrounds to compete together. Additionally, our in-person bar events feature interactive leaderboards and live chat functionalities, enhancing the overall experience for users.</p>
          </AccordionItem>
          <AccordionItem
            title='Can I change my fantasy team lineup after the games have started?'>
            <p>After the game has started and you have submitted your board you cannot change your board. However, if you submit your board before the game begins, you can change your board. </p>
          </AccordionItem>
          <AccordionItem
            title='What happens in the case of a tie or draw in a OverBoard Sports contest?'>
            <p>The users who earn a tie will both receive the same amount of money.</p>
          </AccordionItem>
          <AccordionItem
            title='Are there different types of bingo patterns in OverBoard Sports?'>
            <p>Yes, in OverBoard Sports, there are various types of bingo patterns. These patterns are determined by achieving three consecutive props in the same row or diagonal, such as the top row, middle row, bottom row, left-to-right diagonal, right-to-left diagonal, and so on. </p>
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
