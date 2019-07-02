FROM node:10.16

RUN mkdir app
WORKDIR /app

COPY . .

RUN npm install && npm run build
RUN npm test

CMD [ "/bin/bash","-c","npm run start" ]