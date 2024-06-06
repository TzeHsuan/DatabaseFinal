-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- 主机： 127.0.0.1
-- 生成日期： 2024-06-06 20:59:03
-- 服务器版本： 10.4.32-MariaDB
-- PHP 版本： 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- 数据库： `fitness`
--

-- --------------------------------------------------------

--
-- 表的结构 `consultant`
--

CREATE TABLE `consultant` (
  `ID` int(5) NOT NULL,
  `Con_ID` char(36) NOT NULL,
  `FName` varchar(10) NOT NULL,
  `LName` varchar(10) NOT NULL,
  `Email` varchar(50) NOT NULL,
  `Password` varchar(255) NOT NULL,
  `Age` int(100) NOT NULL,
  `Height` float NOT NULL,
  `Weight` float NOT NULL,
  `Diet_ID` int(5) DEFAULT NULL,
  `Ideal_Fat` float NOT NULL,
  `Reg_Date` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- 转存表中的数据 `consultant`
--

INSERT INTO `consultant` (`ID`, `Con_ID`, `FName`, `LName`, `Email`, `Password`, `Age`, `Height`, `Weight`, `Diet_ID`, `Ideal_Fat`, `Reg_Date`) VALUES
(17, '6660e885e7ea4', 'John', 'Doe', 'example@example.com', '$2y$10$vQUfcf119SzlHRrg31k3VOx2maw79fU9EKW9guxxdgY0rnoJWNynK', 30, 180, 75, NULL, 15, '2024-06-05 22:36:53'),
(18, '6660e8b905ca1', 'nie', 'wenhua', 'nie991112@gmail.com', '$2y$10$BkOsKB3NlV3kInRe.IlC7u2I2kCe37TyubSrgotqxmzrHIEk03dqG', 24, 182, 94, 1, 10, '2024-06-05 22:37:45'),
(19, '6660f5531ee4a', 'nie', 'wenhua', 'nie9911121@gmail.com', '$2y$10$3MVVTY0WJGcfs1rTu84o..AqkIkzMP3/MbpefyDyMH03FXBwMqUVe', 24, 182, 94, 1, 10, '2024-06-05 23:31:31'),
(20, '6661f8a071c12', 'zhang', 'chenwei', '535780870@qq.com', '$2y$10$jqoUWQI3BVljnowKiq4Bbu99vmMd.xU0o3VgRfFBj3Z6iDDF6ACZK', 24, 182, 90, 3, 10, '2024-06-06 17:57:52'),
(21, '66620248cb5b8', 'dong', 'zhuo', '1016310570@qq.com', '$2y$10$9WiEzUfJ8QqTlBMR5NZwiuHDHfvE/d0Ei9lhBjQUEXFjbw9p9LhiO', 24, 182, 80, NULL, 10, '2024-06-06 18:39:04'),
(22, '666202b307f72', 'dong', 'zhuo', '780870@qq.com', '$2y$10$hHvdH28U1aUEk.3D6zSlJuEj1kfTh/szmYkw5QlAL0KEbP9Am0x9W', 24, 182, 94, NULL, 10, '2024-06-06 18:40:51'),
(23, '6662034e20351', 'dong', 'zhuo', '5357@qq.com', '$2y$10$XwXn6yYxynh83HIGRJHG1e8DetsVpmF9O3antz8d/UE8NnwahPjWC', 24, 182, 94, 3, 10, '2024-06-06 18:43:26');

-- --------------------------------------------------------

--
-- 表的结构 `diet`
--

CREATE TABLE `diet` (
  `Diet_ID` int(5) NOT NULL,
  `Diet_Fname` varchar(10) NOT NULL,
  `Diet_Lname` varchar(10) NOT NULL,
  `Password` varchar(255) NOT NULL,
  `Img_url` varchar(255) NOT NULL,
  `Intro` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- 转存表中的数据 `diet`
--

INSERT INTO `diet` (`Diet_ID`, `Diet_Fname`, `Diet_Lname`, `Password`, `Img_url`, `Intro`) VALUES
(1, 'Emma', 'Lu', '$2y$10$Ux2RHrrZKku8wfbXUoWYoun2PAKlYjJ5LnFf2LG5vnaye9Yfv/Vcu', 'https://u.fmyeah.com/i15/66614998c61f4.jpg', 'wanjdwadnjawd'),
(2, 'Mandy', 'Chen', '$2y$10$PDJaHbc4c6Hx.BiqdqtApOSsxLEjXmHmwUscGRN1TRhSjBvhFBb2.', 'https://u.fmyeah.com/i15/666149b6caa61.jpg', 'sadasdasdasd'),
(3, 'Jay', 'Lee', '$2y$10$cQsLa2Q2CBWofqo7FEPr/eOV1lg23EgUKlbcH/QYWDfO/ZgyD8tIy', 'https://u.fmyeah.com/i15/666149c80bc1d.jpg', 'sadasgasgadaw');

-- --------------------------------------------------------

--
-- 表的结构 `record`
--

CREATE TABLE `record` (
  `Record_ID` int(5) NOT NULL,
  `Con_ID` char(36) NOT NULL,
  `Protein` float NOT NULL,
  `Fat` float NOT NULL,
  `Carb` float NOT NULL,
  `Sports` int(1) NOT NULL,
  `Aero` int(4) NOT NULL,
  `Weight` float NOT NULL,
  `Diet_ID` int(5) NOT NULL,
  `Date` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- 转存表中的数据 `record`
--

INSERT INTO `record` (`Record_ID`, `Con_ID`, `Protein`, `Fat`, `Carb`, `Sports`, `Aero`, `Weight`, `Diet_ID`, `Date`) VALUES
(1, '6660e8b905ca1', 100, 50, 200, 1, 31, 70, 1, '2024-06-02 16:00:00'),
(2, '6660e8b905ca1', 101, 50, 200, 2, 31, 70, 1, '2024-06-05 16:00:00'),
(3, '6660e8b905ca1', 101, 50, 200, 1, 31, 70, 1, '2024-06-06 16:00:00'),
(4, '6660e8b905ca1', 101, 50, 200, 1, 31, 70, 1, '2024-06-06 16:00:00'),
(8, '6660e8b905ca1', 101, 50, 200, 1, 31, 70, 1, '2024-06-06 16:00:00'),
(9, '6660e8b905ca1', 101, 50, 200, 1, 31, 70, 1, '2024-06-06 16:00:00'),
(10, '6660e8b905ca1', 101, 50, 200, 1, 31, 70, 1, '2024-06-06 16:00:00'),
(11, '6660e8b905ca1', 101, 50, 200, 1, 31, 70, 1, '2024-06-06 16:00:00'),
(12, '6660e8b905ca1', 101, 50, 200, 1, 31, 70, 1, '2024-06-06 16:00:00'),
(13, '6660e8b905ca1', 101, 50, 200, 1, 31, 70, 1, '2024-06-06 16:00:00'),
(14, '6660e8b905ca1', 101, 50, 200, 1, 31, 70, 1, '2024-06-06 16:00:00'),
(19, '6661f8a071c12', 100, 20, 200, 0, 30, 80, 3, '2024-06-06 16:00:00'),
(21, '6662034e20351', 200, 20, 200, 0, 30, 92, 3, '2024-06-06 16:00:00');

-- --------------------------------------------------------

--
-- 表的结构 `review`
--

CREATE TABLE `review` (
  `Review_ID` int(100) NOT NULL,
  `Con_ID` char(36) NOT NULL,
  `Diet_ID` int(5) NOT NULL,
  `Review_Date` timestamp NOT NULL DEFAULT current_timestamp(),
  `Review` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- 转存表中的数据 `review`
--

INSERT INTO `review` (`Review_ID`, `Con_ID`, `Diet_ID`, `Review_Date`, `Review`) VALUES
(1, '6660e8b905ca1', 1, '2024-06-04 13:41:24', '練得不錯'),
(2, '6660e8b905ca1', 1, '2024-06-05 13:41:24', '練得不錯'),
(3, '6660e8b905ca1', 1, '2024-06-06 13:42:14', '練得不錯'),
(101, '6660e8b905ca1', 1, '2024-06-06 10:34:58', '123'),
(102, '6660e8b905ca1', 1, '2024-06-06 10:35:13', '1245'),
(104, '6660e8b905ca1', 1, '2024-06-06 11:16:01', '123'),
(105, '6660e8b905ca1', 1, '2024-06-06 12:45:47', '123'),
(106, '6662034e20351', 3, '2024-06-06 12:46:41', '练屁练');

--
-- 转储表的索引
--

--
-- 表的索引 `consultant`
--
ALTER TABLE `consultant`
  ADD PRIMARY KEY (`ID`),
  ADD UNIQUE KEY `Con_ID_2` (`Con_ID`),
  ADD KEY `DietID3` (`Diet_ID`),
  ADD KEY `Con_ID` (`Con_ID`);

--
-- 表的索引 `diet`
--
ALTER TABLE `diet`
  ADD PRIMARY KEY (`Diet_ID`);

--
-- 表的索引 `record`
--
ALTER TABLE `record`
  ADD PRIMARY KEY (`Record_ID`),
  ADD KEY `Diet_ID2` (`Diet_ID`),
  ADD KEY `Con_ID` (`Con_ID`);

--
-- 表的索引 `review`
--
ALTER TABLE `review`
  ADD PRIMARY KEY (`Review_ID`),
  ADD KEY `DietID` (`Diet_ID`),
  ADD KEY `Con_ID2` (`Con_ID`);

--
-- 在导出的表使用AUTO_INCREMENT
--

--
-- 使用表AUTO_INCREMENT `consultant`
--
ALTER TABLE `consultant`
  MODIFY `ID` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- 使用表AUTO_INCREMENT `record`
--
ALTER TABLE `record`
  MODIFY `Record_ID` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- 使用表AUTO_INCREMENT `review`
--
ALTER TABLE `review`
  MODIFY `Review_ID` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=107;

--
-- 限制导出的表
--

--
-- 限制表 `consultant`
--
ALTER TABLE `consultant`
  ADD CONSTRAINT `DietID3` FOREIGN KEY (`Diet_ID`) REFERENCES `diet` (`Diet_ID`);

--
-- 限制表 `record`
--
ALTER TABLE `record`
  ADD CONSTRAINT `Con_ID` FOREIGN KEY (`Con_ID`) REFERENCES `consultant` (`con_id`),
  ADD CONSTRAINT `Diet_ID2` FOREIGN KEY (`Diet_ID`) REFERENCES `diet` (`Diet_ID`);

--
-- 限制表 `review`
--
ALTER TABLE `review`
  ADD CONSTRAINT `Con_ID2` FOREIGN KEY (`Con_ID`) REFERENCES `consultant` (`con_id`),
  ADD CONSTRAINT `DietID` FOREIGN KEY (`Diet_ID`) REFERENCES `diet` (`Diet_ID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
