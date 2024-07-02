wait_for_postgres() {
    until nc -z -v -w30 $POSTGRES_HOST $POSTGRES_PORT
    do
        echo "Aguardando o PostgreSQL estar pronto..."
        sleep 5
    done
    echo "PostgreSQL está pronto!"
}

wait_for_postgres

npx prisma migrate dev --name my-migration-name

npm run start:dev
