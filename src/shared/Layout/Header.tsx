import { useNavigate } from 'react-router-dom';

function Header() {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  }
  return (
    <div className="sticky top-0 z-30 bg-white">
      <div className="bg-white shadow-sm">
        <div className="max-content">
          <div className="container">
            <div className="flex items-center justify-between py-[20px]">
              <h1 onClick={() => navigate('/viewquestions/view')}  className="text-2xl font-bold cursor-pointer">
                Test <span className='text-blue-500'>Zone</span>
              </h1>
              <p onClick={handleLogout} className="text-base font-bold cursor-pointer" >Logout</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
