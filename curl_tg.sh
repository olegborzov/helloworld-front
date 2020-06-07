curl -L -X POST "https://api.telegram.org/$1/sendMessage?chat_id=$2" \
  -H "Content-Type: application/json" --data-raw "{\"text\": \"helloworld #front #$3 - $4\"}"
