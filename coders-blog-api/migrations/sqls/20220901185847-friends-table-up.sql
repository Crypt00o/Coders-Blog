CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE TABLE friends(
friend1_id uuid DEFAULT uuid_generate_v4() NOT NULL,
friend2_id uuid DEFAULT uuid_generate_v4() NOT NULL CHECK(friend2_id IS DISTINCT FROM friend1_id),
friendship_status BOOLEAN NOT NULL DEFAULT FALSE,
friendship_date DATE NOT NULL DEFAULT now() ,
PRIMARY KEY(friend1_id,friend2_id),
FOREIGN KEY(friend1_id) REFERENCES users(user_id),
FOREIGN KEY(friend2_id) REFERENCES users(user_id)
);