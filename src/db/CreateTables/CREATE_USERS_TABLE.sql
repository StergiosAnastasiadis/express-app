CREATE TYPE user_role AS ENUM ('user', 'admin');

CREATE TABLE users (
	id SERIAL PRIMARY KEY,
	user_role NOT NULL DEFAULT 'user',
	email VARCHAR(45) NOT NULL UNIQUE,
	password TEXT NOT NULL,
	firstname VARCHAR(45) NOT NULL,
	lastname VARCHAR(45) NOT NULL,
	active boolean NOT NULL DEFAULT FALSE,
	activation_token VARCHAR(40) NOT NULL,
	activated_at TIMESTAMPTZ,
	created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
)