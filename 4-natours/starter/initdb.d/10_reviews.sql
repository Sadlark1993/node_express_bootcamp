CREATE TABLE IF NOT EXISTS reviews
(
  id VARCHAR(255) PRIMARY KEY,
  review TEXT,
  rating INTEGER NOT NULL,
  userfk VARCHAR(255) NOT NULL,
  tour VARCHAR(255) NOT NULL,
  CONSTRAINT fk_tour FOREIGN KEY (tour) REFERENCES tours(id) ON DELETE CASCADE,
  CONSTRAINT fk_userfk FOREIGN KEY (userfk) REFERENCES users(id) ON DELETE CASCADE,
);

CREATE INDEX IF NOT EXISTS reviews_id_idx
  ON reviews(id);

CREATE INDEX IF NOT EXISTS reviews_tour_idx
  ON reviews(tour);

