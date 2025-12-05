-- Migration to fix IP column length for IPv6 support
-- Date: 2025-12-05

USE `libre-tous-tech`;

-- Increase IP column size to support IPv6 addresses (max 45 chars)
ALTER TABLE `ip-limit-donations` 
MODIFY COLUMN `ip` VARCHAR(45) NOT NULL;
