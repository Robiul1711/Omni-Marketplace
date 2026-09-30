# Omni Marketplace — Client Requirements & Frontend Implementation Guide

> **Document Type:** Project Note & Implementation Specification  
> **Date:** September 2026  
> **Target System:** Omni Marketplace Frontend (`mrsmith122-frontend`)  
> **Author / Lead:** Jubayer & Frontend Engineering Team  

---

## Table of Contents
1. [Executive Summary (ক্লায়েন্টের চাহিদার মূল সারসংক্ষেপ)](#1-executive-summary)
2. [Financial Flow & Mathematical Model (আর্থিক ও ট্যাক্স হিসাব)](#2-financial-flow--mathematical-model)
3. [Platform Feature Requirements (প্ল্যাটফর্ম ফিচার স্পেসিফিকেশন)](#3-platform-feature-requirements)
   - [Feature 1: Configurable Dynamic Tax & Price Breakdown](#feature-1-configurable-dynamic-tax--price-breakdown)
   - [Feature 2: Buyer Cancellation & Dispute System](#feature-2-buyer-cancellation--dispute-system)
   - [Feature 3: Omni Marketplace Mandatory First Slot (Slot 1)](#feature-3-omni-marketplace-mandatory-first-slot-slot-1)
   - [Feature 4: Campaign Previews & Approval Workflow](#feature-4-campaign-previews--approval-workflow)
   - [Feature 5: Host Social Media & Website Profiles](#feature-5-host-social-media--website-profiles)
   - [Feature 6: Automated Welcome Package Architecture](#feature-6-automated-welcome-package-architecture)
4. [File-by-File Frontend Implementation Map (কোডবেস ফাইল ম্যাপ)](#4-file-by-file-frontend-implementation-map)
5. [Client Reply & Launch Budget Strategy (ক্লায়েন্টকে রিপ্লাই ও মাইলস্টোন প্ল্যান)](#5-client-reply--launch-budget-strategy)

---

## 1. Executive Summary

ক্লায়েন্টের পাঠানো বিস্তারিত দিকনির্দেশনায় প্ল্যাটফর্মের অর্থনৈতিক স্বচ্ছতা, বায়ারের আত্মবিশ্বাস বৃদ্ধি এবং ওমনি মার্কেটপ্লেসের ব্র্যান্ড প্রসারের জন্য ৭টি গুরুত্বপূর্ণ রিকোয়ারমেন্ট দেওয়া হয়েছে:

| # | এরিয়া | মূল রিকোয়ারমেন্ট | দায়িত্ব |
|---|---|---|---|
| **1** | **Stripe ফি বণ্টন** | স্ট্রাইপ প্রসেসিং ফি হোস্টের পেআউট (৮০%) থেকে কাটা হবে। ওমনির ২০% প্ল্যাটফর্ম ফি অক্ষত থাকবে। | Backend + Frontend |
| **2** | **১৩% কনফিগারেবল ট্যাক্স** | ১৩% ট্যাক্স বায়ারের পেমেন্টে যোগ হবে। এটি হোস্টের ৮০% শেয়ার কমাবে না। ট্যাক্স রেট হার্ডকোড করা যাবে না, কনফিগারেবল হতে হবে। | Frontend + Backend |
| **3** | **বায়ার ক্যান্সেলেশন ও ডিসপিউট** | বায়ার যেন ড্যাশবোর্ডের ক্যাম্পেইন ডিটেইলস থেকে সরাসরি ক্যান্সেলেশন বা ডিসপিউট সাবমিট ও ট্র্যাক করতে পারে। | Frontend (UI/Modal) + Backend API |
| **4** | **ওমনি প্রোমো ফার্স্ট স্লট** | প্রতিটা ক্যাম্পেইনের স্লাইডশোতে ১ নম্বর স্লট (Slot 1) বাধ্যতামূলকভাবে ওমনি মার্কেটপ্লেসের অফিশিয়াল কিউআর স্লাইড হবে। হোস্ট এটিকে পরিবর্তন করতে পারবে না। | Frontend (Locked Slot) + Backend |
| **5** | **ক্যাম্পেইন প্রিভিউ সিস্টেম** | হোস্ট স্লাইডশো ডাউনলোড করে প্রিভিউ লিঙ্ক/ফাইল সাবমিট করবে। বায়ার লাইভ হওয়ার আগেই ড্যাশবোর্ড থেকে প্রিভিউ রিভিউ ও অ্যাপ্রুভ করবে। | Frontend + Backend |
| **6** | **হোস্ট সোশ্যাল ও ওয়েবসাইট লিঙ্ক** | হোস্ট প্রোফাইল ও প্লেসমেন্ট পেজে ওয়েবসাইট এবং সোশ্যাল মিডিয়া (Facebook, IG, YouTube, LinkedIn) লিংক যুক্ত থাকবে। | Frontend Settings & View |
| **7** | **বাজেট ও লঞ্চ স্কোপ** | ক্লায়েন্টের ব্যক্তিগত আর্থিক পরিকল্পনার সুবিধার জন্য সম্পূর্ণ প্ল্যাটফর্ম লঞ্চ করতে বাকি কাজের তালিকা ও খরচের স্পষ্ট ব্রেকডাউন দিতে হবে। | Management / Proposal |

---

## 2. Financial Flow & Mathematical Model

### A. Buyer Checkout Formula
- **Base Package Price ($P$):** হোস্ট কর্তৃক নির্ধারিত প্যাকেজ মূল্য (যেমন: `$100.00`)
- **Configurable Tax Rate ($T$):** ডিফল্ট `13%` (Environment Variable `VITE_TAX_RATE` অথবা Backend API থেকে কনফিগারেবল)
- **Applicable Tax Amount:** $\text{Tax} = P \times T = \$100 \times 0.13 = \$13.00$
- **Total Paid by Buyer ($B_{\text{total}}$):**
  $$\mathbf{B_{\text{total}} = P + \text{Tax} = \$100 + \$13 = \$113.00}$$

### B. Host Payout Formula
- **Gross Service Base ($P$):** `$100.00`
- **Omni Platform Fee (20%):** $\text{Fee}_{\text{Omni}} = P \times 0.20 = \$20.00$ (ট্যাক্স অ্যামাউন্ট এর ওপর কমিশন হয় না)
- **Host Base Share (80%):** $\text{Share}_{\text{Host}} = P \times 0.80 = \$80.00$
- **Stripe Actual Processing Fee ($\text{Fee}_{\text{Stripe}}$):** (যেমন: `2.9% + $0.30` যা লেনদেনের সাথে প্রযোজ্য, আনুমানিক `~$3.58`)
- **Net Payout to Host ($\mathbf{Payout}_{\text{Host}}$):**
  $$\mathbf{Payout}_{\text{Host}} = \text{Share}_{\text{Host}} - \text{Fee}_{\text{Stripe}} = \$80.00 - \$3.58 = \$76.42$$
  *(Note: Stripe ফি হোস্টের পেআউট থেকে বিয়োগ হবে, ওমনির $20 কমিশন স্পর্শ করবে না)*

### C. Partial Refund / Dispute Adjustment Formula
যদি কোনো কারণে বায়ারকে আংশিক রিফান্ড ($R$) দেওয়া হয়:
- **Net Retained Amount ($P_{\text{retained}}$):** $P - R$
- **Recalculated Omni Commission:** $P_{\text{retained}} \times 20\%$
- **Recalculated Host Share:** $(P_{\text{retained}} \times 80\%) - \text{Fee}_{\text{Stripe}}$
- **Post-Payout Protection:** হোস্টকে একবার ফান্ড রিলিজ হয়ে গেলে কোনো অটোমেটিক ক্লোব্যাক (auto clawback) হবে না; অ্যাডমিন ম্যানুয়ালি পরবর্তী পেআউট বা অফলাইন প্রসেসে সমাধান করবে।

---

## 3. Platform Feature Requirements

### Feature 1: Configurable Dynamic Tax & Price Breakdown
- **লক্ষ্য:** বায়ার চেকআউটে স্বচ্ছভাবে বেস প্রাইস এবং ১৩% ট্যাক্স আলাদা আলাদা দেখতে পাবে।
- **নিয়ম:** কোনো ট্যাক্স পারসেন্টেজ হার্ডকোড থাকবে না।
- **ফ্রন্টএন্ড সলিউশন:**
  ```javascript
  // Dynamic Tax Helper Utility
  const TAX_RATE = Number(import.meta.env.VITE_TAX_RATE) || 0.13;
  const calculateTotals = (packagePrice) => {
    const subtotal = Number(packagePrice) || 0;
    const taxAmount = Number((subtotal * TAX_RATE).toFixed(2));
    const totalAmount = Number((subtotal + taxAmount).toFixed(2));
    const omniFee = Number((subtotal * 0.20).toFixed(2));
    const hostShare = Number((subtotal * 0.80).toFixed(2));
    return { subtotal, taxAmount, totalAmount, omniFee, hostShare };
  };
  ```

### Feature 2: Buyer Cancellation & Dispute System
- **অবস্থান:** বায়ার ড্যাশবোর্ড > ক্যাম্পেইন ডিটেইলস (`/advertising/dashboard/campaign/:id`)
- **কার্যপদ্ধতি:**
  1. **Request Cancellation Modal:** বায়ার কাজ শুরুর আগে বা শর্ত না মানলে কারণ সিলেক্ট করে ক্যান্সেলেশন রিকোয়েস্ট পাঠাবে।
  2. **Open Dispute Modal:** ক্যাম্পেইন চলাকালীন সময়ে ডেলিভারি বা কোয়ালিটি নিয়ে অভিযোগ জানাতে স্ক্রিনশট/ডকুমেন্ট অ্যাটাচ করে ডিসপিউট করবে।
  3. **Live Status Tracking:** অর্ডারের টাইমলাইনে `Dispute Under Review`, `Refund Approved`, বা `Admin Mediating` স্ট্যাটাস দৃশ্যমান থাকবে।

### Feature 3: Omni Marketplace Mandatory First Slot (Slot 1)
- **লক্ষ্য:** প্রতিটা হোস্ট ক্যাম্পেইনের প্রথম স্লাইডটি ওমনি মার্কেটপ্লেসের কিউআর কোডসহ ব্র্যান্ডিং স্লাইড হতে হবে।
- **ফ্রন্টএন্ড সলিউশন:**
  - প্লেসমেন্ট তৈরির সময় (`CreatePlacement` > `Step2Campaign.jsx`) স্লট সেকশনে একটি লকড কার্ড থাকবে:
    > **Slot 1 (Pre-Reserved):** Omni Marketplace Official Promo Slide (Mandatory)  
    > *Hosts have $(N - 1)$ remaining slots available for advertiser placements.*
  - হোস্ট এই স্লট ডিলিট বা পরিবর্তন করতে পারবে না।

### Feature 4: Campaign Previews & Approval Workflow
- **লক্ষ্য:** বিজ্ঞাপন লাইভ হওয়ার আগে হোস্ট এবং বায়ারের মধ্যে প্রিভিউ রিভিউ চক্র নিশ্চিত করা।
- **হোস্ট ড্যাশবোর্ড (`ProofSubmission.jsx`):**
  - "Campaign Slideshow Generator / Bundle Download" বাটন।
  - "Submit Campaign Preview Link / File" ইনপুট ফিল্ড (Google Slides, Canva, Loom বা MP4/PDF আপলোড)।
- **বায়ার ড্যাশবোর্ড (`CampaignDetails.jsx`):**
  - "Campaign Preview Available" নোটিফিকেশন কার্ড।
  - ইন-অ্যাপ প্রিভিউ ভিউয়ার এবং দুটি অ্যাকশন বাটন: `Approve Preview` এবং `Request Revision`।

### Feature 5: Host Social Media & Website Profiles
- **লক্ষ্য:** বায়ার যেন হোস্টের লিস্টিং যাচাই করে তার অডিয়েন্স ও ব্র্যান্ড সম্পর্কে নিশ্চিত হতে পারে।
- **ইনপুট ফিল্ডস (হোস্ট সেটিংস):**
  - Website / Landing Page URL
  - Instagram Profile URL
  - Facebook Page URL
  - YouTube Channel URL
  - LinkedIn / Twitter (X) Profile URL
- **ডিসপ্লে:**
  - `HostDetailsPage` (Host Profile Card-এ ক্লিকেবল ব্র্যান্ডেড আইকন)
  - `PlacementDetails` (About Host সেকশনে ভেরিফায়েড সোশ্যাল ব্যাজ)

### Feature 6: Automated Welcome Package Architecture
- **সিস্টেম ফ্লো:**
  - ব্যবহারকারী সাইন আপ এবং ইমেইল ওটিপি ভেরিফাই সম্পন্ন করলে ব্যাকএন্ড স্বয়ংক্রিয়ভাবে একটি Transactional Welcome Email পাঠাবে।
  - ইমেইলে থাকবে: Welcome PDF Kit, Platform Guidelines, Host Monetization Checklist / Advertiser Media Guide।
  - ফ্রন্টএন্ড ভেরিফিকেশন সাকসেস স্ক্রিনে নোটিশ দেবে: *"Welcome! A personalized starter kit has been sent to your email."*

---

## 4. File-by-File Frontend Implementation Map

| ফাইল পাথ | পরিবর্তনের বিবরণ |
|---|---|
| `src/components/sites/booking-process/OrderSummary.jsx` | ডায়নামিক ট্যাক্স রেট (১৩%), সাবটোটাল ও গ্র্যান্ড টোটালের স্বচ্ছ ডিসপ্লে। |
| `src/pages/advertisingSites/CampaignDetails.jsx` | ক্যান্সেলেশন মোডাল, ডিসপিউট ফর্ম মোডাল, ট্র্যাকিং স্ট্যাটাস, এবং ক্যাম্পেইন প্রিভিউ রিভিউ উইজেট। |
| `src/components/hostDashboard/createPlacementStep/Step2Campaign.jsx` | Slot #1 ওমনি মার্কেটপ্লেস প্রোমো স্লাইডের লকড ব্যাজ ও গাইডেন্স ব্যানার। |
| `src/components/hostDashboard/myPlacement/ProofSubmission.jsx` | স্লাইডশো ডাউনলোড বাটন ও প্রিভিউ লিঙ্ক/ফাইল আপলোড ফিল্ড। |
| `src/components/hostDashboard/myPlacement/OrderSidebarInfo.jsx` | গ্রস ভ্যালু, ওমনি ২০% কমিশন, এবং হোস্টের ৮০% থেকে স্ট্রাইপ ফি কাটার ব্রেকডাউন। |
| `src/pages/hostDashboard/Earnings.jsx` | ডিসপিউট অ্যাডজাস্টমেন্ট ও নেট পেআউট হিসাবের গ্রাফ ও টেবিল। |
| `src/pages/hostDashboard/Settings.jsx` | হোস্টের ওয়েবসাইট ও ৫টি সোশ্যাল মিডিয়া অ্যাকাউন্টের ইনপুট ও সেভ হ্যান্ডলার। |
| `src/components/sites/hostDetails/HostProfileLeft.jsx` | হোস্ট প্রোফাইল কার্ডে ক্লিকেবল সোশ্যাল আইকন ও ওয়েবসাইটের লিঙ্ক রেন্ডারিং। |
| `src/components/sites/placement-details/LeftDetails.jsx` | প্লেসমেন্ট পেজে হোস্টের সোশ্যাল প্রোফাইল ও স্যাম্পল প্রিভিউ ডিসপ্লে। |
| `src/pages/auth/SignUp.jsx` & `VerifyOTP.jsx` | অ্যাকাউন্ট ভেরিফিকেশনের পর ওয়েলকাম প্যাকেজ পাঠানো সংক্রান্ত ইউজার ফিডব্যাক নোটিশ। |

---

## 5. Client Reply & Launch Budget Strategy

ক্লায়েন্ট যেহেতু জানতে চেয়েছে প্রজেক্ট লঞ্চ করতে বাকি কাজের স্কোপ ও আর্থিক বাজেট কত, নিচে ক্লায়েন্টকে পাঠানোর জন্য একটি সুনির্দিষ্ট ড্রাফট দেওয়া হলো:

```markdown
Dear [Client Name],

Thank you very much for your thoughtful feedback and clear guidance. Everything you outlined has been thoroughly reviewed and structured into our implementation plan.

Here is how we are addressing each of your core requirements:

1. Financial Flow & Taxes:
   - Configurable Tax Engine: The 13% tax is kept dynamic (configurable via admin/environment settings) and calculated as an addition to the buyer's order, ensuring the host's 80% share remains untouched.
   - Payout Transparency: Host earnings clearly separate Omni’s 20% platform commission from actual Stripe processing fees deducted from the host's share.
   - Dispute Adjustments: In case of partial refunds, Omni's 20% commission applies strictly to the net retained amount, with manual admin overrides and no automatic clawback after payout.

2. Buyer Cancellation & Disputes:
   - We are adding direct "Request Cancellation" and "Open Dispute" capabilities to the Buyer Campaign Dashboard with file attachment support and milestone tracking.

3. Automated Welcome Package:
   - Yes, automated welcome emails are fully supported! We will connect transactional email triggers (via Resend/SendGrid) that automatically deliver a Welcome PDF Guide and onboarding materials upon registration.

4. Omni Marketplace First Slot:
   - Slot #1 is permanently reserved across the campaign workflow as the mandatory "Omni Marketplace Promo Slide (with QR Code)".

5. Campaign Previews:
   - Hosts can download the generated slideshow and submit a preview link or file in their order management section. Advertisers can review, comment, and approve it directly before the campaign goes live.

6. Host Social & Website Links:
   - Dedicated fields for Website, Instagram, Facebook, YouTube, and LinkedIn are added to Host Settings and prominently displayed on public Host and placement pages.

---

### Launch-Ready Scope & Remaining Financial Commitment:

To give you complete transparency for your personal financial planning, here is the exact breakdown of the remaining phases to take Omni Marketplace to a 100% production launch:

- Phase A: Financial & Payment Engine (Stripe Escrow flow, dynamic tax calculations, processing fee deductions, payout settlements).
- Phase B: Buyer & Host Workflow Completion (Cancellation/Dispute engine, Campaign Previews, Omni First Slot lock, Social profile links, Welcome email triggers).
- Phase C: Admin Portal Operations (Dispute mediation, manual adjustments, tax configuration, payout approvals).
- Phase D: End-to-End QA, Stripe Sandbox Live Testing, Security Audit & Production Launch.

Total Remaining Financial Commitment: [Insert Amount, e.g. $X,XXX]
Estimated Delivery Timeline: [Insert Weeks, e.g. 3–4 Weeks]

Please feel free to accept the current order whenever you are ready. We are excited to continue pushing Omni Marketplace toward a successful launch!

Best regards,
Jubayer
```

---
*Omni Marketplace Architecture Specification Document — Ready for Execution.*
