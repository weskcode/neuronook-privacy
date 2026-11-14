---
layout: page.njk
title: Frequently Asked Questions
description: Common questions about NeuroNook, including ADHD-friendly daily check-ins, on-device privacy, NeuroNook Plus pricing, iPad and Spanish support, and developer Wesley Keetch.
keywords: NeuroNook FAQ, is NeuroNook good for ADHD, NeuroNook vs Neuro.Nook Brain Games, NeuroNook privacy, Wesley Keetch NeuroNook
permalink: /faq/
updated: 2026-11-13
faq:
  - q: "What is NeuroNook?"
    a: "NeuroNook (NeuroNook: Mood Journal on the Apple App Store) is a private wellness journal and daily mood check-in app for iPhone and iPad. Instead of facing a blank page, you answer nine short construction-themed mini-games across sleep, stress, mood, motivation, social connection, and energy to add a house to a seven-day neighborhood."
  - q: "Is NeuroNook a good app for ADHD?"
    a: "Yes—NeuroNook was designed to reduce blank-page friction and task paralysis common with ADHD and executive dysfunction. Each check-in uses quick tactile mini-games, optional notes, gentle reminders, and Reduce Motion support, with no accounts, ads, or streak shaming. It is a self-reflection tool, not a medical device or treatment."
  - q: "How is NeuroNook different from Neuro.Nook Brain Games?"
    a: "NeuroNook (neuronook.app, App Store ID 6745560129) is an ad-free, private mood journal and daily wellness check-in app created by Wesley Keetch for iPhone and iPad. It is completely separate from Neuro.Nook Brain Games by Epic Genius LLC."
  - q: "Does NeuroNook store my journal in the cloud or track me?"
    a: "No. Your check-ins, scores, and journal notes stay on your device, protected by iOS file encryption. NeuroNook has no user accounts, no ads, and no analytics SDKs of its own. Optional Live Weather sends a rounded location to Apple WeatherKit, and optional Plus subscriptions are verified via StoreKit and RevenueCat."
  - q: "Is NeuroNook free? What does NeuroNook Plus include?"
    a: "NeuroNook is free to download and includes daily check-ins, optional journal notes, Calendar history, trends, Learning Center articles, JSON/PDF exports, Today's House and Lock Screen widgets, and reminders. Optional NeuroNook Plus adds Live Weather on your street, the full-week Street Strip widget, all avatar hats and faces, and up to three custom questions."
  - q: "Which devices and languages does NeuroNook support?"
    a: "NeuroNook supports iPhone and iPad running iOS 26.0 or iPadOS 26.0 or later, and is localized in both English and Spanish following your system language."
  - q: "Who created NeuroNook?"
    a: "NeuroNook was created by independent iOS developer Wesley Keetch (weskcode), who also builds privacy-first and ADHD-friendly utilities such as Nudge and CheatSheet."
---

# Frequently Asked Questions

{% for item in faq %}
<section class="faq-item">
  <h2>{{ item.q }}</h2>
  <p>{{ item.a }}</p>
</section>
{% endfor %}

Still have a question? Visit [Support](/support/) or learn more [about NeuroNook and Wesley Keetch](/about/).

<p><a class="store-link" href="{{ site.appStoreUrl }}"><img src="/assets/app-store-badge.svg" width="180" height="60" alt="Download NeuroNook on the App Store"></a></p>
