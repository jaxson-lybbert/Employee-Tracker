DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;

USE employee_db;

CREATE TABLE `role`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `title` VARCHAR(255) NOT NULL,
    `salary` DECIMAL(8, 2) NOT NULL,
    `department_id` INT NOT NULL
);
CREATE TABLE `employee`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `first_name` VARCHAR(255) NOT NULL,
    `last_name` VARCHAR(255) NOT NULL,
    `role_id` INT NOT NULL,
    `manager_id` INT NOT NULL
);
ALTER TABLE
    `employee` ADD PRIMARY KEY(`manager_id`);
CREATE TABLE `department`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(255) NOT NULL
);
ALTER TABLE
    `role` ADD CONSTRAINT `role_department_id_foreign` FOREIGN KEY(`department_id`) REFERENCES `department`(`id`);
ALTER TABLE
    `employee` ADD CONSTRAINT `employee_role_id_foreign` FOREIGN KEY(`role_id`) REFERENCES `role`(`id`);
ALTER TABLE
    `employee` ADD CONSTRAINT `employee_id_foreign` FOREIGN KEY(`id`) REFERENCES `employee`(`manager_id`);