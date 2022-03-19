FROM alpine
WORKDIR /tmp
COPY /app /tmp
RUN npm install
RUN npm run build
EXPOSE 8080
CMD npm run start