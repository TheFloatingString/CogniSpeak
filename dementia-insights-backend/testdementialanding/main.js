const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send(`
        <html>
            <head>
                <title>Dementia Treatment Plan</title>
                <style>
                    body { font-family: Arial, sans-serif; margin: 40px; }
                    h1 { color: #333; }
                    ol { font-size: 18px; }
                </style>
            </head>
            <body>
                <h1>7 Point Plan for Treating Dementia</h1>
                <ol>
                    <li>Regular physical exercise</li>
                    <li>Mental stimulation</li>
                    <li>Healthy diet</li>
                    <li>Quality sleep</li>
                    <li>Stress management</li>
                    <li>Social engagement</li>
                    <li>Regular medical check-ups</li>
                </ol>
            </body>
        </html>
    `);
});

app.listen(3000, () => {
    console.log('Server started on port 3000');
});
