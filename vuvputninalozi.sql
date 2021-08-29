-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Aug 29, 2021 at 09:09 AM
-- Server version: 5.7.31
-- PHP Version: 7.3.21

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `vuvputninalozi`
--

-- --------------------------------------------------------

--
-- Table structure for table `odjeli`
--

DROP TABLE IF EXISTS `odjeli`;
CREATE TABLE IF NOT EXISTS `odjeli` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `odjel` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `odjeli`
--

INSERT INTO `odjeli` (`id`, `odjel`) VALUES
(1, 'Financijska agencija'),
(2, 'Razvojni centar'),
(4, 'Recepcija');

-- --------------------------------------------------------

--
-- Table structure for table `putninalozi`
--

DROP TABLE IF EXISTS `putninalozi`;
CREATE TABLE IF NOT EXISTS `putninalozi` (
  `idPutnogNaloga` int(255) NOT NULL AUTO_INCREMENT,
  `polaziste` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `odrediste` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `svrha` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `datumOdlaska` date DEFAULT NULL,
  `brojDana` int(255) DEFAULT NULL,
  `odobreno` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`idPutnogNaloga`)
) ENGINE=MyISAM AUTO_INCREMENT=50 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `putninalozi`
--

INSERT INTO `putninalozi` (`idPutnogNaloga`, `polaziste`, `odrediste`, `svrha`, `datumOdlaska`, `brojDana`, `odobreno`) VALUES
(2, 'Zagreb', 'Slatina', 'Provjera infrastrukture zg', '2021-05-24', 10, 1),
(3, 'Virovitica', 'Rijeka', 'Analiza financijskih izvjesca', '2021-05-29', 4, 1),
(6, 'Osijek', 'Vukovar', 'Pripomoc vukovarskoj podruznici pri izradi projekta.', '2021-05-30', 20, 1),
(40, 'Opatija', 'Zagreb', 'Pregled rada zagrebacke poslovnice', '2021-07-08', 2, 1),
(30, 'Ilok', 'Samobor', 'Strucno predavanje', '2021-05-30', 100, 0),
(41, 'Opatija', 'Zagreb', 'Analiza financijskih izvjescaa', '2021-07-17', 2, 1),
(42, 'Opatija', 'Samobor', 'Provjera infrastrukture zgg', '2022-01-06', 2, 1),
(43, 'Ilok', 'Zagreb', 'Analiza financijskih izvjesca', '2021-08-19', 5, 1),
(44, 'Opatija', 'Slatina', 'Provjera infrastrukture zgg', '2021-08-01', 4, 1),
(45, 'Opatija', 'Rijeka', 'Analiza financijskih izvjescaa', '2021-08-01', 3, 1),
(46, 'Virovitica', 'Rijeka', 'Analiza financijskih izvjesca', '2021-08-01', 3, 1),
(47, 'Ilok', 'Slatina', 'Provjera infrastrukture zgg', '2021-08-01', 5, 0),
(48, 'Ilok', 'Samobor', 'Provjera infrastrukture zgg', '2021-08-01', 5, 1),
(49, 'Ilok', 'Opatija', 'Pregled rada zagrebacke poslovnice..', '2021-08-08', 2, 1);

-- --------------------------------------------------------

--
-- Table structure for table `uloge`
--

DROP TABLE IF EXISTS `uloge`;
CREATE TABLE IF NOT EXISTS `uloge` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uloga` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `uloge`
--

INSERT INTO `uloge` (`id`, `uloga`) VALUES
(1, 'Zaposlenik'),
(2, 'Dev'),
(3, 'Backend developer'),
(4, 'C# developer'),
(5, 'Tajnik'),
(6, 'Tajnica'),
(7, 'Frontend developer'),
(9, 'IT Dizajner'),
(14, 'Recepcionista');

-- --------------------------------------------------------

--
-- Table structure for table `zaposlenici`
--

DROP TABLE IF EXISTS `zaposlenici`;
CREATE TABLE IF NOT EXISTS `zaposlenici` (
  `idZaposlenika` int(255) NOT NULL AUTO_INCREMENT,
  `ime` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `prezime` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `uloga` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT '1',
  `odjel` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT '1',
  `slobodan` tinyint(1) DEFAULT '1',
  `lozinka` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `rola` int(11) NOT NULL DEFAULT '0',
  `korisnickoIme` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `prvaPrijavaUSustav` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`idZaposlenika`)
) ENGINE=MyISAM AUTO_INCREMENT=32 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `zaposlenici`
--

INSERT INTO `zaposlenici` (`idZaposlenika`, `ime`, `prezime`, `uloga`, `odjel`, `slobodan`, `lozinka`, `rola`, `korisnickoIme`, `prvaPrijavaUSustav`) VALUES
(1, 'Pero', 'Jurkovic', '9', '2', 1, 'pero123', 0, 'perica', '2021-07-01 15:12:50'),
(3, 'Mario', 'Šomođi', '2', '2', 1, 'adminadmin', 1, 'mario', '2021-07-05 15:12:50'),
(4, 'Olga', 'Vuckovic', '3', '2', 1, 'olga1234', 0, 'oooogle', '2021-06-13 15:12:50'),
(5, 'Vuk', 'Simic', '4', '2', 1, 'vuk094', 0, 'Woof', '2021-05-18 15:13:28'),
(6, 'Vitomir', 'Novosel', '3', '1', 1, 'vitmoirnovo', 0, 'Vitor', '2021-07-10 15:12:50'),
(7, 'Grubisa', 'Tomic', '5', '1', 1, 'grubisa593', 0, 'Gruto', '2021-06-02 15:12:50'),
(8, 'Dusanka', 'Mikulic', '6', '1', 1, 'dusankaMik', 0, 'Dusli', '2021-05-09 15:12:50'),
(28, 'Antonio', 'Kokoric', '1', '1', 1, 'akokoric1', 0, 'akokoric', '2021-07-13 15:12:50');

-- --------------------------------------------------------

--
-- Table structure for table `zaposlenikputninalog`
--

DROP TABLE IF EXISTS `zaposlenikputninalog`;
CREATE TABLE IF NOT EXISTS `zaposlenikputninalog` (
  `idPutnogNaloga` int(255) DEFAULT NULL,
  `idZaposlenika` int(255) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `zaposlenikputninalog`
--

INSERT INTO `zaposlenikputninalog` (`idPutnogNaloga`, `idZaposlenika`) VALUES
(30, 3),
(2, 1),
(6, 6),
(3, 5),
(6, 7),
(30, 6),
(40, 4),
(3, 7),
(3, 8),
(40, 1),
(6, 8),
(6, 28),
(41, 4),
(41, 5),
(42, 1),
(42, 7),
(43, 3),
(43, 4),
(44, 1),
(44, 3),
(45, 1),
(45, 3),
(46, 3),
(46, 4),
(47, 4),
(47, 5),
(48, 4),
(48, 5),
(49, 7),
(49, 8);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
