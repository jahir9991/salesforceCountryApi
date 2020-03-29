import * as express from 'express';
import { signIn, getCountries } from '../services/authService';
const Routes = express.Router();

export const homeRoutes = Routes;

Routes.use('/home', async (req, res) => {
  try {
    console.log('....call from ...home');

    const accessTokenResponse = await signIn();
    const access_token = accessTokenResponse.data.access_token;

    const countriesrespose = await getCountries();
    const countries = countriesrespose.data;

    res.render('home', { layout: false, countries: countries });
  } catch (error) {
    console.log(error);
  }
});
