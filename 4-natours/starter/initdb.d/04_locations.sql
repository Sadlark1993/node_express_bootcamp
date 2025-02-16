CREATE TABLE IF NOT EXISTS locations
(
  id VARCHAR(255) PRIMARY KEY,
  tour INTEGER,
  description VARCHAR(255) NOT NULL,
  address VARCHAR(510),
  type VARCHAR(120) NOT NULL,
  cordinates POINT,
  day INTEGER,
  CONSTRAINT fk_tour FOREIGN KEY (tour) REFERENCES tours(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS locations_id_idx
  ON locations(id);

CREATE INDEX IF NOT EXISTS locations_tour_idx
  ON locations(tour);