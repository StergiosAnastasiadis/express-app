CREATE TABLE users (
	id SERIAL PRIMARY KEY,
	email VARCHAR(45) NOT NULL UNIQUE,
	password TEXT NOT NULL,
	firstname VARCHAR(45) NOT NULL,
	lastname VARCHAR(45) NOT NULL,
	active boolean NOT NULL,
	activation_token VARCHAR(40) NOT NULL 
)