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

CREATE TABLE `alternatives-to` (
  `id` int(11) NOT NULL,
  `paid-software` int(11) NOT NULL,
  `free-software` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `alternatives-to-and-tags`
--

CREATE TABLE `alternatives-to-and-tags` (
  `fk_aternatives-to_id` int(11) NOT NULL,
  `fk_alternatives-to-tags_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `alternatives-to-tags`
--

CREATE TABLE `alternatives-to-tags` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `donations`
--

CREATE TABLE `donations` (
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

CREATE TABLE `donations-status` (
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
  ADD KEY `contraint_alternatives-to_alternatives-to-and-tags` (`fk_aternatives-to_id`),
  ADD KEY `contraint_alternatives-to-tags_alternatives-to-and-tags` (`fk_alternatives-to-tags_id`);

--
-- Indexes for table `alternatives-to-tags`
--
ALTER TABLE `alternatives-to-tags`
  ADD PRIMARY KEY IF NOT EXISTS (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `donations`
--
ALTER TABLE `donations`
  ADD PRIMARY KEY IF NOT EXISTS (`id`),
  ADD KEY `idx_donations_email` (`email`),
  ADD KEY `idx_donations_status` (`status`),
  ADD KEY `idx_donations_created_at` (`created_at` DESC),
  ADD KEY `idx_donations_region` (`region`);

--
-- Indexes for table `donations-status`
--
ALTER TABLE `donations-status`
  ADD PRIMARY KEY IF NOT EXISTS (`id`);

--
-- Indexes for table `ip-limit-donations`
--
ALTER TABLE `ip-limit-donations`
  ADD PRIMARY KEY IF NOT EXISTS (`id`),
  ADD KEY `ip` (`ip`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `alternatives-to`
--
ALTER TABLE `alternatives-to`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `alternatives-to-tags`
--
ALTER TABLE `alternatives-to-tags`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `donations`
--
ALTER TABLE `donations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;

--
-- AUTO_INCREMENT for table `donations-status`
--
ALTER TABLE `donations-status`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `ip-limit-donations`
--
ALTER TABLE `ip-limit-donations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `alternatives-to-and-tags`
--
ALTER TABLE `alternatives-to-and-tags`
  ADD CONSTRAINT `contraint_alternatives-to-tags_alternatives-to-and-tags` FOREIGN KEY (`fk_alternatives-to-tags_id`) REFERENCES `alternatives-to-tags` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `contraint_alternatives-to_alternatives-to-and-tags` FOREIGN KEY (`fk_aternatives-to_id`) REFERENCES `alternatives-to` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `donations`
--
ALTER TABLE `donations`
  ADD CONSTRAINT `constraint_donations-status_donations` FOREIGN KEY (`status`) REFERENCES `donations-status` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Dumping data for table `donations-status`
--

INSERT INTO `donations-status` (`id`, `name`) VALUES(1, 'excellent');
INSERT INTO `donations-status` (`id`, `name`) VALUES(2, 'good');
INSERT INTO `donations-status` (`id`, `name`) VALUES(3, 'acceptable');
INSERT INTO `donations-status` (`id`, `name`) VALUES(4, 'to-repair');

--
-- Dumping data for table `alternatives-to-tags`
--

INSERT INTO `alternatives-to-tags` (`id`, `name`) VALUES
(1, 'Office Suite'),
(2, 'Video Editing'),
(3, 'Photo Editing'),
(4, 'Design'),
(5, '3D Modeling'),
(6, 'Audio Editing'),
(7, 'Project Management'),
(8, 'Communication'),
(9, 'Operating System'),
(10, 'IDE'),
(11, 'Database'),
(12, 'Cloud Storage'),
(13, 'Password Manager'),
(14, 'Note Taking'),
(15, 'Email Client'),
(16, 'Browser'),
(17, 'Media Player'),
(18, 'Archive Manager'),
(19, 'Screen Recording'),
(20, 'VPN');

--
-- Dumping data for table `alternatives-to`
--

INSERT INTO `alternatives-to` (`id`, `paid-software`, `free-software`) VALUES
(1, 1, 2),
(2, 3, 4),
(3, 5, 6),
(4, 7, 8),
(5, 9, 10),
(6, 11, 12),
(7, 13, 14),
(8, 15, 16),
(9, 17, 18),
(10, 19, 20);

--
-- Dumping data for table `alternatives-to-and-tags`
--

INSERT INTO `alternatives-to-and-tags` (`fk_aternatives-to_id`, `fk_alternatives-to-tags_id`) VALUES
(1, 1),
(1, 14),
(2, 2),
(2, 19),
(3, 3),
(3, 4),
(4, 4),
(4, 5),
(5, 5),
(5, 3),
(6, 6),
(7, 7),
(7, 8),
(8, 8),
(8, 15),
(9, 9),
(10, 10),
(10, 1);

--
-- Dumping data for table `donations`
--

INSERT INTO `donations` (`id`, `name`, `email`, `region`, `hardware_type`, `quantity`, `created_at`, `updated_at`, `status`) VALUES
(1, 'Jean Dupont', 'jean.dupont@email.fr', 'Île-de-France', 'laptop', 2, '2024-11-15 10:30:00', '2024-11-15 10:30:00', 1),
(2, 'Marie Martin', 'marie.martin@email.fr', 'Provence-Alpes-Côte d\'Azur', 'desktop', 1, '2024-11-16 14:20:00', '2024-11-16 14:20:00', 2),
(3, 'Pierre Durand', 'pierre.durand@email.fr', 'Auvergne-Rhône-Alpes', 'monitor', 3, '2024-11-17 09:15:00', '2024-11-17 09:15:00', 1),
(4, 'Sophie Leroy', 'sophie.leroy@email.fr', 'Nouvelle-Aquitaine', 'keyboard', 5, '2024-11-18 16:45:00', '2024-11-18 16:45:00', 3),
(5, 'Luc Bernard', 'luc.bernard@email.fr', 'Occitanie', 'mouse', 10, '2024-11-19 11:00:00', '2024-11-19 11:00:00', 2),
(6, 'Claire Thomas', 'claire.thomas@email.fr', 'Hauts-de-France', 'laptop', 1, '2024-11-20 13:30:00', '2024-11-20 13:30:00', 1),
(7, 'Antoine Petit', 'antoine.petit@email.fr', 'Bretagne', 'tablet', 2, '2024-11-21 15:20:00', '2024-11-21 15:20:00', 4),
(8, 'Camille Robert', 'camille.robert@email.fr', 'Grand Est', 'desktop', 1, '2024-11-22 10:00:00', '2024-11-22 10:00:00', 2),
(9, 'Nicolas Richard', 'nicolas.richard@email.fr', 'Pays de la Loire', 'printer', 1, '2024-11-23 14:45:00', '2024-11-23 14:45:00', 3),
(10, 'Emma Dubois', 'emma.dubois@email.fr', 'Centre-Val de Loire', 'laptop', 3, '2024-11-24 09:30:00', '2024-11-24 09:30:00', 1),
(11, 'Lucas Moreau', 'lucas.moreau@email.fr', 'Normandie', 'monitor', 2, '2024-11-25 11:15:00', '2024-11-25 11:15:00', 2),
(12, 'Léa Laurent', 'lea.laurent@email.fr', 'Bourgogne-Franche-Comté', 'keyboard', 4, '2024-11-26 16:00:00', '2024-11-26 16:00:00', 1),
(13, 'Hugo Simon', 'hugo.simon@email.fr', 'Île-de-France', 'desktop', 1, '2024-11-27 10:45:00', '2024-11-27 10:45:00', 3),
(14, 'Chloé Michel', 'chloe.michel@email.fr', 'Provence-Alpes-Côte d\'Azur', 'laptop', 2, '2024-11-28 13:20:00', '2024-11-28 13:20:00', 1),
(15, 'Mathis Lefebvre', 'mathis.lefebvre@email.fr', 'Auvergne-Rhône-Alpes', 'mouse', 8, '2024-11-29 15:30:00', '2024-11-29 15:30:00', 2),
(16, 'Manon Leroy', 'manon.leroy@email.fr', 'Nouvelle-Aquitaine', 'tablet', 1, '2024-11-30 09:00:00', '2024-11-30 09:00:00', 1),
(17, 'Tom Roux', 'tom.roux@email.fr', 'Occitanie', 'desktop', 2, '2024-12-01 14:15:00', '2024-12-01 14:15:00', 4),
(18, 'Inès David', 'ines.david@email.fr', 'Hauts-de-France', 'laptop', 1, '2024-12-02 11:30:00', '2024-12-02 11:30:00', 2),
(19, 'Louis Bertrand', 'louis.bertrand@email.fr', 'Bretagne', 'monitor', 3, '2024-12-03 16:45:00', '2024-12-03 16:45:00', 1),
(20, 'Sarah Morel', 'sarah.morel@email.fr', 'Grand Est', 'keyboard', 6, '2024-12-04 10:20:00', '2024-12-04 10:20:00', 3),
(21, 'Théo Fournier', 'theo.fournier@email.fr', 'Pays de la Loire', 'laptop', 2, '2024-12-01 08:30:00', '2024-12-01 08:30:00', 1),
(22, 'Julie Girard', 'julie.girard@email.fr', 'Centre-Val de Loire', 'desktop', 1, '2024-12-02 12:00:00', '2024-12-02 12:00:00', 2),
(23, 'Alexandre Bonnet', 'alex.bonnet@email.fr', 'Normandie', 'printer', 2, '2024-12-03 15:15:00', '2024-12-03 15:15:00', 1),
(24, 'Laura Dupuis', 'laura.dupuis@email.fr', 'Bourgogne-Franche-Comté', 'mouse', 12, '2024-12-04 09:45:00', '2024-12-04 09:45:00', 2),
(25, 'Maxime Lambert', 'maxime.lambert@email.fr', 'Île-de-France', 'laptop', 3, '2024-11-20 13:00:00', '2024-11-20 13:00:00', 1),
(26, 'Anaïs Fontaine', 'anais.fontaine@email.fr', 'Provence-Alpes-Côte d\'Azur', 'tablet', 1, '2024-11-21 10:30:00', '2024-11-21 10:30:00', 3),
(27, 'Benjamin Rousseau', 'benjamin.rousseau@email.fr', 'Auvergne-Rhône-Alpes', 'desktop', 1, '2024-11-22 14:20:00', '2024-11-22 14:20:00', 2),
(28, 'Océane Vincent', 'oceane.vincent@email.fr', 'Nouvelle-Aquitaine', 'monitor', 2, '2024-11-23 11:45:00', '2024-11-23 11:45:00', 1),
(29, 'Gabriel Muller', 'gabriel.muller@email.fr', 'Occitanie', 'keyboard', 5, '2024-11-24 16:10:00', '2024-11-24 16:10:00', 4),
(30, 'Jade Lefevre', 'jade.lefevre@email.fr', 'Hauts-de-France', 'laptop', 1, '2024-11-25 09:20:00', '2024-11-25 09:20:00', 1),
(31, 'Raphaël Andre', 'raphael.andre@email.fr', 'Bretagne', 'desktop', 2, '2024-11-26 13:50:00', '2024-11-26 13:50:00', 2),
(32, 'Lucie Mercier', 'lucie.mercier@email.fr', 'Grand Est', 'mouse', 7, '2024-11-27 15:35:00', '2024-11-27 15:35:00', 3),
(33, 'Nathan Blanc', 'nathan.blanc@email.fr', 'Pays de la Loire', 'laptop', 2, '2024-11-28 10:15:00', '2024-11-28 10:15:00', 1),
(34, 'Alice Guerin', 'alice.guerin@email.fr', 'Centre-Val de Loire', 'printer', 1, '2024-11-29 14:40:00', '2024-11-29 14:40:00', 2),
(35, 'Dylan Boyer', 'dylan.boyer@email.fr', 'Normandie', 'monitor', 4, '2024-11-30 11:25:00', '2024-11-30 11:25:00', 1),
(36, 'Zoé Garnier', 'zoe.garnier@email.fr', 'Bourgogne-Franche-Comté', 'keyboard', 3, '2024-12-01 16:05:00', '2024-12-01 16:05:00', 3),
(37, 'Adam Fabre', 'adam.fabre@email.fr', 'Île-de-France', 'laptop', 1, '2024-12-02 09:50:00', '2024-12-02 09:50:00', 1),
(38, 'Lola Perrin', 'lola.perrin@email.fr', 'Provence-Alpes-Côte d\'Azur', 'tablet', 2, '2024-12-03 13:30:00', '2024-12-03 13:30:00', 2),
(39, 'Enzo Morin', 'enzo.morin@email.fr', 'Auvergne-Rhône-Alpes', 'desktop', 1, '2024-12-04 15:45:00', '2024-12-04 15:45:00', 4),
(40, 'Lina Robin', 'lina.robin@email.fr', 'Nouvelle-Aquitaine', 'mouse', 9, '2024-11-18 10:00:00', '2024-11-18 10:00:00', 2),
(41, 'Ethan Clement', 'ethan.clement@email.fr', 'Occitanie', 'laptop', 2, '2024-11-19 12:15:00', '2024-11-19 12:15:00', 1),
(42, 'Mila Masson', 'mila.masson@email.fr', 'Hauts-de-France', 'desktop', 1, '2024-11-20 14:30:00', '2024-11-20 14:30:00', 3),
(43, 'Noé Sanchez', 'noe.sanchez@email.fr', 'Bretagne', 'monitor', 2, '2024-11-21 11:50:00', '2024-11-21 11:50:00', 1),
(44, 'Romy Giraud', 'romy.giraud@email.fr', 'Grand Est', 'keyboard', 4, '2024-11-22 16:20:00', '2024-11-22 16:20:00', 2),
(45, 'Samuel Barbier', 'samuel.barbier@email.fr', 'Pays de la Loire', 'laptop', 3, '2024-11-23 09:40:00', '2024-11-23 09:40:00', 1),
(46, 'Eva Renard', 'eva.renard@email.fr', 'Centre-Val de Loire', 'printer', 1, '2024-11-24 13:05:00', '2024-11-24 13:05:00', 4),
(47, 'Arthur Arnaud', 'arthur.arnaud@email.fr', 'Normandie', 'tablet', 2, '2024-11-25 15:25:00', '2024-11-25 15:25:00', 2),
(48, 'Rose Noel', 'rose.noel@email.fr', 'Bourgogne-Franche-Comté', 'desktop', 1, '2024-11-26 10:55:00', '2024-11-26 10:55:00', 1),
(49, 'Axel Gauthier', 'axel.gauthier@email.fr', 'Île-de-France', 'mouse', 6, '2024-11-27 14:10:00', '2024-11-27 14:10:00', 3),
(50, 'Anna Martinez', 'anna.martinez@email.fr', 'Provence-Alpes-Côte d\'Azur', 'laptop', 2, '2024-11-28 11:35:00', '2024-11-28 11:35:00', 1);

--
-- Dumping data for table `ip-limit-donations`
--

INSERT INTO `ip-limit-donations` (`id`, `ip`, `number-donations`) VALUES
(1, '192.168.1.10', 3),
(2, '192.168.1.25', 1),
(3, '10.0.0.15', 2),
(4, '172.16.0.5', 5),
(5, '192.168.2.100', 1),
(6, '10.10.10.50', 4),
(7, '192.168.3.75', 2),
(8, '172.20.0.10', 3),
(9, '10.5.5.20', 1),
(10, '192.168.4.200', 6),
(11, '172.30.0.15', 2),
(12, '10.20.30.40', 1),
(13, '192.168.5.55', 3),
(14, '172.18.0.25', 4),
(15, '10.100.50.75', 2);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
