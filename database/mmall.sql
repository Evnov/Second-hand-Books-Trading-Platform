/*
 Source Server Type    : MySQL
 Source Host           : 127.0.0.1
 Source Database       : mmall

 Target Server Type    : MySQL
 Target Server Version : 50173
 File Encoding         : utf-8

 Date: 11/02/2020 22:04:18 PM
*/

SET NAMES utf8;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
--  Table structure for `mmall_cart`
-- ----------------------------
DROP TABLE IF EXISTS `mmall_cart`;
CREATE TABLE `mmall_cart` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `product_id` int(11) DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL,
  `checked` int(11) DEFAULT NULL COMMENT '1=checked,0=unchecked',
  `create_time` datetime DEFAULT NULL,
  `update_time` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id_index` (`user_id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=146 DEFAULT CHARSET=utf8;

-- ----------------------------
--  Records of `mmall_cart`
-- ----------------------------
BEGIN;
INSERT INTO `mmall_cart` VALUES ('126', '21', '26', '1', '1', '2020-10-10 21:27:06', '2020-10-11 21:27:06');
COMMIT;

-- ----------------------------
--  Table structure for `mmall_category`
-- ----------------------------
DROP TABLE IF EXISTS `mmall_category`;
CREATE TABLE `mmall_category` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'category Id',
  `parent_id` int(11) DEFAULT NULL COMMENT 'p_id=0 root',
  `name` varchar(50) DEFAULT NULL COMMENT 'category name',
  `status` tinyint(1) DEFAULT '1' COMMENT '1-nomal, 2-drop',
  `sort_order` int(4) DEFAULT NULL,
  `create_time` datetime DEFAULT NULL,
  `update_time` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=100032 DEFAULT CHARSET=utf8;

-- ----------------------------
--  Records of `mmall_category`
-- ----------------------------
BEGIN;
INSERT INTO `mmall_category` VALUES 
('100001', '0', 'departments', '1', null, '2020-03-25 16:46:00', '2020-03-25 16:46:00'), 
('100002', '0', 'souvenir', '1', null, '2020-03-25 16:46:21', '2020-03-25 16:46:21'), 
('100003', '0', 'others', '1', null, '2020-03-25 16:49:53', '2020-03-25 16:49:53'), 
('100004', '100001', 'Arts', '1', null, '2020-03-25 16:50:19', '2020-03-25 16:50:19'), 
('100005', '100001', 'Athletics', '1', null, '2020-03-25 16:50:29', '2020-03-25 16:50:29'), 
('100006', '100001', 'Biological Science', '1', null, '2020-03-25 16:52:15', '2020-03-25 16:52:15'), 
('100007', '100001', 'Business', '1', null, '2020-03-25 16:52:26', '2020-03-25 16:52:26'), 
('100008', '100001', 'Continuing Education', '1', null, '2020-03-25 16:52:39', '2020-03-25 16:52:39'), 
('100009', '100001', 'Education', '1', null, '2020-03-25 16:52:45', '2020-03-25 16:52:45'), 
('100010', '100001', 'Engineering', '1', null, '2020-03-25 16:52:54', '2020-03-25 16:52:54'), 
('100011', '100001', 'Health', '1', null, '2020-03-25 16:57:05', '2020-03-25 16:57:05'),
('100012', '100001', 'Human Resources', '1', null, '2020-03-26 16:46:21', '2020-03-26 16:46:21'),
('100013', '100001', 'Humanities', '1', null, '2020-03-26 16:49:53', '2020-03-26 16:49:53'),
('100014', '100001', 'ICS', '1', null, '2020-03-26 16:50:19', '2020-03-26 16:50:19'),
('100015', '100001', 'Law', '1', null, '2020-03-26 16:50:29', '2020-03-26 16:50:29'),
('100016', '100001', 'Medicine', '1', null, '2020-03-26 16:52:15', '2020-03-26 16:52:15'),
('100017', '100001', 'Nursing Science', '1', null, '2020-03-26 16:52:26', '2020-03-26 16:52:26'),
('100018', '100001', 'Social Sciences', '1', null, '2020-03-26 16:57:05', '2020-03-26 16:57:05');
COMMIT;

-- ----------------------------
--  Table structure for `mmall_product`
-- ----------------------------
DROP TABLE IF EXISTS `mmall_product`;
CREATE TABLE `mmall_product` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `category_id` int(11) NOT NULL,
  `title` varchar(100) NOT NULL,
  `subtitle` varchar(100) NOT NULL COMMENT 'author',
  `book_image` varchar(500) DEFAULT NULL,
  `descr` text,
  `price` decimal(20,2) NOT NULL,
  `stock` int(11) NOT NULL,
  `status` int(6) DEFAULT '1' COMMENT '0-rent 1-on sale 2-not available',
  `create_time` datetime DEFAULT NULL,
  `update_time` datetime DEFAULT NULL,
  `book_condition` varchar(20) NOT NULL,
  PRIMARY KEY (`id`),
  FULLTEXT (`title`, `subtitle`, `descr`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8;


-- ----------------------------
--  Create full-text search index for `mmall_product`
-- ----------------------------
ALTER TABLE `mmall_product` ADD FULLTEXT(`title`);
ALTER TABLE `mmall_product` ADD FULLTEXT(`subtitle`);
ALTER TABLE `mmall_product` ADD FULLTEXT(`descr`);


-- ----------------------------
--  Records of `mmall_product`
-- ----------------------------
BEGIN;
INSERT INTO `mmall_product` VALUES
('21', '100004', 'THE FAST 800 RECIPE BOOK: AUSTRALIAN AND NEW ZEALAND EDITION', 'Dr Clare Bailey', 'the 800 fast recipe book.jpg', 'The companion to the No.1 bestseller The Fast 800. 150 delicious new recipes to help you combine rapid weight loss and intermittent fasting for long term good health. Foreword by Dr Michael Mosley.\r\n\r\nThis companion cookbook to the international bestseller The Fast 800 by Dr Michael Mosley is filled with delicious, easy, low carb recipes and essential weekly meal planners, all carefully formulated by Dr Clare Bailey and Justine Pattison to help you lose weight, improve mood and reduce blood pressure, inflammation and blood sugars. Studies show that 800 calories is the magic number when it comes to successful dieting. Its high enough to be manageable, but low enough to speed weight loss and trigger a range of positive metabolic changes. In The Fast 800, Dr Michael Mosley brought together all the latest science, including Time Restricted Eating, to create an easy-to-follow programme, and this collection of all-new recipes, all photographed in full colour, will help you achieve all your goals. Every recipe is also calorie coded and noted with nutrition metrics to help you on your path to long term health.\r\n\r\nThis diet changed my life Denise Bach, aged 51', '23.99', 1, 1, '2020-04-13 19:07:47', '2020-04-13 21:45:41', 'As New'),
('22', '100005', 'THE FAST DIET RECIPE BOOK (THE OFFICIAL 5:2 DIET)', 'Mimi Spencer, Sarah Schenker', 'the fast diet recipe book.jpg', 'Following the #1 bestselling The Fast Diet, this fabulous cookbook offers 150 carefully crafted, nutritious, low-calorie recipes to enable you to incorporate the 5:2 weight-loss system into your daily life.\r\n\r\nAs revealed by Dr Michael Mosley in The Fast Diet, scientific trials have revealed that if you eat normally for five days a week but reduce your calorie intake for only two days, you will not only lose weight but potentially lower your risk of cancer, diabetes and other age-related diseases.\r\n\r\nThe recipes here range from simple breakfasts to leisurely suppers and warming winter stews, all expertly balanced and calorie-counted by leading nutritionist Dr Sarah Schenker. Theres also a month of meal plans for men and women and Mimi Spencer, co-writer of The Fast Diet, offers a groundbreaking guide to following this diet in a safe, effective and sustainable way - you will never have to worry about planning your fast days again. There are plenty of encouraging tips - including kitchen cupboard essentials and a whole section of speedy meals that can be quickly made for those busier days.\r\n\r\nThis book offers a wonderful companion guide to the groundbreaking Fast Diet, with recipes so delicious youll find yourself looking forward to your Fast Days. Youll lose weight, and enjoy doing it.', '24.99', 1, 1, '2020-04-14 19:07:47', '2020-04-14 21:45:41', 'As New'),
('23', '100006', 'THE GOOD THIEVES', 'Katherine Rundell', 'the good theives.jpg', 'An amazing adventure story, told with sparkling style and sleight of hand JACQUELINE WILSON\r\n\r\nVita set her jaw, and nodded at New York City in greeting, as a boxer greets an opponent before a fight.\r\n\r\nFresh off the boat from England, Vita Marlowe has a job to do. Her beloved grandfather Jack has been cheated out of his home and possessions by a notorious conman with Mafia connections. Seeing Jack spirit is broken, Vita is desperate to make him happy again, so she devises a plan to outwit his enemies and recover his home.\r\nShe finds a young pickpocket, working the streets of the city. And, nearby, two boys with highly unusual skills and secrets of their own are about to be pulled into her lawless, death-defying plan.\r\n\r\nKatherine Rundells fifth novel is a heist as never seen before - the story of a group of children who will do anything to right a wrong.', '11.99', 1, 1, '2020-04-15 19:07:47', '2020-04-15 21:45:41', 'Fine'),
('24', '100007', 'FIVE FEET APART', 'Rachael Lippincott, Mikki Daughtry, Tobias Iaconis', 'five feet apart.jpg', 'In this moving story thats perfect for fans of John Greens The Fault in Our Stars, two teens fall in love with just one minor complication-they cant get within a few feet of each other without risking their lives. Can you love someone you can never touch? Stella Grant likes to be in control-even though her totally out of control lungs have sent her in and out of the hospital most of her life. At this point, what Stella needs to control most is keeping herself away from anyone or anything that might pass along an infection and jeopardize the possibility of a lung transplant. Six feet apart. No exceptions. The only thing Will Newman wants to be in control of is getting out of this hospital. He couldnt care less about his treatments, or a fancy new clinical drug trial. Soon, hell turn eighteen and then hell be able to unplug all these machines and actually go see the world, not just its hospitals. Wills exactly what Stella needs to stay away from. If he so much as breathes on Stella she could lose her spot on the transplant list. Either one of them could die. The only way to stay alive is to stay apart. But suddenly six feet doesnt feel like safety. It feels like punishment. What if they could steal back just a little bit of the space their broken lungs have stolen from them? Would five feet apart really be so dangerous if it stops their hearts from breaking too?', '16.99', 1, 1, '2020-04-16 19:07:47', '2020-04-16 21:45:41', 'Good'),
('25', '100008', 'KINGDOM OF ASH (BOOK 6, THRONE OF GLASS)', 'Sarah J. Maas', 'kingdom if ash.jpg', 'Aelin Galathynius s journey from slave to assassin to queen reaches its heart-rending finale as war erupts across her world -\r\nShe has risked everything to save her people but at a tremendous cost. Locked in an iron coffin by the Queen of the Fae, Aelin must draw upon her fiery will to endure the months of torture inflicted upon her. The knowledge that yielding to Maeve will doom those she loves keeps her from breaking, but her resolve is unravelling with each passing day -\r\nWith Aelin imprisoned, Aedion and Lysandra are the last line of defence keeping Terrasen from utter destruction. But even the many allies they ve gathered to battle Erawan s hordes might not be enough to save the kingdom. Scattered throughout the continent and racing against time, Chaol, Manon, and Dorian must forge their own paths to meet their destinies. And across the sea Rowan hunts to find his captured wife and queen before she is lost to him.\r\nSome bonds will deepen and others be severed forever, but as the threads of fate weave together at last, all must fight if they are to find salvation and a better world.\r\nYears in the making,Kingdom of Ashis the unforgettable conclusion to Sarah J. Maas s #1New York Timesbestselling Throne of Glass series.', '19.99', 1, 1, '2020-04-17 19:07:47', '2020-04-17 21:45:41', 'Poor'),
('26', '100009', 'CITY OF ASHES (THE MORTAL INSTRUMENTS BOOK 2)', 'Cassandra Clare', 'city of ashes.jpg', 'Discover more secrets about the Shadowhunters as they fight to protect the world from demons in the second book in the internationally bestselling Mortal Instruments series.Love and power are the deadliest temptationsâ€¦ Haunted by her past, Clary is dragged deeper into New York Citys terrifying underworld of demons and Shadowhunters â€“ but can she control her feelings for a boy who can never be hers? Read all the sensational books in The Shadowhunter Chronicles: The Mortal Instruments, The Infernal Devices, Tales From the Shadowhunter Academy, The Bane Chronicles and The Shadowhunters Codex.', '19.99', 1, 1, '2020-04-18 19:07:47', '2020-04-18 21:45:41', 'Binding Copy'),
('27', '100010', 'ATLAS OF MONSTERS AND GHOSTS', 'Lonely Planet', 'monsters and ghosts.jpg', 'If you believe that all you need to fight an evil bloodthirsty fiend is garlic or holy water, think again. What you need is to keep a cool head and reach for your copy of Atlas of Monsters and Ghosts!\r\n\r\nHave you heard of the headless man roaming Edinburgh Castle? Or the mysterious girl who asks for a ride to the cemetery and then disappears into the night? What about orcs, trolls, gremlins, krakens, bunyips and the Yara-Ma-Yha-Who?\r\n\r\nJoin famous monster hunter Van Helsing on a trip around the globe to find haunted castles, restless spirits, terrifying dragons, wicked witches, and more. Learn the defining characteristics of each beast, where it can be found and â€“ most importantly â€“ how to defeat it.\r\n\r\nOrganised by continent for easy monster-tracking, Lonely Planet Kids Atlas of Monsters and Ghosts gives you the lowdown on the worlds most famous ghosts and mythological creatures, each brought to life by Laura Brenllas beautiful illustrations.\r\n\r\nAbout Lonely Planet Kids: Lonely Planet Kids â€“ an imprint of the worlds leading travel authority Lonely Planet â€“ published its first book in 2011. Over the past 45 years, Lonely Planet has grown a dedicated global community of travellers, many of whom are now sharing a passion for exploration with their children. Lonely Planet Kids educates and encourages young readers at home and in school to learn about the world with engaging books on culture, sociology, geography, nature, history, space and more. We want to inspire the next generation of global citizens and help kids and their parents to approach life in a way that makes every day an adventure. Come explore!', '26.99', 1, 1,'2020-04-19 19:07:47', '2020-04-19 21:45:41', 'Reading Copy'),
('28', '100011', 'BECOMING', 'Michelle Obama', 'becoming.jpg', 'This memoir will chronicle the former First Ladys life from a childhood on the South Side of Chicago to her years as an executive balancing the demands of motherhood and work, as well as her time in the White House.\r\n\r\nIn a statement, she said: Writing Becoming has been a deeply personal experience. It has allowed me, for the very first time, the space to honestly reflect on the unexpected trajectory of my life.\r\n\r\nâ€œIn this book, I talk about my roots and how a little girl from the South Side of Chicago found her voice and developed the strength to use it to empower others. I hope my journey inspires readers to find the courage to become whoever they aspire to be. I cant wait to share my story.', '49.99', 1, 1, '2020-04-20 19:07:47', '2020-04-20 21:45:41', 'Fine'),
('29', '100012', 'GOOD NIGHT STORIES FOR REBEL GIRLS 2', 'Elena Favilli & Francesca Cavallo, Elena Favilli', 'goodnight stories for rebel girls.jpg', '100 new bedtime stories, each inspired by the life and adventures of extraordinary women from Nefertiti to Beyonce. The unique narrative style of \"Good Night Stories for Rebel Girls\" transforms each biography in a fairy-tale, filling the readers with wonder and with a burning curiosity to know more about each hero.', '49.99', 1, 1, '2020-04-21 19:07:47', '2020-04-21 21:45:41', 'Good'),
('30', '100013', 'The Name of the Wind (The Kingkiller Chronicle Book 1)', 'Patrick Rothfuss', 'the name of the wind.jpg', 'The Name of the Wind is fantasy at its very best, and an astounding must-read title.\r\n\r\nI have stolen princesses back from sleeping barrow kings. I burned down the town of Trebon. I have spent the night with Felurian and left with both my sanity and my life. I was expelled from the University at a younger age than most people are allowed in. I tread paths by moonlight that others fear to speak of during day. I have talked to Gods, loved women, and written songs that make the minstrels weep.\r\n\r\nMy name is Kvothe.\r\n\r\nYou may have heard of me\r\n\r\nSo begins the tale of Kvothe - currently known as Kote, the unassuming innkeepter - from his childhood in a troupe of traveling players, through his years spent as a near-feral orphan in a crime-riddled city, to his daringly brazen yet successful bid to enter a difficult and dangerous school of magic. In these pages you will come to know Kvothe the notorious magician, the accomplished thief, the masterful musician, the dragon-slayer, the legend-hunter, the lover, the thief and the infamous assassin.\r\n\r\nThe Name of the Wind is fantasy at its very best, and an astounding must-read title.', '19.99', 1, 1, '2020-04-22 19:07:47', '2020-04-22 21:45:41', 'Poor');
COMMIT;


-- ----------------------------
--  Table structure for `mmall_user`
-- ----------------------------
DROP TABLE IF EXISTS `mmall_user`;
CREATE TABLE `mmall_user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL,
  `email` varchar(50) DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `question` varchar(100) DEFAULT NULL,
  `answer` varchar(100) DEFAULT NULL,
  `role` int(4) NOT NULL COMMENT '1-customers',
  `create_time` datetime NOT NULL,
  `update_time` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_name_unique` (`username`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8;


-- ----------------------------
--  Records of `mmall_user`
-- ----------------------------
BEGIN;
INSERT INTO `mmall_user` VALUES 
('1', 'customers1', '1234', 'customers1@uci.edu', '9491231111', 'question1', 'answer1', '1', '2020-1-06 16:56:45', '2020-04-04 19:27:36'), 
('13', 'gee', 'gee123', 'gee@uci.edu', '9491232222', 'question2', 'answer2', '1','2020-1-19 22:19:25', '2020-1-19 22:19:25'), 
('17', 'rosen', 'rosen123', 'rosen1@uci.edu', '19491233333', 'question3', 'answer3', '1', '2020-03-17 10:51:33', '2020-04-09 23:13:26'), 
('21', 'sown', 'sown123', 'test06@uci.edu', '19491234444', 'question4', 'answer4', '1', '2020-04-13 21:26:22', '2020-04-13 21:26:22');
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;


-- ----------------------------
--  Table structure for `mmall_watchlist`
-- ----------------------------
DROP TABLE IF EXISTS `mmall_watchlist`;
CREATE TABLE `mmall_watchlist` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `book_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8;


-- ----------------------------
--  Records of `mmall_watchlist`
-- ----------------------------
BEGIN;
INSERT INTO `mmall_watchlist` VALUES 
('1', '1', '21'), 
('2', '1', '22'), 
('3', '13', '23'), 
('4', '13', '24'), 
('5', '17', '26'), 
('6', '21', '29');
COMMIT;


-- ----------------------------
--  Table structure for `mmall_booklist`
-- ----------------------------
DROP TABLE IF EXISTS `mmall_booklist`;
CREATE TABLE `mmall_booklist` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `book_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8;

-- ----------------------------
--  Records of `mmall_booklist`
-- ----------------------------
BEGIN;
INSERT INTO `mmall_booklist` VALUES 
('1', '13', '21'), 
('2', '13', '22'), 
('3', '1', '23'), 
('4', '1', '24'), 
('5', '1', '25'),
('6', '17', '26'), 
('7', '1', '27'),
('8', '1', '28'),
('9', '21', '29'),
('10', '17', '30');
COMMIT;


-- ----------------------------
--  Table structure for `mmall_order`
-- ----------------------------
DROP TABLE IF EXISTS `mmall_order`;
CREATE TABLE `mmall_order` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `seller_id` int(11) NOT NULL,
  `buyer_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `create_time` datetime DEFAULT NULL,
  `finish_time` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8;

-- ----------------------------
--  Records of `mmall_order`
-- ----------------------------
BEGIN;
INSERT INTO `mmall_order` VALUES 
('1', '1', '13', '23', '2020-10-20 16:56:45', '2020-10-21 16:56:45'), 
('2', '13', '17', '26', '2020-11-20 16:56:45', '2020-11-21 16:56:45'), 
('3', '1', '21', '25', '2020-11-23 16:56:45', '2020-11-24 16:56:45');
COMMIT;

-- ----------------------------
--  Table structure for `mmall_rating`
-- ----------------------------
DROP TABLE IF EXISTS `mmall_rating`;
CREATE TABLE `mmall_rating` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `order_id` int(11) NOT NULL,
  `reviewee_id` int(11) NOT NULL,
  `reviewer_id` int(11) NOT NULL,
  `score` int(11) DEFAULT NULL,
  `review` varchar(200) DEFAULT NULL,
  `create_time` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=50 DEFAULT CHARSET=utf8;

-- ----------------------------
--  Records of `mmall_rating`
-- ----------------------------
BEGIN;
INSERT INTO `mmall_rating` VALUES 
('1', '1', '1', '13', '4', 'pretty good!', '2020-10-22 16:56:45'), 
('2', '1', '13', '1', '5', 'Nice deal!', '2020-11-22 16:56:45'), 
('3', '2', '13', '17', '1', 'What a lier! The book is a damn trash!', '2020-11-24 16:56:45');
COMMIT;
