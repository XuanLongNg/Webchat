interface keyFirebase {
  DB_API_KEY: string;
  DB_AUTH_DOMAIN: string;
  DB_DATABASE_URL: string;
  DB_PROJECT_ID: string;
  DB_APP_ID: string;
  DB_MEASUREMENT_ID: string;
  DB_MESSAGE_SENDER: string;
  DB_STORAGE_BUCKET: string;
}

interface Window {
  _env: EnvConfig;
}
