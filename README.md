# oswal

Demo setup

- Open `index.HTML` and login using demo emails:
	- Admin: `admin@admin.com` / any password (redirects to `admin-dashboard.html`)
	- Client: `demo@client.com` / any password (redirects to `client-dashboard.html`)

- Admin features added for demo:
	- Payments dashboard and export (CSV) to simulate Appwrite→Google Sheets sync
	- Automation logs showing demo sync events
	- Revenue trend and payment method visualizations (Chart.js)

Notes: Data is stored in `localStorage` to keep the demo self-contained. Use the UI to generate orders/payments and export CSV from Admin → Payments.

Distributor management

- Admin → Distributors: add and manage distributors (name/contact/region).
- Orders can be assigned to distributors from Orders view (Assign Distributor). Assigned distributor revenue appears in the Distributor Performance chart on the dashboard.

All distributor data is stored in `localStorage` under `erp_distributors` for the demo.