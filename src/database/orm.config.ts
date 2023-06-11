export = {
  type: 'mongodb',
  url: process.env.DB_URL,
  database: process.env.DB_NAME,
  entities: ['src/**/*.entity{.ts,.js}'],
  synchronize: false,
  logging: process.env.NODE_ENV === 'development',
  migrations: ['src/database/migrations/**/*{.ts,.js}'],
  factories: ['src/database/factories/**/*{.ts,.js}'],
  seeds: ['src/database/seeds/**/*{.ts,.js}'],
  cli: {
    migrationsDir: 'src/database/migrations',
  },
};
