# How to Host Your Oscar Leaderboard

Since we built this using React and Next.js, the absolute best (and free) place to host it is on **Vercel** (the company that makes Next.js). There are two ways to do it, depending on what you prefer.

## Option A: The Super Fast CLI Way (Recommended)
This is the easiest way to get it online fast without leaving your terminal.

1. Open a new terminal in the `2026-oscars-leaderboard` folder.
2. Run this command:
   ```bash
   npx vercel
   ```
3. It will ask you to log in to Vercel (or create an account).
4. Follow the prompts in the terminal:
   - Set up and deploy -> `Yes`
   - Scope -> (Your name)
   - Link to existing project -> `No`
   - Project name -> `oscar-leaderboard`
   - In which directory -> `./`
5. Once it finishes setting up the project, it will upload your code.
6. **IMPORTANT:** Go to your new project's dashboard on Vercel.com, click "Settings" > "Environment Variables" and add `GOOGLE_SHEET_ID` with your sheet ID: `1laUmrg0B40zXrNriqToHZ91cQx44UvMn4bU78VjLSqo`.
7. Once the environment variable is added, run this command in your terminal to push it live to production:
   ```bash
   npx vercel --prod
   ```
8. It will give you a beautiful, live production URL to share with your friends!

---

## Option B: The GitHub Way
This is better if you plan to continue making lots of code changes to the site in the future.

1. Go to [github.com](https://github.com) and create a new repository (e.g., `oscar-leaderboard`).
2. Push your code to the new repository.
3. Go to [vercel.com](https://vercel.com) and click **"Add New..."** -> **"Project"**.
4. Import your new `oscar-leaderboard` GitHub repository.
5. In the "Configure Project" screen, open the **"Environment Variables"** dropdown. Add `GOOGLE_SHEET_ID` and paste your sheet ID: `1laUmrg0B40zXrNriqToHZ91cQx44UvMn4bU78VjLSqo`.
6. Click **"Deploy"**. Vercel will build the site and give you a live URL to share!
