# QR Studio - Advanced QR Code Generator

A modern, feature-rich QR Code Generator built with **React**, **Vite**, and **Tailwind CSS**. This application offers specialized support for creating Thai PromptPay QR codes, social media links, and custom-designed QR cards perfect for business and personal use.

## ✨ Key Features

### 🎨 Personalization & Design
*   **Custom Frames**: Choose from a variety of styles including "Scan Me" bubbles, polarized cards, and clean borders.
*   **Social Media Icons**: Integrated high-quality, circular vector logos for **Facebook, Instagram, Line, Twitter (X), YouTube, TikTok, WhatsApp, and Telegram**.
*   **Dynamic Customization**:
    *   **Logo Sizing**: Adjust logo size from 10% to 40% of the QR code.
    *   **Transparent Backgrounds**: Logos float naturally over the code without ugly white boxes.
    *   **Frame Scaling**: "Scan Me" bubbles automatically resize and balance with your QR code.
*   **Color Control**: Customize QR dots, background colors, and frame accents.
*   **Background Images**: Upload your own background images for cards.
*   **Drag & Drop**: Intuitive touch-enabled dragging to position your QR code and background image.

### 🇹🇭 Localization
*   **Bilingual Support**: Fully translated interface in **Thai (TH)** and **English (EN)**.
*   **Local Context**: Pre-configured for Thai users with PromptPay integration (simulated/ready for API).

### 🛠️ Technical Highlights
*   **Modern Stack**: Built on React 18+ and Vite for blazing fast performance.
*   **Styling**: Utilizes Tailwind CSS v4 for a responsive and beautiful UI.
*   **Vertical Layout**: Default canvas optimized for mobile screens and social media stories (3:4 aspect ratio).
*   **High-Quality Output**: Generates sharp PNG downloads suitable for printing or digital sharing.

## 🚀 Getting Started

### Prerequisites
*   Node.js (v16 or higher)
*   npm or yarn

### Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/meen2nont/free-qrcode.git
    cd free-qrcode
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

3.  Start the development server:
    ```bash
    npm run dev
    ```

4.  Open your browser and navigate to `http://localhost:5173`.

## 📦 Project Structure

```
free-qrcode/
├── public/              # Static assets (SVGs, favicons)
├── src/
│   ├── components/      # Reusable UI components
│   ├── App.jsx          # Main application logic
│   ├── main.jsx         # Entry point
│   └── index.css        # Tailwind imports & global styles
├── index.html           # HTML entry
├── vite.config.js       # Vite configuration
└── tailwind.config.js   # Tailwind configuration
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

This project is open-source and available under the [MIT License](LICENSE).
