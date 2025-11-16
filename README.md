# ART-COMM.
ART COMM. is an online platform designed to connect independent artists with customers who are looking for commissioned artwork. Whether users are exploring art styles or seeking custom work, the system streamlines the process of discovery, communication, and commission placement.

How to use ARTCOMM. Instructions

// How to Open the Project
1. Download sec2_gr5_src.zip and extract files
2. You will see folder sec2_gr5_fe_src , folder sec2_gr5_ws_src and sec2_gr5_database.sql
3. Make sure you have all the necessary files: HTML, JS, CSS, .env and SQL.
4. Open the sql and run the scripts
5. Open Visual Studio Code with two separate tabs: each tab open each folder. you will have total of 2 tabs
- open the folder sec2_gr5_fe_src
- open terminal run:  npm init
- press enter until it finished
- Install the following modules using the commande  npm install <name of modules>

express

nodemon

dotenv

mysql

mysql2

cors


- Set up the start command in package.json by adding "start": "nodemon app.js" in the section "scripts"

After this step, the section "scripts" should be as follows:

   "scripts": {
     "start": "nodemon app.js"
   }
- **do the same install process again in  folder sec2_gr5_ws_src**
  
6. **In both folder** open .env file and chage
  MYSQL_USERNAME and MYSQL_PASSWORD to be your sql's username and password
7. Then in visual studio code, Run "npm start" in the terminal for both Visual Studio Code tabs.
8. Open any browser and type  http://localhost:3030/ on the address bar to start using the website.

START!

1. When you enter the website, you will land on the Home page, which gives a brief overview of the ARTCOMM. website

2. Click Login to move to the next page. Choose Admin account to continue (We haven't created a page for non-admin users yet).

3. On the /admin_login page, you need to enter your username and password to confirm admin access.
   You can find the username and password in the Database Table: Adminlogin.
   For quick access, you can copy this:
   
   {
   "Username": "Francis_admin",
   "Password": "passAlice123"
   }
   
   Once logged in, a popup will appear. Click OK, and it will take you to the Welcome page. From there, you can either click Go to Product and Service or use the sidebar to navigate to other pages.

5. When you click Go to Product and Service, you'll be taken to the /product page.
   This page displays the 3 most recently added or edited artists.
   You can:
   - Click Edit to go to the details page of that artist.
   - Click Delete to remove the artist right away.
   - Click Add Product/Service to go to the /product_manage page and add artist.
     
In the /product_manage page. If you want to add an artist, you must complete all fields; otherwise, a popup will remind you. Required fields include:

   - Artist's name
   - Artist's language
   - Artist's country
   - Artist's status (Click if available)
   - About Me (Artist's bio)
   - URL of Artist's work (use URLs ending in .jpg or .png ,the image will appear only after saving. *safest way is to copy image address from pinterest*)
     Example URL: https://i.pinimg.com/736x/14/8c/6b/148c6b35af506a6da86ad2d0d0c5d830.jpg (You can copy one for testing)
   - Artist's base price for one art
     
   Once all fields are filled, click Save.
   The system will redirect you to /artist_details?id=ART000… and show the newly added artist's details.
   
  !!! **If you see a popup saying:
   "Failed to add artist. Please check your connection."
   Please check the Backend terminal immediately.
   If there's an error
   -press Control + C
   -type npm start again
   -Use the right photopath end with .png and .jpg (safest way is to copy image address from pintererest)
   -refresh the /product_manage page and add the information again** !!!

6. On the /search page (click the 🔎 icon in the navbar), you can search using 4 criteria:
   - Category (dropdown)
   - Artist (search by name)
   - Base price (starting price)
   - Status (choose to show only available artists or all artists)
   (You can use as many criteria as you want to search with)
   After clicking Search, you'll be taken to a results page. Click View Details to see more info about each artist.

7. The details page shows:
   - Artist ID
   - Artist's name
   - Artist's language
   - Artist's country
   - Artist's status (Available now or Unavailable)
   - About Me
   - URL of Artist's work
   - Artist's base price for one art
   - [Convert to THB] button (may take a few seconds to load the converted price)

   Buttons on this page:
   - Edit: A popup will let you change fields and save changes.
   - Delete: A popup will confirm the action ,click OK to delete or Cancel to abort.

8. On the /team page (accessed from the sidebar), you'll find information about each admin. You can click on their social media icons to view their profiles.

**You can switch the website language to Thai on any page by clicking the "EN" button in the navbar and choosing Thai (TH).**
