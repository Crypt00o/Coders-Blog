CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE TABLE articles(
    article_id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id uuid DEFAULT uuid_generate_v4()  NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    article_title VARCHAR(128) NOT NULL,
    article_body TEXT NOT NULL,
    createtion_date TIMESTAMPTZ NOT NULL DEFAULT now(),
    lastupdate_date TIMESTAMPTZ DEFAULT NULL
);