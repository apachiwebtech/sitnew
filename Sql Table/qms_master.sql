-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 25, 2024 at 12:02 PM
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
-- Table structure for table `qms_master`
--

CREATE TABLE `qms_master` (
  `Id` int(1) NOT NULL,
  `QMS_name` varchar(16) DEFAULT NULL,
  `QMS_Desc` varchar(28) DEFAULT NULL,
  `IsActive` int(1) NOT NULL DEFAULT 1,
  `IsDelete` int(1) NOT NULL DEFAULT 0
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `qms_master`
--

INSERT INTO `qms_master` (`Id`, `QMS_name`, `QMS_Desc`, `IsActive`, `IsDelete`) VALUES
(1, 'Quality Manual', 'Quality Manual', 1, 0),
(2, 'Procedure Manual', 'Procedure Manual', 1, 0),
(3, 'QMS Standards', 'QMS Standards', 1, 0),
(4, 'Formats', 'Forms used as per procedures', 1, 0),
(5, 'Hallo', 'Hallo', 1, 0),
(6, 'dshf', 'sb', 1, 0),
(7, 'Hallo', 'Hallo', 1, 0),
(8, 'Hallo', 'kjds', 1, 0),
(9, 'Hallo', NULL, 1, 0),
(10, 'Hallo', NULL, 1, 0),
(11, 'Hallo', NULL, 1, 0),
(12, '', 'Hallo', 1, 0),
(13, 'Hallo', 'sb', 1, 0),
(14, 'Hallo1', 'Hallo', 1, 0),
(15, 'Hallo1', 'Hallo', 1, 0),
(16, 'Hallo1', 'Hallo', 1, 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `qms_master`
--
ALTER TABLE `qms_master`
  ADD PRIMARY KEY (`Id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `qms_master`
--
ALTER TABLE `qms_master`
  MODIFY `Id` int(1) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
