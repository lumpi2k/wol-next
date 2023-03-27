# wol-next

## What's this about?
I have a Synology NAS that starts and shuts down on a schedule to save energy and reduce HDD noise. Sometimes though, I need data on the NAS, so I've configured it to listen for a magic Wake on LAN packet and then wake up. 

This little next app does exactly this. Just tap the button and the NAS starts up.

## Start the App

Running locally, you basically just need to supply your NAS' Mac address in the `.env.local` file

```bash
git clone https://github.com/lumpi2k/wol-next
cd wol-next
cp .env.local.example .env.local
nano .env.local
# insert your Mac address
npm install
npm run dev
```
Your app now lives on http://localhost:3000

## Docker
I run this app on a raspberry pi. Using docker compose:

```bash
git clone https://github.com/lumpi2k/wol-next
cd wol-next
cp .env.local.example .env.local
nano .env.local
# insert your Mac address
docker compose up -d
```
### Change Container Port
I've attached the Container to the host network, so the magic packet doesn't get filtered by any docker network settings. If you want to change the port the app listens on, you'll have to change it in the `Dockerfile` and rebuild the app locally.

```bash
docker compose build && docker compose up -d
```

## Special Thanks
I wrote not a single line of code myself. The heavy lifting was done by ChatGPT.