import express from 'express'

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Admin Backend is running !");
});

app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`);
});