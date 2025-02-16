CREATE TABLE IF NOT EXISTS users
(
  id VARCHAR(255) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  role VARCHAR(80),
  photo varchar(255),
  password varchar(510)
);

CREATE INDEX IF NOT EXISTS users_id_idx
  ON users(id);