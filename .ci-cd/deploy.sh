# Пример вызова скрипта
# nohup ./ci-cd/deploy.sh dev "123456:ABCDEsaw" "-1001018" &

# 1. Устанавливаем из входных параметров переменные окружения
export HW_ENV=$1
export HW_TG_BOT_TOKEN=$2
export HW_TG_CHAT_ID=$3
printf "\n\n### %s - start_deploy###\n" "$(date)"


# 2. Запускаем билд
sh ./.ci-cd/curl_tg.sh "#start_build"
docker build -f Dockerfile -t "hw_front_${HW_ENV}:new"
build_result=$?
printf "\nBUILD result %s\n" "$build_result"

if [ "$build_result" != 0 ]; then
  sh ./.ci-cd/curl_tg.sh "#build_failed"
  docker image rm "hw_front_${HW_ENV}:new"
  exit 1
fi


# 3. Деплой
docker tag "hw_front_${HW_ENV}:latest" "hw_front_${HW_ENV}:previous"
docker tag "hw_front_${HW_ENV}:new" "hw_front_${HW_ENV}:latest"
docker-compose -p "hw_front_${HW_ENV}" up -d  --remove-orphans

sh ./.ci-cd/curl_tg.sh "#deploy_success"

