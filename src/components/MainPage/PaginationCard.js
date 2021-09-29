const PaginationCard = ({
  currentPage,
  pages,
  handlePrevButton,
  handleNextButton,
  pageDecrementBtn,
  pageIncrementBtn,
}) => {
  return (
    <ul className='pageNumbers py-5 flex justify-center items-center'>
      <li>
        <button
          className='px-4 py-2 dark__mode__gray shadow'
          disabled={currentPage === pages[0] ? true : false}
          onClick={handlePrevButton}
        >
          <i className='fas fa-backward mr-2'></i>Prev
        </button>
      </li>
      {pageDecrementBtn}
      <li className='dark__mode__gray mx-2 px-4 py-2  shadow'>Pages</li>
      {pageIncrementBtn}
      <li>
        <button
          className='px-4 py-2 dark__mode__gray shadow'
          disabled={currentPage === pages[pages.length - 1] ? true : false}
          onClick={handleNextButton}
        >
          Next
          <i className='fas fa-forward ml-2'></i>
        </button>
      </li>
    </ul>
  )
}

export default PaginationCard
