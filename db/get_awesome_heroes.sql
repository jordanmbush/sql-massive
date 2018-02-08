SELECT * FROM heroes WHERE powers LIKE concat('%', $1, '%') AND age < $2;
