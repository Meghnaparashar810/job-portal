import { Link } from 'react-router-dom'
import HomePage from './HomePage';

function Notfound() {
  return (
    <div>
      not found page

      <div>  <Link className='btn btn-success' to="/"> HomePage</Link></div>
    </div>
  )
}

export default Notfound
