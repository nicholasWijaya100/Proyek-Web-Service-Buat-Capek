/*
SQLyog Professional v13.1.1 (64 bit)
MySQL - 10.4.22-MariaDB : Database - proyek_ws
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`proyek_ws` /*!40100 DEFAULT CHARACTER SET utf8mb4 */;

USE `proyek_ws`;

/*Table structure for table `menu_sets` */

DROP TABLE IF EXISTS `menu_sets`;

CREATE TABLE `menu_sets` (
  `menu_set_id` varchar(255) NOT NULL,
  `menu_set_name` varchar(255) NOT NULL,
  `menu_content` text NOT NULL,
  `menu_set_total_calories` int(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `deletedAt` datetime NOT NULL,
  PRIMARY KEY (`menu_set_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

/*Data for the table `menu_sets` */

insert  into `menu_sets`(`menu_set_id`,`menu_set_name`,`menu_content`,`menu_set_total_calories`,`createdAt`,`updatedAt`,`deletedAt`) values 
('MS001','random','[{\"menuId\":192386,\"menuName\":\"Pizza Buddy Pizza Dough, 16 oz\",\"menuCalories\":113},{\"menuId\":424571,\"menuName\":\"Bacon King Burger\",\"menuCalories\":1040},{\"menuId\":419357,\"menuName\":\"Burger Sliders\",\"menuCalories\":1300}]',2453,'2023-05-17 06:14:19','2023-05-17 06:14:19','0000-00-00 00:00:00'),
('MS002','salad-salad an','[{\"menuId\":273066,\"menuName\":\"Salad Ole\",\"menuCalories\":466.3999938964844},{\"menuId\":351155,\"menuName\":\"Salad Bar, Kidney Beans\",\"menuCalories\":110},{\"menuId\":384649,\"menuName\":\"Fat Salad Wedge (no dressing)\",\"menuCalories\":60}]',636,'2023-05-17 06:30:23','2023-05-17 06:30:23','0000-00-00 00:00:00'),
('MS003','ikan-ikan an','[{\"menuId\":341757,\"menuName\":\"Meyer Lemon Mussels & Frites\",\"menuCalories\":1970},{\"menuId\":227623,\"menuName\":\"Pecan Parmesan Crusted Rainbow Trout\",\"menuCalories\":793},{\"menuId\":354792,\"menuName\":\"Atlantic Salmon (Regular)\",\"menuCalories\":490}]',6203,'2023-05-17 06:39:45','2023-05-17 06:39:45','0000-00-00 00:00:00'),
('MS004','test set','[{\"menuId\":341757,\"menuName\":\"Meyer Lemon Mussels & Frites\",\"menuCalories\":1970},{\"menuId\":227623,\"menuName\":\"Pecan Parmesan Crusted Rainbow Trout\",\"menuCalories\":793},{\"menuId\":354792,\"menuName\":\"Atlantic Salmon (Regular)\",\"menuCalories\":490}]',6203,'2023-05-17 10:19:44','2023-05-17 10:19:44','0000-00-00 00:00:00');

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
