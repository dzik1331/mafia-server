CREATE TABLE userRoles (
    id   INTEGER       PRIMARY KEY AUTOINCREMENT,
    name VARCHAR (255) UNIQUE
                       NOT NULL
);
INSERT INTO userRoles (name,id)
                      VALUES ('sprzedawca',3),
                      ('użytkownik',2),
                      ('administrator',1);

CREATE TABLE users (
    id       INTEGER       PRIMARY KEY AUTOINCREMENT,
    login    VARCHAR (255) UNIQUE ON CONFLICT ROLLBACK
                           NOT NULL,
    name     VARCHAR (255) NOT NULL,
    lastName VARCHAR (255) NOT NULL,
    role     BIGINT        REFERENCES userRoles (id)
                           NOT NULL,
    password VARCHAR (255) NOT NULL
);

CREATE TABLE sessions (
    id      INTEGER PRIMARY KEY AUTOINCREMENT,
    session TEXT    NOT NULL,
    userId  INTEGER REFERENCES users (id) ON DELETE CASCADE
                    NOT NULL,
    active  BOOLEAN NOT NULL
                    DEFAULT (true)
);

CREATE TABLE products (
    id          INTEGER       PRIMARY KEY AUTOINCREMENT,
    name        VARCHAR (255) NOT NULL,
    price       REAL          NOT NULL,
    tags        TEXT,
    img         TEXT          NOT NULL,
    description TEXT,
    producer    VARCHAR (255),
    userId      BIGINT        REFERENCES users (id) ON DELETE CASCADE
                              NOT NULL
);
