import axios from "axios";

export default axios.create({
  baseURL: "https://api.yelp.com/v3/businesses",
  headers: {
    Authorization:
      "Bearer T9B60jV25Ky2mx7Dhn43P4OvTxNDO55uKd-tyvbZGcbZZChkBZW426DxPn-mnDLeCFenOMBs6r__nshJFoY-e-w2lcz0RzIr4yzMHlpimnGcdFqYOxWOIY47XEMdYnYx",
  },
});
