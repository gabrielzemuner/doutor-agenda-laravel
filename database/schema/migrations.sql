create table "users" ("id" bigserial primary key, "user_id" bigint null, "name" varchar(255) not null, "email" varchar(255) not null unique, "password" varchar(255) not null, "email" varchar(255) not null, "token" varchar(255) not null, "id" varchar(255) not null, "ip_address" varchar(45) null, "user_agent" text null, "last_activity" integer not null, "email_verified_at" timestamp null, "created_at" timestamp null, "created_at" timestamp null, "updated_at" timestamp null, "remember_token" varchar(100) null);
alter table "users" add constraint "users_user_id_foreign" foreign key ("user_id") references "users" ("id");

create table "cache" ("key" varchar(255) not null, "key" varchar(255) not null, "owner" varchar(255) not null, "expiration" integer not null, "expiration" integer not null);

create table "jobs" ("id" bigserial primary key, "queue" varchar(255) not null, "id" varchar(255) not null, "name" varchar(255) not null, "uuid" varchar(255) not null unique, "connection" text not null, "queue" text not null, "total_jobs" integer not null, "pending_jobs" integer not null, "failed_jobs" integer not null, "cancelled_at" integer null, "created_at" integer not null, "finished_at" integer null, "failed_at" timestamp not null);

create table "clinics" ("id" uuid primary key, "name" varchar(255) not null, "created_at" timestamp null, "updated_at" timestamp null);

create table "clinic_user" ("user_id" bigint not null, "clinic_id" uuid not null, "created_at" timestamp null, "updated_at" timestamp null);
alter table "clinic_user" add constraint "clinic_user_user_id_foreign" foreign key ("user_id") references "users" ("id") on delete cascade;
alter table "clinic_user" add constraint "clinic_user_clinic_id_foreign" foreign key ("clinic_id") references "clinics" ("id") on delete cascade;
alter table "clinic_user" add primary key ("user_id", "clinic_id");

create table "doctors" ("id" uuid primary key, "clinic_id" uuid not null, "name" varchar(255) not null, "avatar_image_url" varchar(255) null, "specialty" varchar(255) not null, "appointment_price_in_cents" integer not null, "available_from_week_day" smallint not null, "available_to_week_day" smallint not null, "available_from_time" time not null, "available_to_time" time not null, "created_at" timestamp null, "updated_at" timestamp null);
alter table "doctors" add constraint "doctors_clinic_id_foreign" foreign key ("clinic_id") references "clinics" ("id") on delete cascade;

create table "patients" ("id" uuid primary key, "clinic_id" uuid not null, "name" varchar(255) not null, "email" varchar(255) not null, "phone_number" varchar(255) not null, "sex" varchar(255) not null, "created_at" timestamp null, "updated_at" timestamp null);
alter table "patients" add constraint "patients_clinic_id_foreign" foreign key ("clinic_id") references "clinics" ("id") on delete cascade;

create table "appointments" ("id" uuid primary key, "clinic_id" uuid not null, "patient_id" uuid not null, "doctor_id" uuid not null, "date" timestamp not null, "created_at" timestamp null, "updated_at" timestamp null);
alter table "appointments" add constraint "appointments_clinic_id_foreign" foreign key ("clinic_id") references "clinics" ("id") on delete cascade;
alter table "appointments" add constraint "appointments_patient_id_foreign" foreign key ("patient_id") references "patients" ("id") on delete cascade;
alter table "appointments" add constraint "appointments_doctor_id_foreign" foreign key ("doctor_id") references "doctors" ("id") on delete cascade;

