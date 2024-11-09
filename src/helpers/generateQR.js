const generateQR = async (data) => {
  const res = await fetch(
    `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${data}`
  )
    .then((response) => response.url)
    .catch((err) => console.error(err));
  return res;
};
export default generateQR;
