#################################################
### BUILDING
#################################################

FROM node:alpine AS build

WORKDIR /app
COPY package.json /app/

RUN npm config set unsafe-perm true
RUN npm set progress=false && npm install

ADD . /app

ARG STAGE_ENV
RUN echo "branch_name=$STAGE_ENV" && \
  if [ "${STAGE_ENV}" == "prod" ] ; then \
      npm run build:prod ; \
  else \
      npm run build:dev ; \
  fi

#################################################
### DISTRIBUTION
#################################################

FROM nginx:alpine

COPY --from=build /app/dist /app
COPY nginx.conf /etc/nginx/conf.d/default.conf
