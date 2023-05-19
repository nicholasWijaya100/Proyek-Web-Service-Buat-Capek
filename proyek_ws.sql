-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 19 Bulan Mei 2023 pada 11.55
-- Versi server: 10.4.22-MariaDB
-- Versi PHP: 8.1.2

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
-- Struktur dari tabel `menu_sets`
--

CREATE TABLE `menu_sets` (
  `menu_set_id` varchar(255) NOT NULL,
  `menu_set_name` varchar(255) NOT NULL,
  `menu_content` text NOT NULL,
  `menu_set_total_calories` int(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `deletedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `menu_sets`
--

INSERT INTO `menu_sets` (`menu_set_id`, `menu_set_name`, `menu_content`, `menu_set_total_calories`, `createdAt`, `updatedAt`, `deletedAt`) VALUES
('MS001', 'random', '[{\"menuId\":192386,\"menuName\":\"Pizza Buddy Pizza Dough, 16 oz\",\"menuCalories\":113},{\"menuId\":424571,\"menuName\":\"Bacon King Burger\",\"menuCalories\":1040},{\"menuId\":419357,\"menuName\":\"Burger Sliders\",\"menuCalories\":1300}]', 2453, '2023-05-17 06:14:19', '2023-05-17 06:14:19', '0000-00-00 00:00:00'),
('MS002', 'salad-salad an', '[{\"menuId\":273066,\"menuName\":\"Salad Ole\",\"menuCalories\":466.3999938964844},{\"menuId\":351155,\"menuName\":\"Salad Bar, Kidney Beans\",\"menuCalories\":110},{\"menuId\":384649,\"menuName\":\"Fat Salad Wedge (no dressing)\",\"menuCalories\":60}]', 636, '2023-05-17 06:30:23', '2023-05-17 06:30:23', '0000-00-00 00:00:00'),
('MS003', 'ikan-ikan an', '[{\"menuId\":341757,\"menuName\":\"Meyer Lemon Mussels & Frites\",\"menuCalories\":1970},{\"menuId\":227623,\"menuName\":\"Pecan Parmesan Crusted Rainbow Trout\",\"menuCalories\":793},{\"menuId\":354792,\"menuName\":\"Atlantic Salmon (Regular)\",\"menuCalories\":490}]', 6203, '2023-05-17 06:39:45', '2023-05-17 06:39:45', '0000-00-00 00:00:00'),
('MS004', 'test set', '[{\"menuId\":341757,\"menuName\":\"Meyer Lemon Mussels & Frites\",\"menuCalories\":1970},{\"menuId\":227623,\"menuName\":\"Pecan Parmesan Crusted Rainbow Trout\",\"menuCalories\":793},{\"menuId\":354792,\"menuName\":\"Atlantic Salmon (Regular)\",\"menuCalories\":490}]', 6203, '2023-05-17 10:19:44', '2023-05-17 10:19:44', '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Struktur dari tabel `user`
--

CREATE TABLE `user` (
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
  `deletedAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `user`
--

INSERT INTO `user` (`username`, `password`, `gender`, `birth_date`, `body_weight`, `body_height`, `saldo`, `api_hit`, `api_key`, `createdAt`, `updatedAt`, `deletedAt`) VALUES
('akun1', '123', 'MALE', '0000-00-00', 60, 175, 20000, 3, 'bNEcmQd8rQ', '2023-05-19 08:47:59', '2023-05-19 08:47:59', '2023-05-19 08:47:59'),
('wewe', '123', 'M', '0000-00-00', 44, 155, 0, 0, 'q', '2023-05-19 09:20:37', '2023-05-19 09:20:37', '2023-05-19 09:20:37'),
('wew', '123', 'M', '0000-00-00', 44, 155, 0, 0, 'Z', '2023-05-19 09:21:30', '2023-05-19 09:21:30', '2023-05-19 09:21:30'),
('qi', '123', 'M', '0000-00-00', 44, 155, 0, 0, '4a8RVwbXqh', '2023-05-19 09:41:57', '2023-05-19 09:41:57', '2023-05-19 09:41:57'),
('ot', '123', 'M', '0000-00-00', 44, 155, 0, 0, 'EeIH0bZt8c', '2023-05-19 09:45:10', '2023-05-19 09:45:10', '2023-05-19 09:45:10');

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `menu_sets`
--
ALTER TABLE `menu_sets`
  ADD PRIMARY KEY (`menu_set_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
