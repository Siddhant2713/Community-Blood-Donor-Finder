# Community Blood Donor Finder

A dynamic and responsive React application designed to help users find and connect with available blood donors in their community. Built with React and Vite.

## 🚀 Features

- **Dynamic Data Fetching**: Retrieves user data from an external mock API (`jsonplaceholder.typicode.com/users`) and transforms it to include mock blood groups and availability statuses.
- **Smart Filtering**: 
  - Filter donors by specific **Blood Groups** (e.g., A+, O-, AB+) via a dropdown menu.
  - Search donors by **City** in real-time with case-insensitive search.
- **Sorting Logic**: Instantly toggle to sort available donors to the top of the list.
- **Interactive Requests**: Click "Request Help" on any available donor. The app intelligently handles per-donor interaction states (preventing duplicate requests) by tracking requested IDs.
- **Robust UI States**: Gracefully handles loading spinners, empty data fallbacks ("No donors found"), and disabled button states for unavailable donors.
- **Clean Component Architecture**: Built using decoupled React components (`Filters`, `DonorList`, `DonorCard`, `Header`, `Spinner`) promoting single-responsibility principles and strict down-ward prop flow.

## 🛠️ Tech Stack

- **Framework**: React 18
- **Build Tool**: Vite
- **Styling**: Vanilla CSS (Fully responsive grid layout with custom hover states, animations, and soft shadows) + Tailwind CSS support.

## 📁 Component Structure

```text
src/
├── components/
│   ├── Header.jsx        # Static application title
│   ├── Filters.jsx       # Inputs: Blood Group Dropdown, City Search, Sort Toggle
│   ├── DonorList.jsx     # Handles the iteration of data sets and array-empty states
│   ├── DonorCard.jsx     # Individual donor UI and Request Help interaction logic
│   └── Spinner.jsx       # Animated loading indicator
├── App.jsx               # Main state container; handles data fetching and deriving filtered results
├── index.css             # Global UI styles and responsive layouts
└── main.jsx              # React DOM entry point
```

## 🧠 State Management & Architecture

- **Derived State**: Instead of redundantly storing filtered data in new `useState` hooks, the UI dynamically calculates `filteredDonors` using a chained `.filter().sort()` pipeline native to the component render. This guarantees synchronized data states and prevents hard-to-track bugs.
- **Object Spread Tracking**: The "Request Help" feature tracks clicks using an object map (`{ [donor.id]: true }`). This enables exactly `O(1)` ID lookups for conditional CSS disabling across iterated arrays without mutating the parent array data.

## 🏃‍♂️ How to Run Locally

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Siddhant2713/Community-Blood-Donor-Finder.git
   cd Community-Blood-Donor-Finder
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to the URL provided in the terminal (usually `http://localhost:5173`).

---

*This project was built as an exercise in robust React Component architecture, UI state management, and clear data flows.*
