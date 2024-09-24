# App

GymPass style app.

## FRs (Functional requirement)

- [ ] It must be possible to register;
- [ ] It must be possible to authenticate;
- [ ] It must be possible to obtain the profile of the logged in user;
- [ ] It must be possible to obtain the number of check-ins performed by the logged in user;
- [ ] It must be possible for the user to obtain their check-in history;
- [ ] It must be possible for the user to search for nearby gyms;
- [ ] It must be possible for the user to search for gyms by name;
- [ ] It must be possible for the user to do check-in to a gym;
- [ ] It must be possible to validate a user's check-in;
- [ ] It must be possible to register a gym;

## BRs (Business rule)

- [ ] The user must not be able to register with a duplicated email;
- [ ] The user will not be able to do 2 check-ins on the same day;
- [ ] The user will not be able to do check-in if they are not close (100m) to the gym;
- [ ] Check-in can only be validated up to 20 minutes after its creation;
- [ ] Check-in can only be validated by administrators;
- [ ] The gym can only be registered by administrators;

## NFRs (Non-functional requirement)

- [ ] The user's password must be encrypted;
- [ ] Application data must be persisted in a PostgreSQL database;
- [ ] All data lists must be paginated with 20 items per page;
- [ ] The user must be identified by a JWT (JSON Web Token);
