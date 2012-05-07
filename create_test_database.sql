DROP SCHEMA IF EXISTS `simpleblog_test`;

CREATE SCHEMA `simpleblog_test`;

USE `simpleblog_test`;

CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(45) NOT NULL,
  `password` varchar(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username_UNIQUE` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;

CREATE TABLE `blogmessage` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `message` varchar(160) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `userblogmessage` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `blogmessage_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_blogmessage_1` (`user_id`),
  KEY `fk_userblogmessage_1` (`blogmessage_id`),
  CONSTRAINT `fk_userblogmessage_1` FOREIGN KEY (`blogmessage_id`) REFERENCES `blogmessage` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_blogmessage_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

delimiter $$

CREATE PROCEDURE `sp_clean_all`()
BEGIN
DROP TABLE IF EXISTS `userblogmessage`;

DROP TABLE IF EXISTS `user`;

DROP TABLE IF EXISTS `blogmessage`;

CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(45) NOT NULL,
  `password` varchar(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username_UNIQUE` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;

CREATE TABLE `blogmessage` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `message` varchar(160) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `userblogmessage` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `blogmessage_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_blogmessage_1` (`user_id`),
  KEY `fk_userblogmessage_1` (`blogmessage_id`),
  CONSTRAINT `fk_userblogmessage_1` FOREIGN KEY (`blogmessage_id`) REFERENCES `blogmessage` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_blogmessage_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

END$$

delimiter $$

CREATE PROCEDURE `sp_store_users`()
BEGIN
INSERT INTO user (username, password)
VALUES ('user1', 'pass1');

END$$

delimiter $$

CREATE PROCEDURE `sp_setup_new`()
BEGIN
CALL sp_clean_all();
CALL sp_store_users();
END$$

DELIMITER $$

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_create_user`(myUserName VARCHAR(45), myPassword VARCHAR(45))
BEGIN

DECLARE rowCount INT; 
DECLARE result INT;
SET rowCount = (SELECT COUNT(*) FROM simpleblog_test.user WHERE username = myUserName);

IF rowCount = 1 THEN  
       SET result = -1; 
        SELECT result;
END IF; 

IF rowCount = 0 THEN  
        INSERT INTO simpleblog_test.user (username, password) VALUES (myUserName, myPassword);
SELECT id FROM simpleblog_test.user WHERE username = myUserName;
END IF;
 
END$$

DELIMITER $$

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_store_blogmessage`(textMessage VARCHAR(160), userId INT)
BEGIN

START TRANSACTION;
INSERT INTO simpleblog_test.blogmessage (message) VALUES (textMessage);
INSERT INTO simpleblog_test.userblogmessage (user_id) VALUES (userId);
SELECT max(id) from simpleblog_test.blogmessage;
COMMIT;
END

