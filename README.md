# cryptographic-audit-layer


## Problem Statement
In systems that store sensitive records like exam grades, medical entries, financial transactions etc. we place enormous trust in the people who have our database 
access. That trust is rarely questioned, and even more rarely verified.

The uncomfortable truth is that a single UPDATE query can silently rewrite history. Standard audit logs don't solve this, they live in the exact same database as 
the records they're meant to protect, which means they're just as easy to alter. A tampered log, ironically, looks identical to an honest one.

This isn't a hypothetical risk. Grade disputes, falsified attendance records, and quietly "corrected" medical entries happen because no current system can 
mathematically prove a record wasn't changed after the fact, only claim it wasn't.

What if a professor could silently change your failing grade with zero trace?

We built the Cryptographic Audit Layer to make that question impossible to answer "yes" to.


## Our Solution
Instead of trying to make the database itself untouchable, which isn't realistic for most institutions. we built a layer that sits between the application and the 
database and makes tampering provable instead of preventable.

Every time a record changes, we don't just log what happened. We generate a cryptographic hash of that change and link it to the hash of the previous entry, the 
same way each block references the one before it in a blockchain. Over time this creates a chain: entry #47 mathematically depends on entry #46, which depends on 
#45, all the way back to the first record ever created.

Here's the part that actually matters, if someone edits an old record directly in the database, skipping our application entirely, the stored hash for that entry 
no longer matches what we'd recompute from its (now-altered) data. The chain breaks at exactly that point, and nowhere else. We built a verification process that 
walks the entire chain, catches the break, and tells you precisely which record, which field, and roughly when it was altered.

We're not using an actual blockchain here, no mining, no tokens, no distributed network of nodes verifying anything. Institutions like a college or a hospitals 
don't need a trustless global network, they just need proof that their own records weren't quietly rewritten. So we took the one piece of blockchain technology 
that actually solves this problem "hash-linking" and left the rest out.


## Key Features
Every single change to a record which are create, update, or delete,  generates a cryptographic entry linked to the one before it. Nothing gets added to this 
history without becoming part of an unbroken, mathematically verifiable chain.

Live "Break It Yourself" Panel : This is the feature we're most proud of. Instead of asking anyone to just trust that our system catches tampering, we built an 
admin screen where you can directly 
edit a record, bypassing the normal app flow entirely, the way a rogue database admin would and then hit Verify to watch the system catch it in real time.

Pinpoint Break Detection : When verification fails, we don't just say "something's wrong somewhere." The system tells you the exact entry, the exact field, and 
roughly when the tampering 
happened, because a security tool that can't tell you where the problem is isn't much more useful than not having one.

Visual Chain Explorer : The entire audit history is shown as a connected chain of entries. green where everything checks out, red at the exact point it doesn't. 
You don't need to 
understand cryptography to look at this screen and immediately know something's wrong.

Zero Infrastructure Overhead : No blockchain network, no tokens, no nodes to run or maintain. This is a layer you drop in front of an existing database. any 
college, clinic, or institution can 
adopt it without touching their current systems.


## How It Works 
The system sits as a layer between your application and your database, every write passes through it before it reaches the record itself.

1. A record changes.
A grade gets updated, a new attendance entry gets added, any write operation on a sensitive record.

2. We create an audit entry, not just a log line.
This entry contains the change itself (old value, new value, who made it, when) plus one extra thing a normal log doesn't have: a hash of the previous audit 
entry, called prev_hash.

3. We hash the whole entry.
Everything in that entry, including prev_hash gets run through SHA-256 to produce this entry's own hash. That hash becomes part of what the next entry links back 
to. This is what turns a list of logs into an actual chain.

4. Verification walks the chain.
When someone hits "Verify Integrity," the system starts from the very first entry and recomputes every hash in order, checking that each one still matches what's
stored and still lines up with the next entry's prev_hash. The moment something doesn't match, that's where tampering happened and everything before that point is 
still provably untouched.

6. Bypassing the app doesn't help an attacker.
Even if someone edits a row directly in PostgreSQL skipping our application layer entirely, the stored hash for that row no longer matches what we'd recompute 
from the altered data. There's no way to tamper with a record without also having to recompute every single hash after it, which is exactly the property that
makes this detectable.


## Tech Stack

Frontend
React (Vite) – Fast, component-based user interface and development server.
Tailwind CSS / Lucide Icons – Clean styling, responsive layout, and modern icon set for audit status indicators.
State & Data Handling – Modular React hooks paired with mockApi.js for instant local testing and fallback logic.

Backend & Database: Node.js & Express – REST API handling endpoints, data routing, and request validation. SQLite / Supabase (PostgreSQL) – Database setup used to 
store audit records, logs, and verification hashes (SQLite for local testing, Supabase for production hosting).

Deployment & Infrastructure
Vercel – Frontend hosting, continuous integration, and automated deployments from GitHub.
Render – Live web service platform hosting the Node.js API server and database setup.
Git & GitHub – Version control and project collaboration workflow.


## Demo
GitHub Repository: https://github.com/Palakkarwade07/cryptographic-audit-layer

link: cryptographic-audit-layer.vercel.app 


## Screenshots
<img width="1902" height="905" alt="image" src="https://github.com/user-attachments/assets/68a9cefa-89b2-421d-8ddd-9f00c1b32b1f" />
<img width="1887" height="901" alt="image" src="https://github.com/user-attachments/assets/2d90757c-5b94-481d-8f16-626a1d63bdaf" />
<img width="1897" height="897" alt="image" src="https://github.com/user-attachments/assets/a21b4ec6-42ce-439c-864a-e621fa71543f" />
<img width="1651" height="475" alt="image" src="https://github.com/user-attachments/assets/46d8ef8d-e505-410d-a279-1b23a57dc9c5" />
<img width="1312" height="823" alt="image" src="https://github.com/user-attachments/assets/8b369d5b-c8ea-4e49-93d2-adbfe7c33ccb" />


## Innovation & Impact
Most "audit trail" systems on the market are informational, they tell an admin what happened, assuming the admin was telling the truth when the log was written. 
Ours is evidentiary. It doesn't just record events, it proves the record of those events wasn't touched after the fact. That distinction sounds small, but it's 
the actual gap between "we log everything" and "we can prove nothing was hidden."

We picked exam records as our first use case because the stakes are relatable and the failure mode is common. grade disputes happen at almost every institution, 
and right now there's no way for a student, a professor, or an administrator to definitively settle one. With this system in place, a disputed grade change isn't 
a matter of he-said-she-said. it's either mathematically consistent or it isn't.

The same layer works anywhere silent tampering is a real risk and full blockchain infrastructure would be overkill. hospital record systems, attendance logs, 
financial approval chains, even chain-of-custody logs for physical evidence. Any institution that already has a database can add this without migrating anything 
or changing how their existing application works.


## Future Scope
Right now the system proves that a record was tampered with and where. the next step is proving who did it. We're working on signing every entry with the acting 
user's private key, so tampering isn't just detected but tied to a specific, accountable person.

As the audit history grows into the millions of entries, walking the entire chain linearly for verification stops being practical. We're moving to Merkle tree 
batching, grouping entries under a single root hash, so verifying years of history takes a handful of comparisons instead of reading every single row.

Longer term, we want to let an institution generate a small proof that a specific record hasn't been altered, without exposing the record's actual contents to 
whoever's checking. Think a placement cell verifying a student's grades weren't changed, without the student having to hand over their entire academic history to 
prove it.


## Team
Built by BitRot: palak karwade, atharvaa jorwerkar and ritu khandelwal for tech eximus, 2026.
