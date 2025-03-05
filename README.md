# Miten moni on tehnyt tämän? - Svelte & Supabase

A simple community-driven web application where users can share experiences and see how many others have done the same. Built using SvelteKit, Supabase, and Pico.css.

Features
--------

-   Users can add a new experience to the list.
-   Users can see how many people have experienced the same thing.
-   Clicking "Minäkin!" increments the count.
-   The application is styled with Pico.css for a clean user interface.

Technologies Used
-----------------

-   SvelteKit for frontend development.
-   Supabase as the backend and database.
-   Pico.css for minimalist styling.

Installation and Setup
----------------------

### Clone the Repository

1.  Open a terminal and run:

    ```
    git clone https://github.com/KamillaKa/oletko.git
    cd oletko
    ```

### Install Dependencies

1.  Run the following command to install required packages:

    `npm install`

### Setup Environment Variables

1.  Create a file named `.env` in the project root and add the following:
    ```
    VITE_SUPABASE_URL=https://your-supabase-project.supabase.co
    VITE_SUPABASE_ANON_KEY=your-anon-key-here
    ```

    These values can be obtained from the Supabase dashboard under Project Settings → API.

Running the Project
-------------------

### Start Development Server

To start the development server, run:

`npm run dev`

The application will be available at `http://localhost:5173`.

### Build for Production

To create a production-ready build:

`npm run build`

To preview the production build:

`npm run preview`

Testing the Application
-----------------------

### Adding a New Experience

1.  Open the application in a browser.
2.  Enter an experience in the input field (for example, "Traveled to Japan").
3.  Click "Lisää kokemus".
4.  Check the Supabase dashboard to confirm that the experience has been added to the database.

### Clicking "Minäkin!"

1.  Click the "Minäkin!" button next to an existing experience.
2.  The number should increment immediately.
3.  Refresh the page to verify that the count remains updated.

**Troubleshooting**
-------------------

### **If the list is empty and does not show experiences**

-   Ensure you have created a **Supabase "SELECT" policy** for the `experiences` table.
-   Check the browser console (`F12` → Console) for any errors.
-   Test directly in the Supabase SQL editor:

    `SELECT * FROM experiences;`

    If this does not return any data, the database may be empty, or the policies might be blocking data retrieval.

* * * * *

### **If new experiences are not being saved**

-   Ensure that Supabase allows inserting new data.
-   Add an "INSERT" policy in Supabase:
    1.  Go to **Supabase Dashboard → Table Editor → experiences → Auth Policies**.
    2.  Click **"New Policy"**.
    3.  Select **"Enable insert for all users"**.
    4.  Make sure the settings are:
        -   **Policy Name:** `Allow public insert`
        -   **Policy Command:** `INSERT`
        -   **Condition (Using Expression):** `true`
    5.  Save the changes and test the app again.

* * * * *

### **If clicking "Minäkin!" does not work**

-   Ensure you have created a **Supabase "UPDATE" policy** for the `experiences` table.

-   Open the Supabase SQL editor and run:

    `SELECT * FROM experiences WHERE id = 7;`

    If the row exists but **the count does not update**, ensure the `count` column is allowed to be modified.

-   Add an "UPDATE" policy:

    1.  Go to **Supabase Dashboard → Table Editor → experiences → Auth Policies**.
    2.  Click **"New Policy"**.
    3.  Select **"Enable update for all users"**.
    4.  Make sure the settings are:
        -   **Policy Name:** `Allow public update`
        -   **Policy Command:** `UPDATE`
        -   **Condition (Using Expression):** `true`
    5.  Save the changes and test the app again.

* * * * *

### **If Supabase API returns `401 Unauthorized`**

-   Ensure your **`.env.local`** file contains the correct API keys:

    ```
    VITE_SUPABASE_URL=https://your-supabase-project.supabase.co
    VITE_SUPABASE_ANON_KEY=your-anon-key-here
    ```

-   Restart the app:

    `npm run dev`

-   Check the Supabase Dashboard to confirm that the **"Anon Key"** is correctly copied.

* * * * *

### **If nothing works**

-   Check **Supabase Logs** (Dashboard → Logs) to see if there are any errors.
-   Clear the browser cache and reload the page.
-   Try restarting the project:

    `npm run dev`

-   If the issue persists, open developer tools (`F12` → Network) and check if API requests return errors.