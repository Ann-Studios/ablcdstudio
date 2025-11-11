# PayPal Integration Setup

## Overview
Your app now supports two payment providers:
- **KKiaPay** - For XOF (West African CFA franc) payments
- **PayPal** - For international currencies (USD, EUR, CAD, GBP, NGN, GHS, XAF)

## Getting Your PayPal Client ID

### 1. Log into PayPal Developer Dashboard
1. Go to https://developer.paypal.com/
2. Log in with your PayPal account (your personal Canadian account will work)
3. Click on "Dashboard" in the top menu

### 2. Create an App (if you haven't already)
1. Go to "Apps & Credentials"
2. Make sure you're in **Sandbox** mode for testing
3. Click "Create App"
4. Give it a name (e.g., "ABLCD Studios Payments")
5. Click "Create App"

### 3. Get Your Client ID
1. After creating the app, you'll see two keys:
   - **Client ID** (this is what you need)
   - **Secret** (keep this private, not needed for frontend)
2. Copy the **Client ID**

### 4. Add to Your Environment Variables
1. Copy `.env.example` to `.env.local` (if you haven't already)
2. Add your PayPal Client ID:
   ```
   VITE_PAYPAL_CLIENT_ID=your_sandbox_client_id_here
   ```

### 5. Test in Sandbox Mode
- Use PayPal's test accounts to test payments
- In the PayPal Developer Dashboard, go to "Sandbox" > "Accounts"
- You'll see test buyer and seller accounts
- Use these to test your integration

## Going Live

When you're ready for production:

1. Switch to **Live** mode in the PayPal Developer Dashboard
2. Create a new app (or use the same one in Live mode)
3. Get your **Live Client ID**
4. Update your production environment variables with the Live Client ID
5. Make sure your PayPal account is verified and can receive payments

## Currency Support

PayPal supports these currencies in your app:
- USD (US Dollar)
- EUR (Euro)
- CAD (Canadian Dollar)
- GBP (British Pound)
- NGN (Nigerian Naira)
- GHS (Ghanaian Cedi)
- XAF (Central African CFA franc)

Note: XOF payments will still go through KKiaPay for better rates.

## How It Works

1. User selects currency and amount on `/payments` page
2. If currency is **XOF** → KKiaPay payment widget opens
3. If currency is **anything else** → PayPal buttons appear
4. After successful payment → User is redirected back to AI consultation

## Troubleshooting

**PayPal buttons don't show up?**
- Check that `VITE_PAYPAL_CLIENT_ID` is set in your `.env.local`
- Make sure you've restarted your dev server after adding the variable
- Check browser console for any errors

**"Payment configuration missing" message?**
- The PayPal Client ID is not set or not loading properly
- Verify the environment variable name is exactly `VITE_PAYPAL_CLIENT_ID`

**Need help?**
- PayPal Developer Docs: https://developer.paypal.com/docs/
- PayPal Integration Wizard: https://developer.paypal.com/integration-wizard/
