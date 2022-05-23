Feature: User login 
As the owner of the restaurant, I want to be able to log into my account to use a platform

Scenario: Unsuccessful login because the EMAIL entered is not registered
    Given that the user is on the system login page
    Given the email "test@mail.com" is not registered
    When the user fills the "email" with "test@mail.com"
    When the user fills the "password" with "1senha1"
    When the user clicks in submit
    Then the login is not completed and an error message appears on the screen, informing us that it was not possible to find any account with the data entered


Scenario: Login failed because the password is incorrect
    Given that the user is on the system login page
    Given the email "ze@mail.com" is registered
    Given the password "1senha1" is registered
    When the user fills the "email" with "tze@mail.com" 
    When the user fills the "password" with "test"
    When the user clicks in submit
    Then the login is not completed and an error message appears on the screen, informing us that it was not possible to find any account with the data entered

Scenario: Login failed because the "email" field is not filled
    Given that the user is on the system login page
    When the user fills the "password" with "1senha1"
    When the user clicks in submit
    Then the login is not completed and an error message appears on the screen, informing us that all fields need to be filled

Scenario: Login failed because the "password" field is not filled
    Given that the user is on the system login page
    When the user fills the "email" with "ze@mail.com"
    When the user clicks in submit
    Then the login is not completed and an error message appears on the screen, informing us that all fields need to be filled

Scenario: Login failed because the EMAIL and "password" fields were not populated
    Given that the user is on the system login page
    When the user clicks in submit
    Then the login is not completed and an error message appears on the screen, informing us that all fields need to be filled

Scenario: Login successful
    Given that the user is on the system login page
    Given the email "ze@mail.com" is registered
    Given the password "ze@mail.com" is registered
    When the user fills the "email" with "ze@mail.com"
    When the user fills the "password" with "1senha1"
    When the user clicks in submit
    Then the login is completed and the user is redirected to the home page