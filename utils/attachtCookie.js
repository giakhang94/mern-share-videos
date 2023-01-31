const attachCookies = ({ res, token }) => {
  const expireDay = 1000 * 60 * 60 * 24; //1day
  res.cookie("token", token, {
    httpOnly: true, // only browser => very very important
    expires: new Date(Date.now() + expireDay),
    secure: process.env.NODE_ENV === "production",
    //only send the cookie if the protocol is HTTPS => secure: process.env.NOE_ENV (khi len production => true)
  });
};
export default attachCookies;
