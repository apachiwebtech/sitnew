-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 25, 2024 at 11:40 AM
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
-- Table structure for table `sit_eptaxmaster`
--

CREATE TABLE `sit_eptaxmaster` (
  `id` int(11) NOT NULL,
  `from_sal` int(11) DEFAULT NULL,
  `to_sal` int(11) DEFAULT NULL,
  `tax_price` varchar(550) DEFAULT NULL,
  `sep_mnth` varchar(250) DEFAULT NULL,
  `sep_tax_price` varchar(450) DEFAULT NULL,
  `created_by` int(11) NOT NULL,
  `updated_by` int(11) NOT NULL,
  `created_date` int(11) NOT NULL,
  `updated_date` int(11) NOT NULL,
  `deleted` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `sit_eptaxmaster`
--

INSERT INTO `sit_eptaxmaster` (`id`, `from_sal`, `to_sal`, `tax_price`, `sep_mnth`, `sep_tax_price`, `created_by`, `updated_by`, `created_date`, `updated_date`, `deleted`) VALUES
(1, 0, 5000, '0', '', '0', 0, 0, 0, 0, 0),
(2, 5001, 10000, '175', '', '0', 0, 0, 0, 0, 0),
(3, 10001, 100000, '200', 'February', '300', 0, 0, 0, 0, 0),
(4, 0, 0, 'ljclw', 'July', 'kcnlkw', 0, 0, 0, 0, 1),
(5, 12452, 12452, '45', 'July', 'Yes', 0, 0, 0, 0, 0),
(6, 1250, 1250, '50', 'January', '1250', 0, 0, 0, 0, 0),
(7, 1250, 150, '125', 'September', '62', 0, 0, 0, 0, 1),
(8, 1250, 1250, '50', 'January', '1250', 0, 0, 0, 0, 1),
(9, 1250, 150, '120', 'April', '20', 0, 0, 0, 0, 1),
(10, 120, 2, '2', 'September', '321', 0, 0, 0, 0, 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `sit_eptaxmaster`
--
ALTER TABLE `sit_eptaxmaster`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `sit_eptaxmaster`
--
ALTER TABLE `sit_eptaxmaster`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
