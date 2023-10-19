#!/bin/bash
npx prisma migrate deploy
npx prisma db seed
yarn run start:dev
