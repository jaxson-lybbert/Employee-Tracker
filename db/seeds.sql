INSERT INTO department (name)
VALUES
    ("Administration"),
    ("Sales"),
    ("Service"),
    ("Engineering");

INSERT INTO role (title, salary, department_id)
VALUES
    ("CEO", 150000, 1),
    ("CFO", 125000, 1),
    ("Sales Lead", 100000, 2),
    ("Salesperson", 80000, 2),
    ("Customer Service Agent", 80000, 3),
    ("Senior Engineer", 100000, 4),
    ("Junior Engineer", 80000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
    ("John", "Business", 1, null),
    ("Steve", "Business", 2, null),
    ("Troy", "Money", 3, 2),
    ("Rachel", "People-Person", 4, 3),
    ("Sally", "Fix-a-Lot", 5, 1),
    ("Bob", "Nerd", 6, 1),
    ("Susan", "Smart", 7, 6);
    