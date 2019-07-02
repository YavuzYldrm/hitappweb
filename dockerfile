FROM node:10.16

RUN mkdir app
WORKDIR /app

COPY . .

RUN npm install && npm run build
RUN npm test

EXPOSE 3000

ENV NODE_ENV=production
ENV PORT=3000

CMD [ "/bin/bash","-c","npm run start" ]