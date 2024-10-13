from flask import Flask, render_template

app = Flask(__name__)

@app.route("/")
def landing_page():
    plan = [
        "Early diagnosis and assessment",
        "Medication management",
        "Cognitive therapy",
        "Physical exercise",
        "Nutritional support",
        "Social engagement",
        "Regular follow-ups"
    ]
    return render_template('index.html', plan=plan)

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')
