import './Filter.css'
const FilterSearch = ({ value, onChange, onChange2, value2 }) => {
  return (
    <div>
      <div className='flex justify-between py-8 px-8 container'>
        <div className='search  flex'>
          <div className='searchSymbol'>
            <i className='fas fa-search dark:text-white'></i>
          </div>
          <input
            className='w-96 pl-12 outline-none rounded-sm dark__mode__gray shadow'
            value={value}
            onChange={onChange}
            type='text'
            placeholder='Search for a country'
          ></input>
        </div>
        <div className='filter dropdown'>
          {/* <label for='country-select'>Filter by Region:</label> */}

          <select
            name='country'
            className='dark__mode__gray outline-none shadow'
            id='country-select'
            value={value2}
            onChange={onChange2}
          >
            <option value=''> Filter by Region</option>
            <option value='africa'>Africa</option>
            <option value='americas'>Americas</option>
            <option value='asia'>Asia</option>
            <option value='europe'>Europe</option>
            <option value='oceania'>Oceania</option>
          </select>
        </div>
      </div>
    </div>
  )
}

export default FilterSearch
