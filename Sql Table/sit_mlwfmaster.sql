-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 25, 2024 at 12:06 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `sit`
--

-- --------------------------------------------------------

--
-- Table structure for table `sit_mlwfmaster`
--

CREATE TABLE `sit_mlwfmaster` (
  `id` int(11) NOT NULL,
  `formdate` varchar(255) DEFAULT NULL,
  `todate` varchar(250) DEFAULT NULL,
  `grossupto` varchar(550) DEFAULT NULL,
  `chargeswill` varchar(550) DEFAULT NULL,
  `otherwise` varchar(550) DEFAULT NULL,
  `created_by` int(11) NOT NULL,
  `updated_by` int(11) NOT NULL,
  `created_date` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_date` datetime NOT NULL DEFAULT current_timestamp(),
  `deleted` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `sit_mlwfmaster`
--

INSERT INTO `sit_mlwfmaster` (`id`, `formdate`, `todate`, `grossupto`, `chargeswill`, `otherwise`, `created_by`, `updated_by`, `created_date`, `updated_date`, `deleted`) VALUES
(1, NULL, NULL, NULL, NULL, NULL, 0, 0, '2024-09-20 17:24:36', '2024-09-20 17:24:36', 1),
(2, '2024-09-20', '2024-09-20', '321', '623', '132', 0, 0, '2024-09-20 18:13:25', '2024-09-20 18:13:25', 1),
(3, '2024-09-20', '2024-09-20', '321', '623', '130', 0, 0, '2024-09-20 18:13:31', '2024-09-20 18:13:31', 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `sit_mlwfmaster`
--
ALTER TABLE `sit_mlwfmaster`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `sit_mlwfmaster`
--
ALTER TABLE `sit_mlwfmaster`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
