const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send(`
        <html>
            <head>
                <title>Custom Therapy Treatment for Dementia</title>
                <style>
                    body { font-family: Arial, sans-serif; margin: 40px; }
                    h1 { color: #333; }
                    ul { list-style-type: none; padding: 0; }
                    li { margin: 10px 0; }
                </style>
            </head>
            <body>
                <h1>Custom Therapy Treatment for Dementia</h1>
                <p>Welcome to our custom therapy treatment plan for dementia. Follow our 7-step action plan to get started:</p>
                <ul>
                    <li>1. Initial Assessment</li>
                    <li>2. Personalized Therapy Plan</li>
                    <li>3. Cognitive Exercises</li>
                    <li>4. Physical Activity</li>
                    <li>5. Nutritional Guidance</li>
                    <li>6. Regular Monitoring</li>
                    <li>7. Family Support and Education</li>
                </ul>
            </body>
        </html>
    `);
});

app.listen(3000, () => {
    console.log('Server started on port 3000');
});
