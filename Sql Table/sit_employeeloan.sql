-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 25, 2024 at 12:08 PM
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
-- Table structure for table `sit_employeeloan`
--

CREATE TABLE `sit_employeeloan` (
  `id` int(11) NOT NULL,
  `employee` varchar(255) DEFAULT NULL,
  `loandate` int(11) DEFAULT NULL,
  `loanamt` varchar(350) DEFAULT NULL,
  `monthly` varchar(350) DEFAULT NULL,
  `totalmonths` varchar(350) DEFAULT NULL,
  `comments` varchar(1050) DEFAULT NULL,
  `created_by` int(11) NOT NULL,
  `updated_by` int(11) NOT NULL,
  `created_date` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_date` datetime NOT NULL DEFAULT current_timestamp(),
  `deleted` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `sit_employeeloan`
--

INSERT INTO `sit_employeeloan` (`id`, `employee`, `loandate`, `loanamt`, `monthly`, `totalmonths`, `comments`, `created_by`, `updated_by`, `created_date`, `updated_date`, `deleted`) VALUES
(1, NULL, 2024, '120', '232', '13', 'kejbsdjvsz', 0, 0, '2024-09-21 18:20:46', '2024-09-21 18:20:46', 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `sit_employeeloan`
--
ALTER TABLE `sit_employeeloan`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `sit_employeeloan`
--
ALTER TABLE `sit_employeeloan`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
