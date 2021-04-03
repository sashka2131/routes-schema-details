// CONSTANTS FOR SELECT
const PAGES = ['Session', 'Company', 'Employee', 'Products', 'Projects']

const listItemStyle = {
  padding: '2px',
  margin: '2px 0px',
  border: '1px solid lightblue',
  borderRadius: '5px'
}
const Dropdown = (props) => {
  const { filterInputData, onListItemClick, visibility } = props

  const listStyle = {
    display: 'flex',
    flexDirection: 'column',
    listStyleType: 'none',
    padding: '0px',
    marginTop: '4px',
    width: '500px',
    height: '200px',
    visibility: visibility ? 'visible' : 'hidden',
    overflow: 'auto'
  }

  return (
    <ul style={listStyle}>
      {PAGES.filter((page) =>
        page.toLowerCase().includes(filterInputData.toLowerCase())
      ).map((page, index) => (
        <li key={index} onClick={onListItemClick} style={listItemStyle}>
          {page}
        </li>
      ))}
    </ul>
  )
}

export default Dropdown
