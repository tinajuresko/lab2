const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3001;

app.use(bodyParser.json());

let accessControlToggled = false;

app.get('/getAccessControl', (req, res) => {
  res.json({ accessControlToggled });
});

app.post('/setAccessControl', (req, res) => {
  const { toggleValue } = req.body;
  accessControlToggled = toggleValue;
  res.json({ success: true });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
