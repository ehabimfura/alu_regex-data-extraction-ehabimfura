// extract.js
// Regex Data Extraction & Secure Validation
//Importing the file system module
const fs = require('fs');

// step1: Read the input file found in the same folder called 'input.txt'
const text = fs.readFileSync('input.txt', 'utf-8');

// step2: Define regex patterns
const emailPattern = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
const urlPattern = /https?:\/\/[^\s]+/g;
const phonePattern = /\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/g;
const cardPattern = /\b(?:\d{4}[-\s]?){3}\d{4}\b/g;
const time24Pattern = /\b([01]?[0-9]|2[0-3]):[0-5][0-9]\b/g;
const time12Pattern = /\b(1[0-2]|0?[1-9]):[0-5][0-9]\s?(AM|PM|am|pm)\b/g;

// step3: Extract matches from the text file
let emails = text.match(emailPattern) || [];
let urls = text.match(urlPattern) || [];
let phones = text.match(phonePattern) || [];
let cards = text.match(cardPattern) || [];
let times24 = text.match(time24Pattern) || [];
let times12 = text.match(time12Pattern) || [];

// step4: Validation & Security
// reject crooked emails | double @ or ..
emails = emails.filter(e => !e.includes('..') && !e.includes('@@'));

//Preventing unnecessary exposure
// mask emails (show first + last char of username, keep domain)
emails = emails.map(e => {
    const [user, domain] = e.split('@');
    if (user.length <= 2) return e; 
    return user[0] + '***' + user[user.length - 1] + '@' + domain;
});

// reject unsafe URLs
urls = urls.filter(u => u.startsWith('http'));

// Preventing unnecessary exposure once again
// mask credit cards
cards = cards.map(c => "****-****-****-" + c.slice(-4));

// step5: build results object
const results = {
    emails: emails,
    urls: urls,
    phones: phones,
    credit_cards: cards,
    timestamps: [...times24, ...times12] // combine both time formats
};

// step6: produce a secure, well organized JSON report
console.log(JSON.stringify(results, null, 4));
