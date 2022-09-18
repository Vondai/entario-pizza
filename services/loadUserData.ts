const loadUserData = () => {
  const userString = localStorage.getItem("user");
  if (userString) {
    const user = JSON.parse(userString);
    return user;
  }
  return null;
};

export default loadUserData;
