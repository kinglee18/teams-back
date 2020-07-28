FROM keymetrics/pm2:12-alpine
COPY src src/
COPY package.json .
COPY ecosystem.config.js .
ENV NPM_CONFIG_LOGLEVEL warn
RUN npm install 
EXPOSE 3000
CMD [ "pm2-runtime", "start", "ecosystem.config.js" ]