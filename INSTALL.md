# Installation Guide

This guide will help you set up the Quantum-Safe Password Generator on your local machine.

## Prerequisites

- Node.js 18.0 or higher
- npm 7.0 or higher

## Step-by-Step Installation

1. **Clone the Repository**

```bash
git clone https://github.com/yourusername/quantum-safe-password-generator
cd quantum-safe-password-generator
```

2. **Install Dependencies**

```bash
npm install
```

3. **Start Development Server**

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Production Deployment

1. **Build the Application**

```bash
npm run build
```

2. **Preview Production Build**

```bash
npm run preview
```

## Environment Variables

No environment variables are required as all operations are performed client-side.

## Troubleshooting

### Common Issues

1. **Node Version Mismatch**
   ```bash
   # Check Node.js version
   node --version
   
   # Use nvm to install correct version
   nvm install 18
   nvm use 18
   ```

2. **Port Already in Use**
   ```bash
   # Kill process using port 5173
   npx kill-port 5173
   ```

3. **Dependencies Issues**
   ```bash
   # Clear npm cache
   npm cache clean --force
   
   # Remove node_modules and reinstall
   rm -rf node_modules
   npm install
   ```

## Security Considerations

- All password generation is performed client-side
- No passwords are stored on servers
- Local storage is encrypted using Web Crypto API
- Regular security audits are recommended

## Updates and Maintenance

1. **Update Dependencies**
   ```bash
   npm update
   ```

2. **Check for Vulnerabilities**
   ```bash
   npm audit
   ```

## Support

For additional support:
- Open an issue on GitHub
- Check existing issues for solutions
- Review the FAQ in the README