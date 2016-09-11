DROP TABLE IF EXISTS party_users;
DROP TABLE IF EXISTS traits;
DROP TABLE IF EXISTS parties;
DROP TABLE IF EXISTS users;

CREATE TABLE users (
  user_id SERIAL PRIMARY KEY NOT NULL,
  username VARCHAR NOT NULL,
  password_digest VARCHAR NOT NULL,
  image_url VARCHAR NOT NULL,
  description VARCHAR NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT now()
);

CREATE TABLE parties (
  party_id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR NOT NULL,
  category VARCHAR NOT NULL,
  location VARCHAR NOT NULL,
  party_date VARCHAR NOT NULL,
  party_time VARCHAR NOT NULL,
  host_id INT REFERENCES users (user_id)
);

CREATE TABLE traits (
  trait_id SERIAL PRIMARY KEY NOT NULL,
  description VARCHAR NOT NULL,
  user_id INT REFERENCES users(user_id)
);

CREATE TABLE party_users (
  party_user_id SERIAL PRIMARY KEY NOT NULL,
  user_id INT REFERENCES users(user_id),
  party_id INT REFERENCES parties(party_id)
);