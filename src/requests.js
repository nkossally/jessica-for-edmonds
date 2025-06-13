const env = process.env.NODE_ENV;
// const API_URL =
//   env === "development"
//     ? "http://127.0.0.1:5000"
//     : "https://jessica-election-backend.vercel.app";
const API_URL = "https://jessica-election-backend.vercel.app";

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

export const debug = async () => {
  try {
    const resp = await fetch(API_URL + "/debug-env", {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
    });
    const json = await resp.json();
    console.log(json)
    return json;
  } catch {}
};

