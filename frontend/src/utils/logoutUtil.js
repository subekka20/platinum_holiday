import { setLogout } from '../state';

/**
 * Comprehensive logout function that clears all user data and redirects to home
 * @param {Function} dispatch - Redux dispatch function
 * @param {Function} navigate - React Router navigate function
 */
export const performLogout = async (dispatch, navigate) => {
  try {
    // 1. Clear Redux state
    dispatch(setLogout());

    // 2. Clear redux-persist store
    try {
      const { persistor } = await import('../index');
      if (persistor) {
        await persistor.purge();
      }
    } catch (error) {
      console.warn('Could not clear persistor:', error);
    }

    // 3. Clear localStorage (in case there's any cached data)
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('authData');
    localStorage.removeItem('bookingData');
    localStorage.removeItem('userPreferences');
    
    // 4. Clear sessionStorage (in case there's any temporary data)
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('authData');
    sessionStorage.removeItem('tempBookingData');
    
    // 5. Clear any other app-specific storage
    localStorage.removeItem('persist:root');
    
    // 6. Navigate to home page
    navigate('/', { replace: true });
    
    // 7. Refresh the page to ensure complete state cleanup
    setTimeout(() => {
      window.location.reload();
    }, 100);
    
  } catch (error) {
    console.error('Error during logout:', error);
    // Fallback: force redirect to home and refresh
    window.location.href = '/';
  }
};

/**
 * Logout with confirmation dialog
 * @param {Function} confirmDialog - PrimeReact confirmDialog function
 * @param {Function} dispatch - Redux dispatch function
 * @param {Function} navigate - React Router navigate function
 * @param {string} message - Custom confirmation message (optional)
 */
export const performLogoutWithConfirmation = (confirmDialog, dispatch, navigate, message = 'Are you sure you want to sign out?') => {
  confirmDialog({
    message,
    header: 'Sign Out Confirmation',
    icon: 'bi bi-box-arrow-right',
    defaultFocus: 'reject',
    acceptClassName: 'p-button-danger',
    accept: () => {
      performLogout(dispatch, navigate);
    },
  });
};