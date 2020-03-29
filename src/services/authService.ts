const axios = require('axios');

const tokenApi = `https://login.salesforce.com/services/oauth2/token?grant_type=password&client_id=3MVG9pe2TCoA1Pf7WgWSMOBdThR0G7GBd.LiFoZ8obnf48LmJkSaUBBqAA7NjJ_m5LIjfZTY9aqMf1AuV1HqW
&client_secret=6F9619E2B98B5B62947202BFA6CAF33778B6D7E30C73B4B64E64092D8D9062E3&username=mahmad@gmail.com&password=myLand56000sqrtfeetLtFTR8JMMHnD5dhs1rJVEIHH`;

const countryApi = `https://mohimlightningdev-dev-ed.my.salesforce.com/services/apexrest/countries`;

export const signIn = async () => {
  return axios.post(tokenApi);
};

export const getCountries = async () => {
  return axios.get(countryApi, {
    headers: {
      Authorization: `Bearer 00D0o000001BJAn!AQoAQAa59vMMm9PILnSQFaNKZxmNrYImRSBcMp7LKaDA6V1gmKOgCGz1qTkm3N0mKuKPyhsmIYZNm7PFFYHDvYYvR.K_tpZd`
    }
  });
};
