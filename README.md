# Doc

## Auth Module
### User
### Sessions

## Features
  - Create account
  - Verify Email
  - Login
    - Email and password
    - Passwordless
    - Facebook
    - Google
    - Apple
  - Reset password
    User ---[Request reset password]--> [
      - Check user email
      - Check if user is active
    ]
  - Update Profile
  - Change Password
  - 



 * =======================
 * ====Authentication=====
 * ========================
 * - Create Account
 * - Login
 * - Update profile
 * - Reset password
 * - Sessions
 * =======================
 * ========Users==========
 * ========================
 * - Create a familly
 * - Invite users to his family
 * - Manage familly
 * -- Delete
 * -- Update
 * ---- Roles -> per familly and device



- Not using the app at all
- Use only part of the app. Enough to be interesting but hide some features that will make the user want to confirm the email
- No app features restriction. Probably not relevant for your case, but to list all the options.
- No special badges. Something like verified user (think of AirBnb), this might or not be relevant in your case.

# What is the point of email verification

1. A verified email is a verified person behind the email. Prevents some simple bots

2. A verified email can reduce a person's frustration if the email was typed in wrong. If a user joined some music service, made a bunch of playlists and then logged out and forgot the password... it would be helpful if they could reset their password properly.

3. A verified email is higher value for marketing purposes. You know that the email is not fake and a dead end. You can analyze the users's habits and target them specifically based on their browsing habits.

4. A verified email allows you to contact a person about security breaches or other important site issues, site announcements.

5. A verified email prevents abuse. I constantly receive spam and information from sites I never signed up for because there are several people with my name who either sign up for services and mistype their email address or they're signing up for some random hook-up site that doesn't require a verification (for obvious reasons). If these sites verified emails, I would get an email asking for verification and promptly ignore it.



# GraphQL Project Structure

```
src/
├── auty/
│   ├── service.ts
│   ├── mutation.ts
│   ├── query.ts
│   └── type.ts
├── users/
│   ├── data.ts
│   ├── mutation.ts
│   ├── query.ts
│   └── type.ts
├── utils/
│   ├── database.ts
│   └── config.ts
├── index.ts
└── schema.ts
```