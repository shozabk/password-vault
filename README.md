# Pass Vault - Chrome Extension

Pass Vault is a chrome extension that helps a user store and organize passwords. Password managers usually store passwords encrypted, requiring the user to create a master password: a single, ideally very strong password which grants the user access to their entire password database.

# Installing in Chrome

To install the Pass Vault Chrome extension in Chrome, you can follow these steps:

1. Open Chrome and navigate to the Extensions page by typing chrome://extensions in the address bar.
2. Enable the Developer mode by toggling the switch in the top right corner of the page.
3. Click on the "Load unpacked" button.
4. In the file dialog, navigate to the directory where you built the Pass Vault extension (e.g., /Users/ahmadraza/Desktop/hexaa/pass-vault).
5. Select the folder containing the built extension and click "Select" to install it.

Alternatively, you can also install the extension using the command line:

1. Open a terminal or command prompt.
2. Navigate to the directory where you built the Pass Vault extension.
3. Run the following command to install the dependencies:

```
$ npm install
```

4. Build the extension using the following command:

```
$ npm run build
```

5. Follow steps 1-4 from the previous method to install the extension using the "Load unpacked" option.

Please note that the exact steps may vary depending on your operating system and Chrome version.

# Screenshots

**Login Panel:** Where users can login via entering credentials

![Screenshot](/public/ss.png)

**Saved Passwords Panel:** Where users can view credentials

![Screenshot](/public/ss1.png)

**Saved Passwords Panel:** Where users can add new credentials

![Screenshot](/public/ss2.png)
