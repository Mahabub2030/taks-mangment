import React, { useContext, useEffect } from 'react';
import { Authcontext } from '../shared Component/Authprovider/Authprovider';
import { useNavigate } from 'react-router-dom';

const PrivateRouter = ({children}) => {
  const { user, looding } = useContext(Authcontext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user && !looding) {
      navigate('/login');
    }
  }, [user, looding, navigate]);

  if (looding) {
    return <span className="loading border loading-bars loading-lg text-blue-500 flex justify-center items-center"></span>;
  }

  if (!user) {
    return null; // Prevent rendering children if user is not authenticated
  }

  return children; // Render the children if the user is authenticated
};

export default PrivateRouter;
