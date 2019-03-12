
#PLANETAS API

    Esta API foi desenvolvida em Java Script e feita rodar com o node com versão igual. ..
    a v8.14.1 ou superior.
    
    Utiliza o MongoDB e o Express e junto a esses pacotes alguns outros disponíveis no NPM foram ..    
    utilizados de forma facilitar o desenvolvimento.
    
    Alguns deles são: 

    * JOI 
    * LODASH  
    * MONGOOSE 
    * OUTROS... verificar lista junto ao arquivo "package.json" 

    Para faze-lo funcionar corretamente serão necessários alguns passos:

        1. abra o direitorio do projeto em seu terminal 
        2. execute "npm install"
        3. crie um arquivo chamado ".env" no diretório raiz do repositorio com o conteúdo:
        
            SERVER_PORT={PORTA_API} # por default ela vem 3000
            DB_URL="{HOST}:{PORT}/{DB_NAME}"
        
        4. execute "npm start"
