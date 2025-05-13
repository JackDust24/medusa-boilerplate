import { Migration } from '@mikro-orm/migrations';

export class Migration20250513063029 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table if exists "brand" add column if not exists "description" text null, add column if not exists "logo" text null, add column if not exists "website" text null;`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table if exists "brand" drop column if exists "description", drop column if exists "logo", drop column if exists "website";`);
  }

}
