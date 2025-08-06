import React from 'react'
import { Helmet } from 'react-helmet-async'

interface DFSSchemaProps {
  sport?: string
  state?: string
  pageType:
  | 'how-to-play'
  | 'parlay-bingo'
  | 'promo-code'
  | 'dfs-sport'
  | 'dfs-state'
}

const DFSSchema: React.FC<DFSSchemaProps> = ({
  sport,
  state,
  pageType,
}) => {
  const getSchemaData = () => {
    const baseOrganization = {
      '@type': 'Organization',
      name: 'OverBoard Sports',
      url: 'https://overboardsports.com',
      logo: 'https://overboardsports.com/OB-rebrand.png',
      sameAs: ['https://apps.apple.com/us/app/parlay-bingo/id1665470403'],
    }

    // Use 'any' to allow dynamic schema properties
    const gameSchema: any = {
      '@type': 'Game',
      name: 'OverBoard Sports Parlay Bingo',
      description:
        'Daily fantasy sports bingo game where players complete bingo cards with sports bet outcomes to compete for cash prizes at local venues',
      gameCategory: 'Daily Fantasy Sports',
      playMode: 'MultiPlayer',
      numberOfPlayers: 'Unlimited',
      gamePlatform: ['iOS'],
      provider: baseOrganization,
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
        availability: 'https://schema.org/InStock',
        description: 'Free to play daily fantasy sports bingo',
      },
    }

    let schema: any = {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: getPageTitle(),
      description: getPageDescription(),
      url: `https://overboardsports.com${getPageUrl()}`,
      mainEntity: gameSchema,
      publisher: baseOrganization,
      breadcrumb: {
        '@type': 'BreadcrumbList',
        itemListElement: getBreadcrumbs(),
      },
    }

    // Add sport-specific schema - now this will work
    if (sport) {
      gameSchema.sport = {
        '@type': 'Sport',
        name: sport.toUpperCase(),
      }

      // Add FAQ schema with sport-specific + general FAQs
      schema = {
        ...schema,
        '@graph': [
          schema,
          {
            '@type': 'FAQPage',
            mainEntity: [...getSportFAQs(sport), ...getGeneralFAQs()],
          },
        ],
      }
    } else {
      schema = {
        ...schema,
        '@graph': [
          schema,
          {
            '@type': 'FAQPage',
            mainEntity: getGeneralFAQs(),
          },
        ],
      }
    }

    if (state) {
      gameSchema.availableIn = {
        '@type': 'State',
        name: state.charAt(0).toUpperCase() + state.slice(1),
        containedInPlace: {
          '@type': 'Country',
          name: 'United States',
        },
      }
    }

    if (pageType === 'how-to-play') {
      schema = {
        ...schema,
        '@graph': [
          schema,
          {
            '@type': 'HowTo',
            name: 'How to Play OverBoard Sports Parlay Bingo',
            description: 'Learn how to play parlay bingo in 4 easy steps',
            step: [
              {
                '@type': 'HowToStep',
                name: 'Enter a Contest',
                text: 'Choose a Free-to-Play contest.',
              },
              {
                '@type': 'HowToStep',
                name: 'Your Board. How You Want.',
                text: 'Fill your board with team props, player props, alternative lines and totals across multiple sports',
              },
              {
                '@type': 'HowToStep',
                name: 'Hit Picks. Earn Points',
                text: 'Earn points for each prop that hits and get bonus points for any 3 in a row.',
              },
              {
                '@type': 'HowToStep',
                name: 'Points Leaders Win Prizes',
                text: 'Outscore the competition to win prizes and brag to your friends.',
              },
            ],
          },
        ],
      }
    }

    return schema
  }

  const getPageTitle = () => {
    if (pageType === 'how-to-play')
      return 'How to Play OverBoard Sports - Parlay Bingo Rules & Guide'
    if (pageType === 'parlay-bingo')
      return 'Parlay Bingo - Daily Fantasy Sports Game | OverBoard Sports'
    if (pageType === 'promo-code')
      return 'OverBoard Sports Promo Code - Get Started Free'
    if (sport)
      return `Daily Fantasy Sports ${sport.toUpperCase()} - OverBoard Sports`
    if (state)
      return `Daily Fantasy Sports in ${state.charAt(0).toUpperCase() + state.slice(1)
        } | OverBoard Sports`
    return 'Daily Fantasy Sports - OverBoard Sports'
  }

  const getPageDescription = () => {
    if (pageType === 'how-to-play')
      return 'Learn how to play OverBoard Sports parlay bingo in 4 easy steps. Complete your bingo card with sports bet outcomes and compete for cash prizes at local venues.'
    if (pageType === 'parlay-bingo')
      return 'Play parlay bingo at local venues with OverBoard Sports. Complete your bingo card with sports betting outcomes and win cash prizes in this innovative daily fantasy sports game.'
    if (pageType === 'promo-code')
      return 'Get started with OverBoard Sports using our promo code. Join the daily fantasy sports revolution with parlay bingo and compete for cash prizes.'
    if (sport)
      return `Play daily fantasy sports ${sport.toUpperCase()} with OverBoard Sports parlay bingo. Complete your bingo card with ${sport} betting outcomes and win cash prizes.`
    if (state)
      return `Play daily fantasy sports in ${state.charAt(0).toUpperCase() + state.slice(1)
        } with OverBoard Sports. Legal parlay bingo game available at local venues.`
    return 'Play daily fantasy sports with OverBoard Sports parlay bingo. Complete your bingo card with sports betting outcomes and win cash prizes.'
  }

  const getPageUrl = () => {
    if (pageType === 'how-to-play') return '/how-to-play-overboard-sports'
    if (pageType === 'parlay-bingo') return '/parlay-bingo'
    if (pageType === 'promo-code') return '/overboardsports-promo-code'
    if (sport) return `/daily-fantasy-sports-${sport}`
    if (state) return `/daily-fantasy-sports-${state}`
    return '/'
  }

  const getBreadcrumbs = () => {
    const breadcrumbs = [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://overboardsports.com',
      },
    ]

    if (pageType === 'how-to-play') {
      breadcrumbs.push({
        '@type': 'ListItem',
        position: 2,
        name: 'How to Play',
        item: 'https://overboardsports.com/how-to-play-overboard-sports',
      })
    } else if (sport || state) {
      breadcrumbs.push({
        '@type': 'ListItem',
        position: 2,
        name: 'Daily Fantasy Sports',
        item: `https://overboardsports.com${getPageUrl()}`,
      })
    }

    return breadcrumbs
  }

  const getSportFAQs = (sport: string) => [
    {
      '@type': 'Question',
      name: `How do I play daily fantasy sports ${sport.toUpperCase()}?`,
      acceptedAnswer: {
        '@type': 'Answer',
        text: `Play daily fantasy ${sport.toUpperCase()} by downloading OverBoard Sports, finding a participating venue, and completing your bingo card with ${sport} game outcomes.`,
      },
    },
    {
      '@type': 'Question',
      name: `Is daily fantasy sports ${sport.toUpperCase()} legal?`,
      acceptedAnswer: {
        '@type': 'Answer',
        text: `Daily fantasy sports ${sport.toUpperCase()} is legal in most states. OverBoard Sports operates in compliance with local regulations.`,
      },
    },
  ]

  const getGeneralFAQs = () => [
    {
      '@type': 'Question',
      name: 'What is OverBoard Sports, and how does it work?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'OverBoard Sports is a fantasy sports app that aims to create more entertainment & engagement around sports. OverBoard Sports encourages competition and promotes social connection across a variety of sports. OverBoard Sports offers both an in-venue entertainment service & a standalone fantasy sports app. Here\'s how it works: You use our app to join a contest. To enter, you pay a fee and create a bingo board with different sports props. Then, you can compete with others within the contest. The leaderboard displays who is in the top three and where the following rank. You can see how well you\'re doing on the leaderboard, and with a great board, you might win some money!',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I start playing OverBoard Sports?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'You start by downloading our app, creating a profile, and joining a contest!',
      },
    },
    {
      '@type': 'Question',
      name: 'How are bingo outcomes determined in OverBoard Sports?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The outcomes of OverBoard Sports are determined by which props you pick on your board. After each individual prop square hits, you earn points. Additional points are earned through each 3 in a row props are hit. Whoever gets the highest amount of points wins first, second, third, etc.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I play OverBoard Sports for free?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The cost of OverBoard Sports is dependent upon the entry fee. It is possible to play OverBoard Sports for free if the contest you create doesn\'t require an entry fee. Although if there is no fee the winner receives no pot prize.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is my personal information secure on OverBoard Sports?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Your personal information is not shared with anyone and secured in our app. For more information on our privacy policy visit our privacy policy at https://www.everythingparlays.com/privacy-policy.',
      },
    },
    {
      '@type': 'Question',
      name: 'What makes OverBoard Sports different from other fantasy sports apps?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'OverBoard Sports stands out from other fantasy sports apps because it offers cross-sport fantasy competitions, allowing fans from various sports backgrounds to compete together. Additionally, our in-person bar events feature interactive leaderboards and live chat functionalities, enhancing the overall experience for users.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I change my fantasy team lineup after the games have started?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'After the game has started and you have submitted your board you cannot change your board. However, if you submit your board before the game begins, you can change your board.',
      },
    },
    {
      '@type': 'Question',
      name: 'What happens in the case of a tie or draw in a OverBoard Sports contest?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The users who earn a tie will both receive the same amount of money.',
      },
    },
    {
      '@type': 'Question',
      name: 'Are there different types of bingo patterns in OverBoard Sports?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, in OverBoard Sports, there are various types of bingo patterns. These patterns are determined by achieving three consecutive props in the same row or diagonal, such as the top row, middle row, bottom row, left-to-right diagonal, right-to-left diagonal, and so on.',
      },
    },
  ]
  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(getSchemaData(), null, 2)}
      </script>
    </Helmet>
  )
}

export default DFSSchema;
