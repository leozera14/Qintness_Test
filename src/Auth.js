import React from 'react';

export const isAuthenticated = () => {
  const user = localStorage.getItem('username');

  if(!user) {
    return false
  } else {
    return true;
  }
}