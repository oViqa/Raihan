# Raihan - E-commerce with WhatsApp Integration

A Next.js e-commerce website that displays products online but processes orders through WhatsApp.

## Features

- Modern UI built with Next.js and Tailwind CSS
- Responsive design that works on all devices
- Product catalog with category filtering
- WhatsApp integration for order processing
- Server-side rendering with Next.js App Router

## Technology Stack

- **Frontend**: Next.js 14 with TypeScript
- **Styling**: Tailwind CSS
- **Routing**: Next.js App Router
- **State Management**: React useState and useEffect hooks

## Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm or yarn

### Installation

1. Clone the repository

```bash
git clone <repository-url>
cd raihan
```

2. Install dependencies

```bash
npm install
# or
yarn install
```

3. Run the development server

```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Project Structure

```
├── app/                  # Next.js App Router structure
│   ├── components/       # Reusable UI components
│   ├── products/         # Products page
│   ├── layout.tsx        # Root layout component
│   ├── page.tsx          # Home page component
│   └── globals.css       # Global CSS
├── public/               # Static assets
└── package.json          # Project dependencies
```

## Customization

- Update the WhatsApp phone number: Edit it in `components/WhatsAppButton.tsx` and other relevant components
- Modify the product catalog: Edit the `PRODUCTS` array in `app/products/page.tsx`
- Change the styling: The project uses Tailwind CSS which can be customized in the component files

## License

This project is open source and available under the [MIT License](LICENSE).

## Contact

For any inquiries about this project, please reach out via WhatsApp or email.
