# alu_regex-data-extraction-ehabimfura

## 📌 Overview
This project demonstrates how to use **regular expressions (regex)** in JavaScript to extract and validate structured data from messy text input, similar to raw API responses.  
It emphasizes **accuracy, robustness, and security awareness** by handling real‑world variations and rejecting unsafe or malformed input.

---

## 📂 Project Structure

- `input.txt` — sample raw text data (messy API-like input)  
- `extract.js` — main source code with regex and validation logic  
- `sample-output.json` — example output after running the program  
- `README.md` — documentation and usage guide  
- `package.json` — optional, for npm workflow

---

## ⚙️ Features
- Extracts **emails, URLs, phone numbers, credit card numbers, timestamps**.
- Handles **realistic variations** (different formats, spacing, punctuation).
- Rejects **malformed or hostile input** (e.g., `user@@example..com`, `javascript:alert('XSS')`, invalid timestamps).
- Masks sensitive data:
  - Emails → `j***h@example.com`
  - Credit cards → `****-****-****-3456`
- Produces a **secure, well‑organized JSON report**.

---

## 🧩 Regex Patterns
- **Emails**  
[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}
→ Matches realistic email formats, rejects malformed ones.

- **URLs**  
https?://[^\s]+
→ Matches `http` and `https` links, ignores unsafe schemes.

- **Phone Numbers**  
?\d{3}?[-.\s]?\d{3}[-.\s]?\d{4}
→ Handles `(123) 456-7890`, `123.456.7890`, `123-456-7890`.

- **Credit Cards**  
\b(?:\d{4}[-\s]?){3}\d{4}\b
→ Matches 16‑digit cards with spaces or dashes, masks output.

- **Timestamps**  
- 24‑hour →  
  ```
  \b([01]?[0-9]|2[0-3]):[0-5][0-9]\b
  ```
- 12‑hour →  
  ```
  \b(1[0-2]|0?[1-9]):[0-5][0-9]\s?(AM|PM|am|pm)\b
  ```

---

## 🔒 Security Considerations
- **Sensitive data masking**: Emails and credit cards are partially hidden in output.  
- **Validation filters**: Reject malformed emails, unsafe URLs, invalid timestamps.  
- **No logging of raw sensitive data**: Only masked values appear in output or logs.  
- **Defensive coding**: Designed to ignore hostile input instead of processing it.  

---

## 🚀 How to Run
```bash
node extract.js

Sample Output:
{
    "emails": [
        "j***k@example.co.uk",
        "j***h@example.com",
        "m***n@company.co.uk",
        "s***e@example.net"
    ],
    "urls": [
        "https://shop.example.com/products?id=123",
        "http://example.org",
        "https://sub.example.org/page",
        "https://example.com"
    ],
    "phones": [
        "(123) 456-7890",
        "123.456.7890",
        "123-456-7890",
        "(555) 123-4567"
    ],
    "credit_cards": [
        "****-****-****-3456",
        "****-****-****-6543",
        "****-****-****-7654",
        "****-****-****-8888"
    ],
    "timestamps": [
        "14:30",
        "2:30 PM",
        "09:05 am"
    ]
}
