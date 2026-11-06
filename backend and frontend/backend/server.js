import express from "express";


const app = express();

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Hello World");
}); 


app.get('/api/jokes', (req, res) => {
 const jokes = [
    {
      id: 1,
      title: 'A joke',
      content: 'This is a joke'
    },
    {
      id: 2,
      title: 'Another joke',
      content: 'This is another joke'
    },
    {
        id: 3,
        title: 'Yet another joke',
        content: 'This is yet another joke'
    }
 ];
   res.json(jokes);
});





app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
