DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;

USE employee_db;

CREATE TABLE `department` (
    `id` INT  NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(30)  NOT NULL ,
    PRIMARY KEY (
        `id`
    )
);

CREATE TABLE `role` (
    `id` INT  NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(30)  NOT NULL ,
    `salary` DECIMAL  NOT NULL ,
    `department_id` INT  NOT NULL ,
    PRIMARY KEY (
        `id`
    )
);

CREATE TABLE `employee` (
    `id` INT  NOT NULL AUTO_INCREMENT,
    `first_name` VARCHAR(30)  NOT NULL ,
    `last_name` VARCHAR(30)  NOT NULL ,
    `role_id` INT  NOT NULL ,
    `manager_id` INT ,
    PRIMARY KEY (
        `id`
    )
);

ALTER TABLE `role` ADD CONSTRAINT `fk_role_department_id` FOREIGN KEY(`department_id`)
REFERENCES `department` (`id`);

ALTER TABLE `employee` ADD CONSTRAINT `fk_employee_role_id` FOREIGN KEY(`role_id`)
REFERENCES `role` (`id`);

ALTER TABLE `employee` ADD CONSTRAINT `fk_employee_manager_id` FOREIGN KEY(`manager_id`)
REFERENCES `employee` (`id`);