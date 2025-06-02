const env = process.env.NODE_ENV;
const API_URL =
  env === "development"
    ? "http://127.0.0.1:5000"
    : "https://scrabble-backend.vercel.app";

export const signUp = async (formData) => {
  try {
    const resp = await fetch(API_URL + "/sign-up", {
      method: "POST",
      body: JSON.stringify({
        name: formData.name,
        phone: formData.number,
        email: formData.email,
        address: formData.address,
        subscribeOption: formData.subscribeOption,
      }),
      headers: {
        "Content-type": "application/json",
      },
    });
    const json = await resp.json();
    return json;
  } catch {}
};
