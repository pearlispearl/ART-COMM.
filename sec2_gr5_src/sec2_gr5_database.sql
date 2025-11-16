-- DROP DATABASE artcomm;
CREATE DATABASE IF NOT EXISTS artcomm;
USE artcomm;

CREATE TABLE IF NOT EXISTS Admin(
	AdminID CHAR(13) NOT NULL,
    AdminGmail VARCHAR(100) NOT NULL,
    AMFirstname VARCHAR(30) NOT NULL,
    AMLastname VARCHAR(30) NOT NULL,
    PRIMARY KEY(AdminID)
);

CREATE TABLE IF NOT EXISTS Adminlogin(
	Username CHAR(50) NOT NULL,
    Password VARCHAR(50) NOT NULL,
    LAdminID CHAR(13),
    PRIMARY KEY (Username),
    FOREIGN KEY(LAdminID) REFERENCES Admin(AdminID)
);

CREATE TABLE IF NOT EXISTS Category(
	CID CHAR(13) NOT NULL,
    C_Name VARCHAR(30) NOT NULL,
    PRIMARY KEY(CID)
);

CREATE TABLE IF NOT EXISTS Search_log(
	LogID CHAR(13) NOT NULL,
    SCID CHAR(13) NOT NULL,
    Title VARCHAR(100) NOT NULL,
    PRIMARY KEY(LogID),
    FOREIGN KEY(SCID) REFERENCES Category(CID)
    );


CREATE TABLE IF NOT EXISTS Artist(
	ArtistID CHAR(13) NOT NULL,
    ArtistName VARCHAR(30) NOT NULL,
    ArtistLanguage VARCHAR(100) NOT NULL,
    ArtistCountry VARCHAR(100) NOT NULL,
    ACID CHAR(13) NOT NULL,
    BasePrice DECIMAL(10,2) ,
    Status VARCHAR(30) NOT NULL,
    AAdminID CHAR(13),
    ALogID CHAR(13) ,
    PRIMARY KEY(ArtistID),
    FOREIGN KEY(ACID) REFERENCES Category(CID),
    FOREIGN KEY(AAdminID) REFERENCES Admin(AdminID),
    FOREIGN KEY(ALogID) REFERENCES Search_log(LogID)
);
ALTER TABLE Artist
ADD COLUMN AboutMe TEXT DEFAULT NULL;
ALTER TABLE Artist ADD COLUMN PhotoPath VARCHAR(255);

USE artcomm;
INSERT INTO Admin(AdminID, AdminGmail, AMFirstname, AMLastname) VALUES
    ('ADM000000001', 'Francis.admin@gmail.com', 'Jiaxian', 'Chen'),
    ('ADM000000002', 'Thanaporn.admin@gmail.com', 'Thanaporn', 'Artidtayamontol'),
    ('ADM000000003', 'Rawisara.admin@gmail.com', 'Rawisara', 'Chantravutikorn'),
    ('ADM000000004', 'Teerada.admin@gmail.com', 'Teerada', 'Chatrattanawuth'),
    ('ADM000000005', 'Nichakorn.admin@gmail.com', 'Nichakorn', 'Wisalkamol');

INSERT INTO Adminlogin(Username, Password, LAdminID) VALUES
    ('Francis_admin', 'passAlice123', 'ADM000000001'),
    ('Thanaporn_admin', 'secureBob456', 'ADM000000002'),
    ('Rawisara_admin', 'carla789!', 'ADM000000003'),
    ('Teerada_admin', 'davidKey321', 'ADM000000004'),
    ('Nichakorn_admin', 'emmapwd456', 'ADM000000005');

INSERT INTO Category(CID, C_Name) VALUES
    ('CAT000000001', 'Anime Style'),
    ('CAT000000002', 'Realism'),
    ('CAT000000003', 'Cartoon'),
    ('CAT000000004', 'Pixel Art'),
    ('CAT000000005', 'Chibi');
    
INSERT INTO Search_log(LogID, SCID, Title) VALUES
    ('LOG000000001', 'CAT000000001', 'Anime Art'),
    ('LOG000000002', 'CAT000000002', 'Realistic Cartoon'),
    ('LOG000000003', 'CAT000000003', 'Cartoon-style icon'),
    ('LOG000000004', 'CAT000000004', 'Pixel Game Asset'),
    ('LOG000000005', 'CAT000000005', 'Cute Chibi'),
    ('LOG000000006', 'CAT000000001', 'Anime Style Character Design'),
    ('LOG000000007', 'CAT000000002', 'Realism'),
    ('LOG000000008', 'CAT000000003', 'Cartoon'),
    ('LOG000000009', 'CAT000000004', 'Background'),
    ('LOG000000010', 'CAT000000005', 'Chibi');


INSERT INTO Artist(ArtistID, ArtistName, ArtistLanguage, ArtistCountry, ACID, BasePrice, Status, AAdminID, ALogID,AboutMe,PhotoPath) VALUES
    ('ART000000001', 'LunaDraws', 'English', 'USA', 'CAT000000001', 30.00, 'Available', 'ADM000000001', 'LOG000000001','I draw anime cute arts','https://i.pinimg.com/736x/1e/2d/19/1e2d1962d209215acdf7386584e9bc69.jpg'),
    ('ART000000002', 'PixelPete', 'Japanese', 'Japan', 'CAT000000004', 45.00, 'Unavailable', 'ADM000000004', 'LOG000000004','Food Pixel: Small object pixel !!! 💫🩷','https://i.pinimg.com/736x/1a/27/eb/1a27eb2d11184f5225b9afa08361b2e8.jpg'),
    ('ART000000003', 'RealAmy', 'Spanish', 'Spain', 'CAT000000002', 70.00, 'Available', 'ADM000000002', 'LOG000000002','K-pop art','https://i.pinimg.com/736x/05/6b/d0/056bd0d3cd0330770eeae418b670e62f.jpg'),
    ('ART000000004', 'ChibiChan', 'Korean', 'South Korea', 'CAT000000005', 25.00, 'Available', 'ADM000000005', 'LOG000000005','Chibi headshot','https://i.pinimg.com/736x/6c/f8/31/6cf8313a45bf721b370b97a63e6371f3.jpg'),
    ('ART000000005', 'ToonMaster', 'English', 'UK', 'CAT000000003', 35.00, 'Available', 'ADM000000003', 'LOG000000003','Mario Peaches go brrrr','https://i.pinimg.com/736x/fb/8c/2e/fb8c2e72adb793f2c3042ee2d6f4cfe5.jpg'),
    ('ART000000006', 'Ducartoon', 'English', 'Thailand', 'CAT000000001',99.00, 'Available', 'ADM000000001', 'LOG000000006','Spyxfamily Fanart artist','https://i.pinimg.com/736x/a0/08/f8/a008f8d01250ff6612a6004e690968a4.jpg'),
    ('ART000000007', 'CyberInk', 'English', 'Germany', 'CAT000000002', 55.00, 'Unavailable', 'ADM000000002', 'LOG000000007','90s,80s semi-real art','https://i.pinimg.com/736x/8d/38/69/8d3869b5f868e0d02dec0df6f53d0fdb.jpg'),
    ('ART000000008', 'FaceCrafter', 'French', 'France', 'CAT000000003', 40.00, 'Unavailable', 'ADM000000003', 'LOG000000008','Paper art','https://i.pinimg.com/736x/57/1a/08/571a08c96005f54174604d0cebc5284b.jpg'),
    ('ART000000009', 'SceneQueen', 'English', 'USA', 'CAT000000004', 50.00, 'Available', 'ADM000000004', 'LOG000000009','Kurukuru','https://i.pinimg.com/736x/1d/95/1e/1d951edbfe6dfe9629cb7bbaa758ee98.jpg'),
    ('ART000000010', 'Hirorosh', 'English', 'Australia', 'CAT000000005', 80.00, 'Available', 'ADM000000005', 'LOG000000010','Tsukasa For Life!!','https://i.pinimg.com/736x/fb/63/fd/fb63fda2e9cf6cd0a9334170efcc3568.jpg');


