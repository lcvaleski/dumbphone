#!/bin/bash

# Essential Apps
curl -s "https://itunes.apple.com/lookup?id=1146562108" | python3 -c "import sys, json; data = json.load(sys.stdin); print(data['results'][0]['artworkUrl100'] if data.get('results') else '')" | xargs -I {} curl -s {} -o icons/phone.png
curl -s "https://itunes.apple.com/lookup?id=1146560473" | python3 -c "import sys, json; data = json.load(sys.stdin); print(data['results'][0]['artworkUrl100'] if data.get('results') else '')" | xargs -I {} curl -s {} -o icons/messages.png
curl -s "https://itunes.apple.com/lookup?id=915056765" | python3 -c "import sys, json; data = json.load(sys.stdin); print(data['results'][0]['artworkUrl100'] if data.get('results') else '')" | xargs -I {} curl -s {} -o icons/maps.png
curl -s "https://itunes.apple.com/lookup?id=1069513131" | python3 -c "import sys, json; data = json.load(sys.stdin); print(data['results'][0]['artworkUrl100'] if data.get('results') else '')" | xargs -I {} curl -s {} -o icons/weather.png
curl -s "https://itunes.apple.com/lookup?id=1108185179" | python3 -c "import sys, json; data = json.load(sys.stdin); print(data['results'][0]['artworkUrl100'] if data.get('results') else '')" | xargs -I {} curl -s {} -o icons/calendar.png
curl -s "https://itunes.apple.com/lookup?id=1584215688" | python3 -c "import sys, json; data = json.load(sys.stdin); print(data['results'][0]['artworkUrl100'] if data.get('results') else '')" | xargs -I {} curl -s {} -o icons/clock.png
curl -s "https://itunes.apple.com/lookup?id=1110145109" | python3 -c "import sys, json; data = json.load(sys.stdin); print(data['results'][0]['artworkUrl100'] if data.get('results') else '')" | xargs -I {} curl -s {} -o icons/notes.png
curl -s "https://itunes.apple.com/lookup?id=1108187841" | python3 -c "import sys, json; data = json.load(sys.stdin); print(data['results'][0]['artworkUrl100'] if data.get('results') else '')" | xargs -I {} curl -s {} -o icons/reminders.png
curl -s "https://itunes.apple.com/lookup?id=1069511488" | python3 -c "import sys, json; data = json.load(sys.stdin); print(data['results'][0]['artworkUrl100'] if data.get('results') else '')" | xargs -I {} curl -s {} -o icons/calculator.png

# Social Apps
curl -s "https://itunes.apple.com/lookup?id=389801252" | python3 -c "import sys, json; data = json.load(sys.stdin); print(data['results'][0]['artworkUrl100'] if data.get('results') else '')" | xargs -I {} curl -s {} -o icons/instagram.png
curl -s "https://itunes.apple.com/lookup?id=835599320" | python3 -c "import sys, json; data = json.load(sys.stdin); print(data['results'][0]['artworkUrl100'] if data.get('results') else '')" | xargs -I {} curl -s {} -o icons/tiktok.png
curl -s "https://itunes.apple.com/lookup?id=447188370" | python3 -c "import sys, json; data = json.load(sys.stdin); print(data['results'][0]['artworkUrl100'] if data.get('results') else '')" | xargs -I {} curl -s {} -o icons/snapchat.png
curl -s "https://itunes.apple.com/lookup?id=284882215" | python3 -c "import sys, json; data = json.load(sys.stdin); print(data['results'][0]['artworkUrl100'] if data.get('results') else '')" | xargs -I {} curl -s {} -o icons/facebook.png
curl -s "https://itunes.apple.com/lookup?id=333903271" | python3 -c "import sys, json; data = json.load(sys.stdin); print(data['results'][0]['artworkUrl100'] if data.get('results') else '')" | xargs -I {} curl -s {} -o icons/twitter.png
curl -s "https://itunes.apple.com/lookup?id=985746746" | python3 -c "import sys, json; data = json.load(sys.stdin); print(data['results'][0]['artworkUrl100'] if data.get('results') else '')" | xargs -I {} curl -s {} -o icons/discord.png
curl -s "https://itunes.apple.com/lookup?id=1064216828" | python3 -c "import sys, json; data = json.load(sys.stdin); print(data['results'][0]['artworkUrl100'] if data.get('results') else '')" | xargs -I {} curl -s {} -o icons/reddit.png
curl -s "https://itunes.apple.com/lookup?id=460177396" | python3 -c "import sys, json; data = json.load(sys.stdin); print(data['results'][0]['artworkUrl100'] if data.get('results') else '')" | xargs -I {} curl -s {} -o icons/twitch.png
curl -s "https://itunes.apple.com/lookup?id=1459645446" | python3 -c "import sys, json; data = json.load(sys.stdin); print(data['results'][0]['artworkUrl100'] if data.get('results') else '')" | xargs -I {} curl -s {} -o icons/bereal.png
curl -s "https://itunes.apple.com/lookup?id=429047995" | python3 -c "import sys, json; data = json.load(sys.stdin); print(data['results'][0]['artworkUrl100'] if data.get('results') else '')" | xargs -I {} curl -s {} -o icons/pinterest.png
curl -s "https://itunes.apple.com/lookup?id=305343404" | python3 -c "import sys, json; data = json.load(sys.stdin); print(data['results'][0]['artworkUrl100'] if data.get('results') else '')" | xargs -I {} curl -s {} -o icons/tumblr.png
curl -s "https://itunes.apple.com/lookup?id=288429040" | python3 -c "import sys, json; data = json.load(sys.stdin); print(data['results'][0]['artworkUrl100'] if data.get('results') else '')" | xargs -I {} curl -s {} -o icons/linkedin.png

echo "Icons downloaded!"
ls -la icons/