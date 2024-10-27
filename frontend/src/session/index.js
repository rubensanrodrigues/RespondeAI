
// Session manager
function sessionSet(key, value) {
  localStorage.setItem(key, value);
}

function sessionGet(key) {
  return localStorage.getItem(key)
}

// User login
function sessionLoginUser(username, token) {

  // Expire time 1h59
  const expiretime = getNowInMinutes() + 119;
  sessionSet('expiretime', expiretime);

  // Username
  sessionSet('username', username);

  // token
  sessionSet('token', token);
}

function sessionLogoutUser() {
  sessionSet('expiretime', 0);
  sessionSet('username', '');
  sessionSet('token', '');
}

function sessionIsLoged() {
  const expiretime = sessionGet('expiretime');
  const nowtime = getNowInMinutes();

  return ((!isNaN(expiretime)) && (expiretime > nowtime));
}

function sessionGetUsername() {
  return sessionGet('username');
}

function sessionGetToken() {
  return sessionGet('token');
}

// Helper
function getNowInMinutes() {
  return Math.floor((Date.now() / 1000) / 60);
}

export {
  sessionLoginUser,
  sessionLogoutUser,
  sessionIsLoged,
  sessionGetUsername,
  sessionGetToken
}