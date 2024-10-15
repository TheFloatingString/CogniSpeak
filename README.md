# Dementia Detection and Therapy Recommendation App

## Overview
This application is designed to aid in the early detection of dementia by prompting users with 10 carefully selected questions, recording their audio responses, and processing the input through an advanced machine learning model. The model then classifies the response as either "Dementia" or "Non-Dementia." Based on the classification, the app provides personalized therapy plans for the user. The goal is to offer early-stage interventions and targeted therapies to enhance cognitive health and well-being.

<div style="text-align: center;">
  <img src="https://github.com/user-attachments/assets/d903f66e-9c97-4e95-92a8-c71d2037f75f" alt="image">
</div>




## Features
- **Prompt-based assessment**: The app presents a set of 10 questions designed to evaluate cognitive abilities.
- **Audio recording**: Users' audio responses are recorded and securely processed for analysis.
- **ML classification**: Utilizing a machine learning model built with Scikit-Learn, the app classifies responses into "Dementia" or "Non-Dementia."
- **Customized therapy plans**: Based on the classification, personalized therapy plans are generated and provided to the user.
- **Secure data management**: All data is processed and protected through Cloudflare AI for secure and efficient delivery.

## Tech Stack
- **Frontend**: Built with React for a seamless and responsive user experience.
- **Backend**: Powered by FastAPI for fast, reliable server-side logic and API communication.
- **Machine Learning**: DeFang and Scikit-Learn are used for developing the ML model responsible for classification.
- **Security**: Cloudflare AI ensures secure handling and processing of all audio recordings and sensitive data.

## How It Works
1. **User Interaction**: The user is prompted with 10 questions and records their responses directly in the app.
2. **Data Processing**: The audio recordings are securely sent to the backend, where they are processed using machine learning algorithms.
3. **Classification**: The ML model classifies the input as "Dementia" or "Non-Dementia" based on predefined cognitive patterns.
4. **Therapy Recommendations**: Based on the classification, customized therapy plans are sent back to the user, targeting cognitive improvement and well-being.

## Future Enhancements
- Integration of real-time data analytics.
- Expansion of therapy plans to include more personalized options based on user feedback.
- Multilingual support for broader accessibility.

![image](https://github.com/user-attachments/assets/cd3d83a4-3e44-4d1f-abee-c5e8dad66f2c)
## Installation & Setup
To run the app locally, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/dementia-detection-app.git
