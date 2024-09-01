# ----------------CREANDO UN IMMAGINE DOCKER PER IL MIO PROGETTO SERVER WEB API --------------------------

# Usa l'immagine di Node.js ufficiale come base
FROM node:20

# Imposta la cartella di lavoro all'interno del container
WORKDIR /usr/src/app


# -------- da ora in poi sto eseguanedo comandi che verranno effettuati dentro la cartella specificata ()"app")
# Copia il package.json e il package-lock.json nel container
COPY package*.json ./


# Installa le dipendenze
RUN npm install

#copia il resto del codice 
# COPY . /usr/src/app/
COPY . .


#compila il codice typescript in javascript 
RUN npm run build 

# Esponi la porta su cui la tua app sarà in esecuzione
EXPOSE 3500


# Comando per avviare l'applicazione
CMD ["npm", "run", "dev"]

#  INVECE DI CREARE UN IMMAGINE ANCHE PER MONGODB POSSO SCARICARE DIRETTAMENTE L IMMAGINE UFFICILE docker PER MONGO DB -- QUESTA IMMAGINE VERRà DIRETTAMENTE UTILIZZATA NEL FILE DOCKER COMPOSE
