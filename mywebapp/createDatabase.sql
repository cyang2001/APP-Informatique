
CREATE DATABASE IF NOT EXISTS APP;
USE APP;


CREATE TABLE IF NOT EXISTS USER (
    ID_USER INT PRIMARY KEY,
    NAME_USER VARCHAR(255),
    EMAIL VARCHAR(255),
    PASSWORD_HASH VARCHAR(255),
    ID_ACCESS_LEVEL INT,
    TICKET INT,
    AVATAR_PATH VARCHAR(255)
);


CREATE TABLE IF NOT EXISTS ACCESS_LEVELS (
    ID_ACCESS_LEVEL INT PRIMARY KEY,
    LEVEL_NAME VARCHAR(255)
);


CREATE TABLE IF NOT EXISTS PAGES (
    ID_PAGE INT PRIMARY KEY,
    PAGE_NAME VARCHAR(255),
    PAGE_URL VARCHAR(255),
    PARENT_ID INT 
);


CREATE TABLE IF NOT EXISTS PAGE_ACCESS (
    ID_ACCESS_LEVEL INT,
    ID_PAGE INT,
    PRIMARY KEY (ID_ACCESS_LEVEL, ID_PAGE),
    FOREIGN KEY (ID_ACCESS_LEVEL) REFERENCES ACCESS_LEVELS(ID_ACCESS_LEVEL),
    FOREIGN KEY (ID_PAGE) REFERENCES PAGES(ID_PAGE)
);


CREATE TABLE IF NOT EXISTS FAQ (
    ID_FAQ INT PRIMARY KEY,
    ID_CREATOR INT,
    ANSWER VARCHAR(255),
    FOREIGN KEY (ID_CREATOR) REFERENCES USER(ID_USER)
);


CREATE TABLE IF NOT EXISTS QUESTION (
    ID_QUESTION INT PRIMARY KEY,
    CONTENT VARCHAR(255),
    ID_FAQ INT,
    FOREIGN KEY (ID_FAQ) REFERENCES FAQ(ID_FAQ)
);


CREATE TABLE IF NOT EXISTS MEETINGS (
    ID_MEETING INT AUTO_INCREMENT PRIMARY KEY,
    ID_ORGANIZER INT,
    NAME_MEETING VARCHAR(255),
    DATE_MEETING DATE,
    HOUR_MEETING TIME,
    ADDRESS VARCHAR(255),
    MEETING_DESCRIPTION VARCHAR(255),
    FOREIGN KEY (ID_ORGANIZER) REFERENCES USER(ID_USER)
);


CREATE TABLE IF NOT EXISTS USER_MEETINGS (
    ID_USER INT,
    ID_MEETING INT,
    PRIMARY KEY (ID_USER, ID_MEETING),
    FOREIGN KEY (ID_USER) REFERENCES USER(ID_USER),
    FOREIGN KEY (ID_MEETING) REFERENCES MEETINGS(ID_MEETING)
);


CREATE TABLE IF NOT EXISTS `sensor` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `date_heure` DATETIME NOT NULL,
    `niveau_db` FLOAT NOT NULL
);
INSERT INTO sensor (date_heure, niveau_db) VALUES
                                               ('2023-01-01 12:00:00', 55.2),
                                               ('2023-01-01 12:01:00', 56.7),
                                               ('2023-01-01 12:02:00', 54.3),
                                               ('2023-01-01 12:03:00', 57.8),
                                               ('2023-01-01 12:04:00', 58.6),
                                               ('2023-01-01 12:05:00', 55.2),
                                               ('2023-01-01 12:06:00', 56.7),
                                               ('2023-01-01 12:07:00', 54.3),
                                               ('2023-01-01 12:08:00', 57.8),
                                               ('2023-01-01 12:09:00', 58.6),
                                               ('2023-01-01 12:11:00', 55.2),
                                               ('2023-01-01 12:11:00', 56.7),
                                               ('2023-01-01 12:12:00', 54.3),
                                               ('2023-01-01 12:13:00', 57.8),
                                               ('2023-01-01 12:14:00', 58.6)


CREATE TABLE IF NOT EXISTS PLAY_LIST (
    ID_PLAY_LIST INT PRIMARY KEY,
    NAME_PLAY_LIST VARCHAR(255),
    PLAY_LIST_DESCRIPTION VARCHAR(255),
    ID_ORGANIZER INT,
    IMAGE_URL_PLAY_LIST VARCHAR(255),
    FOREIGN KEY (ID_ORGANIZER) REFERENCES USER(ID_USER)
);


CREATE TABLE IF NOT EXISTS MUSIC_TRACKS (
    ID_TRACK INT PRIMARY KEY,
    TITLE VARCHAR(255),
    ARTIST VARCHAR(255),
    GENRE VARCHAR(255),
    ID_ORGANIZER INT,
    MUSIC_URL VARCHAR(255),
    DURATION TIME,
    FOREIGN KEY (ID_ORGANIZER) REFERENCES USER(ID_USER)
);

CREATE TABLE IF NOT EXISTS FORUM (
    ID_FORUM INT PRIMARY KEY,
    ID_CREATOR INT,
    NAME_CATEGORY VARCHAR(255),
    FORUM_TITRE VARCHAR(255),
    FORUM_DESCRIPTION VARCHAR(255),
    FORUM_URL_FICHIR VARCHAR(255),
    CREATOR_NAME VARCHAR(255),
    FOREIGN KEY (ID_CREATOR) REFERENCES USER(ID_USER)
);

CREATE TABLE IF NOT EXISTS FORUM (
    ID_FORUM INT PRIMARY KEY,
    ID_CREATOR INT,
    NAME_CATEGORY VARCHAR(255),
    FORUM_TITRE VARCHAR(255),
    FORUM_DESCRIPTION VARCHAR(255),
    FORUM_URL_FICHIR VARCHAR(255),
    CREATOR_NAME VARCHAR(255),
    FOREIGN KEY (ID_CREATOR) REFERENCES USER(ID_USER)
);


CREATE TABLE IF NOT EXISTS PLAY_LIST_TRACKS (
    ID_PLAY_LIST INT,
    ID_TRACK INT,
    PRIMARY KEY (ID_PLAY_LIST, ID_TRACK),
    FOREIGN KEY (ID_PLAY_LIST) REFERENCES PLAY_LIST(ID_PLAY_LIST),
    FOREIGN KEY (ID_TRACK) REFERENCES MUSIC_TRACKS(ID_TRACK)
);

INSERT INTO access_levels (ID_ACCESS_LEVEL, LEVEL_NAME) VALUES
(0, 'Guest'),
(1, 'Member'),
(2, 'Orga'),
(3, 'Admin');

INSERT INTO pages (ID_PAGE, PAGE_NAME, PAGE_URL, PARENT_ID) VALUES
(940294, 'Création Événements', './evenement.html', 66414185),
(18263643, 'Playlist', './playlist.html', 66414185),
(27223172, 'Qui sommes nous', './quiSommesNous.html', 66414185),
(32512499, 'Dashboard', './dashboard.html', 66414185),
(37668352, 'Location', './location.html', 66414185),
(52635194, 'Forum', './forum.html', 66414185),
(66212886, 'CGU', './cgu.html', 66414185),
(66414185, 'homePage', './homePage.html', 0),
(71125654, 'Sensor', './sensor.html', 66414185),
(73105760, 'loginPage', './login_fr.html', 0),
(74982744, 'FAQ', './faq.html', 66414185);

INSERT INTO page_access_levels (ID_ACCESS_LEVEL, ID_PAGE) VALUES
(2, 940294),
(2, 18263643),
(0, 27223172),
(1, 32512499),
(1, 37668352),
(1, 52635194),
(0, 66212886),
(0, 66414185),
(2, 71125654),
(0, 73105760),
(0, 74982744);
