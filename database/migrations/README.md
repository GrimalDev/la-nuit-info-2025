# Database Migrations

## Running Migrations

### Using Docker:
```bash
# Run migration inside the running MariaDB container
docker exec -i la-nuit-info-mariadb mysql -uroot -prootpassword libre-tous-tech < database/migrations/001_fix_ip_column_length.sql
```

### Using local MySQL/MariaDB:
```bash
mysql -u root -p libre-tous-tech < database/migrations/001_fix_ip_column_length.sql
```

## Migration List

### 001_fix_ip_column_length.sql
- **Date**: 2025-12-05
- **Description**: Increases IP column from VARCHAR(15) to VARCHAR(45) to support IPv6 addresses
- **Tables affected**: `ip-limit-donations`
