const express = require('express');

const app = express();

// eslint-disable-next-line no-unused-vars
const connection = require('./db/conn')

const Anime = require('./db/model/anime');

const port = process.env.PORT || 8000;

// middleware
app.use(express.json());

// To create a new anime info
app.post('/animeHunt', async (req, res) => {
  try {
    const user = new Anime(req.body);
    await user.save();
    res.send('Congo your Anime is been updated to the site.');
  } catch (e) { res.send(e); }
});

// To get al the anime listed on the database
app.get('/animeHunt', async (req, res) => {
  try {
    const result = await Anime.find();
    res.send(result);
  } catch (e) { res.status(500).send(e); }
});

// To find a single anime
app.get('/animeHunt/:anime', async (req, res) => {
  try {
    const name = req.params.anime;
    const result = await Anime.findOne({ name });
    if (!result) {
      res.send('Sorry no such anime is listed yet');
    } else { res.send(result); }
  } catch (e) { res.status(500).send(e); }
});

// To update a single anime
app.patch('/animeHunt/:anime', async (req, res) => {
  try {
    const name = req.params.anime;
    const result = await Anime.findOneAndUpdate({ name }, req.body, { new: true });
    if (!result) {
      res.status(404).send('Sorry no such anime is listed yet');
    } else { res.send('Your anime datails has been updated'); }
  } catch (e) { res.status(500).send(e); }
});

// To delete a single anime
app.delete('/animeHunt/:anime', async (req, res) => {
  try {
    const name = req.params.anime;
    const result = await Anime.findOneAndDelete({ name });
    if (!result) {
      res.status(404).send('Sorry no such anime is listed yet');
    } else { res.send('Your anime datails has been deleted'); }
  } catch (e) { res.status(500).send(e); }
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log('Server is running at', port);
});
