import { Link, useNavigate, useParams } from "react-router-dom"
import styles from './styles.module.css'
import { useEffect, useState } from "react"
import { SponsoredContest } from "../../shared-deps/interfaces/Contest"
import { Board } from "../../shared-deps/interfaces/Board"
import getContest from "utils/getContest"
import getBoardsByContest from "utils/getBoardsByContest"
import { DeepPartial } from "types/_dev"
import { PrizeStructureItem, PrizeType, getPrizeItems, getPrizeItemsFromContest, getTotalPrizeAmount } from "../../shared-deps/interfaces/PrizeStructures"
import Star from "components/svg/Star"
import { Entity } from "../../shared-deps/interfaces/Entity"
import { BettingProp } from "../../shared-deps/interfaces/BettingProp"
import formatNumber from "utils/formatNumber"
import BarChart from "components/svg/BarChart"
import { BetEvent, TeamBetEvent } from "../../shared-deps/interfaces/BetEvent"
import Alert from "components/svg/Alert"
import Dollar from "components/svg/Dollar"
import FilledBarChart from "components/svg/FilledBarChart"
import Clock from "components/svg/Clock"
import X from "components/svg/X"
import Skeleton from "components/Skeleton/Skeleton"
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper/modules'
import 'swiper/css'
import React from "react"

export default function Leaderboard() {
  // Contest ID comes from /contest/{id}
  const { id } = useParams()
  const navigate = useNavigate()

  // TODO: Remove DeepPartial once making actual API calls
  const [contest, setContest] = useState<SponsoredContest>()
  const [boards, setBoards] = useState<Board[]>()
  const [loading, setLoading] = useState(true)
  // const [fail, setFail] = useState(false)
  const [showContestDetails, setShowContestDetails] = useState(false)

  const fetchContestInfo = async () => {
    const c = await getContest(id!)
    const b = await getBoardsByContest(id!)

    // TODO: Handle failed fetch

    // Simulate fetching time so you can see the skeletons for now :)
    setTimeout(() => {
      setContest(c as SponsoredContest)
      setBoards(b)
    }, 1)
  }

  useEffect(() => {
    if(id) {
      fetchContestInfo()
    } else {
      navigate('/404')
    }
  }, [])

  useEffect(() => {
    if(contest && boards) {
      setLoading(false)
    }
  }, [contest, boards])
  
  // Prize money = number of participants * entry fee
  // If these values don't exist, set it to 0
  let prizeMoney: number = 0
  let prizeItems: PrizeStructureItem[] = []
  let prizesByPlace: number[] = []
  let sports : string[] = []

  if(contest && boards) {
    prizeMoney = contest && 
    contest.numberParticipants && 
    contest.entryFee
      ? contest.numberParticipants * contest.entryFee * ((100-contest.pctRake)/100)
      : 0

    // After getting the prizeItems
    prizeItems = getPrizeItemsFromContest(contest)
    prizeMoney = getTotalPrizeAmount(prizeItems, contest.entryFee, contest.numberParticipants, contest.pctRake);
    prizeMoney = Math.round(prizeMoney * 10) / 10;
    // Calculate prize money for each place
    prizesByPlace = prizeItems.map(item => {
        if (item.fixed) {
            // If fixed, use the fixed amount directly for each applicable position
            return item.fixedAmount;
        } else {
            // Otherwise, calculate the prize based on the percentage
            return (prizeMoney * item.percentage) / 100.0;
        }
    });
    // Map from possible backend responses to frontend displayed values
    // This should be in the shared requirements in the future
    const sportsMap : {[key:string]: string} = {
    'NFL': '🏈 Football',
    'MLB': '⚾ Baseball',
    'NHL': '🏒 Hockey',
    'Soccer': '⚽ Soccer',
    'NBA': '🏀 Basketball',
    'MMA': '🥋 MMA',
    'CBB': '🏀 CBB',
    'CFB': '🏈 CFB'
    }
    if(contest.allowedBetEvents) {
      for(let betEvent of contest.allowedBetEvents) {
        const sport = sportsMap[(betEvent as BetEvent).sport]

        if(!sports.includes(sport)) {
          sports.push(sport)
        }
      }
    }
  }
  

  return (
    <main id={styles['main']}>
      <div id={styles['resize']}>
        <h1>Please resize your screen or use a larger device to view this page.</h1>
        <Link to='/' className='primary'>Take me back</Link>
      </div>
      <div id={styles['leaderboard']}>
        <div id={styles['header']}>
          <div id={styles['contest-info-wrapper']}>
            <div id={styles['contest-info']}>
              { loading ? (
                <>
                  <Skeleton 
                    width='70px'
                    height='70px'
                  />
                  <div>
                    <Skeleton 
                      width='100px'
                      height='1.5rem'
                      margin='0 0 0.5rem 0'
                    />
                    <Skeleton 
                      width='150px'
                      height='1rem'
                    />
                  </div>
                </>
              ) : (
                <>
                  <img
                    alt={contest!.contestName}
                    src={contest?.advertiserPhoto}
                  />
                  <div>
                    <h2>{contest!.contestName}</h2>
                    <p>{contest!.location}</p>
                  </div>
                </>
              )}
            </div>
            <Link 
              to='/contests'
              id={styles['back-to-contests']}>
              <svg 
                stroke="currentColor" 
                fill="currentColor" 
                strokeWidth="0" 
                viewBox="0 0 512 512" 
                height="20px" 
                width="20px" 
                xmlns="http://www.w3.org/2000/svg">
                <path d="M320 128L192 256l128 128z"></path>
              </svg>
              Back to contests
            </Link>
          </div>
          <div id={styles['title']}>
            <Link to='/'>
              <img
                src='/assets/images/OB-blue-purple.png'
                alt='OverBoard Sports logo'
              />
            </Link>
            <h1>Contest Leaderboard</h1>
          </div>
          <div id={styles['prize-wrapper']}>
            { loading ? (
              <>
                <Skeleton
                  width="200px"
                  height="4rem"
                  margin="0 0 auto 0"
                />
              </>
            ) : (
              <>
                <img
                  alt='Trophy'
                  src='/assets/images/leaderboard/trophy.png'
                />
                <div>
                  <h2 id={styles['prize']}>${formatNumber(prizeMoney)}</h2>
                  <span>Prize money</span>
                </div>
              </>
            )}
          </div>
        </div>
        <div id={styles['top-boards-wrapper']}>
          <div id={styles['ad']}>
            {false && (<img
              alt='Advertisement'
              src={'https://pbcdkmonorepostack-profilepicbucket1c6d8d96-1c2umo3ax2fk2.s3.us-east-2.amazonaws.com/6a818f2ad2e121cd5c90a587434cec5c'}
            />)}
          </div>
          {loading ? (
            <div id={styles['top-boards-skeletons']}>
              <Skeleton
                flex='1'
                height='100%'
                minHeight='600px'
                transform='scale(0.9)'
              />
              <Skeleton
                flex='1'
                height='100%'
                minHeight='600px'
              />
              <Skeleton
                flex='1'
                height='100%'
                minHeight='600px'
                transform='scale(0.9)'
              />
            </div>
          ) : (
            <>
              { boards!.length > 0 ? (
                <div id={styles['top-boards']}>
                  {boards!.length > 1 && (
                    <TopBoard
                      board={boards![1]}
                      position={2}
                    />
                  )}
                  <TopBoard
                    board={boards![0]}
                    position={1}
                  />
                  {boards!.length > 2 && (
                    <TopBoard
                      board={boards![2]}
                      position={3}
                    />
                  )}
                </div>
              ) : (
                <h2 id={styles['no-boards']}>No boards found!</h2>
              )}
            </>
          )}
        </div>
        {loading ? (
          <div id={styles['bottom-boards-skeleton']}>
            <Skeleton 
              height='120px'
            />
            <Skeleton 
              height='120px'
            />
            <Skeleton 
              height='120px'
            />
          </div>
        ) : (
          <>
            { boards!.length > 3 && (
              <div id={styles['in-the-hunt-wrapper']}>
                <h2 id={styles['in-the-hunt']}>Players in the hunt</h2>
                <div id={styles['bottom-boards']}>
                  <Swiper 
                    modules={[Autoplay]}
                    spaceBetween={12}
                    slidesPerView={3}
                    // Adjust autoscroll speed here
                    autoplay={{ delay: 3000 }}>
                    {boards!.slice(3).map((b, index) => {
                      return (
                        <SwiperSlide key={index}>
                          <BottomBoard
                            board={b}
                            position={index + 4}
                          />
                        </SwiperSlide>
                      )
                    })}
                  </Swiper>
                </div>
              </div>
            )}
          </>
        )}
      </div>
      { !loading && (
        <div 
          id={styles['contest-details-open-bg']}
          aria-hidden={!showContestDetails}
          onClick={() => setShowContestDetails(false)}
        />
      )} 
      <div 
        id={styles['contest-details-wrapper']} 
        aria-hidden={!showContestDetails}>
        { !loading && (
          <button 
            title='Toggle Contest Details'
            id={styles['contest-details-toggle']}
            className='focusable'
            onClick={() => setShowContestDetails(!showContestDetails)}>
            <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" height="200px" width="200px" xmlns="http://www.w3.org/2000/svg"><path d="M320 128L192 256l128 128z"></path></svg>
          </button>
        )}
        <div 
          id={styles['contest-details']}
          className='with-scrollbar'>
          <h1>Contest Details</h1>
          <ul id={styles['contest-sports']}>
            { loading ? (
              <>
                <li><Skeleton width='100px' height='2rem' /></li>
                <li><Skeleton width='100px' height='2rem' /></li>
                <li><Skeleton width='100px' height='2rem' /></li>
                <li><Skeleton width='100px' height='2rem' /></li>
              </>
            ) : (
              <>
                {sports.map((s, index) => {
                  return (
                    <li 
                      key={index}
                      className={styles['sport']}>
                      {s}
                    </li>
                  )
                })}
              </>
            )}
          </ul>
          <div id={styles['estimated-payouts-wrapper']}>
            <h2>Estimated payouts</h2>
            <div id={styles['estimated-payouts']}>
              <div id={styles['estimated-payouts-inner']}>
                { loading ? (
                  <>
                    {/* Just create a skeleton for 1-6, weird syntax */}
                    {/* @ts-ignore */}
                    {[0,0,0,0,0,0].map((_p, index) => {
                      return (
                        <span 
                          key={index}
                          className={styles['payout-item']}
                          id={styles[`payout-${index + 1}`]}
                          data-payout-index={`#${index + 1}`}>
                          <Skeleton width='60px' height='1rem' />
                        </span>
                      )
                    })}
                  </>
                ) : (
                  <>
                    {prizesByPlace.slice(0, 6).map((p, index) => {
                      return (
                        <span 
                          key={index}
                          className={styles['payout-item']}
                          id={styles[`payout-${index + 1}`]}
                          data-payout-index={`#${index + 1}`}>
                          ${p.toFixed(2)}
                        </span>
                      )
                    })}
                  </>
                )}
              </div>
              <div id={styles['estimated-payouts-alert']}>
                <Alert color="var(--heading-color)" />
                <span>Prize may increase as players join</span>
              </div>
            </div>
          </div>
          <div id={styles['contest-meta']}>
            <div className={styles['contest-meta-card']}>
              <div className={styles['contest-meta-icon']}>
                <Dollar color='var(--green1100)' />
              </div>
              <div>
                { loading ? (
                  <Skeleton width='40px' height='1.125rem' />
                ) : (
                  <h3>${contest!.entryFee}</h3>
                )}
                <span>Entry Fee</span>
              </div>
            </div>
            <div className={styles['contest-meta-card']}>
              <div className={styles['contest-meta-icon']}>
                <FilledBarChart color='var(--orange1000)' />
              </div>
              <div>
                { loading ? (
                  <Skeleton width='40px' height='1.125rem' />
                ) : (
                  <h3>{contest!.maxParticipants}</h3>
                )}
                <span>Max. Entries</span>
              </div>
            </div>
          </div>
          <div id={styles['available-games-wrapper']}>
            <h2>Available Games</h2>
            <ul 
              id={styles['available-games']}
              className='with-scrollbar'>
              { loading ? (
                <>
                  <Skeleton width='100%' height='3.5rem' marginBottom='0.5rem' />
                  <Skeleton width='100%' height='3.5rem' marginBottom='0.5rem' />
                  <Skeleton width='100%' height='3.5rem' marginBottom='0.5rem' />
                  <Skeleton width='100%' height='3.5rem' />
                </>
              ) : (
                <>
                  {
                    (contest?.allowedBetEvents as BetEvent[]).map((event: BetEvent, index: number) => {
                      return (
                        <AvailableGame 
                          event={event}
                          key={index}
                        />
                      )
                    })
                  }
                </>
              )}
            </ul>
          </div>
          <div id={styles['qr-code-wrapper']}>
            <h2>Scan this code to fill out a product survey!</h2>
            { loading ? (
              <Skeleton width='132px' height='132px' marginTop='1rem' />
            ) : (
              <div id={styles['qr-code']}>
                <img
                  alt='Contest QR Code'
                  src={contest?.qrCodeLink}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}

interface AvailableGameProps {
  event: BetEvent
}

const AvailableGame = ({ event }: AvailableGameProps) => {
  // Convert eventTime string back to Date object if necessary
  const eventTime = new Date(event.eventTime);

  // minutes until event start
  const startingTime = (eventTime.getTime() - Date.now()) / (1000 * 60);
  // @ts-ignore
  const [timeUntilEvent, setTimeUntilEvent] = useState(Math.round(startingTime))

  // Probably need to handle this differently down the line for TeamBetEvents
  // and IndividualBetEvents
  event = event as TeamBetEvent

  // Probably need a websocket or something to get continuous game information
  // Once the game starts
  useEffect(() => {
    // TODO: Update time every minute
  }, [])

  const gameOver = event.status == 'Final'
  const awayTeamWinning = event.eventDetails &&
                      event.eventDetails?.awayTeamScore > event.eventDetails?.homeTeamScore

  
  return (
    <li className={styles['available-game']}>
      <div className={styles['game-score']}>
        <div className={`
          ${styles['team-score-wrapper']} 
          ${gameOver && awayTeamWinning != undefined && !awayTeamWinning && styles['loser']}`}>
          <div>
            <img
              src={event.awayTeamLogo}
              alt={`${event.awayTeam}'s Logo`}
            />
            <h4>{event.awayTeam}</h4>
          </div>
          {event.scoreAvailable && (
            <h4 className={styles['team-score']}>
              {event.eventDetails?.awayTeamScore}
            </h4>
          )}
        </div>
        <div className={`
          ${styles['team-score-wrapper']} 
          ${gameOver && awayTeamWinning && styles['loser']}`}>
          <div>
            <img
              src={event.homeTeamLogo}
              alt={`${event.homeTeam}'s Logo`}
            />
            <h4>{event.homeTeam}</h4>
          </div>
          {event.scoreAvailable && (
            <h4 className={styles['team-score']}>
              {event.eventDetails?.homeTeamScore}
            </h4>
          )}
        </div>
      </div>
      {timeUntilEvent > 0 ? (
        <div className={`${styles['game-props']} ${styles['scheduled']}`}>
          <Clock color='var(--prop-color)' />
          <span>Props Close in {timeUntilEvent}'</span>
        </div>
      ) : (
        <div className={`${styles['game-props']} ${styles['closed']}`}>
          <X color='var(--prop-color)' />
          <span>Props Closed</span>
        </div>
      )}
    </li>
  )
}

interface BoardProps {
  board: DeepPartial<Board>,
  position: number
}

// Large top 3 boards
const TopBoard = ({ board, position }: BoardProps) => {
  if (!Prop) {
    // Return a placeholder div with an image instead of null
    return (
      <div className={styles['prop']}>
        <img src="/assets/images/leaderboard/blank-player.png" alt="Placeholder" />
      </div>
    );
  }
  return (
    <div 
      id={styles[`position-${position}`]}
      className={styles['top-board']}>
      <div className={styles['top-board-inner']}>
        <div className={styles['profile']}>
          <img
            className={styles['profile-picture']}
            alt={`${board.userInfo?.username}'s Profile Picture`}
            src={board.userInfo?.profilePictureUrl}
          />
          <img
            className={styles['profile-medal']}
            alt={`${position == 1 ? '1st' : position == 2 ? '2nd' : '3rd'} place medal`}
            src={`/assets/svg/medal-${position}.svg`}
          />
        </div>
        <h3 className={styles['top-board-username']}>{board.userInfo?.username}'s Board</h3>
        <div className={styles['top-board-points-wrapper']}>
          <div>
            {/* TODO: change these colors */}
            <div className={styles['top-board-icon']}>
            <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.2222 2.77779H19.4444V1.38889C19.4444 0.625003 18.8194 0 18.0555 0H6.94443C6.18054 0 5.55554 0.625003 5.55554 1.38889V2.77779H2.77777C1.25 2.77779 0 4.02779 0 5.55558V6.94447C0 10.4862 2.66666 13.3751 6.09721 13.8056C6.97221 15.889 8.8472 17.4584 11.1111 17.9167V22.2223H6.94443C6.18054 22.2223 5.55554 22.8473 5.55554 23.6112C5.55554 24.3751 6.18054 25.0001 6.94443 25.0001H18.0555C18.8194 25.0001 19.4444 24.3751 19.4444 23.6112C19.4444 22.8473 18.8194 22.2223 18.0555 22.2223H13.8889V17.9167C16.1527 17.4584 18.0277 15.889 18.9027 13.8056C22.3333 13.3751 24.9999 10.4862 24.9999 6.94447V5.55558C24.9999 4.02779 23.75 2.77779 22.2222 2.77779ZM2.77777 6.94447V5.55558H5.55554V10.8612C3.94444 10.2778 2.77777 8.75004 2.77777 6.94447ZM22.2222 6.94447C22.2222 8.75004 21.0555 10.2778 19.4444 10.8612V5.55558H22.2222V6.94447Z" fill={`url(${position == 1 ? '#gold-gradient' : '#silver-gradient'})`}/>
              <defs>
                { position == 1 ? (
                  <linearGradient id="gold-gradient" x1="25" y1="25.0001" x2="-5.63891" y2="24.3179" gradientUnits="userSpaceOnUse">
                    <stop stopColor='var(--gold-1)'/>
                    <stop offset="1" stopColor='var(--gold-2)'/>
                  </linearGradient>
                ) : (
                  <linearGradient id="silver-gradient" x1="25" y1="25.0001" x2="-5.63891" y2="24.3179" gradientUnits="userSpaceOnUse">
                    <stop stopColor='var(--silver-1)'/>
                    <stop offset="1" stopColor='var(--silver-2)'/>
                  </linearGradient>
                )}
              </defs>
            </svg>
              
            </div>
            <h4>{board!.currentScore !== undefined ? Math.round(board!.currentScore) : 'N/A'}</h4>
            <span>Total Points</span>
          </div>
          { position == 1 && (
            <div>
              <div className={styles['top-board-icon']}>
                {/* TODO: change this color */}
                <Star
                  color='var(--sky1000)'
                />
              </div>
              <h4>{board!.maxPossibleScore !== undefined ? Math.round(board!.maxPossibleScore) : 'N/A'}</h4>
              <span>Max. Score</span>
            </div>
          )}
          { position == 2 && (
            <div>
              <div className={styles['top-board-icon']}>
                {/* TODO: change this color */}
                <Star
                  color='var(--sky1000)'
                />
              </div>
              <h4>{board!.maxPossibleScore !== undefined ? Math.round(board!.maxPossibleScore) : 'N/A'}</h4>
              <span>Max. Score</span>
            </div>
          )}
          { position == 3 && (
            <div>
              <div className={styles['top-board-icon']}>
                {/* TODO: change this color */}
                <Star
                  color='var(--sky1000)'
                />
              </div>
              <h4>{board!.maxPossibleScore !== undefined ? Math.round(board!.maxPossibleScore) : 'N/A'}</h4>
              <span>Max. Score</span>
            </div>
          )}
        </div>
        <div className={`${styles['props']} ${styles['top']}`}>
          <Prop
            prop={board.topLeft as BettingProp}
            top3={true}
          />
          <Prop
            prop={board.topMiddle as BettingProp}
            top3={true}
          />
          <Prop
            prop={board.topRight as BettingProp}
            top3={true}
          />
          <Prop
            prop={board.middleLeft as BettingProp}
            top3={true}
          />
          <Prop
            prop={board.middleMiddle as BettingProp}
            top3={true}
          />
          <Prop
            prop={board.middleRight as BettingProp}
            top3={true}
          />
          <Prop
            prop={board.bottomLeft as BettingProp}
            top3={true}
          />
          <Prop
            prop={board.bottomMiddle as BettingProp}
            top3={true}
          />
          <Prop
            prop={board.bottomRight as BettingProp}
            top3={true}
          />
        </div>
      </div>
    </div>
  )
}

const BottomBoard = ({ board, position } : BoardProps) => {
  return (
    <div className={styles['bottom-board']}>
      <div className='split'>
        <div className={styles['bottom-board-user-info']}>
          <img
            className={styles['profile-picture']}
            alt={`${board.userInfo?.username}'s Profile Picture`}
            src={board.userInfo?.profilePictureUrl}
          />
          <div>
            <h3>{board.userInfo?.username}</h3>
            <span>{position}th place</span>
          </div>
        </div>
        <div className={`${styles['props']} ${styles['bottom']}`}>
          <Prop
            prop={board.topLeft as BettingProp}
            top3={false}
          />
          <Prop
            prop={board.topMiddle as BettingProp}
            top3={false}
          />
          <Prop
            prop={board.topRight as BettingProp}
            top3={false}
          />
          <Prop
            prop={board.middleLeft as BettingProp}
            top3={false}
          />
          <Prop
            prop={board.middleMiddle as BettingProp}
            top3={false}
          />
          <Prop
            prop={board.middleRight as BettingProp}
            top3={false}
          />
          <Prop
            prop={board.bottomLeft as BettingProp}
            top3={false}
          />
          <Prop
            prop={board.bottomMiddle as BettingProp}
            top3={false}
          />
          <Prop
            prop={board.bottomRight as BettingProp}
            top3={false}
          />
        </div>
      </div>
      <div className={`with-scrollbar ${styles['bottom-board-stats']}`}>
        <div className={styles['bottom-board-stat']}>
          <div className={`${styles['bottom-board-icon']} ${styles['trophy']}`}>
            <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.2222 2.77779H19.4444V1.38889C19.4444 0.625003 18.8194 0 18.0555 0H6.94443C6.18054 0 5.55554 0.625003 5.55554 1.38889V2.77779H2.77777C1.25 2.77779 0 4.02779 0 5.55558V6.94447C0 10.4862 2.66666 13.3751 6.09721 13.8056C6.97221 15.889 8.8472 17.4584 11.1111 17.9167V22.2223H6.94443C6.18054 22.2223 5.55554 22.8473 5.55554 23.6112C5.55554 24.3751 6.18054 25.0001 6.94443 25.0001H18.0555C18.8194 25.0001 19.4444 24.3751 19.4444 23.6112C19.4444 22.8473 18.8194 22.2223 18.0555 22.2223H13.8889V17.9167C16.1527 17.4584 18.0277 15.889 18.9027 13.8056C22.3333 13.3751 24.9999 10.4862 24.9999 6.94447V5.55558C24.9999 4.02779 23.75 2.77779 22.2222 2.77779ZM2.77777 6.94447V5.55558H5.55554V10.8612C3.94444 10.2778 2.77777 8.75004 2.77777 6.94447ZM22.2222 6.94447C22.2222 8.75004 21.0555 10.2778 19.4444 10.8612V5.55558H22.2222V6.94447Z" fill="var(--blue1000)"/>
            </svg>
          </div>
          <div className={styles['bottom-stat-details']}>
          <h4>{board!.currentScore !== undefined ? Math.round(board!.currentScore) : 'N/A'}</h4>
            <span>Current Score</span>
          </div>
        </div>
        <div className={styles['bottom-board-stat']}>
          <div className={`${styles['bottom-board-icon']} ${styles['star']}`}>
            <Star
              color='var(--sky1000)'
            />
          </div>
          <div className={styles['bottom-stat-details']}>
          <h4>{board!.maxPossibleScore !== undefined ? Math.round(board!.maxPossibleScore) : 'N/A'}</h4>
            <span>Max. Score</span>
          </div>
        </div>
        <div className={styles['bottom-board-stat']}>
          <div className={`${styles['bottom-board-icon']} ${styles['bar-chart']}`}>
            <BarChart
              color='var(--yellow1100)'
            />
          </div>
          <div className={styles['bottom-stat-details']}>
            <h4>{board.numEntries}</h4>
            <span>Entries</span>
          </div>
        </div>
      </div>
    </div>
  )
}

interface PropProps {
  prop: BettingProp
  top3: boolean // Whether this prop is from a top3 board (which are styled differently)
}

// This is fun to read
// JSX for one prop
const Prop = ({ prop, top3 }: PropProps) => {
  if (!prop) {
    // Return a placeholder div with an image instead of null
    return (
      <div className={styles['prop']}>
        <img src="/assets/images/leaderboard/blank-player.png" alt="Placeholder" />
      </div>
    );
  }
  
  // Determine the base class based on the prop status and outcome
  let className = `${styles['prop']} ${top3 ? styles['top-3'] : ''}`;

  // Use consensusOutcome to apply hit or no-hit styles
  switch (prop.consensusOutcome) {
    case "Hit":
      className += ` ${styles['hit']}`;
      break;
    case "Miss":
      className += ` ${styles['no-hit']}`;
      break;
    // Optional: handle "Void" or null cases if necessary
    default:
      // If you need specific styling for 'Void' or undetermined outcomes, add here
      break;
  }

  return (
    <div className={className}>
      <img
        alt='Prop'
        src={(prop.entityInfo as Entity).photoUri}
      />
      {top3 && (
        <div className={styles['prop-details']}>
          <h4>  
            {prop.alternateValue ? prop.alternateValue : `${prop.value}${prop.outcomeType === 'Over' ? '+' : '-'}`}
          </h4>
          {!prop.alternateValue && (
            <div className={styles['bet-type-wrapper']}>
              <span>{prop.bettingBetType}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};