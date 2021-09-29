import { useEffect, useState } from 'react'
import PaginationCard from './PaginationCard'
import Loader from './Loader'
import CountryCard from './CountryCard'

const Pagination = ({ jobs }) => {
  // const [jobs, setJobs] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(4)
  const [pageNumberLimit] = useState(4)
  const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(4)
  const [minPageNumberLimit, setMinPageNumberLimit] = useState(0)

  const pages = []
  for (let i = 1; i <= Math.ceil(jobs.length / itemsPerPage); i++) {
    pages.push(i)
  }
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = jobs.slice(indexOfFirstItem, indexOfLastItem)

  const handlePrevButton = () => {
    setCurrentPage(currentPage - 1)
    if ((currentPage - 1) % pageNumberLimit == 0) {
      setMaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit)
      setMinPageNumberLimit(minPageNumberLimit - pageNumberLimit)
    }
  }
  const handleNextButton = () => {
    setCurrentPage(currentPage + 1)
    if (currentPage + 1 > maxPageNumberLimit) {
      setMaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit)
      setMinPageNumberLimit(minPageNumberLimit + pageNumberLimit)
    }
  }
  let pageIncrementBtn = null
  if (pages.length > maxPageNumberLimit) {
    pageIncrementBtn = (
      <li
        className='dark__mode__gray mx-1 lg:mx-2 px-2 lg:px-4 py-2 text-xs lg:text-sm shadow'
        onClick={handleNextButton}
      >
        &hellip;
      </li>
    )
  }
  let pageDecrementBtn = null
  if (minPageNumberLimit >= 1) {
    pageDecrementBtn = (
      <li
        className='dark__mode__gray mx-1 lg:mx-2 px-2 lg:px-4 py-2 text-xs lg:text-sm shadow'
        onClick={handlePrevButton}
      >
        &hellip;
      </li>
    )
  }

  return (
    <div>
      <div className=''>
        <div className='flex flex-col flex-wrap items-center justify-start lg:flex-row '>
          {currentItems.map((country) => {
            return (
              <div className='' key={Math.random()}>
                <CountryCard
                  flag={country.flags.svg}
                  name={country.name.common}
                  landlocked={country.landlocked}
                  region={country.region}
                  capital={country.capital && country.capital[0]}
                  nativeName={
                    country.name.nativeName && country.name.nativeName.common
                  }
                />
              </div>
            )
          })}
        </div>
        {/* pagination page numbers*/}

        <PaginationCard
          currentPage={currentPage}
          pages={pages}
          handlePrevButton={handlePrevButton}
          handleNextButton={handleNextButton}
          pageDecrementBtn={pageDecrementBtn}
          pageIncrementBtn={pageIncrementBtn}
        />
      </div>
    </div>
  )
}

export default Pagination
