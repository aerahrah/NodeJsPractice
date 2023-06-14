export const setCookie = (name, value, days) => {
  const expirationDate = new Date();
  expirationDate.setTime(expirationDate.getTime() + days * 24 * 60 * 60 * 1000);
  const expires = `expires=${expirationDate.toUTCString()}`;
  document.cookie = `${name}=${encodeURIComponent(value)}; ${expires}; path=/`;
};

export const getCookie = (name) => {
  const cookieString = document.cookie;
  const cookies = cookieString.split("; ");
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].split("=");
    const cookieName = decodeURIComponent(cookie[0]);
    if (cookieName === name) {
      const cookieValue = decodeURIComponent(cookie[1]);
      return cookieValue;
    }
  }
  return "";
};

export const deleteCookie = (name) => {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
};