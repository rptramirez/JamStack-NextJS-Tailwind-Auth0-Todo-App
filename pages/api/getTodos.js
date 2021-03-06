import { table, minifyRecords } from './utils/AirTable';
import auth0 from './utils/Auth0';

export default auth0.requireAuthentication(async (req, res) => {
  const { user } = await auth0.getSession(req);
  try {
    const records = await table
      .select({ filterByFormula: `userId = '${user.sub}'` })
      .firstPage();
    const formattedRecords = minifyRecords(records);
    res.statusCode = 200;
    res.json(formattedRecords);
  } catch (error) {
    console.error(error);
    res.statusCode = 500;
    res.json({ msg: 'Something went wrong' });
  }
});
