# Temporary Effects as Token Statuses

![Foundry Core Compatible Version](https://img.shields.io/badge/dynamic/json.svg?url=https%3A%2F%2Fraw.githubusercontent.com%2FElfFriend-DnD%2Ffoundryvtt-temp-effects-as-statuses%2Fmain%2Fmodule.json&label=Foundry%20Version&query=$.compatibleCoreVersion&colorB=orange)
![Latest Release Download Count](https://img.shields.io/badge/dynamic/json?label=Downloads@latest&query=assets%5B1%5D.download_count&url=https%3A%2F%2Fapi.github.com%2Frepos%2FElfFriend-DnD%2Ffoundryvtt-temp-effects-as-statuses%2Freleases%2Flatest)
![Forge Installs](https://img.shields.io/badge/dynamic/json?label=Forge%20Installs&query=package.installs&suffix=%25&url=https%3A%2F%2Fforge-vtt.com%2Fapi%2Fbazaar%2Fpackage%2Ftemp-effects-as-statuses&colorB=4aa94a)
[![Foundry Hub Endorsements](https://img.shields.io/endpoint?logoColor=white&url=https%3A%2F%2Fwww.foundryvtt-hub.com%2Fwp-json%2Fhubapi%2Fv1%2Fpackage%2Ftemp-effects-as-statuses%2Fshield%2Fendorsements)](https://www.foundryvtt-hub.com/package/temp-effects-as-statuses/)
[![Foundry Hub Comments](https://img.shields.io/endpoint?logoColor=white&url=https%3A%2F%2Fwww.foundryvtt-hub.com%2Fwp-json%2Fhubapi%2Fv1%2Fpackage%2Ftemp-effects-as-statuses%2Fshield%2Fcomments)](https://www.foundryvtt-hub.com/package/temp-effects-as-statuses/)

[![ko-fi](https://img.shields.io/badge/-buy%20me%20a%20coke-%23FF5E5B)](https://ko-fi.com/elffriend)
[![patreon](https://img.shields.io/badge/-patreon-%23FF424D)](https://www.patreon.com/ElfFriend_DnD)

This module's goal is to allow GMs to disable/delete active effects from the token HUD.

## Features

When a token has a temporary active effect active, display that active effect icon in the Status Effects HUD element.

Interacting with that effect icon will do one of the following:
- If the effect has a `statusId`, it was meant to be short-lived or re-created frequently, delete the effect.
- If the effect has no `statusId`, disable it.

Examples:
1. Akra casts "Bless" and the GM applies the "Bless" effect from the card output by [Item Effects to Chat D&D5e](https://github.com/ElfFriend-DnD/foundryvtt-item-effects-to-chat-5e) to Akra's targets: Akra, Morthos, and Randall.
2. The GM right clicks on one of the Tokens that isn't Akra and opens the status effect menu.
3. The "Bless" icon is present in addition to other options here.
4. The GM clicks on the "Bless" icon, and the "Bless" effect on the token's actor is deleted because the effect did not originate from that token's actor.

https://user-images.githubusercontent.com/7644614/148661276-3160fc8f-a2e0-4da8-9733-b28f0a3c6af9.mp4

## Compatibility

Tested with dnd5e, might work on other systems as well though.

Super Charged by:

- [Item Effects to Chat D&D5e](https://github.com/ElfFriend-DnD/foundryvtt-item-effects-to-chat-5e)

Compatible with:
- DF Convienent Effects (Ignore the libwrapper warning, it's working fine).

Uncertain Compatiblity with:

- Any system that isn't dnd5e. The core concept should be system-agnostic but there might be details missing.

