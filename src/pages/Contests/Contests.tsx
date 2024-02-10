import { forwardRef, useEffect, useState } from 'react'
import styles from './styles.module.css'
import Location from 'components/svg/Location'
import Close from 'components/svg/Close'
import Search from 'components/svg/Search'
import ExpandArrow from 'components/svg/ExpandArrow'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import 'calendar.css'
import getDisplayDate from 'utils/getDisplayDate'
import { Contest, SponsoredContest, getContestDates } from 'shared-deps/interfaces/Contest'
import Calendar from 'components/svg/Calendar'
import LocationArrow from 'components/svg/LocationArrow'
import getAvailableContests from 'utils/getAvailableContests'
import { PrizeType, getPrizeItems, getTotalPrizeAmount } from 'shared-deps/interfaces/PrizeStructures'
import Trophy from 'components/svg/Trophy'
import FilledBarChart from 'components/svg/FilledBarChart'
import Dollar from 'components/svg/Dollar'
import { Board } from 'shared-deps/interfaces/Board'
import getBoardsByContest from 'utils/getBoardsByContest'
import Skeleton from 'components/Skeleton/Skeleton'
import { Link } from 'react-router-dom'
import ExternalLink from 'components/svg/ExternalLink'
import React from 'react'
import axios from 'axios'
import { BetEvent } from 'shared-deps/interfaces/BetEvent'

export default function Contests() {
  // TODO: Remove DeepPartial in production
  const [contests, setContests] = useState<Contest[]>([]);
  const [upcoming, setUpcoming] = useState(true)
  const [selectedLocations, setSelectedLocations] = useState<string[]>([

  ])
  const [selectedSports, setSelectedSports] = useState<string[]>([])
  const [date, setDate] = useState<Date | null>(new Date(Date.now()));
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Assuming upcoming contests are defined as starting from the current date onwards
    const today = new Date();
    const endDate = new Date(today.getFullYear(), today.getMonth() + 1, 0); // End of the current month
  
    // Fetch upcoming contests by default on initial load
    fetchContests(today, endDate, true);
  }, []);

  useEffect(() => {
    if(contests) {
      setLoading(false)
    }
  }, [contests])

  const fetchContests = async (startDate = null, endDate = null, fetchUpcoming = true) => {
    setLoading(true);
  
    try {
      const response = await axios.get('https://d7hwmlam1e.execute-api.us-east-2.amazonaws.com/dev/contest/get-shown-contests');
      const now = new Date();
  
      const filteredContests = response.data.filter(contest => {
        if (!contest.allowedBetEvents || contest.allowedBetEvents.length === 0) {
          return false; // Exclude contests without any bet events
        }
  
        // Use the getContestDates function to get the start and end dates for the events
        const { contestStart, contestEnd } = getContestDates(contest.allowedBetEvents.map(event => ({
          ...event,
          eventTime: new Date(event.eventTime) // Ensure eventTime is a Date object
        })));
  
        // Determine if the contest falls within the selected month
        const isWithinSelectedMonth = contestStart >= startDate && contestStart <= endDate;
  
        // Determine if the contest should be considered upcoming or past
        if (fetchUpcoming) {
          // For upcoming contests, check if the start date is in the future
          return isWithinSelectedMonth && contestStart > now;
        } else {
          // For past contests, check if the contest has already started
          return isWithinSelectedMonth && contestEnd < now;
        }
      });
  
      setContests(filteredContests);
    } catch (error) {
      console.error("Failed to fetch contests:", error);
      setContests([]);
    } finally {
      setLoading(false);
    }
  };

  const toggleUpcoming = () => {
    const newUpcomingState = !upcoming;
    setUpcoming(newUpcomingState);
  
    // Assuming `date` is the currently selected month/year
    if (!date) return; // Exit if no date is selected
  
    // Calculate the start and end of the selected month
    const year = date.getFullYear();
    const month = date.getMonth();
    const startOfMonth = new Date(year, month, 1);
    const endOfMonth = new Date(year, month + 1, 0); // Last day of the month
  
    // Call fetchContests with the calculated start and end dates and the new upcoming state
    fetchContests(startOfMonth, endOfMonth, newUpcomingState);
  };

  const clearSelectedLocations = () => {
    // TODO: Fetch from API

    setSelectedLocations([])
  }

  const selectLocation = (selectedLocation: string) => {
    // TODO: Fetch from API

    let temp = [...selectedLocations]
    temp.push(selectedLocation)
    setSelectedLocations(temp)
  }

  const handleDateChange = async (selectedDate: Date | null) => {
    if (!selectedDate) return;
  
    // Update the date state to reflect the selected month and year
    setDate(selectedDate);
  
    // Define the start and end of the selected month
    const startOfMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1);
    const endOfMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 0);
  
    // Call fetchContests with the calculated start and end dates and the current upcoming state
    await fetchContests(startOfMonth, endOfMonth, upcoming);
  };

  return (
    <main id='main' className='container'>
      <h1 id={styles['title']}>Active & Future Contests</h1>
      <div id={styles['filters']}>
        <fieldset 
          id={styles['upcoming-wrapper']}
          onChange={() => toggleUpcoming()}>
          <input 
            type='radio' 
            id='upcoming' 
            value='upcoming' 
            name='upcoming-past'
            defaultChecked={upcoming == true}
          />
          <label htmlFor='upcoming'>Upcoming</label>
          <input 
            type='radio' 
            id='past-contests' 
            value='past-contests' 
            name='upcoming-past'
            defaultChecked={upcoming == false}
          />
          <label htmlFor='past-contests'>Past Contests</label>
        </fieldset>
        <LocationSelector
          selectedLocations={selectedLocations}
          clearSelectedLocations={clearSelectedLocations}
          selectLocation={selectLocation}
        />
        <SportSelector
          selectedSports={selectedSports}
          setSelectedSports={setSelectedSports}
        />
        <div>
          <DatePicker
            showMonthYearPicker
            onChange={(d) => handleDateChange(d)}
            selected={date}
            dateFormat={'MM/yyyy'}
            // I think they've got their own types wrong, this works perfectly fine
            // @ts-ignore
            customInput={<DateSelector />}
            calendarClassName='calendar'
            popperPlacement='bottom-start'
          />
        </div>
      </div>
      <div id={styles['contests']}>
        {loading ? (
          <>
            <Skeleton width='100%' height='142px' />
            <Skeleton width='100%' height='142px' />
            <Skeleton width='100%' height='142px' />
          </>
        ) : (
          contests!.map((c, index) => {
            return (
              // TODO: Replace index with c.contestId
              <ContestComponent key={c.contestId} contest={c!} />
            )
          })
        )}
      </div>
    </main>
  )
}

interface ContestComponentProps {
  contest: Contest;
}

const ContestComponent: React.FC<ContestComponentProps> = ({ contest }) => {
  const [expanded, setExpanded] = useState(false);
  const [boards, setBoards] = useState<Board[]>([]);
  const [loadingBoards, setLoadingBoards] = useState(true);

  // Fetch top boards every time the user opens the leaderboard
  useEffect(() => {
    if(expanded) {
      fetchBoards()
    }
  }, [expanded])

  const fetchBoards = async () => {
    setLoadingBoards(true);
    try {
      const b = await getBoardsByContest(contest._id!);
      setBoards(b);
    } catch (error) {
      console.error('Error fetching boards:', error);
      // Handle the error state appropriately, possibly setting boards to an empty array or showing an error message
      setBoards([]);
    } finally {
      setLoadingBoards(false);
    }
  };

  contest = contest as SponsoredContest
  // TODO: Get status from contest
  // This should be defined in the shared-deps so we know what values are actually possible here
  // 'Finished' | 'Joinable' | 'Live'
  // Assuming contest.allowedBetEvents is properly populated with BetEvent objects
  const now = new Date();

  // Extract the start and end dates for the contest
  const { contestStart, contestEnd } = getContestDates(contest.allowedBetEvents as BetEvent[]);

  // Determine the status based on contestStart, contestEnd, and current time
  let status = 'Joinable'; // Default status

  if (contestStart > now) {
    status = 'Joinable'; // The contest hasn't started yet
  } else {
    // Check if the contest is currently live
    const fiveHoursAfterLastEvent = new Date(contestEnd.getTime() + 5 * 60 * 60 * 1000);
    if (now < fiveHoursAfterLastEvent) {
      status = 'Live'; // The contest is ongoing
    } else {
      status = 'Finished'; // The contest has ended
    }
  }
  
  // Identical code in Leaderboard.tsx to get prizes
  let prizeMoney = contest && 
    contest.numberParticipants && 
    contest.entryFee
      ? contest.numberParticipants * contest.entryFee
      : 0

  let prizeItems = getPrizeItems(contest.prizeStructure as PrizeType, contest.numberParticipants!)
  // Prize money for each place
  let prizesByPlace = prizeItems.map(p => (prizeMoney * p.percentage) / 100.0)
  console.log(contest.contestName, prizeItems, contest.entryFee, contest.numberParticipants, contest.pctRake);
  //let totalPrize = getTotalPrizeAmount(prizeItems, contest.entryFee, contest.numberParticipants, contest.pctRake);
  let totalPrize = contest.entryFee * contest.maxParticipants * ((100-contest.pctRake)/100);
  
  function formatDate(date) {
    return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
  }
  return (
    <div 
      className={styles['contest']}
      aria-expanded={expanded}>
      <button
        title='Toggle Leaderboard'
        className={styles['contest-meta']}
        onClick={() => setExpanded(!expanded)}>
        <div className={styles['contest-main-info']}>
          <img
            // Will eventually come from contest
            src={contest.advertiserPhoto}
            alt={contest.contestName}
          />
          <div className={styles['contest-main-inner']}>
            <div className={styles['contest-name-and-link']}>
              <h2>{contest.contestName}</h2>
              <Link 
                className='primary small'
                to={`/contest/${contest._id}`}>
                Full Leaderboard
                <ExternalLink color='white' />
              </Link>
            </div>
            <div className={styles['contest-location']}>
              <div>
                <Location color='var(--text-color)' />
                <span>{contest.location}</span>
              </div>
              <div>
                <Calendar color='var(--text-color)' />
                  <span>
                    {getContestDates(contest.allowedBetEvents as BetEvent[]).contestStart.toLocaleString('en-US', {
                      month: 'short', // "Jan"
                      day: '2-digit', // "14"
                      year: 'numeric', // "2024"
                      hour: 'numeric', // "9"
                      minute: '2-digit', // "30"
                      hour12: true // AM/PM format
                    })}
                  </span>              
                </div>
              <div>
                {/* Again, these should eventually come from the contest */}
                <LocationArrow color='var(--text-color)' />
                <span>3.2 mi</span>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className={styles['contest-info-row']}>
            <div>
              <span>Status</span>
              <span
                className={`${status == 'Finished'
                            ? styles['finished']
                            : status == 'Joinable'
                              ? styles['joinable']
                              : styles['live']}
                              ${styles['status']}`}>
                {status}
              </span>
            </div>
            <div>
              <span>Main Prize</span>
              <h3 className={styles['main-prize']}>${totalPrize}</h3>
            </div>
          </div>
          <div className={styles['contest-info-cards']}>
            <div className={styles['contest-info-card']}>
              <div className={styles['card-icon']}>
                <Trophy color='var(--blue1000)' />
              </div>
              <div>
                <h3>{contest.prizeStructure}</h3>
                <span>Prizes</span>
              </div>
            </div>
            <div className={styles['contest-info-card']}>
              <div className={styles['card-icon']}>
                <FilledBarChart color='var(--orange1000)' />
              </div>
              <div>
                <h3>{contest.maxParticipants}</h3>
                <span>Max. Entries</span>
              </div>
            </div>
            <div className={styles['contest-info-card']}>
              <div className={styles['card-icon']}>
                <Dollar color='var(--green1100)' />
              </div>
              <div>
                <h3>{contest.entryFee}</h3>
                <span>Entry Fee</span>
              </div>
            </div>
          </div>
        </div>
      </button>
      {expanded && (
      loadingBoards ? (
        <div className={styles['leaderboard-skeletons']}>
          <Skeleton width='100%' height='50px' />
          <Skeleton width='100%' height='50px' />
          <Skeleton width='100%' height='50px' />
          <Skeleton width='100%' height='50px' />
          <Skeleton width='100%' height='50px' />
          <Skeleton width='100%' height='50px' />
          <Skeleton width='100%' height='50px' />
          <Skeleton width='100%' height='50px' />
          <Skeleton width='100%' height='50px' />
          <Skeleton width='100%' height='50px' />
        </div>
      ) : (
        <div className={`with-scrollbar ${styles['leaderboard-wrapper']}`}>
          <table className={styles['leaderboard']}>
            <thead>
              <tr>
                <th>Position</th>
                <th>Player</th>
                <th>Points</th>
                <th>Max total points</th>
              </tr>
            </thead>
            <tbody>
              {boards.map((b, index) => {
                return (
                  // TODO: Replace with b._id
                  <tr key={b._id}>
                    <td><span>{index + 1}</span></td>
                    <td className={styles['board-user-td']}>
                      <div className={styles['board-user']}>
                        <img
                          src={b!.userInfo?.profilePictureUrl}
                          alt={b!.userInfo?.username}
                        />
                        <span>{b!.userInfo?.username}</span>
                      </div>
                    </td>
                    <td>{Math.round(b!.currentScore)}</td>
                    <td>{Math.round(b!.maxPossibleScore)}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  )
}

interface DateSelectorProps {
  value: string;
  onClick: () => void;
}

const DateSelector = forwardRef<HTMLButtonElement, DateSelectorProps>(({ value, onClick }, ref) => (
  <button 
    id={styles['date-selector-button']} 
    className='focusable'
    onClick={onClick} 
    ref={ref}>
    <span>{getDisplayDate(value)}</span>
    <ExpandArrow color='var(--heading-color)' />
  </button>
));

interface LocationSelectorProps {
  selectedLocations: string[]
  clearSelectedLocations: () => void
  selectLocation: (selectedLocation: string) => void
}

const LocationSelector = ({
  selectedLocations,
  clearSelectedLocations,
  selectLocation
}: LocationSelectorProps) => {
  const [locationSearchOpen, setLocationSearchOpen] = useState(false)

  const handleClearSelectedLocations = (e: React.MouseEvent) => {
    // Stop from also clicking the outer button, which opens the search menu
    e.stopPropagation()

    clearSelectedLocations()
  }

  const handleSelectLocation = (selectedLocation: string) => {
    setLocationSearchOpen(false)
    selectLocation(selectedLocation)
  }

  return (
    <div id={styles['locations']}>
      <button 
        className='focusable'
        id={styles['locations-button']}
        onClick={() => setLocationSearchOpen(!locationSearchOpen)}
        data-locations-selected={selectedLocations.length != 0}>
        <Location color='var(--heading-color)' />
        <span id={styles['selected-locations']}>
          {selectedLocations.length == 0 
                ? 'Select a location'
                : selectedLocations[0]}
        </span>
        {selectedLocations.length > 1 && (
          <span className={styles['more-indicator']}>
            +{selectedLocations.length - 1}
          </span>
        )}
        {selectedLocations.length != 0 && (
          // Use span instead of button for valid DOM nesting
          <span
            id={styles['clear-locations']}
            className='with-hover-circle'
            onClick={(e) => handleClearSelectedLocations(e)}
            title='Clear Selected Locations'>
            <Close color='var(--heading-color)' />
          </span>
        )}
      </button>
      <LocationsPopup
        open={locationSearchOpen}
        onSelect={handleSelectLocation}
      />
    </div>
  )
}

interface LocationsPopUpProps {
  open: boolean
  onSelect: (selectedLocation: string) => void
}

const LocationsPopup = ({ open, onSelect }: LocationsPopUpProps) => {
  const [search, setSearch] = useState('')
  const [searchResults, setSearchResults] = useState<string[]>([])

  const searchFor = (v: string) => {
    // TODO: Fetch results

    setSearch(v)

    // Temporarily set fake search results to see what it looks like
    if(v == '') {
      setSearchResults([])
    } else {
      setSearchResults([
        'Rochester NY',
        'Rochester UK',
        'Rochester MN, USA'
      ])
    }
  }

  const select = (v: string) => {
    setSearch('')
    setSearchResults([])

    onSelect(v)
  }

  return (
    <div id={styles['locations-popup']} className={`popup ${open ? 'open' : 'closed'}`}>
      <div id={styles['search-wrapper']} className='focusable'>
        <Search color='var(--border-color)' />
        <input 
          id={styles['search']}
          type='search' 
          value={search}
          onChange={e => searchFor(e.target.value)}
        />
      </div>
      {searchResults.length > 0 && (
        <div id={styles['locations-search-results']}>
          {searchResults.map((r, index) => {
            return (
              <button 
                key={index}
                className={styles['location-select']}
                title={`Select ${r}`}
                type='submit'
                onClick={() => select(r)}>
                {r}
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}

interface SportSelectorItemProps {
  id: string
  text: string
  selectedSports: string[]
}

const SportSelectorItem = ({
  id,
  text,
  selectedSports
}: SportSelectorItemProps) => {
  const checked = selectedSports.includes(text)

  return (
      <label
        htmlFor={id}
        className={`${styles['sport-item']}`}
        aria-selected={checked}>
          <input 
            type='checkbox'
            id={id}
            value={text}
            name='sports'
            defaultChecked={checked}
            aria-hidden={true}
          />
          <span 
            aria-checked={checked}
            className={styles['custom-checkbox']}
          />
          <span>{text}</span>
        </label>
  )
}

interface SportSelectorPopupProps {
  open: boolean
  onSelect: (s: string[]) => void
}

const SportSelectorPopup = ({
  open,
  onSelect
}: SportSelectorPopupProps) => {
  const [selected, setSelected] = useState<string[]>([])

  const handleSelectedChange = (e: React.FormEvent) => {
    const sport = (e.target as HTMLInputElement).value
    let newSelected : string[] = []

    // If the selected sports include this sport, filter it out
    if(selected.includes(sport)) {
      newSelected = selected.filter(s => s != sport)
    } else { // Otherwise, add it in
      newSelected = [...selected, sport]
    }

    setSelected(newSelected)
  }

  const handleClearSelected = () => {
    setSelected([])
  }
  
  return (
    <div 
      id={styles['sport-selector-popup']}
      className={`popup ${open ? 'open' : 'closed'}`}>
      <fieldset onChange={e => handleSelectedChange(e)}>
        <SportSelectorItem
          id='football'
          text='🏈 Football'
          selectedSports={selected}
        />
        <SportSelectorItem
          id='basketball'
          text='🏀 Basketball'
          selectedSports={selected}
        />
        <SportSelectorItem
          id='baseball'
          text='⚾ Baseball'
          selectedSports={selected}
        />
        <SportSelectorItem
          id='hockey'
          text='🏒 Hockey'
          selectedSports={selected}
        />
        <SportSelectorItem
          id='tennis'
          text='🎾 Tennis'
          selectedSports={selected}
        />
        <SportSelectorItem
          id='soccer'
          text='⚽ Soccer'
          selectedSports={selected}
        />
        <SportSelectorItem
          id='golf'
          text='⛳ Golf'
          selectedSports={selected}
        />
      </fieldset>
      <div id={styles['sport-buttons']}>
        <button
          id={styles['clear-sports']}
          className='secondary'
          onClick={() => handleClearSelected()}>
          Clear
        </button>
        <button
          id={styles['apply']}
          className='primary'
          onClick={() => onSelect(selected)}>
          Apply
        </button>
      </div>
    </div>
  )
}

interface SportSelectorProps {
  selectedSports: string[]
  setSelectedSports: React.Dispatch<React.SetStateAction<string[]>>
}

const SportSelector = ({
  selectedSports,
  setSelectedSports
}: SportSelectorProps) => {
  const [popupOpen, setPopupOpen] = useState(false)

  const handleSelect = (s: string[]) => {
    // TODO: Fetch from API

    setSelectedSports(s)
    setPopupOpen(false)
  }

  return (
    <div id={styles['sport-selector-wrapper']}>
      <button
        onClick={() => setPopupOpen(!popupOpen)}
        aria-haspopup={popupOpen}
        className='focusable'
        id={styles['sport-popup-toggle']}>
        <span>
          {selectedSports.length > 0
            ? selectedSports[0]
            : 'Select a sport...'}
        </span>
        {selectedSports.length > 1 && (
          <span className={styles['more-indicator']}>
            +{selectedSports.length - 1}
          </span>
        )}
        <ExpandArrow color='var(--heading-color)' />
      </button>
      <SportSelectorPopup
        open={popupOpen}
        onSelect={handleSelect}
      />
    </div>
  )
}