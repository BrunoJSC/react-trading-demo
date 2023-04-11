import axios from "axios";

const TOKEN = "cgqdospr01qmkidml3kgcgqdospr01qmkidml3l0";

export default axios.create({
  baseURL: "https://finnhub.io/api/v1",
  params: {
    token: TOKEN,
  },
});
