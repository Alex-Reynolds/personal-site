const express = require('express');
const app = express();
const port = 3000;

// Serve static files from the 'public' folder and node_modules
app.use(express.static('docs'));
app.use('/node_modules', express.static('node_modules'));

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
