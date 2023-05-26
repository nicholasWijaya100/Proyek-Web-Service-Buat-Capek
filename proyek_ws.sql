-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 26, 2023 at 06:27 PM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `proyek_ws`
--

-- --------------------------------------------------------

--
-- Table structure for table `diets`
--

CREATE TABLE `diets` (
  `diet_id` varchar(255) NOT NULL,
  `diet_name` varchar(255) NOT NULL,
  `diet_content` text NOT NULL,
  `diet_total_calories` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `deletedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `menu_sets`
--

CREATE TABLE `menu_sets` (
  `menu_set_id` varchar(255) NOT NULL,
  `menu_set_name` varchar(255) NOT NULL,
  `menu_content` text NOT NULL,
  `menu_set_total_calories` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `deletedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `sequelizemeta`
--

CREATE TABLE `sequelizemeta` (
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `sequelizemeta`
--

INSERT INTO `sequelizemeta` (`name`) VALUES
('20230510015302-create-users.js'),
('20230510015713-create-menu-set.js'),
('20230510015844-create-diet.js'),
('create-topup-history.js');

-- --------------------------------------------------------

--
-- Table structure for table `topup_history`
--

CREATE TABLE `topup_history` (
  `topup_history_id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `amount` text NOT NULL,
  `topup_date` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `gender` varchar(255) NOT NULL,
  `birth_date` datetime NOT NULL,
  `body_weight` int(11) NOT NULL,
  `body_height` int(11) NOT NULL,
  `target_weight` int(11) NOT NULL,
  `role` varchar(255) NOT NULL,
  `saldo` int(11) NOT NULL,
  `api_hit` int(11) NOT NULL,
  `api_key` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `deletedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`username`, `password`, `gender`, `birth_date`, `body_weight`, `body_height`, `target_weight`, `role`, `saldo`, `api_hit`, `api_key`, `createdAt`, `updatedAt`, `deletedAt`) VALUES
('akun1', '123', 'FEMALE', '2022-08-16 00:00:00', 44, 155, 40, 'user', 100000, 3, 'OxdQRJ9UXP', '2023-05-26 08:43:56', '2023-05-26 08:49:32', '0000-00-00 00:00:00'),
('Gunawan', 'istts', 'MALE', '2022-08-20 00:00:00', 80, 173, 65, 'user', 0, 0, '6W369hH7jl', '2023-05-26 15:52:07', '2023-05-26 15:52:07', '0000-00-00 00:00:00');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `diets`
--
ALTER TABLE `diets`
  ADD PRIMARY KEY (`diet_id`);

--
-- Indexes for table `menu_sets`
--
ALTER TABLE `menu_sets`
  ADD PRIMARY KEY (`menu_set_id`);

--
-- Indexes for table `sequelizemeta`
--
ALTER TABLE `sequelizemeta`
  ADD PRIMARY KEY (`name`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `topup_history`
--
ALTER TABLE `topup_history`
  ADD PRIMARY KEY (`topup_history_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`username`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
