DROP TABLE IF EXISTS users;

CREATE TABLE users (
  user_id SERIAL PRIMARY KEY NOT NULL,
  username VARCHAR NOT NULL,
  password_digest VARCHAR NOT NULL,
  gender_identity VARCHAR NOT NULL,
  description VARCHAR NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT now()
);

CREATE TABLE parties (
  party_id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR NOT NULL,
  location VARCHAR NOT NULL,
  party_date VARCHAR NOT NULL,
  party_time VARCHAR NOT NULL,
  host_id INT REFERENCES users (user_id)
);
