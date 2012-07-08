CREATE TABLE IF NOT EXISTS `person` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `firstName` varchar(40) COLLATE utf8_bin NOT NULL,
  `lastName` varchar(40) COLLATE utf8_bin NOT NULL,
  `phone` varchar(20) CHARACTER SET latin1 COLLATE latin1_bin NOT NULL,
  `email` varchar(30) CHARACTER SET latin1 COLLATE latin1_bin NOT NULL,
  `address` varchar(255) COLLATE utf8_bin NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_bin;