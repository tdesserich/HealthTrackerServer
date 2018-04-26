This full stack project was created using PostgreSQL, Express, React, and Node. It supports validation with JWT and bcrypt password encryption. There is also validation on user sign up, requiring an email address for the username and a password with at least six charatcers. There are four API endpoints, three of which implement full CRUD (Create, Read, Update, and Delete) functionality. The app is also mobile responsive. 

The purpose of this application is to act as a medical tracker. The first display view allows users to track medications they are currently taking, with string fields for medication name, reason for taking the medication, dosage, and frequency. The user can select the medication start date from a calendar. 

The second display view allows users to track medications they are no longer taking. The purpose of this is to record medications to which the user had had an adverse reaction or allergy. There are string fields for medication name, reason for taking the medication, adverse reaction to the medication, dosage, and frequency. The user can select the medication end date from a calendar. 

The third display allows the user to track surgeries, hospitalizations, or medical events (illness, seizure, stroke, etc). There are string fields for event name and description or notes. The user can select the event date from a calendar.

Wireframes for the project can be found here: https://drive.google.com/file/d/1FffdMoWSia1C7oXB5fVncEEUWrOS7AsA/view?usp=sharing.

See the deployed app here: https://tdesserich-healthtrackerclient.herokuapp.com/.