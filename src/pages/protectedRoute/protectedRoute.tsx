import { ReactNode, useEffect } from 'react';
import { useAuth } from '../../contexts/fakeAuthContext';
import { useNavigate } from 'react-router-dom';

interface IProtectedRoute {
  children: ReactNode;
}

function ProtectedRoute({ children }: IProtectedRoute) {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(
    function () {
      if (!isAuthenticated) {
        navigate('/');
      }
    },
    [isAuthenticated, navigate],
  );

  return isAuthenticated ? children : '';
}

export default ProtectedRoute;
