CREATE DATABASE IF NOT EXISTS `local`;

CREATE USER 'master'@'%' IDENTIFIED BY 'master_password';
GRANT ALL PRIVILEGES ON `local`.* TO 'master'@'%';

CREATE USER 'repl'@'%';
GRANT REPLICATION SLAVE ON *.* TO 'repl'@'%';

FLUSH PRIVILEGES;