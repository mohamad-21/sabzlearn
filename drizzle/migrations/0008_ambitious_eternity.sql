ALTER TABLE `accounts` MODIFY COLUMN `refresh_token_expires_at` timestamp(3) DEFAULT '2028-05-07 13:03:44.916';--> statement-breakpoint
ALTER TABLE `teacher_info` ADD `created_at` timestamp(3) DEFAULT 'current_timestamp(3)' NOT NULL;--> statement-breakpoint
ALTER TABLE `teacher_info` ADD `updated_at` timestamp(3) DEFAULT 'current_timestamp(3)' NOT NULL;