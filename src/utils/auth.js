export function signOut(navigate) {
  localStorage.removeItem('token');
  navigate('/login');
}