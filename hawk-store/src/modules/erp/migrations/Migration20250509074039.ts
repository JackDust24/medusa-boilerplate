import { Migration } from '@mikro-orm/migrations';

export class Migration20250509074039 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table if not exists "erp" ("id" text not null, "title" text not null, "created_at" timestamptz not null default now(), "updated_at" timestamptz not null default now(), "deleted_at" timestamptz null, constraint "erp_pkey" primary key ("id"));`);
    this.addSql(`CREATE INDEX IF NOT EXISTS "IDX_erp_deleted_at" ON "erp" (deleted_at) WHERE deleted_at IS NULL;`);
  }

  override async down(): Promise<void> {
    this.addSql(`drop table if exists "erp" cascade;`);
  }

}
