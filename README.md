# rock-paper-scissors-battle
Watch a simulation of emoji Rock, Paper, Scissors and multiple variants battle it out:

* 🧱📄✂️  Rock, Paper, Scissors
* 🦎🖖 Lizard-Spock Expansion
* 🔥🌳💧 Fire, Tree, Water
* 🌎 Elements
* 💑 Boys Chase Girls

### Demo

See [demo](https://lewdev.github.io/apps/rock-paper-scissors-battle/)

## Description

This simulates Rock, Paper, and Scissors initially placed randomly around the screen and then chasing after their nearest prey. It's interesting to see the outcomes being completely random.

Click on the drop down to watch the other variants play out. Modify the source code to add your own variations.

To add your own, add a name and ruleset to the `ruleSets` array.

## New Features

* ✖ Multiple variations of the game.
* 💥 Event feed.
* 💨 When an object has no targets, it flees.
* 🦘 Objects bob as they move.
* 🙌 Just like in the show, the game announces "Hail Sam Kass" before the battle begins.
* ✏ You can enter your own custom rules if you run the source code yourself (instructions below).

### Standard RPS Rules

```
✂️ cuts 📄 covers 💎 crushes ✂️
```

### Lizard-Spock Expansion Rules

```
✂️ cuts 📄 covers 💎 crushes 🦎 poisons 🖖 smashes ✂️ decapitates 🦎 eats 📄 disproves 🖖 vaporizes 💎 crushes ✂️
```

## Run this code

Install 3 basic global apps: `serve`, `concurrently`, and `opener`. It basically starts a server on the `src` directory and views it in your default browser.
```
npm i
```

Start the server and open it in your default browser.
```
npm start
```

## Inspiration

This was an attempt to create something for the [JS1024](https://js1024.fun/) (2021). I started on this just after the deadline so I wasn't planning on submitting it but rather just see if I could create something for it.

Turns out, it's very hard to do and getting even a small app down to 1024 bytes seems impossible.

## The Lizard-Spock Expansion

Inspired by the [code.golf hole "Rock-paper-scissors-Spock-lizard"](https://code.golf/rock-paper-scissors-spock-lizard#javascript) (code challenge), I decided to create a version of this with the addition of 🖖Spock and 🦎Lizard. I looked it up and found that became popularized by [The Big Bang Theory in a scene when Sheldon and Raj can't agree about what to watch on TV](https://bigbangtheory.fandom.com/wiki/Rock,_Paper,_Scissors,_Lizard,_Spock).

## Additional Research

There is an interesting website, [umop.com](http://www.umop.com/rps.htm), with many variatians of the game and additional objects. The website includes RPS-7, 9, 11, 15, 25, and even 101! I implemented RPS-7, but I don't know if I'll get around to doing the others.

I made up the "5 Elements" variation. Please send me your variations if you have any!

## Compression Strategy

1. [JSCompression](https://jscompress.com/)
2. [Google Closure](https://closure-compiler.appspot.com/)
3. [A JavaScript Compressor](http://dean.edwards.name/packer/)
4. [JavaScript Minifier](https://javascript-minifier.com/)
