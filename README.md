#How to Install and Run the Site
Git clone the repository or download the zip file onto your local machine via Ubuntu.

git clone https://github.com/Jasontang98/Instaflick.git

Make sure to unzip the file if the latter method was used. Launch VSCode with your Ubuntu terminal inside of the project folder. Open up a VSCode terminal for the project folder, and make sure that all commands are operating within the shell with pipenv shell. The list of the necessary installations are in the requirements.txt file at the base of the project's directory. Use pipenv install to install all the necessary dependencies for the Python backend. Once those dependencies are installed, make sure to install the database and start the backend server via

flask db upgrade

flask seed all

flask run

Create a new terminal, and change the directory into the front end titled 'react-app'. npm install all the frontend dependencies to run the React frontend. Once that is completed, npm start will launch the app onto the designated browser.

Launched on Heroku

## Technologies Used
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![Python](https://img.shields.io/badge/Python-FFD43B?style=for-the-badge&logo=python&logoColor=blue)
![Flask](https://img.shields.io/badge/Flask-000000?style=for-the-badge&logo=flask&logoColor=white)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Redux](https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![AWS](https://img.shields.io/badge/AWS-%23FF9900.svg?style=for-the-badge&logo=amazon-aws&logoColor=white)
![Heroku](https://img.shields.io/badge/heroku-%23430098.svg?style=for-the-badge&logo=heroku&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2CA5E0?style=for-the-badge&logo=docker&logoColor=white)
![Postgresql](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
