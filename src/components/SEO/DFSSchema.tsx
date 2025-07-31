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

const DFSSchema: React.FC<DFSSchemaProps> = ({ sport, state, pageType }) => {
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
      gamePlatform: ['iOS', 'Web'],
      provider: baseOrganization,
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
        availability: 'https://schema.org/InStock',
        description: 'Free to play daily fantasy sports bingo',
      },
    }

    // Base webpage schema - also use 'any' for flexibility
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

      // Add sport-specific FAQ schema - now '@graph' will work
      schema = {
        ...schema,
        '@graph': [
          schema,
          {
            '@type': 'FAQPage',
            mainEntity: getSportFAQs(sport),
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
                name: 'Download the App',
                text: 'Download OverBoard Sports from the App Store',
              },
              {
                '@type': 'HowToStep',
                name: 'Find a Venue',
                text: 'Locate participating venues near you',
              },
              {
                '@type': 'HowToStep',
                name: 'Join a Contest',
                text: 'Select and join a live contest',
              },
              {
                '@type': 'HowToStep',
                name: 'Complete Your Card',
                text: 'Mark off outcomes as they happen to complete your bingo card',
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
      return `Daily Fantasy Sports in ${
        state.charAt(0).toUpperCase() + state.slice(1)
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
      return `Play daily fantasy sports in ${
        state.charAt(0).toUpperCase() + state.slice(1)
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

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(getSchemaData(), null, 2)}
      </script>
    </Helmet>
  )
}

export default DFSSchema
