CREATE TABLE IF NOT EXISTS tours
(
  id SERIAL PRIMARY KEY,
  name VARCHAR(122) NOT NULL,
  start_location VARCHAR(255),
  start_dates timestamptz[],
  guides VARCHAR(255)[],
   images VARCHAR(255)[],
  duration INTEGER,
  max_group_size INTEGER,
  dificulty VARCHAR(122),
  av_rating REAL,
  q_rating INTEGER,
  num_reviews INTEGER,
  reg_price REAL,
  short_description VARCHAR(510),
  long_description TEXT,
  image_cover VARCHAR(255),
  CONSTRAINT fk_start_location foreign key (start_location) REFERENCES locations(id);
);

CREATE INDEX IF NOT EXISTS tour_id_idx
  ON tours(id);
