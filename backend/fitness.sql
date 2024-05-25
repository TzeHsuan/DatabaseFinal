-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- 主機： localhost
-- 產生時間： 2024 年 05 月 25 日 16:24
-- 伺服器版本： 10.4.28-MariaDB
-- PHP 版本： 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- 資料庫： `fitness`
--

-- --------------------------------------------------------

--
-- 資料表結構 `consultant`
--

CREATE TABLE `consultant` (
  `ID` int(5) NOT NULL,
  `FName` varchar(10) NOT NULL,
  `LName` varchar(10) NOT NULL,
  `Email` varchar(50) NOT NULL,
  `Password` varchar(30) NOT NULL,
  `Age` int(100) NOT NULL,
  `Height` float NOT NULL,
  `Weight` float NOT NULL,
  `Diet_ID` int(5) NOT NULL,
  `Ideal_Fat` float NOT NULL,
  `Reg_Date` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- 資料表結構 `diet`
--

CREATE TABLE `diet` (
  `Diet_ID` int(5) NOT NULL,
  `Diet_Fname` varchar(10) NOT NULL,
  `Diet_Lname` varchar(10) NOT NULL,
  `Password` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- 傾印資料表的資料 `diet`
--

INSERT INTO `diet` (`Diet_ID`, `Diet_Fname`, `Diet_Lname`, `Password`) VALUES
(1, 'Emma', 'Lu', '123'),
(2, 'Mandy', 'Chen', '456'),
(3, 'Jay', 'Lee', '789');

-- --------------------------------------------------------

--
-- 資料表結構 `record`
--

CREATE TABLE `record` (
  `Record_ID` int(5) NOT NULL,
  `ID` int(5) NOT NULL,
  `Protein` float NOT NULL,
  `Fat` float NOT NULL,
  `Carb` float NOT NULL,
  `Weight` float NOT NULL,
  `Diet_ID` int(5) NOT NULL,
  `Date` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- 資料表結構 `review`
--

CREATE TABLE `review` (
  `Review_ID` int(100) NOT NULL,
  `ID` int(5) NOT NULL,
  `Diet_ID` int(5) NOT NULL,
  `Review_Date` timestamp NOT NULL DEFAULT current_timestamp(),
  `Review` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- 已傾印資料表的索引
--

--
-- 資料表索引 `consultant`
--
ALTER TABLE `consultant`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `DietID3` (`Diet_ID`);

--
-- 資料表索引 `diet`
--
ALTER TABLE `diet`
  ADD PRIMARY KEY (`Diet_ID`);

--
-- 資料表索引 `record`
--
ALTER TABLE `record`
  ADD PRIMARY KEY (`Record_ID`),
  ADD KEY `ID` (`ID`),
  ADD KEY `DietID2` (`Diet_ID`);

--
-- 資料表索引 `review`
--
ALTER TABLE `review`
  ADD PRIMARY KEY (`Review_ID`),
  ADD KEY `ID2` (`ID`),
  ADD KEY `DietID` (`Diet_ID`);

--
-- 在傾印的資料表使用自動遞增(AUTO_INCREMENT)
--

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `consultant`
--
ALTER TABLE `consultant`
  MODIFY `ID` int(5) NOT NULL AUTO_INCREMENT;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `record`
--
ALTER TABLE `record`
  MODIFY `Record_ID` int(5) NOT NULL AUTO_INCREMENT;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `review`
--
ALTER TABLE `review`
  MODIFY `Review_ID` int(100) NOT NULL AUTO_INCREMENT;

--
-- 已傾印資料表的限制式
--

--
-- 資料表的限制式 `consultant`
--
ALTER TABLE `consultant`
  ADD CONSTRAINT `DietID3` FOREIGN KEY (`Diet_ID`) REFERENCES `diet` (`Diet_ID`);

--
-- 資料表的限制式 `record`
--
ALTER TABLE `record`
  ADD CONSTRAINT `DietID2` FOREIGN KEY (`Diet_ID`) REFERENCES `diet` (`Diet_ID`),
  ADD CONSTRAINT `ID` FOREIGN KEY (`ID`) REFERENCES `consultant` (`ID`);

--
-- 資料表的限制式 `review`
--
ALTER TABLE `review`
  ADD CONSTRAINT `DietID` FOREIGN KEY (`Diet_ID`) REFERENCES `diet` (`Diet_ID`),
  ADD CONSTRAINT `ID2` FOREIGN KEY (`ID`) REFERENCES `consultant` (`ID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
