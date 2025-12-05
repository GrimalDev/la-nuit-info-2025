-- phpMyAdmin SQL Dump
-- version 5.2.2
-- https://www.phpmyadmin.net/
--
-- Host: mariadb
-- Generation Time: Dec 05, 2025 at 12:19 AM
-- Server version: 10.8.3-MariaDB-1:10.8.3+maria~jammy
-- PHP Version: 8.2.27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `libre-tous-tech`
--
CREATE DATABASE IF NOT EXISTS `libre-tous-tech` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `libre-tous-tech`;

-- --------------------------------------------------------

--
-- Table structure for table `alternatives-to`
--

CREATE TABLE IF NOT EXISTS `alternatives-to` (
  `id` int(11) NOT NULL,
  `paid-software` int(11) NOT NULL,
  `free-software` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `alternatives-to-and-tags`
--

CREATE TABLE IF NOT EXISTS `alternatives-to-and-tags` (
  `fk_aternatives-to_id` int(11) NOT NULL,
  `fk_alternatives-to-tags_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `alternatives-to-tags`
--

CREATE TABLE IF NOT EXISTS `alternatives-to-tags` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `donations`
--

CREATE TABLE IF NOT EXISTS `donations` (
  `id` int(11) NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `region` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `hardware_type` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `quantity` int(11) NOT NULL DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `status` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `donations-status`
--

CREATE TABLE IF NOT EXISTS `donations-status` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `ip-limit-donations`
--

CREATE TABLE `ip-limit-donations` (
  `id` int(11) NOT NULL,
  `ip` varchar(15) NOT NULL,
  `number-donations` tinyint(4) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `alternatives-to`
--
ALTER TABLE `alternatives-to`
  ADD PRIMARY KEY IF NOT EXISTS (`id`);

--
-- Indexes for table `alternatives-to-and-tags`
--
ALTER TABLE `alternatives-to-and-tags`
  ADD KEY IF NOT EXISTS `contraint_alternatives-to_alternatives-to-and-tags` (`fk_aternatives-to_id`),
  ADD KEY IF NOT EXISTS `contraint_alternatives-to-tags_alternatives-to-and-tags` (`fk_alternatives-to-tags_id`);

--
-- Indexes for table `alternatives-to-tags`
--
ALTER TABLE `alternatives-to-tags`
  ADD PRIMARY KEY IF NOT EXISTS (`id`),
  ADD UNIQUE KEY IF NOT EXISTS `name` (`name`);

--
-- Indexes for table `donations`
--
ALTER TABLE `donations`
  ADD PRIMARY KEY IF NOT EXISTS (`id`),
  ADD KEY IF NOT EXISTS `idx_donations_email` (`email`),
  ADD KEY IF NOT EXISTS `idx_donations_status` (`status`),
  ADD KEY IF NOT EXISTS `idx_donations_created_at` (`created_at` DESC),
  ADD KEY IF NOT EXISTS `idx_donations_region` (`region`);

--
-- Indexes for table `donations-status`
--
ALTER TABLE `donations-status`
  ADD PRIMARY KEY IF NOT EXISTS (`id`);

--
-- Indexes for table `ip-limit-donations`
--
ALTER TABLE `ip-limit-donations`
│ ADD PRIMARY KEY (`id`),
│ ADD KEY `ip` (`ip`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `alternatives-to-tags`
--
ALTER TABLE `alternatives-to-tags`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `donations`
--
ALTER TABLE `donations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `donations-status`
--
ALTER TABLE `donations-status`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `ip-limit-donations`
--
ALTER TABLE `ip-limit-donations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `alternatives-to-and-tags`
--
ALTER TABLE `alternatives-to-and-tags`
  ADD CONSTRAINT IF NOT EXISTS `contraint_alternatives-to-tags_alternatives-to-and-tags` FOREIGN KEY (`fk_alternatives-to-tags_id`) REFERENCES `alternatives-to-tags` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT IF NOT EXISTS `contraint_alternatives-to_alternatives-to-and-tags` FOREIGN KEY (`fk_aternatives-to_id`) REFERENCES `alternatives-to` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `donations`
--
ALTER TABLE `donations`
  ADD CONSTRAINT IF NOT EXISTS `constraint_donations-status_donations` FOREIGN KEY (`status`) REFERENCES `donations-status` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
