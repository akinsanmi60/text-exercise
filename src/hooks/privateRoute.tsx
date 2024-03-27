import { Navigate, useLocation } from 'react-router-dom';

function PrivateRoute({children}: {children: React.ReactNode}) {
  const location = useLocation();
  const tokenFromLocalStorage = localStorage.getItem('token') as string;

  if (tokenFromLocalStorage) {
    return children
  } else if (!tokenFromLocalStorage) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }
}

export default PrivateRoute;
