/*
SQLyog Community v13.2.0 (64 bit)
MySQL - 10.4.27-MariaDB : Database - proyek_ws
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`proyek_ws` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */;

USE `proyek_ws`;

/*Table structure for table `diets` */

DROP TABLE IF EXISTS `diets`;

CREATE TABLE `diets` (
  `diet_id` varchar(255) NOT NULL,
  `diet_name` varchar(255) NOT NULL,
  `diet_content` text NOT NULL,
  `diet_total_calories` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `deletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`diet_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `diets` */

insert  into `diets`(`diet_id`,`diet_name`,`diet_content`,`diet_total_calories`,`createdAt`,`updatedAt`,`deletedAt`) values 
('D001','diet1','[{\"id_menu_set\":\"MS001\",\"time\":\"breakfast\",\"menu_set\":[\"Pizza Buddy Pizza Dough, 16 oz\",\"Bacon King Burger\",\"Burger Sliders\"]},{\"id_menu_set\":\"MS002\",\"time\":\"lunch\",\"menu_set\":[\"Salad Ole\",\"Salad Bar, Kidney Beans\",\"Fat Salad Wedge (no dressing)\"]},{\"id_menu_set\":\"MS003\",\"time\":\"dinner\",\"menu_set\":[\"TerraVita Licorice Root Tea, Loose Leaf Herbal Tea, 8 oz, 3-Pack, Zin: 428772\",\"Larissa Veronica Decaf Black Raspberry Orange Medium Roast Decaf Coffee, Black Raspberry Orange, Medium Roast, Whole Coffee Beans, 4 oz, 1-Pack, Zin: 563508\",\"Sugar In The Raw, Turbinado Cane Sugar, 2 lb\"]}]',5536,'2023-05-25 07:10:07','2023-05-25 07:10:07','2023-05-25 07:30:08'),
('D002','diet2','[{\"id_menu_set\":\"MS003\",\"time\":\"breakfast\",\"menu_set\":[\"TerraVita Licorice Root Tea, Loose Leaf Herbal Tea, 8 oz, 3-Pack, Zin: 428772\",\"Larissa Veronica Decaf Black Raspberry Orange Medium Roast Decaf Coffee, Black Raspberry Orange, Medium Roast, Whole Coffee Beans, 4 oz, 1-Pack, Zin: 563508\",\"Sugar In The Raw, Turbinado Cane Sugar, 2 lb\"]},{\"id_menu_set\":\"MS006\",\"time\":\"lunch\",\"menu_set\":[\"Grill and Bar Pizza - Pepperoni - 6\",\"Pizza Sub (12\\\")\",\"Pizza Veggie\"]},{\"id_menu_set\":\"MS005\",\"time\":\"dinner\",\"menu_set\":[\"Grill and Bar Pizza - Pepperoni - 6\",\"Pizza Sub (12\\\")\",\"Pizza Veggie\"]}]',7091,'2023-05-25 07:29:55','2023-05-25 07:29:55','2023-05-25 07:30:08'),
('D003','diet','[{\"id_menu_set\":\"MS001\",\"time\":\"breakfast\",\"menu_set\":[\"Grill and Bar Pizza - Pepperoni - 6\",\"Pizza Sub (12\\\")\"]},{\"id_menu_set\":\"MS002\",\"time\":\"lunch\",\"menu_set\":[\"Salad Ole\",\"Salad Bar, Kidney Beans\",\"Fat Salad Wedge (no dressing)\"]},{\"id_menu_set\":\"MS005\",\"time\":\"dinner\",\"menu_set\":[\"Grill and Bar Pizza - Pepperoni - 6\",\"Pizza Sub (12\\\")\",\"Pizza Veggie\"]}]',4668,'2023-05-25 08:03:58','2023-05-25 08:07:27',NULL);

/*Table structure for table `menu_sets` */

DROP TABLE IF EXISTS `menu_sets`;

CREATE TABLE `menu_sets` (
  `menu_set_id` varchar(255) NOT NULL,
  `menu_set_name` varchar(255) NOT NULL,
  `menu_content` text NOT NULL,
  `menu_set_total_calories` int(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `deletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`menu_set_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `menu_sets` */

insert  into `menu_sets`(`menu_set_id`,`menu_set_name`,`menu_content`,`menu_set_total_calories`,`createdAt`,`updatedAt`,`deletedAt`) values 
('MS001','random','[{\"menuId\":426101,\"menuName\":\"Grill and Bar Pizza - Pepperoni - 6\",\"menuCalories\":700},{\"menuId\":284934,\"menuName\":\"Pizza Sub (12\\\")\",\"menuCalories\":310}]',1710,'2023-05-17 06:14:19','2023-05-25 07:58:33',NULL),
('MS002','salad-salad an','[{\"menuId\":273066,\"menuName\":\"Salad Ole\",\"menuCalories\":466.3999938964844},{\"menuId\":351155,\"menuName\":\"Salad Bar, Kidney Beans\",\"menuCalories\":110},{\"menuId\":384649,\"menuName\":\"Fat Salad Wedge (no dressing)\",\"menuCalories\":60}]',636,'2023-05-17 06:30:23','2023-05-17 06:30:23',NULL),
('MS003','ikan-ikan an','[{\"menuId\":642929,\"menuName\":\"TerraVita Licorice Root Tea, Loose Leaf Herbal Tea, 8 oz, 3-Pack, Zin: 428772\",\"menuCalories\":\"440\"},{\"menuId\":642941,\"menuName\":\"Larissa Veronica Decaf Black Raspberry Orange Medium Roast Decaf Coffee, Black Raspberry Orange, Medium Roast, Whole Coffee Beans, 4 oz, 1-Pack, Zin: 563508\",\"menuCalories\":\"349\"},{\"menuId\":642927,\"menuName\":\"Sugar In The Raw, Turbinado Cane Sugar, 2 lb\",\"menuCalories\":\"406\"}]',2447,'2023-05-25 05:26:43','2023-05-25 05:26:43','2023-05-25 07:30:08'),
('MS004','pizza','[{\"menuId\":426101,\"menuName\":\"Grill and Bar Pizza - Pepperoni - 6\",\"menuCalories\":700},{\"menuId\":284934,\"menuName\":\"Pizza Sub (12\\\")\",\"menuCalories\":310},{\"menuId\":320123,\"menuName\":\"Pizza Veggie\",\"menuCalories\":204}]',2322,'2023-05-25 07:02:11','2023-05-25 07:02:11','2023-05-25 07:10:24'),
('MS005','pizza2','[{\"menuId\":426101,\"menuName\":\"Grill and Bar Pizza - Pepperoni - 6\",\"menuCalories\":700},{\"menuId\":284934,\"menuName\":\"Pizza Sub (12\\\")\",\"menuCalories\":310},{\"menuId\":320123,\"menuName\":\"Pizza Veggie\",\"menuCalories\":204}]',2322,'2023-05-25 07:29:29','2023-05-25 07:29:29',NULL),
('MS006','pizza3','[{\"menuId\":426101,\"menuName\":\"Grill and Bar Pizza - Pepperoni - 6\",\"menuCalories\":700},{\"menuId\":284934,\"menuName\":\"Pizza Sub (12\\\")\",\"menuCalories\":310},{\"menuId\":320123,\"menuName\":\"Pizza Veggie\",\"menuCalories\":204}]',2322,'2023-05-25 07:29:35','2023-05-25 07:29:35',NULL);

/*Table structure for table `sequelizemeta` */

DROP TABLE IF EXISTS `sequelizemeta`;

CREATE TABLE `sequelizemeta` (
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`name`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

/*Data for the table `sequelizemeta` */

insert  into `sequelizemeta`(`name`) values 
('20230510015302-create-users.js'),
('20230510015713-create-menu-set.js'),
('20230510015844-create-diet.js');

/*Table structure for table `users` */

DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `username` varchar(20) NOT NULL,
  `password` varchar(10) DEFAULT NULL,
  `gender` varchar(6) DEFAULT NULL,
  `birth_date` date DEFAULT current_timestamp(),
  `body_weight` int(5) DEFAULT NULL,
  `body_height` int(5) DEFAULT NULL,
  `saldo` int(10) DEFAULT NULL,
  `api_hit` int(15) DEFAULT NULL,
  `api_key` varchar(10) DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `deletedAt` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `users` */

insert  into `users`(`username`,`password`,`gender`,`birth_date`,`body_weight`,`body_height`,`saldo`,`api_hit`,`api_key`,`createdAt`,`updatedAt`,`deletedAt`) values 
('akun1','123','MALE','0000-00-00',60,175,20000,3,'bNEcmQd8rQ','2023-05-19 15:47:59','2023-05-19 15:47:59','2023-05-19 15:47:59'),
('wewe','123','M','0000-00-00',44,155,0,0,'q','2023-05-19 16:20:37','2023-05-19 16:20:37','2023-05-19 16:20:37'),
('wew','123','M','0000-00-00',44,155,0,0,'Z','2023-05-19 16:21:30','2023-05-19 16:21:30','2023-05-19 16:21:30'),
('qi','123','M','0000-00-00',44,155,0,0,'4a8RVwbXqh','2023-05-19 16:41:57','2023-05-19 16:41:57','2023-05-19 16:41:57'),
('ot','123','M','0000-00-00',44,155,0,0,'EeIH0bZt8c','2023-05-19 16:45:10','2023-05-19 16:45:10','2023-05-19 16:45:10'),
('nw','jegalnw','MALE','2022-09-16',44,155,0,0,'75sg5bV1Jj','2023-05-26 09:36:15','2023-05-26 09:36:15','2023-05-26 09:36:15'),
('Kenneth','bakarnw','MALE','2022-08-16',44,155,0,0,'5V08koIYut','2023-05-30 00:41:23','2023-05-30 00:48:23',NULL);

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
