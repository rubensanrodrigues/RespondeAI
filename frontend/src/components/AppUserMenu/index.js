import { Link } from 'react-router-dom';

function AppUserMenu() {
  return (
    <ul className='user-area-menu'>
      <li><Link to="/appuser/knowledges/" >Conhecimentos&nbsp;</Link></li>
      <li><Link to="/appuser/users/" >Usuarios&nbsp;</Link></li>
      <li><Link to="/appuser/logout" >Logout&nbsp;</Link></li>
    </ul>
  );
}

  export default AppUserMenu