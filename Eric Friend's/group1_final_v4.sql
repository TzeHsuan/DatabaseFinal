-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- 主機： 127.0.0.1
-- 產生時間： 2023-05-26 08:02:04
-- 伺服器版本： 10.4.27-MariaDB
-- PHP 版本： 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- 資料庫： `group1_final_v4`
--

-- --------------------------------------------------------

--
-- 資料表結構 `advice`
--

CREATE TABLE `advice` (
  `AdviceID` int(128) NOT NULL,
  `Disease` varchar(255) NOT NULL,
  `Symptom` varchar(255) NOT NULL,
  `Advice` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- 傾印資料表的資料 `advice`
--

INSERT INTO `advice` (`AdviceID`, `Disease`, `Symptom`, `Advice`) VALUES
(1, 'Cold', 'Headache, Fever, Cough, Sore throat, Running nose', 'Drink more water, Rest more'),
(2, 'Acne', 'Redness', 'Keep dry and clean'),
(3, 'Cavity', 'Sensitive teeth, Sore teeth', 'Brush your teeth properly, Use dental floss'),
(4, 'Conjunctivitis', 'Red eyes, Photophobia', 'No contact lenses '),
(5, 'Irritable Bowel Disorder', 'Abdominal pain and cramping, excessive wind (flatulence)', 'Release pressure, Regular lifestyle'),
(6, 'Fracture', 'Hurt, Swell', 'Advoid excessive exercise');

-- --------------------------------------------------------

--
-- 資料表結構 `deapartment`
--

CREATE TABLE `deapartment` (
  `id` int(128) NOT NULL,
  `dpt_name` varchar(128) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- 傾印資料表的資料 `deapartment`
--

INSERT INTO `deapartment` (`id`, `dpt_name`) VALUES
(1, 'Orthopaedics'),
(2, 'Dermatology'),
(3, 'Dental'),
(4, 'Ophthalmology'),
(5, 'Gastroenterology');

-- --------------------------------------------------------

--
-- 資料表結構 `doctor`
--

CREATE TABLE `doctor` (
  `Dssn` int(128) NOT NULL,
  `Name` varchar(128) NOT NULL,
  `Sex` varchar(10) NOT NULL,
  `Birth` date NOT NULL,
  `Dept` varchar(128) NOT NULL,
  `Password` varchar(128) NOT NULL,
  `ID` varchar(10) NOT NULL,
  `Email` varchar(128) DEFAULT NULL,
  `PhoneNum` varchar(10) DEFAULT NULL,
  `Score` float(2,1) DEFAULT NULL,
  `Experience` int(128) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- 傾印資料表的資料 `doctor`
--

INSERT INTO `doctor` (`Dssn`, `Name`, `Sex`, `Birth`, `Dept`, `Password`, `ID`, `Email`, `PhoneNum`, `Score`, `Experience`) VALUES
(1, 'Dr.Liao', 'Male', '2003-01-01', '1', '1c9d59b00cc23e04b789464b7b6ea736', 'A123456789', 'wilson@gmail.com', '0987654321', 3.2, 2),
(2, 'Dr.Chen', 'Male', '2002-10-17', '2', '1ea75da9887144a8666fcd757bfa2df1', 'A987654321', 'sc1017@gmail.com', '0914725836', 1.0, NULL),
(3, 'Dr.Teoh', 'Female', '2002-09-24', '3', 'ba969fb0604ec12f86ae2f5fac240e8c', 'A946853712', 'jy_teoh@gmail.com', '0914725368', 1.0, NULL),
(4, 'Dr.Hung', 'Female', '2003-01-25', '4', 'c240f4337782f9b1ccac7ee3522d6240', 'K224567891', 'velda@gmail.com', '0964587132', 1.0, NULL),
(5, 'Dr.Ho', 'Male', '2002-11-22', '5', '404b573f165bff3e3e669cdd5e253270', 'O100987632', 'barrenshore@gmail.com', '0800020000', 5.0, NULL);

-- --------------------------------------------------------

--
-- 資料表結構 `medicine`
--

CREATE TABLE `medicine` (
  `MedID` int(128) NOT NULL,
  `MedName` varchar(255) NOT NULL,
  `Appearance` varchar(255) NOT NULL,
  `Caution` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- 傾印資料表的資料 `medicine`
--

INSERT INTO `medicine` (`MedID`, `MedName`, `Appearance`, `Caution`) VALUES
(1, 'Advil', 'BROWN, ROUND, 11mm', 'Side effect: Acid or sour stomach'),
(2, 'Prednisolone', 'PINK, ROUND, 8mm', 'If you take it once a day and you only remember it the next day, you don’t need to take it again; if you take it several times a day, you can take it immediately.'),
(3, 'Differin', 'WHITE, TUBE, 15grams ', 'Side effect: dryness, redness'),
(4, 'Sinomin', 'WHITE, BOTTLE, 40mg/ml', 'Expires in 30 days'),
(5, 'Hyoscyamine', 'WHITE, ROUND, 6mm', 'Side effect: Cycloplegia, Tachycardia.');

-- --------------------------------------------------------

--
-- 資料表結構 `patient`
--

CREATE TABLE `patient` (
  `Pssn` int(128) NOT NULL,
  `Name` varchar(128) NOT NULL,
  `Sex` varchar(10) NOT NULL,
  `Birth` date NOT NULL,
  `BloodType` varchar(10) NOT NULL,
  `Password` varchar(128) NOT NULL,
  `ID` varchar(10) NOT NULL,
  `Email` varchar(128) DEFAULT NULL,
  `PhoneNum` varchar(10) DEFAULT NULL,
  `Height` int(3) NOT NULL,
  `Weight` int(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- 傾印資料表的資料 `patient`
--

INSERT INTO `patient` (`Pssn`, `Name`, `Sex`, `Birth`, `BloodType`, `Password`, `ID`, `Email`, `PhoneNum`, `Height`, `Weight`) VALUES
(1, 'Wilson Liao', 'Male', '2003-01-01', 'AB', '1c9d59b00cc23e04b789464b7b6ea736', 'A123456789', 'wilson@gmail.com', '0987654321', 170, 70),
(2, 'Scott Chen', 'Male', '2002-10-17', 'A', '1ea75da9887144a8666fcd757bfa2df1', 'A987654321', 'sc1017@gmail.com', '0914725836', 185, 70),
(3, 'Jy Teoh', 'Female', '2002-09-24', 'B', 'ba969fb0604ec12f86ae2f5fac240e8c', 'A946853712', 'jy_teoh@gmail.com', '0914725368', 165, 55),
(4, 'Velda Hung', 'Female', '2003-01-25', 'O', 'c240f4337782f9b1ccac7ee3522d6240', 'K224567891', 'velda@gmail.com', '0964587132', 167, 45),
(5, 'Yihua Ho', 'Male', '2002-11-22', 'A', '404b573f165bff3e3e669cdd5e253270', 'O100987632', 'barrenshore@gmail.com', '0800020000', 174, 57),
(6, 'Patient', 'male', '0000-00-00', 'B', 'b857eed5c9405c1f2b98048aae506792', 'G444444444', 'dead@gmail.com', '0444444444', 170, 70);

-- --------------------------------------------------------

--
-- 資料表結構 `record`
--

CREATE TABLE `record` (
  `Rnum` int(128) NOT NULL,
  `Dssn` int(128) NOT NULL,
  `Pssn` int(128) NOT NULL,
  `Date` date NOT NULL,
  `Review` int(3) DEFAULT NULL,
  `AdviceNum` int(128) NOT NULL,
  `Expense` int(128) NOT NULL,
  `MedNum` int(128) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- 傾印資料表的資料 `record`
--

INSERT INTO `record` (`Rnum`, `Dssn`, `Pssn`, `Date`, `Review`, `AdviceNum`, `Expense`, `MedNum`) VALUES
(2, 1, 1, '2023-05-12', 5, 1, 300, 1),
(3, 2, 4, '2023-05-17', 1, 2, 50, 3),
(4, 3, 5, '2023-05-17', 1, 3, 200, 1),
(5, 2, 4, '2023-05-17', 1, 2, 150, 2),
(6, 5, 3, '2023-05-17', 5, 5, 250, 5),
(7, 4, 1, '2023-05-17', 1, 4, 200, 4),
(8, 1, 2, '2023-05-17', 4, 6, 300, 1),
(16, 1, 1, '2018-07-04', 5, 2, 256, 1),
(17, 1, 6, '2018-12-08', 1, 6, 444, 4),
(18, 1, 6, '2018-07-21', 1, 1, 12, 1),
(19, 1, 3, '2018-07-12', NULL, 2, 333, 1);

--
-- 已傾印資料表的索引
--

--
-- 資料表索引 `advice`
--
ALTER TABLE `advice`
  ADD PRIMARY KEY (`AdviceID`),
  ADD UNIQUE KEY `Disease` (`Disease`);

--
-- 資料表索引 `deapartment`
--
ALTER TABLE `deapartment`
  ADD PRIMARY KEY (`id`);

--
-- 資料表索引 `doctor`
--
ALTER TABLE `doctor`
  ADD PRIMARY KEY (`Dssn`),
  ADD UNIQUE KEY `Password` (`Password`),
  ADD UNIQUE KEY `ID` (`ID`),
  ADD UNIQUE KEY `Email` (`Email`),
  ADD UNIQUE KEY `PhoneNum` (`PhoneNum`);

--
-- 資料表索引 `medicine`
--
ALTER TABLE `medicine`
  ADD PRIMARY KEY (`MedID`),
  ADD UNIQUE KEY `MedName` (`MedName`);

--
-- 資料表索引 `patient`
--
ALTER TABLE `patient`
  ADD PRIMARY KEY (`Pssn`),
  ADD UNIQUE KEY `Password` (`Password`),
  ADD UNIQUE KEY `ID` (`ID`),
  ADD UNIQUE KEY `Email` (`Email`),
  ADD UNIQUE KEY `PhoneNum` (`PhoneNum`);

--
-- 資料表索引 `record`
--
ALTER TABLE `record`
  ADD PRIMARY KEY (`Rnum`);

--
-- 在傾印的資料表使用自動遞增(AUTO_INCREMENT)
--

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `advice`
--
ALTER TABLE `advice`
  MODIFY `AdviceID` int(128) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `deapartment`
--
ALTER TABLE `deapartment`
  MODIFY `id` int(128) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `doctor`
--
ALTER TABLE `doctor`
  MODIFY `Dssn` int(128) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `medicine`
--
ALTER TABLE `medicine`
  MODIFY `MedID` int(128) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `patient`
--
ALTER TABLE `patient`
  MODIFY `Pssn` int(128) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `record`
--
ALTER TABLE `record`
  MODIFY `Rnum` int(128) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
